"""Has the Phillips curve flattened?

Inflation: year-over-year change in core PCE prices (PCEPILFE).
Slack: unemployment gap = unemployment rate (UNRATE) - CBO noncyclical rate (NROU).
Slope b in  inflation = a + b * gap,  estimated by decade and on a rolling 10-year window.
A flatter curve means b closer to zero: unemployment tells you less about inflation.
This is a descriptive regression, not a causal model; overlapping monthly data are
autocorrelated, so the intervals are too narrow and are shown for orientation only.
"""
from __future__ import annotations

import pandas as pd

from analysis.common import monthly, ols, write_json

WINDOW_MONTHS = 120


def dataset() -> pd.DataFrame:
    core = monthly("PCEPILFE")
    inflation = (core / core.shift(12) - 1) * 100
    unrate = monthly("UNRATE")
    nrou = monthly("NROU").reindex(unrate.index).interpolate(limit_area="inside")
    df = pd.DataFrame({"inflation": inflation, "gap": unrate - nrou}).dropna()
    return df[df.index <= unrate.index.max()]


def by_decade(df: pd.DataFrame) -> list[dict]:
    rows = []
    for decade, part in df.groupby((df.index.year // 10) * 10):
        if len(part) < 24:
            continue
        fit = ols(part["gap"].to_numpy(), part["inflation"].to_numpy())
        rows.append({"decade": f"{decade}s", "start": part.index.min(), "end": part.index.max(), **fit.__dict__})
    return rows


def rolling(df: pd.DataFrame, window: int = WINDOW_MONTHS, step: int = 3) -> list[dict]:
    out = []
    for end in range(window, len(df) + 1, step):
        part = df.iloc[end - window : end]
        fit = ols(part["gap"].to_numpy(), part["inflation"].to_numpy())
        out.append({"end": part.index.max(), "slope": fit.slope, "ci_low": fit.ci_low, "ci_high": fit.ci_high})
    return out


def run() -> dict:
    df = dataset()
    result = {
        "sample": {"start": df.index.min(), "end": df.index.max(), "months": len(df)},
        "latest": {"inflation": float(df["inflation"].iloc[-1]), "gap": float(df["gap"].iloc[-1]), "month": df.index.max()},
        "by_decade": by_decade(df),
        "rolling_10y": rolling(df),
        "series": [{"month": i, "inflation": round(r.inflation, 3), "gap": round(r.gap, 3)} for i, r in df.iterrows()],
    }
    write_json("phillips.json", result)
    return result


if __name__ == "__main__":
    r = run()
    for row in r["by_decade"]:
        print(f"{row['decade']}: slope {row['slope']:+.2f} (95% CI {row['ci_low']:+.2f} to {row['ci_high']:+.2f}), R2 {row['r2']:.2f}, n={row['n']}")
