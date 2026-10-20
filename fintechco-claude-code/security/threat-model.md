# Threat model: agentic coding at FinTechCo (D7)

**Summary.** An agent that reads code and runs commands adds four new ways to get hurt: untrusted text steering it (prompt injection), secrets or card data leaving through it, commands doing damage, and generated code or dependencies being unsafe. Each has a Claude Code control and an SDLC control; neither alone is enough.

Scope: developer laptops and CI runners running Claude Code, the model endpoint (Bedrock / Vertex / Anthropic), MCP servers, and the repositories they touch. Likelihood and impact are for a pilot with the recommended policy, before mitigation → after.

## One-page summary

| # | Threat (STRIDE) | Example | Likelihood → after | Impact | Claude Code controls | SDLC controls |
| --- | --- | --- | --- | --- | --- | --- |
| T1 | Prompt injection (Tampering, Elevation) | A README, issue, web page or MCP tool result tells the agent to exfiltrate keys or run a script | Medium → Low | High | Permission prompts for sensitive actions, network fetches not auto-approved [CLM-608]; deny rules; sandboxed shell with allow-listed domains [CLM-607]; MCP allowlist [CLM-679] | Untrusted repos opened read-only; no production credentials on dev machines |
| T2 | Secret or card-data disclosure (Information disclosure) | Agent reads `.env` or logs a PAN | Medium → Low | High | `deny` on `.env`, `secrets/`, cloud credential folders; PCI hook on edits and shell commands; telemetry prompt redaction [CLM-684] | Secret scanning and PAN DLP in CI; synthetic data; cardholder environments out of pilot scope |
| T3 | Destructive or unauthorized commands (Tampering) | `rm -rf`, force-push, schema migration against prod | Low → Very low | High | Manual mode asks before running unmatched commands [CLM-606]; deny `git push`; bypass mode disabled [CLM-677]; sandbox | Branch protection; no prod credentials locally; migrations via pipeline only |
| T4 | Supply chain (Tampering) | Agent adds a hallucinated or typosquatted package | Medium → Low | Medium–High | Sandbox network allowlist limits registries; dependency changes visible in the diff | Internal package mirror; dependency review and SCA in CI. A study found code models suggest non-existent packages at measurable rates [CLM-627] |
| T5 | Insecure generated code (Tampering) | Injection flaw or float money math in a PR | Medium → Low | Medium | `CLAUDE.md` coding rules; test-first prompts; hooks for known-bad patterns | Mandatory human review; SAST; MET-09 guardrail |
| T6 | Over-broad MCP credentials (Elevation) | An MCP server holds a token with write access to production systems | Medium → Low | High | Managed MCP allowlist/denylist [CLM-678] [CLM-679]; tool details in telemetry with `OTEL_LOG_TOOL_DETAILS` [CLM-680] | MCP approval process with least-privilege service accounts (rollout plan) |
| T7 | Audit gaps (Repudiation) | Cannot show who ran what, when | Medium → Low | Medium | OpenTelemetry events incl. permission decisions [CLM-612]; hooks can write a local audit trail; gateway or CloudTrail for request logs [CLM-613] | SIEM retention per policy; attribution on commits and PRs [CLM-664] |
| T8 | Vendor or data-handling exposure (Information disclosure) | Prompts retained or used beyond the contract | Low | High | Run through FinTechCo's Bedrock/Vertex accounts [CLM-614]; no training on customer content [CLM-600]; ZDR option on Enterprise [CLM-603] | Third-party risk review; contract terms; request Trust Center reports [CLM-618] |
| T9 | Hooks and sandbox gaps (Elevation) | Hooks run outside the sandbox with the user's access; sandbox covers shell only [CLM-607] [CLM-611] | Low | Medium | `allowManagedHooksOnly` so only reviewed hooks run [CLM-677] | Hooks are code: reviewed and owned by the platform team |

## Notes from the demo verification
A headless run on 2026-10-20 found a real gap: a shell redirect wrote a card number without passing through the file-edit hook. The guard now inspects Bash commands too, and a rerun confirmed the block (`demo/fallback/governance/verification.md`). The lesson for FinTechCo: treat hooks as code with tests, and keep CI scanning as the backstop.

## Residual risk and decisions for the CTO
- Prompt injection is reduced, not eliminated. Keep a human approving merges and keep production credentials off developer machines.
- Start the pilot outside cardholder-data environments; revisit after the 6-week review with MET-09 and MET-10 data.
