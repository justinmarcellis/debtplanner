"""Write outputs/findings.md from the analysis outputs, so every number in it comes from code."""
from __future__ import annotations

import json

from analysis import fed_policy_vol, phillips
from analysis.common import OUTPUTS


def findings(ph: dict, fv: dict) -> str:
    dec = {r["decade"]: r for r in ph["by_decade"]}
    cut = next(r for r in fv["summary"] if r["direction"] == "cut")
    hike = next(r for r in fv["summary"] if r["direction"] == "hike")
    rows = "\n".join(
        f"| {r['decade']} | {r['slope']:+.2f} | {r['ci_low']:+.2f} to {r['ci_high']:+.2f} | {r['r2']:.2f} | {r['n']} |"
        for r in ph["by_decade"]
    )
    return f"""# Findings: macro context for credit and portfolio risk

Data: FRED, downloaded 2026-10-20 (see `data/README.md`). Core PCE inflation (year over year) vs the unemployment gap, {ph['sample']['start'][:4]}–{ph['sample']['end'][:7]}; {len(fv['events'])} federal funds target changes vs VIX, {fv['events_from'][:4]}–{fv['events_to'][:7]}.

## 1. The Phillips curve flattened, then steepened again
- In the 1960s, a 1-point tighter labor market went with **{abs(dec['1960s']['slope']):.2f} points** higher core inflation (R² {dec['1960s']['r2']:.2f}).
- In the 2010s the slope was **{dec['2010s']['slope']:+.2f}**: unemployment explained {dec['2010s']['r2']:.0%} of inflation's movement. That is the "flat Phillips curve".
- In the 2020s it is **{dec['2020s']['slope']:+.2f}** (R² {dec['2020s']['r2']:.2f}): post-pandemic supply and demand shocks made labor-market slack informative again.
- Latest: core PCE {ph['latest']['inflation']:.1f}% with an unemployment gap of {ph['latest']['gap']:+.2f} points ({ph['latest']['month'][:7]}).

| Decade | Slope | 95% interval | R² | Months |
| --- | --- | --- | --- | --- |
{rows}

## 2. The Fed cuts into stress; volatility tends to ease afterwards
- VIX averaged **{cut['avg_vix_before']:.1f}** the day before a cut vs **{hike['avg_vix_before']:.1f}** before a hike ({cut['events']} cuts, {hike['events']} hikes).
- 20 trading days after a cut, the median VIX change is **{cut['median_dvix_20d']:+.1f}** points (VIX higher in {cut['share_up_20d']:.0%} of cases); after a hike it is {hike['median_dvix_20d']:+.1f} ({hike['share_up_20d']:.0%}).

## Caveats (say these out loud)
- Correlation, not causation. Cuts cluster in crises, so volatility often drives the cut, not the other way round.
- The Phillips regression is one variable; it ignores inflation expectations and supply shocks (the 1970s slope is positive for that reason). Monthly overlapping data are autocorrelated, so the intervals are too narrow.
- Small samples per decade; the 2020s has {dec['2020s']['n']} months.

## What it means for FinTechCo's teams
- Credit scoring and loss forecasting: unemployment is a live risk driver again; stress scenarios should not assume the flat 2010s relationship.
- Fraud and customer-behavior models: regime shifts (rates, inflation) are worth monitoring as features for drift.
"""


def run() -> str:
    ph, fv = phillips.run(), fed_policy_vol.run()
    text = findings(json.loads(json.dumps(ph, default=str)), json.loads(json.dumps(fv, default=str)))
    (OUTPUTS / "findings.md").write_text(text)
    return text


if __name__ == "__main__":
    print(run())
