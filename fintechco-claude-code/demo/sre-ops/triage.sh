#!/usr/bin/env bash
# Headless incident triage with Claude Code: read-only tools, structured markdown out.
#   ./triage.sh incidents/INC-2291            (writes incidents/INC-2291/triage.md)
# Same command runs in CI or from an alert webhook (see ci/claude-triage.yml).
set -euo pipefail
INC_DIR="${1:?usage: ./triage.sh incidents/<ID>}"
MODEL="${CLAUDE_MODEL:-sonnet}"
cd "$(dirname "$0")"

read -r -d '' PROMPT <<PROMPT || true
You are the on-call SRE assistant for FinTechCo's payment-gateway. Triage the incident in ${INC_DIR}/
(alert.json, metrics.csv, app.log, deploy.log, config.diff) using runbooks/payment-gateway.md and the
service code in services/payment-gateway/. Read files only; do not run commands or change anything.

Reply in markdown with exactly these sections:
## Summary            (two sentences: impact and most likely cause)
## Timeline (UTC)     (bullet per event, from the evidence)
## Probable cause     (with the specific evidence lines and numbers; say how confident you are)
## Ruled out          (anything that looked suspicious but is not the cause, and why)
## Remediation        (immediate step, who must approve it per the runbook, how to verify recovery)
## Follow-ups         (prevention, max 3)
PROMPT

claude -p "$PROMPT" \
  --model "$MODEL" \
  --allowedTools "Read,Grep,Glob" \
  --disallowedTools "Bash,Edit,Write,WebFetch,WebSearch" \
  --max-turns 15 \
  --output-format text > "${INC_DIR}/triage.md"
echo "wrote ${INC_DIR}/triage.md"
