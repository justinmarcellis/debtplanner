# Objection handling and Q&A bank (D4)

> Quick card: the in-room version. The full prep document is the file of the same name without `-card`.

Each answer: the short version to say first (2–3 sentences), then depth if pushed. Facts carry claim ids from `research/claims.md`; anything not in the register is not said.

## Security and data
1. **"Will our code be used to train your models?"** No. Under Anthropic's commercial terms, Anthropic may not train models on customer content [CLM-600]. *If pushed:* with Bedrock or Vertex, inference runs in FinTechCo's own cloud account under your agreement [CLM-614].
2. **"Where does our code go?"** Only the prompt and the files Claude Code reads for the task, over TLS 1.2+ [CLM-604], to the endpoint you configure, ideally Bedrock in a dedicated FinTechCo AWS account [CLM-686] [CLM-688]. *If pushed:* AWS says model providers have no access to Bedrock logs or prompts; check retention for the specific model [CLM-615].
3. **"How long is data retained?"** Direct with Anthropic, 30 days standard, with zero data retention available on Enterprise [CLM-602] [CLM-603]. On Bedrock, retention follows your AWS settings [CLM-615].
4. **"What stops it reading secrets?"** Deny rules in central policy that developers can't override [CLM-606] [CLM-675]; you saw `.env` denied in the demo. *If pushed:* sandbox for shell commands [CLM-607]; secret scanning in CI stays.
5. **"Prompt injection?"** It's real and reduced, not eliminated: permission prompts for sensitive actions, no auto-approved network fetches [CLM-608], sandboxed shell with allow-listed domains [CLM-607], an MCP allowlist [CLM-679]. Humans approve merges, and production credentials stay off laptops (`security/threat-model.md` T1).
6. **"Can a developer just turn the controls off?"** Not managed ones: managed settings have the highest precedence [CLM-659], and bypass mode can be disabled [CLM-677].
7. **"How do we audit what it did?"** OpenTelemetry metrics and events, including every permission decision, into your SIEM [CLM-612] [CLM-684]; CloudTrail on Bedrock; a gateway for request-level logs [CLM-613]; attribution on commits and PRs [CLM-664].
8. **"What certifications do you have?"** Anthropic lists SOC 2 Type I and II, ISO 27001:2022 and ISO/IEC 42001:2023 for its commercial products; your team should request the reports from the Trust Center and review scope [CLM-618].

## Compliance and regulation
9. **"Does this break SOX change management?"** No. Claude Code proposes; humans review and merge through the same process; push can be denied by policy; commits carry attribution [CLM-664].
10. **"PCI DSS?"** Keep the pilot out of cardholder-data environments; deny rules, a PAN-blocking hook and synthetic data enforce it. You saw the hook block a card number live.
11. **"Model risk (SR 11-7) for fraud and credit models?"** Claude Code is a development tool, not a decisioning model. Code it writes goes through the same validation; we measure time to *validated* model.
12. **"Who owns the output and IP?"** Under the commercial terms you keep your inputs and own the outputs, and Anthropic offers an IP defense commitment with exclusions; your counsel should read it against the contract you'd sign [CLM-601].

## Quality and risk of AI-written code
13. **"AI code is buggy and insecure."** That's why the workflow is test-first and reviewed. Our metrics make change-failure rate and escaped defects hard gates, not afterthoughts (MET-08, MET-09).
14. **"What about hallucinated packages?"** A real risk documented in research [CLM-627]: sandbox network allowlist to your package mirror, dependency review and SCA in CI.
15. **"Will juniors stop learning?"** A fair concern: an Anthropic trial found juniors who delegated learned less than those who asked conceptual questions [CLM-626]. Enablement teaches the asking pattern, and the survey tracks it (MET-11).

## Productivity evidence
16. **"Where's the proof it helps?"** The evidence is mixed. Field experiments with 4,867 developers found 26% more completed tasks [CLM-623]; one trial found experienced developers 19% slower [CLM-650]. That's why we measure on your work with baselines.
17. **"Your own numbers?"** Anthropic's internal survey reported large self-reported gains, but vendor self-reports aren't evidence for you [CLM-625]; we'd rather measure.
18. **"How will we know in six weeks?"** Weekly active use, hours saved, PR cycle time vs baseline, with quality guardrails (`value/metrics-framework.md`). The decision gate is pre-agreed.
19. **"Your ROI looks optimistic."** It's deliberately modest: base 4 hours a week, 10% of time, below the trial results. Break-even is about one hour a week (`value/roi-model.md`).

## Cost
20. **"What will it cost?"** Anthropic publishes an enterprise average of about $150–250 per developer per month [CLM-619]; your actual price is to be quoted. On Bedrock or Vertex it bills to your cloud account under your budgets [CLM-620].
21. **"How do we stop runaway spend?"** Spend limits by group, cloud budgets, model choice, and per-user cost in telemetry [CLM-685] [CLM-620].

## Competition
22. **"We already have Copilot."** Then measure both the same way on the same tasks. Claude is also available inside Copilot as a coding agent [CLM-628]; Claude Code adds the full agent with enterprise policy, hooks and headless CI use.
23. **"Why not Cursor or another IDE?"** Claude Code works where engineers already are: terminal, VS Code, JetBrains, desktop, web and CI, on one engine and one policy [CLM-002] [CLM-004]. No forced IDE switch for 180 people.
24. **"Isn't this vendor lock-in?"** MCP is an open standard donated to the Linux Foundation [CLM-629]; CLAUDE.md, skills and hooks are files in your repos; models run through your AWS or GCP accounts.

## Change management and vendor risk
25. **"Our engineers won't adopt it."** Start with volunteers and champions, measure weekly active use, and expand by waves (`rollout/rollout-plan.md`).
26. **"Implementation looks heavy."** Install is one command [CLM-012]; Bedrock access takes one form per account [CLM-686]; the real work is policy and enablement, planned for the first two weeks.
27. **"What if Anthropic changes direction or pricing?"** Cloud-provider routing, open standards and repo-level configuration keep switching costs low; the evaluation protocol works for any tool.
28. **"What if the agent does something destructive?"** It asks before running unmatched commands in Manual mode [CLM-606]; push and destructive commands are denied; production credentials are never on dev machines.
