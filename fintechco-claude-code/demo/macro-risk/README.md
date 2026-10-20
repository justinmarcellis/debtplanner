# macro-risk (demo, Act 2)

Macro context for credit and portfolio risk from public FRED data: data dictionary, Phillips-curve flattening, Fed rate changes vs VIX, and a client-ready dashboard.

```bash
python -m pytest -q                # offline, uses the committed cache
python -m analysis.report          # outputs/*.json + outputs/findings.md
python dashboard/build.py          # dashboard/index.html (self-contained)
```
Findings with numbers: `outputs/findings.md`. Data sources and cleaning notes: `data/README.md`. The live demo starts from the `start` tag (data and fetch helper only); `complete` is this reference.
