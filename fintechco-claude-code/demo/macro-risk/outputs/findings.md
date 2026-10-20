# Findings: macro context for credit and portfolio risk

Data: FRED, downloaded 2026-10-20 (see `data/README.md`). Core PCE inflation (year over year) vs the unemployment gap, 1960–2026-07; 110 federal funds target changes vs VIX, 1990–2026-09.

## 1. The Phillips curve flattened, then steepened again
- In the 1960s, a 1-point tighter labor market went with **0.83 points** higher core inflation (R² 0.62).
- In the 2010s the slope was **-0.02**: unemployment explained 2% of inflation's movement. That is the "flat Phillips curve".
- In the 2020s it is **-0.40** (R² 0.39): post-pandemic supply and demand shocks made labor-market slack informative again.
- Latest: core PCE 3.0% with an unemployment gap of -0.29 points (2026-07).

| Decade | Slope | 95% interval | R² | Months |
| --- | --- | --- | --- | --- |
| 1960s | -0.83 | -0.95 to -0.71 | 0.62 | 120 |
| 1970s | +0.87 | +0.62 to +1.12 | 0.28 | 120 |
| 1980s | +0.41 | +0.15 to +0.67 | 0.07 | 120 |
| 1990s | +0.57 | +0.42 to +0.72 | 0.33 | 120 |
| 2000s | -0.23 | -0.26 to -0.19 | 0.55 | 120 |
| 2010s | -0.02 | -0.04 to +0.01 | 0.02 | 120 |
| 2020s | -0.40 | -0.51 to -0.28 | 0.39 | 78 |

## 2. The Fed cuts into stress; volatility tends to ease afterwards
- VIX averaged **24.9** the day before a cut vs **17.1** before a hike (58 cuts, 52 hikes).
- 20 trading days after a cut, the median VIX change is **-1.2** points (VIX higher in 40% of cases); after a hike it is -0.3 (42%).

## Caveats (say these out loud)
- Correlation, not causation. Cuts cluster in crises, so volatility often drives the cut, not the other way round.
- The Phillips regression is one variable; it ignores inflation expectations and supply shocks (the 1970s slope is positive for that reason). Monthly overlapping data are autocorrelated, so the intervals are too narrow.
- Small samples per decade; the 2020s has 78 months.

## What it means for FinTechCo's teams
- Credit scoring and loss forecasting: unemployment is a live risk driver again; stress scenarios should not assume the flat 2010s relationship.
- Fraud and customer-behavior models: regime shifts (rates, inflation) are worth monitoring as features for drift.
