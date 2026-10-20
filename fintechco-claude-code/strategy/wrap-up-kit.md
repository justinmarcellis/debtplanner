# Wrap-up kit: next steps, mutual action plan, follow-up email

Owner: strategy (S2-STR-01) · Used at slide s18 (planned 35:00, latest 0:37, never cut) · Objective and ask: ADR-005 · Program dates: `rollout/evaluation-plan.md`, `rollout/pilot-charter.md`

Dates are written relative to the meeting day (**Day 0**) until it is set. The program dates assume the proposed kickoff of **Monday, January 11, 2027**. Every program date moves with the kickoff.

## 1. The ask (s18, 2 minutes)

Ask for three decisions, each by name. Wait for an answer to each before moving on.

| # | Who | Decision | When | What I commit in return |
| --- | --- | --- | --- | --- |
| 1 | CTO | Open a security and compliance review with us | Package sent by Day 2; working session with their security team by Day 7 | Review package: security brief, threat model, data-handling sources, a sample managed-settings policy and the demo hooks |
| 2 | Head of Digital Transformation | Name a pilot cohort across all three teams (about 30: 18 SWE, 8 DS, 4 SRE) and a metrics owner | By Day 14 | Cohort guide, baseline queries for the metrics, a CLAUDE.md starter for each pilot repo |
| 3 | Together | Agree the pilot kickoff date | Today | Proposed Mon Jan 11, 2027; earlier works too |

Plus, written live on s18: **the CTO's top concern** (from their answer at 0:01) and **who owns it**. That one line shows I listened, and it gives the concern a date.

**Success in the room** (ADR-005): both attendees agree to decisions 1 to 3, and the CTO's top concern is named and has an owner.

### If they hesitate

| What I hear | Response | Fallback ask |
| --- | --- | --- |
| CTO: "Security has to sign off before we talk about a pilot." | "Agreed, that's why it's step one. The pilot can't start until your review closes." | Decision 1 only, with a date for the working session. |
| CTO: "We need to see it at another bank first." | "That's fair. I'll send the named-customer page, and I'd suggest your security team asks us anything they'd ask a reference." | Decision 1, plus a reference call if the account team can arrange one. |
| HDT: "I can't name a cohort in two weeks." | "What date can you name it by? The pilot dates move with it." | A date for the cohort decision. |
| Either: "We're also evaluating another tool." | "Good. The plan is tool-agnostic: same tasks, same metrics, same review. Run both and let the numbers decide." | Agree the comparison design together before week 3. |
| Either: "Can we start sooner?" | "Yes. Readiness takes two weeks once the security review closes; the schedule moves with it." | Pull the kickoff forward. |
| Either: "Send us the materials and we'll get back to you." | "I will, tomorrow. Can we put thirty minutes in the diary now to go through your questions?" | A follow-up meeting date. |

## 2. Mutual action plan

R = responsible, A = accountable. FinTechCo owners in **bold** are proposals until they are confirmed in the room.

