# Data dictionary

Source: Federal Reserve Bank of St. Louis, FRED (fred.stlouisfed.org), downloaded 2026-10-20 through the public CSV endpoint (`fredgraph.csv`, no API key). Each series is cached at `raw/<SERIES>.csv` with columns `observation_date,<SERIES>`. Refresh with `python fred.py --all --refresh` (uses `FRED_API_KEY` if set). Original publishers are credited per series.

| Series | What it is | Units | Frequency | Seasonal adj. | Original source | Coverage in cache |
| --- | --- | --- | --- | --- | --- | --- |
| UNRATE | Unemployment rate | Percent | Monthly | SA | U.S. Bureau of Labor Statistics | 1948-01 – 2026-09 (Oct 2025 missing) |
| NROU | Noncyclical rate of unemployment (CBO's estimate of the natural rate) | Percent | Quarterly | NSA | U.S. Congressional Budget Office | 1949 Q1 – 2036 Q4 (includes projections; analysis stops at the latest UNRATE month) |
| PCEPILFE | PCE price index excluding food and energy ("core PCE") | Index 2017=100 | Monthly | SA | U.S. Bureau of Economic Analysis | 1959-01 – 2026-08 |
| CPIAUCSL | Consumer price index for all urban consumers | Index 1982-84=100 | Monthly | SA | U.S. Bureau of Labor Statistics | 1947-01 – 2026-09 (Oct 2025 missing) |
| FEDFUNDS | Effective federal funds rate | Percent | Monthly | NSA | Board of Governors of the Federal Reserve System | 1954-07 – 2026-09 |
| DFF | Effective federal funds rate | Percent | Daily (7-day) | NSA | Board of Governors | 1954-07-01 – 2026-10-16 |
| DFEDTAR | Federal funds target rate (discontinued) | Percent | Daily | NSA | Board of Governors | 1982-09-27 – 2008-12-15 |
| DFEDTARU | Federal funds target range, upper limit | Percent | Daily | NSA | Board of Governors | 2008-12-16 – 2026-10-20 |
| VIXCLS | CBOE Volatility Index (VIX), close | Index | Daily (trading days) | NSA | Chicago Board Options Exchange | 1990-01-02 – 2026-10-19 |
| USREC | NBER-based recession indicator | 1 = recession | Monthly | NSA | Federal Reserve Bank of St. Louis from NBER dates | 1854-12 – 2026-09 |
| BAMLH0A0HYM2 | ICE BofA US High Yield option-adjusted spread | Percent | Daily | NSA | ICE Data Indices | 2023-10-23 – 2026-10-19 (FRED publishes only a rolling three-year window for ICE series) |

## Cleaning notes
- FRED writes missing observations as an empty cell (older files use `.`); both load as `NaN`.
- **October 2025 is missing for UNRATE and CPIAUCSL.** It is the month of the 2025 federal government shutdown, during which BLS did not collect the data. The analysis drops that month rather than interpolating it.
- Recent daily VIX values can be blank on the latest one or two days until FRED backfills them.
- NROU is quarterly; it is interpolated linearly to months inside its range only (no extrapolation).
