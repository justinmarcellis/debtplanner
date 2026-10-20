# ROI model: Claude Code at FinTechCo (D5)

**Executive summary.** On conservative-to-base assumptions, Claude Code pays for itself if each active engineer saves about **one hour a week**. The base case — 4 hours a week, 75% of 180 staff active, 60% of saved time turned into delivered work — frees about **8 FTE of capacity for new products**, worth about $1.6M a year against about $0.4M of annual cost. The single assumption that matters most is hours saved, which is exactly what the pilot measures on FinTechCo's own work.

## Method
- **Value** = active users × hours saved per week × 46 weeks × realization factor × loaded hourly cost. It is capacity redirected to the roadmap (new products, backlog, reliability work), not a headcount reduction.
- **Cost** = Claude Code usage per active user ([CLM-619]: enterprise average $150–250 per developer per month) + a 0.5–1 FTE platform/governance team + one-time enablement time.
- **Adoption** ramps linearly to steady state over 3–6 months, matching the rollout plan (`rollout/rollout-plan.md`).
- Assumptions and their sources: `value/roi-assumptions.json` (ASM-01…12). Headcount is from the brief; everything else is either sourced or labelled as an assumption to replace with FinTechCo's data.
- Code: `value/roi.mjs` (tested by `value/roi.test.mjs`); interactive version: the ROI calculator page (`value/calculator/index.html`).

## Scenarios
The conservative column stacks every pessimistic assumption at once (it is a stress case, not a forecast).

| | Conservative | Base | Upside |
| --- | --- | --- | --- |
| Active users (steady state) | 108 | 135 | 162 |
| Capacity redirected (FTE-equivalent) | 2.7 | 8.1 | 17.0 |
| Annual value of redirected time | $0.46M | $1.62M | $3.91M |
| Annual cost (usage + platform team) | $0.49M | $0.42M | $0.41M |
| One-time enablement | $0.13M | $0.12M | $0.09M |
| Annual net benefit (steady state) | −$0.04M | $1.20M | $3.51M |
| ROI (net / annual cost) | -7% | 282% | 862% |
| Year-1 net, including ramp and enablement | −$0.20M | $0.92M | $3.11M |
| Break-even: hours saved per active user per week | 2.2 | 1.0 | 0.6 |
| Payback month | beyond 24 | month 3 | month 1 |

## Sensitivity
One assumption at a time, from its conservative to its upside value, everything else at base:

| Assumption | Conservative → net | Upside → net | Swing |
| --- | --- | --- | --- |
| Hours saved per active user per week | $0.39M | $2.01M | $1.62M |
| Realization factor (share of saved time that becomes delivered work) | $0.93M | $1.47M | $0.54M |
| Active users at steady state (share of staff) | $0.94M | $1.46M | $0.52M |
| Fully loaded annual cost per technical employee | $0.97M | $1.42M | $0.46M |
| Claude Code usage cost per active user per month | $1.11M | $1.28M | $0.16M |
| Platform and governance team (ongoing) | $1.10M | $1.20M | $0.10M |

**Read-out:** hours saved per week moves the answer more than everything else combined. Usage price barely moves it. That is why the evaluation plan measures time saved and flow metrics against a baseline instead of debating list prices.

## Why the base case is deliberately modest
- Field experiments at Microsoft, Accenture and a Fortune 100 company found 26% more completed tasks with an AI coding assistant [CLM-623]; a Google trial found about 21% less time on task, with wide intervals [CLM-652]. Base here is 10% of a 40-hour week.
- A 2025 randomized trial found experienced open-source developers took 19% longer with AI tools [CLM-650]; METR's 2026 follow-up estimated speedups but called the signal unreliable [CLM-651]. Hence a 2-hour conservative case and a pilot with baselines.
- DORA's research finds AI amplifies an organization's existing practices; returns come from the surrounding practices [CLM-654]. The realization factor (50–70%) reflects that.

## What would change the answer
- **Measured hours saved** in the pilot (MET ids in `value/metrics.json`), by team. DS and SRE may differ from SWE; the calculator takes per-team inputs.
- **FinTechCo's loaded cost** from HR and its **negotiated price** (to be quoted; Bedrock and Vertex usage bills to FinTechCo's cloud account [CLM-620]).
- **Quality**: if change-failure rate or escaped defects rise, the value is overstated; the metrics framework makes these guardrails.
