# Competitive battlecard: Claude Code in a multi-tool evaluation

Owner: research (S1-RES-02, delivered lean under ADR-007) · As of October 2026 · Every [CLM-###] is in `research/claims.md` and checked by `node org/contracts/validate.mjs`. Internal: for the presenter, not the customer.

**Rule for this card.** FinTechCo is evaluating Claude Code alongside other assistants (REQ-21), and the CTO is skeptical of claims without proof. So we make no statements about a competitor's features, prices or roadmap unless they come from that vendor's own dated documentation, and this card contains none. We win by naming the dimensions that matter, showing Claude Code's position on each with a source, and proposing a test on FinTechCo's own work that any tool can take.

## Positioning in one sentence

Claude Code is an agent that takes a task from ticket to tested change inside the engineer's own environment, under central policy, with model calls in FinTechCo's own AWS or GCP account. [CLM-001] [CLM-003] [CLM-614]

## The five dimensions (deck s08, appendix a03)

| Dimension | Claude Code, as of October 2026 | Pilot test for every tool |
| --- | --- | --- |
| Unit of work | Plans, edits across files, runs tests and fixes until the task is done; traces bugs through the codebase. [CLM-003] [CLM-694] | Same backlog tickets per tool; measure completed, merged, tested changes, not suggestions accepted. |
| Where it runs | Terminal, VS Code, JetBrains, desktop app and web [CLM-002]; headless `claude -p` for scripts and CI [CLM-005]; GitHub Actions and GitLab CI/CD [CLM-004]. | Run one SRE task headless in CI and one DS task in a notebook-adjacent workflow. |
| Extensibility | CLAUDE.md project memory, skills, hooks, subagents and the Agent SDK [CLM-007] [CLM-008]; MCP, an open standard now at the Linux Foundation [CLM-006] [CLM-629]. | Encode one team rule (for example, no PANs in logs) and see whether the tool can enforce it, not just remember it. |
| Policy and control | Managed settings that sit above user and project settings [CLM-659] [CLM-675]; lock permission rules and disable bypass mode [CLM-677]; hooks that block tool calls in code [CLM-010] [CLM-611]; MCP allowlists [CLM-679]; OS-level sandbox [CLM-607]. | Security team writes the same three policies for every tool and tries to break them. |
| Deployment and data | Amazon Bedrock or Google Cloud's Agent Platform with FinTechCo's own credentials, IAM and billing [CLM-614] [CLM-686] [CLM-687]; no training on commercial customer content [CLM-600]; 30-day standard retention on commercial plans, zero data retention available [CLM-602]. | Route each tool through the cloud account it would use in production; review the data path with security. |

## Proof points we can use

- **Adoption inside the regulated sector:** Anthropic's financial-services page carries executive statements from named financial firms, including one attributed to Citi. Send the page; don't paraphrase it. [CLM-631]
- **Cost is bounded and visible:** about $13 per developer per active day and $150–250 per developer per month on average (an average, not a cap) across enterprise deployments [CLM-619], with spend limits at organization, group or member level [CLM-620] [CLM-685].
- **Measured in their tools:** OpenTelemetry export of usage, cost and tool events to their own collector [CLM-656] [CLM-612]; an analytics dashboard on Teams and Enterprise [CLM-657].
- **The demo itself:** the PCI hook blocked a card number reaching a log, and a deny rule kept the agent out of `.env`. Both are in the repo for the security team to inspect (`demo/payments-ledger/.claude/`).

## Where we must be careful (say it before they do)

| Topic | What is true | How to say it |
| --- | --- | --- |
| Productivity evidence | Mixed: field experiments found +26% completed tasks [CLM-623]; one trial with experienced developers found them 19% slower [CLM-650]; DORA 2024 saw delivery stability fall [CLM-653]. | "The evidence is mixed, and I'd rather show you all of it. That's why the pilot measures on your work with guardrails." |
| MCP connections | By default anyone can connect any MCP server; Anthropic doesn't audit third-party servers. [CLM-610] [CLM-678] | "Out of the box it's open; for a bank you'd allowlist servers in managed settings, and we'd set that up in readiness." [CLM-679] |
| Inline completion | Not part of our claim; we make no statement about other tools here. | "If inline completion matters most to your developers, put it in the pilot test. Our claim is about finished tasks." |
| Retention on Google Cloud | Not verified for Claude on Google Cloud's Agent Platform. (CLM-616, unverified: do not cite) | "I'll get you the exact Google Cloud terms in writing; I won't guess." |
| Compliance API coverage of Claude Code | Not verified. (CLM-617, unverified: do not cite) | "Let me confirm exactly what the audit feeds cover for Claude Code, and on which plan." |
| Certifications | Partly verified: listed for commercial products such as Claude for Work and the API. [CLM-618] | Point to the trust center for the current list; the security team should verify. |

## Questions to ask about every tool (fair, not traps)

1. What is the unit of work: a suggestion, a chat answer, or a finished change with tests run?
2. Can an administrator enforce policy that a developer cannot override, and can policy run code to block an action?
3. Can model calls run in our own AWS or GCP account, under our IAM and billing?
4. What exactly is retained, for how long, and is any of it used for training?
5. Can it run headless in CI, with no person typing, and with read-only permissions?
6. How does it connect to internal tools (tickets, docs, data), and can we restrict which connectors are allowed?
7. What telemetry can we export to our own systems, and is prompt content redacted by default?
8. What does it cost per active developer, and what spend controls do admins have?
9. How does it handle a 10-year-old Java service, a notebook, and a Go service in the same week?
10. Who at the vendor answers our security team's questions, and how fast?

## Special case: Claude inside GitHub Copilot

GitHub announced on February 26, 2026 that Claude is available as a coding agent in Copilot Business and Pro, in public preview; check its current status before relying on it [CLM-628]. If FinTechCo already uses Copilot, the question is not "which model?" but "which harness, controls and results?". Recommend comparing the full setups they would deploy, on the same tasks. (Deck s08 and appendix a03.)

## Never

- Quote a competitor's price, roadmap or limitation from memory.
- Call any tool "insecure" or "not enterprise-ready".
- Cite CLM-616 or CLM-617, or any claim marked unverified.
- Promise a certification, retention term or SLA that isn't in a verified claim; say "I'll confirm in writing" instead.
