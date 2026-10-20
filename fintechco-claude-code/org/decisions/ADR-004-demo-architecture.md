# ADR-004: Demo architecture — three acts, one per FinTechCo team

Status: accepted · Owner: eng-lead (A), dir-demo (R) · Date: 2026-10-20

## Context
The brief allows 10-15 minutes of live demo and warns against cramming every FRED idea into it (REQ-27). The audience is two executives, not engineers: a skeptical, security-first CTO and an AI champion. FinTechCo has three technical populations (SWE 120, DS 40, SRE 20) and uses no agentic tools today. The demo must (a) make "agentic" concrete, (b) show each team's work in its own stack, (c) show governance the CTO can believe, and (d) never depend on luck.

## Decision: 14 minutes, three acts, governance throughout

| Act | Team | Repo | Minutes | What the audience sees | Value it proves |
| --- | --- | --- | --- | --- | --- |
| 1 | Software engineers | `demo/payments-ledger/` (Python) | 5 | Tour of an unfamiliar payments service; a "statements off by a cent" ticket fixed test-first (float → `Decimal`), tests green, clean diff; Claude flags a pre-existing PAN-logging violation; a PCI hook blocks an attempt to log a full card number; `.env` read denied by policy | Onboarding, bug fixing, quality; controls are enforced in code, not just in prompts |
| 2 | Data scientists | `demo/macro-risk/` (Python, pandas) | 6 | Fetch FRED series with a data dictionary; quantify Phillips-curve flattening (slope by decade, rolling slope); Fed policy moves vs VIX event study; a client-ready interactive dashboard (one HTML file) | Data acquisition, EDA, modeling, front-end work without a front-end team |
| 3 | SREs | `demo/sre-ops/` (Go service + shell + logs) | 2 | `./triage.sh incidents/INC-2291` runs Claude Code headless with read-only tools and returns a structured triage (timeline, probable cause, remediation, runbook link); the same command as a CI/alert job | Faster incident triage; the same agent runs non-interactively and auditable |
| — | Governance close | `demo/enterprise/` | 1 | `managed-settings.json`, project `settings.json`, the audit log the hooks wrote during Acts 1-3, the two env vars that route Claude Code through Amazon Bedrock or Vertex AI, OpenTelemetry export | Central policy, auditability, runs in FinTechCo's own AWS/GCP accounts |

### Act 1 — `payments-ledger`
- A small, realistic Python package (stdlib + pytest): `ledger/fees.py` (processing fee: percent + fixed cents), `ledger/fx.py` (currency conversion), `ledger/settlement.py` (batch settlement, merchant statements), `ledger/refunds.py`, `ledger/models.py`, `tests/`. About 400-700 lines; reads like a team's code, not a toy.
- Planted defect PAY-1423: fees computed with `float` and `round()`, so some amounts are off by $0.01 versus the contractually specified half-up rounding to cents. `tickets/PAY-1423.md` holds the merchant complaint with concrete amounts. One existing test is marked `xfail` or a new test reproduces it.
- Planted violation: `settlement.py` logs a full card number in a debug line. `CLAUDE.md` states "never log PANs; log last4 tokens only".
- `.claude/settings.json`: permissions (allow tests and read-only git; deny reading `.env*` and `secrets/**`, deny `git push`, deny `curl`/`wget`), hooks: PreToolUse on file writes runs `pci_guard.py` (blocks writes that log or embed a full PAN — 13-19 digits passing Luhn — outside `tests/fixtures/`), PostToolUse on all tools runs `audit_log.py` (append JSONL to `.claude/audit/audit.jsonl`).
- Optional stretch prompt (only if ahead of time): add idempotency keys to refunds.

### Act 2 — `macro-risk`
- `fred.py`: fetch series via `https://fred.stlouisfed.org/graph/fredgraph.csv?id=<SERIES>` (no key) or the FRED API when `FRED_API_KEY` is set; cache to `data/raw/`; `data/raw/` ships pre-filled so the demo works offline.
- Series: UNRATE, NROU, PCEPILFE, CPIAUCSL, FEDFUNDS, DFF, DFEDTAR, DFEDTARU, VIXCLS, USREC (and BAMLH0A0HYM2 for a credit-spread view if useful). Attribute FRED and the original sources.
- `analysis/phillips.py`: year-over-year core PCE inflation vs unemployment gap (UNRATE − NROU); OLS slope by decade and 10-year rolling slope with confidence intervals; plain-language summary. Honest framing: correlation, regime-dependent, not a causal claim.
- `analysis/fed_policy_vol.py`: identify target-rate changes from DFEDTAR (to 2008-12-15) and DFEDTARU (after); event study of VIX around changes (hikes vs cuts, [-5, +20] trading days); summary table.
- `dashboard/build.py` → `dashboard/index.html`: one self-contained file (data inline, inline SVG charts drawn by plain JS, palette and type from ADR-001), readable on a shared screen.
- Two states: a **start** state (fetch helper and empty `analysis/`) for the live prompts, and a **complete** reference implementation used for tests, the fallback and the dashboard artifact. `setup.sh` builds the start state; the complete state is tagged `complete` in the demo git repo.

### Act 3 — `sre-ops`
- `services/payment-gateway/` (small Go service), `deploy/config/` with a recent change that cut the DB pool size, `incidents/INC-2291/` (alert, logs, metrics CSV, deploy log), `runbooks/`.
- `triage.sh`: `claude -p` with `--allowedTools` limited to read-only tools, `--output-format json` or markdown, a structured prompt; writes `incidents/INC-2291/triage.md`.
- `ci/claude-triage.yml`: example GitHub Actions job running the same on an alert webhook (illustrative; not executed).

### Governance pack — `enterprise/`
`managed-settings.json` example, `bedrock.env.example`, `vertex.env.example`, `otel.env.example`, and a README mapping each control to the CTO's concerns. Every setting name and file location is verified against current Claude Code documentation (code.claude.com/docs) and cited in the claims register.

## Reliability rules
1. Every live step has a fallback: a pre-run transcript or output in `demo/fallback/`, and the `complete` tag.
2. `setup.sh` is idempotent and creates fresh git repos under `~/fintechco-demo/` so diffs are clean; `reset.sh` restores the start state in under 10 seconds.
3. Prompts are written verbatim in `RUNBOOK.md` with expected duration, expected result, and a recovery line.
4. Sprint 3 runs every prompt headless (Sonnet 5.5) in a temporary copy and records time and cost (G3).
5. Default model in the live demo: Sonnet 5.5. Terminal at 18pt+, light theme, one window per act.
