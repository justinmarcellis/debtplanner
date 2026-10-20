#!/usr/bin/env python3
"""Fetch FRED series with a local CSV cache.

This is the data-access helper for the Act 2 demo (``demo/macro-risk``).

    from fred import fetch_series
    df = fetch_series("UNRATE")        # DataFrame: DatetimeIndex "date", float column "value"

Behaviour
---------
* The cache lives in ``data/raw/<ID>.csv`` and is used whenever it exists. No network
  call is made unless ``refresh=True`` (CLI: ``--refresh``) or the cache file is missing.
* Missing observations are the literal ``.`` in FRED files; they parse to ``NaN``.
* Refresh order: the FRED API (``series/observations``) when the ``FRED_API_KEY``
  environment variable is set, then the public CSV endpoint
  ``https://fred.stlouisfed.org/graph/fredgraph.csv?id=<ID>`` (no key needed).
* If every refresh source fails, the cache is used and a ``FredWarning`` is issued.
  If there is no cache either, ``FredError`` is raised.
* TLS verification is never disabled. Behind a proxy that re-signs TLS, point Python at
  the proxy CA bundle with the standard ``SSL_CERT_FILE`` environment variable.
* The API key is read from the environment only. It is never written to disk and is
  redacted from any message this module produces.

Command line
------------
    python3 fred.py UNRATE                 # use the cache (works with no network)
    python3 fred.py --refresh UNRATE NROU  # re-download, fall back to the cache on failure
    python3 fred.py --all                  # every series the demo uses

Data: Federal Reserve Bank of St. Louis, FRED(R). See data/README.md for attribution.
"""
from __future__ import annotations

import argparse
import io
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
import warnings
from pathlib import Path
from typing import Callable, Dict, Iterable, List, Optional, Sequence

import pandas as pd

HERE = Path(__file__).resolve().parent
DEFAULT_CACHE_DIR = HERE / "data" / "raw"

CSV_URL = "https://fred.stlouisfed.org/graph/fredgraph.csv"
API_URL = "https://api.stlouisfed.org/fred/series/observations"
USER_AGENT = "fintechco-macro-risk-demo/1.0 (educational demo; reads public FRED data)"

#: Every series the Act 2 demo caches, in the order used by the data dictionary.
DEFAULT_SERIES: Sequence[str] = (
    "UNRATE",
    "NROU",
    "PCEPILFE",
    "CPIAUCSL",
    "FEDFUNDS",
    "DFF",
    "DFEDTAR",
    "DFEDTARU",
    "VIXCLS",
    "USREC",
    "BAMLH0A0HYM2",
)

_SERIES_ID_RE = re.compile(r"^[A-Za-z0-9_]{1,40}$")


class FredError(RuntimeError):
    """Raised when a series cannot be loaded from the cache or the network."""


class FredWarning(UserWarning):
    """Issued when a refresh failed and the cached copy was used instead."""


# --------------------------------------------------------------------------- helpers

def _check_id(series_id: str) -> str:
    """Validate a series id (it becomes a file name and a URL parameter)."""
    if not isinstance(series_id, str) or not _SERIES_ID_RE.match(series_id):
        raise ValueError(f"invalid FRED series id: {series_id!r}")
    return series_id.upper()


def cache_path(series_id: str, cache_dir: Optional[os.PathLike] = None) -> Path:
    """Path of the cached CSV for ``series_id``."""
    base = Path(cache_dir) if cache_dir is not None else DEFAULT_CACHE_DIR
    return base / f"{_check_id(series_id)}.csv"


def _redact(text: str) -> str:
    """Remove any API key from text before it is shown or raised."""
    text = re.sub(r"(api_key=)[^&\s'\"]+", r"\1<redacted>", text)
    key = os.environ.get("FRED_API_KEY")
    return text.replace(key, "<redacted>") if key else text


def parse_fred_csv(text: str, series_id: Optional[str] = None) -> pd.DataFrame:
    """Parse FRED CSV text into a DataFrame (DatetimeIndex ``date``, float ``value``).

    Accepts the ``observation_date,<ID>`` header used by the public endpoint and the older
    ``DATE,<ID>`` header. The ``.`` placeholder (and blank cells) become ``NaN``.
    """
    raw = pd.read_csv(io.StringIO(text), dtype=str, keep_default_na=False)
    if raw.shape[1] != 2 or raw.shape[0] == 0:
        raise FredError("unexpected FRED CSV layout (need two columns and at least one row)")
    date_col, value_col = raw.columns
    if date_col.lower() not in ("observation_date", "date"):
        raise FredError(f"unexpected FRED CSV header: {list(raw.columns)!r}")
    if series_id is not None and value_col.upper() != series_id.upper():
        raise FredError(f"CSV is for {value_col!r}, expected {series_id!r}")
    values = raw[value_col].str.strip().replace({".": None, "": None})
    out = pd.DataFrame(
        {"value": pd.to_numeric(values, errors="raise").astype("float64")},
        index=pd.DatetimeIndex(pd.to_datetime(raw[date_col], format="%Y-%m-%d"), name="date"),
    )
    if out.index.has_duplicates:
        raise FredError("duplicate observation dates in FRED CSV")
    return out.sort_index()


def _normalise_csv(text: str) -> str:
    return text.replace("\r\n", "\n").replace("\r", "\n").strip("\n") + "\n"


def _http_get(url: str, timeout: float) -> bytes:
    """One HTTP GET. Every network call in this module goes through here (tests patch it)."""
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=timeout) as response:  # default TLS verification
        return response.read()


