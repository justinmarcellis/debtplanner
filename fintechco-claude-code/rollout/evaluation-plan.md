# Evaluation plan (D6)

**Executive summary.** Eight weeks to a decision on FinTechCo's own work: two weeks of readiness (security review, cloud access, policy, baselines) and a six-week pilot with about 30 people across all three teams, measured against their own baselines with quality guardrails. The protocol is tool-agnostic, so every assistant FinTechCo is comparing is judged the same way. A pre-agreed decision gate in week 9 leads into the rollout, with all 180 people enabled by about week 17 (`rollout/rollout-plan.md`).

## 1. Principles
- **Same test for every tool.** Same cohort design, same tasks, same metrics, same review rubric. Where two tools are compared, split cohorts of similar teams, or run alternating two-week blocks on the same team.
- **Measure, don't survey alone.** System metrics from the Git host, CI and incident tooling, cross-checked with a short weekly pulse; self-reports alone overstate gains [CLM-650].
- **Quality is a gate.** Speed only counts if change-failure rate and escaped defects hold (MET-08, MET-09) [CLM-653].
- **Start safe.** No cardholder-data environments, no production credentials, central policy from day 1.

Week numbers are program weeks (PW) from the kickoff: PW1–2 readiness, PW3–8 pilot, PW9 decision gate (`rollout/rollout-plan.md` has the dates).

## 2. PW1–2: readiness (in parallel)

| Track | Work | Owner | Done when |
| --- | --- | --- | --- |
| Security and compliance | Review package (security brief, threat model, Trust Center reports [CLM-618]); working session with security architecture; decide delivery route | CTO's security lead + Anthropic | Approval for pilot scope |
| Cloud access | Bedrock use-case form and IAM [CLM-686] or Vertex model access and quota [CLM-687]; dedicated account/project; pinned model versions [CLM-688] | Platform/cloud lead | `claude` runs through the chosen route for one engineer |
| Policy | Managed settings: deny rules, hooks, sandbox, MCP allowlist, telemetry to the SIEM [CLM-675] [CLM-677] [CLM-684] | Platform + security | `/status` shows the managed source on pilot machines |
| Baselines | 8 weeks of PR cycle time, lead time, change-failure rate, escaped defects, MTTR for pilot repositories (`value/metrics.json`) | Metrics owner (named by the Head of Digital Transformation) | Baseline report signed off |
| Cohort and enablement | Select cohort; 2-hour hands-on workshop per team; CLAUDE.md for each pilot repo | Head of Digital Transformation + champions | Cohort confirmed; repos ready |

## 3. PW3–8: the pilot

**Cohort (about 30; proportional to team size):** 18 software engineers (payments, mobile, banking infrastructure), 8 data scientists (fraud and credit), 4 SREs. Mix of seniority; volunteers plus one skeptic per team. A comparison group of similar size keeps working as usual (or uses the other tool under evaluation).

**Starter use cases (two per team, from `strategy/use-cases.json`):**

| Team | Starter 1 | Starter 2 |
| --- | --- | --- |
| Software engineers | UC-SWE-01 Onboard to an unfamiliar service | UC-SWE-02 Fix a defect test-first |
| Data scientists | UC-DS-01 Data acquisition and exploratory analysis | UC-DS-02 Notebook to production package |
| SREs | UC-SRE-01 Incident triage from logs and metrics (read-only) | UC-SRE-02 Toil automation with tests |

PW6–8 add one stretch use case per team (UC-SWE-03 cross-stack feature, UC-DS-03 fraud feature experiments, UC-SRE-04 Go reliability fixes).

**Cadence:**

