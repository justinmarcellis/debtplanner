# Enterprise governance pack (demo close and CTO leave-behind)

How FinTechCo would run Claude Code under central policy, inside its own cloud accounts, with an audit trail. Every file here is an example to adapt; facts carry claim ids from `research/claims.md`.

| CTO concern | Control | Where it lives | Source |
| --- | --- | --- | --- |
| Policy developers can't override | Managed settings sit above user, project and local settings; delivered by the admin console, MDM, or `managed-settings.json` at `/Library/Application Support/ClaudeCode/` (macOS), `/etc/claude-code/` (Linux/WSL), `C:\Program Files\ClaudeCode\` (Windows) | `managed-settings.json` | [CLM-675] [CLM-659] |
| No "skip all permissions" mode | `permissions.disableBypassPermissionsMode` | `managed-settings.json` | [CLM-677] |
| Only approved automation runs | `allowManagedHooksOnly`, central PCI guard and audit hooks | `managed-settings.json`, `../payments-ledger/.claude/hooks/` | [CLM-677] [CLM-611] |
| Secrets and credentials stay out of reach | `deny` rules on `.env`, `secrets/`, cloud credential folders (deny rules apply even before a workspace is trusted) | both settings files | [CLM-606] |
| Card data never logged (PCI DSS) | PreToolUse hook blocks a full PAN or a logged card-number field in edits and in shell commands | `pci_guard.py` | [CLM-611] |
| Commands can't reach the internet freely | OS-level sandbox for shell commands with an allow-listed set of domains (covers shell only; file tools, MCP servers and hooks run outside it) | `sandbox` block | [CLM-607] |
| Data stays in our cloud | Route all inference through Amazon Bedrock in a dedicated FinTechCo AWS account, or Google Cloud's Agent Platform (formerly Vertex AI) in a dedicated GCP project; pin model versions | `bedrock.env.example`, `vertex.env.example` | [CLM-686] [CLM-687] [CLM-688] [CLM-614] |
| Only approved models | `availableModels` + `enforceAvailableModels` (claude.ai org model controls don't apply on Bedrock/Vertex, so this is the route) | `managed-settings.json` | [CLM-689] |
| Who did what, when | OpenTelemetry metrics and events to FinTechCo's collector/SIEM (prompts redacted by default; every permission decision is an event); local JSONL audit hook in the demo; CloudTrail on Bedrock; optional gateway for request-level logs | `otel.env.example`, `audit_log.py` | [CLM-656] [CLM-684] [CLM-612] [CLM-613] |
| Is our code used for training? | Commercial terms: Anthropic may not train models on customer content; 30-day standard retention, zero data retention available for Enterprise | — | [CLM-600] [CLM-602] [CLM-603] |

## What was verified in this repo
- Hook and settings behaviour was checked with real Claude Code running headless: see `../fallback/governance/verification.md`.
- The verification found one real gap: a shell redirect wrote a file without passing through the file-edit hook. The guard now also inspects Bash commands. Hooks are one layer; CI secret/PAN scanning, the sandbox, and human code review remain the backstop.

## Rollout notes
- Project `allow` rules apply only after each developer trusts the folder; `deny` and `ask` apply immediately.
- Telemetry exporter variables only take effect from managed (or user) settings, never from a repository file [CLM-684].
- On Bedrock/Vertex, model access and quotas are requested once per account/project; Vertex approval can take 24-48 hours [CLM-687].
