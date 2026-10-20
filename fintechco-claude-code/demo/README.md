# FinTechCo live demo kit (D2)

Three acts, one per FinTechCo team, with governance throughout (ADR-004). Runbook with verbatim prompts, timings and recovery lines: **`RUNBOOK.md`**.

| Folder | Act | What it is | Tests |
| --- | --- | --- | --- |
| `payments-ledger/` | 1 · Software engineers | Python payments service with a planted rounding bug (PAY-1423), a planted PAN log line, `CLAUDE.md`, `.claude/settings.json` with deny rules and PCI + audit hooks | `python -m pytest -q` (3 expected failures until fixed); hooks: `python -m pytest .claude/hooks -q` |
| `macro-risk/` | 2 · Data scientists | Cached FRED data, fetch helper, reference analysis, findings, dashboard builder | `python -m pytest -q` |
| `sre-ops/` | 3 · SREs | Go payment-gateway, synthetic incident INC-2291, runbook, headless `triage.sh`, CI example | `cd services/payment-gateway && go test ./...` |
| `enterprise/` | Governance close | Managed settings, Bedrock / Vertex / OpenTelemetry examples, control-to-concern map | — |
| `fallback/` | All | Verified patches (Act 1), governance verification, Act 3 triage, G3 dry-run record | — |

```bash
./setup.sh            # fresh repos in ~/fintechco-demo with `start` and `complete` tags
./reset.sh            # back to `start` before every rehearsal
```
Measured: full dry-run ≈6.5 minutes of terminal time and ≈$2.30 on Sonnet 5.5 (`fallback/dry-run.md`).
