# Pilot charter: agentic coding at FinTechCo (one page, for internal circulation)

**Objective.** Decide, on evidence from our own work, whether Claude Code should become FinTechCo's single agentic coding tool, and if so roll it out to all 180 technical staff within about four months.

**Scope.** Six-week pilot after two weeks of readiness. About 30 volunteers: 18 software engineers, 8 data scientists, 4 SREs, plus a comparison group. Non-sensitive repositories only; no cardholder-data environments; no production credentials on pilot machines.

**Starter work.** Onboarding to unfamiliar services and test-first bug fixes (engineering); data acquisition and notebook-to-production (data science); read-only incident triage and toil automation (SRE).

**How we'll judge it.** Weekly active use ≥ 70%; median time saved ≥ 2 hours per person per week; PR cycle time ≥ 15% faster; change-failure rate and escaped defects no worse than baseline; engineers' would-recommend ≥ 7. Thresholds are agreed before the pilot starts.

**Controls.** Central policy (deny rules, hooks, sandbox, MCP allowlist) that developers can't override; activity exported to our SIEM; model calls through our own AWS or GCP account; every merge reviewed by a person.

**Timeline.**
| Weeks | Milestone |
| --- | --- |
| 0–2 | Security review, cloud access, policy, baselines, cohort, workshops |
| 3–8 | Pilot; weekly reviews; week-6 readout |
| 9 | Decision gate: roll out, extend, or stop |
| 10–17 | Rollout waves to all 180 (if approved) |

**Owners.** Executive sponsor: CTO. Pilot lead: Head of Digital Transformation. Security lead: [name]. Metrics owner: [name]. Champions: one per team, [names]. Vendor team: Anthropic account team and Applied AI Architect.

**What we need from you.**
- *Engineering managers:* nominate volunteers and protect two hours for the workshop.
- *Security:* review package and pilot-scope approval in week 1–2.
- *Platform/cloud:* Bedrock or Vertex access and the managed policy.
- *Finance:* budget for six weeks of usage (enterprise average guidance: $150–250 per developer per month).
