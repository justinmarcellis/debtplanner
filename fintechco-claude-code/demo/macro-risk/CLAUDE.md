# macro-risk

Macro context for FinTechCo's credit-risk and portfolio teams, built on public FRED data. Python 3.10+, pandas, numpy; tests with pytest.

## Commands
- Load or refresh data: `python fred.py --all` (cache in `data/raw/`; `--refresh` downloads; never needed for tests)
- Run analyses: `python -m analysis.report` (writes `outputs/*.json` and `outputs/findings.md`)
- Build the dashboard: `python dashboard/build.py` (writes `dashboard/index.html`)
- Tests: `python -m pytest -q` (offline; uses the committed cache)

## Rules
- Every number in a finding or chart comes from code in `analysis/`; never type numbers by hand.
- State caveats with results: correlation vs causation, regime changes, sample size.
- Cite FRED and the original publisher for every series (see `data/README.md`).
- numpy and pandas only; no new dependencies without asking. Dashboards are one self-contained HTML file with no external scripts or network calls (they are opened on locked-down client machines).
- Tests never touch the network.