| # | Milestone | FinTechCo | Anthropic | Due | Done when |
| --- | --- | --- | --- | --- | --- |
| 1 | Follow-up email with all materials | — | [Your Name] (R) | Day 1 | Sent; receipt confirmed |
| 2 | Security review package | **Security lead** (receives) | [Your Name] (R) | Day 2 | Package in the security team's hands |
| 3 | Security working session | **CTO** (A), **security lead** (R) | Architect + security specialist | By Day 7 | Open questions listed with owners |
| 4 | Pilot cohort and metrics owner named | **Head of Digital Transformation** (A) | Cohort guide | By Day 14 | Names confirmed in writing |
| 5 | Cloud routing chosen (Bedrock or Google Cloud) | **Platform team** (R), CTO (A) | Reference configuration | Readiness, PW1–2 (Jan 11–22) | Model calls routed through FinTechCo's own account |
| 6 | Policy configured: managed settings, hooks, deny rules | **Platform team** (R) | Policy templates, review | PW1–2 | Policy deployed to pilot machines |
| 7 | Baselines captured (8 weeks of history for MET-01…15) | **Metrics owner** (R) | Baseline queries | PW1–2 | Baseline report signed off |
| 8 | Thresholds and comparison design agreed | **HDT** (A), **metrics owner** (R) | Proposal (`rollout/evaluation-plan.md` §4) | Before PW3 (by Jan 22) | Written thresholds signed by both sponsors |
| 9 | Enablement: a 2-hour workshop per team, CLAUDE.md per pilot repo | **Champions** (R) | Workshop delivery | PW2–3 | Every cohort member has completed one task |
| 10 | Pilot runs, with a weekly metrics review | **Metrics owner** (R) | Office hours | PW3–8 (Jan 25–Mar 5) | Weekly report published |
| 11 | Mid-pilot readout | **HDT**, **CTO** | Account team | PW6 (Feb 16–19) | Course corrections agreed |
| 12 | Decision gate: go, extend four weeks, or stop | **CTO** (A), **HDT** (R) | Results readout | PW9 (Mar 8–12) | Decision recorded |
| 13 | Rollout waves to all 180 | **HDT** (A), **champions** (R) | Wave enablement | PW10–17 (Mar 15–May 7) | All three teams enabled |

## 3. Capture sheet (fill in during the meeting)

```
Date (Day 0): ____________     Attendees: CTO ____________ · HDT ____________

CTO's answer at 0:01 (verbatim): _____________________________________________
Top concern: ______________________________   Owner: __________   By: _______
HDT's answer at 0:01 (which team first, why): _______________________________

Decision 1 (security review):  yes / no / later   Session date: __________
Decision 2 (cohort + metrics owner):  yes / no / later   By: __________
                                                  Metrics owner: __________
Decision 3 (kickoff):  agreed date __________   (proposed Mon Jan 11, 2027)

Questions I owe an answer to (owner, by when):
1. ______________________________________________  ________
2. ______________________________________________  ________

Things they said that change the plan: ______________________________________
```

## 4. Follow-up email (send Day 1)

> **Subject:** FinTechCo × Claude Code: next steps and materials
>
> Dear [CTO name] and [HDT name],
>
> Thank you for your time yesterday and for the direct questions. As agreed, here is what we discussed and what happens next.
>
> **What we agreed**
> 1. **Security and compliance review.** We will send the review package to [security lead] by [Day 2] and meet your security team by [Day 7]. The package contains the security brief, the threat model, the data-handling sources and a sample managed-settings policy with the hooks from the demo.
> 2. **Pilot cohort and metrics owner.** [HDT name] will name about thirty people across software engineering, data science and SRE, and a metrics owner, by [Day 14].
> 3. **Kickoff.** [Agreed date / proposed Monday, January 11, 2027]. That puts the decision gate in the week of [March 8] and full rollout by [May 7] if you decide to proceed.
>
> **Your top concern:** [concern, in their words]. Owner: [name]. We will report on it by [date].
>
> **Questions I owe you answers to**
> - [question], by [date]
>
> **Attached**
> - The deck, including the appendix (data handling, controls catalog, fair comparison, cost, evidence, ROI assumptions, rollout waves)
> - Security brief and threat model
> - Evaluation plan and pilot charter, with the starter use cases for each team
> - Metrics framework and the ROI calculator; change any assumption and the range updates
>
> The evaluation is designed to be fair to every tool you are considering: the same tasks, the same metrics and the same review rubric. The answer at week nine can be no, and the plan is built so that the evidence decides.
>
> I have proposed thirty minutes on [date] to go through anything the review raises. Please move it if it doesn't suit.
>
> Best regards,
> [Your Name]
> Applied AI Architect, Anthropic

Before sending: replace every bracketed field; attach only the files named; check that every number in the email matches the deck.
