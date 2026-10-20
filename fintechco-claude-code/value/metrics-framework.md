# Measuring impact: the framework (D5)

**Executive summary.** Measure Claude Code like any investment: first that people use it, then that work flows faster, then that quality holds, then that the business ships more. Every metric has a baseline captured before the pilot, a guardrail that must not get worse, and a source FinTechCo already owns or that Claude Code emits itself. The definitions are in `value/metrics.json` (MET-01…15).

## Four questions, in order

| Question | Leading or lagging | Metrics | Owner |
| --- | --- | --- | --- |
| 1. Are people using it? | Leading, week 1+ | MET-01 weekly active users · MET-02 active days · MET-03 agent-assisted PRs | Head of Digital Transformation |
| 2. Is work flowing faster? | Leading → lagging, week 3+ | MET-04 hours saved (pulse) · MET-05 PR cycle time · MET-06 lead time · MET-07 deploy frequency · MET-15 DS and SRE cycle times | Engineering managers |
| 3. Is quality holding? (guardrails) | Lagging, monthly | MET-08 change failure rate · MET-09 escaped defects and security findings · MET-10 policy events · MET-11 developer experience | CTO / security |
| 4. Is the business getting more? | Lagging, quarterly | MET-12 roadmap throughput · MET-13 time to first release · MET-14 cost per active user | CTO + Finance |

Speed metrics never count without the guardrails in row 3: DORA's 2024 research linked AI adoption with lower delivery stability [CLM-653], so change failure rate (MET-08) is a hard gate, not a nice-to-have.

## Where the numbers come from
- **Claude Code itself:** an analytics dashboard on Claude for Teams and Enterprise [CLM-657], and OpenTelemetry metrics and events (sessions, active time, commits, PRs, cost, tool permission decisions) exported to FinTechCo's own collector [CLM-656] [CLM-684]. On Bedrock or Vertex, usage bills to FinTechCo's cloud account and OpenTelemetry carries per-user cost [CLM-620].
- **Systems FinTechCo already runs:** the Git host (PR cycle time, attribution trailers that Claude Code adds by default [CLM-664]), CI/CD (DORA metrics [CLM-655]), Jira, incident tooling, security scanners.
- **People:** a 2-question weekly pulse and a monthly experience survey. Self-reports are cross-checked against system data: in one trial developers believed AI sped them up by 20% while measured time rose 19% [CLM-650].

## Baselines and comparison
Capture 8 weeks of history for the pilot repositories before day 1. Where possible compare the pilot cohort with a similar team not yet in the pilot (difference-in-differences); otherwise before/after on the same repositories. The same protocol applies to every tool FinTechCo evaluates (`rollout/evaluation-plan.md`).

## Executive scorecard (monthly, one page)

| | This month | Baseline | Target | Status |
| --- | --- | --- | --- | --- |
| Weekly active users (MET-01) | — | 0 | ≥ 70% of cohort | ▲ on track / ■ watch / ▼ off track |
| Hours saved per user per week, median (MET-04) | — | — | ≥ 2 (break-even ≈ 1) | |
| PR cycle time (MET-05) | — | pre-pilot | −15% | |
| Change failure rate (MET-08) — guardrail | — | last quarter | no worse | |
| Escaped defects / security findings (MET-09) — guardrail | — | last quarter | no worse | |
| Developer would-recommend (MET-11) | — | — | ≥ 7 | |
| Cost per active user (MET-14) | — | $150–250 reference [CLM-619] | within budget | |
| One story: a shipped item that moved faster, and why | | | | |

Status always carries a word, not only a color.

## By team
- **Software engineers:** MET-03, MET-05, MET-06; payments and banking-infrastructure repositories first.
- **Data scientists:** MET-15 notebook-to-production lead time and experiment iterations; model validation (SR 11-7) stays as is, so measure time to *validated* model.
- **SREs:** MET-15 MTTA/MTTR and toil hours; incident approvals unchanged.