| When | What | Who |
| --- | --- | --- |
| Weekly, Monday | Metrics snapshot: MET-01 adoption, MET-05 PR cycle time, MET-10 policy events, spend | Metrics owner |
| Weekly, Wednesday | 30-minute pilot review: adoption, pulse, blockers, policy events | Head of Digital Transformation, champions, Anthropic team |
| Weekly, Friday | Two-minute pulse survey (MET-04 hours saved, MET-11 would-recommend, other AI tools used) | Cohort and comparison group |
| Fortnightly | Champions' show-and-tell | Champions |
| PW6, Feb 16–19 (after Washington's Birthday, Feb 15 [CLM-665]) | Mid-pilot readout | CTO, Head of Digital Transformation |
| PW9, Mar 8–12 | Decision gate | CTO (A), Head of Digital Transformation (R) |

**Fairness protocol (the CTO should be able to audit it):**
- **Blinded quality review.** Each week a random sample of merged PRs from the pilot and comparison groups is scored by senior engineers on correctness, readability, tests and security, without being told which group wrote it.
- **What cannot be blinded, and how we handle it.** Claude Code adds a Co-Authored-By trailer to commits and a line to PR descriptions by default [CLM-664]. For the pilot, the attribution setting removes them from sampled work, or the sample is stripped before review [CLM-632]; the policy log still records AI use for audit. Reviewers may still recognise style, so we also report the share of samples reviewers guessed correctly; if it is high, we weight the system metrics more.
- **Counterbalancing.** Where one team compares two tools, the order alternates in two-week blocks (A-B-A for half the squads, B-A-B for the other half), so novelty and calendar effects fall on both tools.
- **Other AI tools.** The weekly pulse asks every participant, including the comparison group, which AI tools they used that week, so contamination is visible rather than assumed away.
- **Baselines.** The eight-week baseline window spans Thanksgiving and the year-end holidays [CLM-665]; holiday weeks are excluded and replaced with the same weeks a year earlier where data allows.

## 4. Success criteria and decision gate (PW9)

| Criterion | Metric | Threshold to proceed (proposed, agree at kickoff) |
| --- | --- | --- |
| People use it | MET-01 weekly active users | ≥ 70% of the cohort by PW5 (third pilot week) and sustained |
| It saves time | MET-04 hours saved (pulse), cross-checked with MET-05 | Median ≥ 2 hours/week (the conservative ROI case; break-even ≈ 1) |
| Work flows faster | MET-05 PR cycle time | ≥ 15% faster than baseline or the comparison group |
| Quality holds | MET-08, MET-09, blinded review | No worse than baseline; no PAN or secret reaches a commit |
| Controls work | MET-10 policy events; security review | Policy events trending down; no unresolved high findings |
| Engineers want it | MET-11 would-recommend | Median ≥ 7 |

**Decision options at the PW9 gate:** proceed to rollout wave 1; extend the pilot four weeks with changes; or stop. The thresholds are agreed before PW3, when the pilot starts, so the decision isn't argued after the fact.

## 5. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Security review takes longer than two weeks | Start it the day after the meeting; pilot on non-sensitive repos first |
| Bedrock/Vertex access delays (Vertex approval can take 24–48 hours [CLM-687]) | Request on day 1; fall back to the other cloud |
| Low adoption | Champions, office hours, CLAUDE.md per repo; weekly nudges based on MET-01 |
| Gains don't show in system metrics within six weeks | Keep lagging metrics (lead time, roadmap) for the 90-day review; decide on leading metrics plus quality |
| Comparison is unfair between tools | Same tasks, same cohort design, blinded review, same metrics, counterbalanced order |
| Selection bias: volunteers are enthusiasts | One named skeptic per team; compare with similar non-volunteer squads; report volunteers and assigned members separately |
| Novelty effect fades after the pilot | Report PW3–5 and PW6–8 separately; the gate looks at the second half |
| Attrition: people drop out of the cohort | Track weekly; analyse everyone who started (intention to treat); replace only before PW4 |
| Calendar effects: holiday baselines, Washington's Birthday in PW6 | Exclude holiday weeks from baselines; normalise per working day [CLM-665] |
| Metric gaming: smaller PRs inflate throughput | Report PR size alongside cycle time; the blinded review samples by change, not by count |
| Spend overrun | Spend limits per group from day one; weekly spend in the Monday snapshot [CLM-685] |

## 6. RACI

| Activity | CTO | Head of Digital Transformation | Security lead | Metrics owner | Champions | Anthropic team |
| --- | --- | --- | --- | --- | --- | --- |
| Approve pilot scope | A | C | R | I | I | C |
| Cohort and enablement | I | A | I | I | R | C |
| Baselines and weekly metrics | I | A | I | R | C | C |
| Policy and telemetry | A | I | R | C | I | C |
| PW9 decision | A | R | C | C | I | C |
