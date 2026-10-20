# sre-ops (demo, Act 3)

Synthetic incident INC-2291: card authorizations slow and failing after a config deploy. `./triage.sh incidents/INC-2291` runs Claude Code headless with read-only tools and writes `incidents/INC-2291/triage.md`; `ci/claude-triage.yml` shows the same command running from an alert. Regenerate the bundle with `python3 incidents/generate.py`. Go tests: `cd services/payment-gateway && go test ./...`.