def _download_csv(series_id: str, timeout: float, get: Callable[[str, float], bytes]) -> str:
    url = f"{CSV_URL}?{urllib.parse.urlencode({'id': series_id})}"
    return _normalise_csv(get(url, timeout).decode("utf-8"))


def _download_api(series_id: str, api_key: str, timeout: float, get: Callable[[str, float], bytes]) -> str:
    """Call series/observations and re-emit the result in the public-CSV layout."""
    query = urllib.parse.urlencode({"series_id": series_id, "api_key": api_key, "file_type": "json"})
    payload = json.loads(get(f"{API_URL}?{query}", timeout).decode("utf-8"))
    if "observations" not in payload:
        raise FredError(f"FRED API returned no observations: {str(payload)[:120]}")
    lines = ["observation_date," + series_id]
    lines += [f"{obs['date']},{obs['value']}" for obs in payload["observations"]]
    return _normalise_csv("\n".join(lines))


def _write_atomic(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(path.name + ".tmp")
    with open(tmp, "w", encoding="utf-8", newline="\n") as handle:
        handle.write(text)
    os.replace(tmp, path)


# --------------------------------------------------------------------------- public API

def load_cache(series_id: str, cache_dir: Optional[os.PathLike] = None) -> pd.DataFrame:
    """Load ``data/raw/<ID>.csv``. Never touches the network."""
    sid = _check_id(series_id)
    path = cache_path(sid, cache_dir)
    if not path.exists():
        raise FredError(f"no cache for {sid} at {path}")
    df = parse_fred_csv(path.read_text(encoding="utf-8"), sid)
    df.attrs["series_id"] = sid
    df.attrs["source"] = "cache"
    return df


def fetch_series(
    series_id: str,
    refresh: bool = False,
    cache_dir: Optional[os.PathLike] = None,
    timeout: float = 30.0,
    _get: Callable[[str, float], bytes] = _http_get,
) -> pd.DataFrame:
    """Return a FRED series as a DataFrame (DatetimeIndex ``date``, float ``value``).

    The cache is used whenever it exists, unless ``refresh`` is true. ``df.attrs["source"]``
    records where the data came from: ``cache``, ``fred-csv``, ``fred-api`` or
    ``cache-after-failed-refresh``.
    """
    sid = _check_id(series_id)
    path = cache_path(sid, cache_dir)
    if path.exists() and not refresh:
        return load_cache(sid, cache_dir)

    api_key = os.environ.get("FRED_API_KEY", "").strip()
    attempts: List[tuple] = []
    if api_key:
        attempts.append(("fred-api", lambda: _download_api(sid, api_key, timeout, _get)))
    attempts.append(("fred-csv", lambda: _download_csv(sid, timeout, _get)))

    errors: List[str] = []
    for label, download in attempts:
        try:
            text = download()
            df = parse_fred_csv(text, sid)  # validate before caching
        except (urllib.error.URLError, OSError, ValueError, KeyError, FredError) as exc:
            errors.append(f"{label}: {_redact(str(exc))}")
            continue
        _write_atomic(path, text)
        df.attrs["series_id"] = sid
        df.attrs["source"] = label
        return df

    detail = "; ".join(errors)
    if path.exists():
        warnings.warn(
            f"refresh of {sid} failed ({detail}); using cached copy {path}", FredWarning, stacklevel=2
        )
        df = load_cache(sid, cache_dir)
        df.attrs["source"] = "cache-after-failed-refresh"
        return df
    raise FredError(f"could not fetch {sid} and there is no cache ({detail})")


def fetch_many(series_ids: Iterable[str], refresh: bool = False, **kwargs) -> Dict[str, pd.DataFrame]:
    """Fetch several series; returns ``{id: DataFrame}`` in the order given."""
    return {sid: fetch_series(sid, refresh=refresh, **kwargs) for sid in series_ids}


# --------------------------------------------------------------------------- CLI

def _describe(sid: str, df: pd.DataFrame) -> str:
    valid = df["value"].dropna()
    first = valid.index[0].date() if len(valid) else "n/a"
    last = valid.index[-1].date() if len(valid) else "n/a"
    return (
        f"{sid:<13} rows={len(df):>6} non-missing={len(valid):>6} "
        f"first={first} last={last} source={df.attrs.get('source', '?')}"
    )


def main(argv: Optional[Sequence[str]] = None) -> int:
    parser = argparse.ArgumentParser(
        description="Load FRED series from the local cache, or refresh them from FRED.",
        epilog="Set FRED_API_KEY to use the FRED API on refresh; otherwise the public CSV endpoint is used.",
    )
    parser.add_argument("series", nargs="*", help="FRED series ids, e.g. UNRATE NROU")
    parser.add_argument("--all", action="store_true", help="every series the demo uses")
    parser.add_argument("--refresh", action="store_true", help="re-download even if cached")
    args = parser.parse_args(argv)

    ids = list(DEFAULT_SERIES) if args.all else args.series
    if not ids:
        parser.error("give at least one series id, or --all")

    status = 0
    for sid in ids:
        try:
            print(_describe(sid.upper(), fetch_series(sid, refresh=args.refresh)))
        except (FredError, ValueError) as exc:
            print(f"error: {sid}: {_redact(str(exc))}", file=sys.stderr)
            status = 1
    return status


if __name__ == "__main__":
    sys.exit(main())
