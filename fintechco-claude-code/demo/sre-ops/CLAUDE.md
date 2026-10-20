# sre-ops

Operations repo for the payment-gateway: service code (Go), deploy config, incident bundles and runbooks.

## Rules
- During an incident, investigate read-only. Never change config, deploy, or restart anything; propose the step and name who approves it (runbooks/).
- Cite evidence: file and line or metric row for every claim in a triage.
- Times are UTC.

## Layout
- `services/payment-gateway/` Go service (`go test ./...`) · `deploy/config/` runtime config · `incidents/<ID>/` alert, metrics, logs, deploy log, config diff · `runbooks/` · `triage.sh` headless triage · `ci/` example automation
