"""Shared helpers: monthly alignment and ordinary least squares with numpy only."""
from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from pathlib import Path

import numpy as np
import pandas as pd

import fred

OUTPUTS = Path(__file__).resolve().parent.parent / "outputs"


def monthly(series_id: str) -> pd.Series:
    """Monthly average of a cached FRED series, indexed by month start."""
    s = fred.load_cache(series_id)["value"].dropna()
    return s.resample("MS").mean().rename(series_id)


@dataclass
class OLS:
    slope: float
    intercept: float
    se: float
    ci_low: float
    ci_high: float
    r2: float
    n: int


def ols(x: np.ndarray, y: np.ndarray) -> OLS:
    """y = a + b*x with a classical standard error and a normal-approximation 95% interval for b."""
    x = np.asarray(x, dtype=float)
    y = np.asarray(y, dtype=float)
    n = len(x)
    if n < 3:
        raise ValueError("need at least 3 observations")
    xm, ym = x.mean(), y.mean()
    sxx = ((x - xm) ** 2).sum()
    slope = ((x - xm) * (y - ym)).sum() / sxx
    intercept = ym - slope * xm
    resid = y - (intercept + slope * x)
    se = float(np.sqrt((resid**2).sum() / (n - 2) / sxx))
    ss_tot = ((y - ym) ** 2).sum()
    r2 = float(1 - (resid**2).sum() / ss_tot) if ss_tot > 0 else 0.0
    return OLS(float(slope), float(intercept), se, float(slope - 1.96 * se), float(slope + 1.96 * se), r2, n)


def write_json(name: str, payload: dict) -> Path:
    OUTPUTS.mkdir(exist_ok=True)
    path = OUTPUTS / name
    path.write_text(json.dumps(payload, indent=2, default=_jsonable) + "\n")
    return path


def _jsonable(o):
    if isinstance(o, OLS):
        return asdict(o)
    if isinstance(o, (np.floating, np.integer)):
        return o.item()
    if isinstance(o, pd.Timestamp):
        return o.strftime("%Y-%m-%d")
    raise TypeError(type(o))
