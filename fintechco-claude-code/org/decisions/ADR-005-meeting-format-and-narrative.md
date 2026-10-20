# ADR-005: Meeting objective, agenda and narrative spine

Status: accepted · Owner: eng-lead · Date: 2026-10-20

## Objective and the ask
Leave the meeting with agreement to start a structured evaluation that can end in a company-wide rollout within about four months, and with named owners for the first steps:
1. **CTO:** opens a security and compliance review with us (we send the review package; a working session with their security team within a week).
2. **Head of Digital Transformation:** names a pilot cohort across all three teams and a metrics owner to capture baselines.
3. **Together:** a pilot kickoff date.
Success in the room = both attendees agree to (1)-(3), and the CTO's top concern is named and has an owner.

## Stance
A principal architect, not a salesperson: we recommend measuring every candidate tool the same way, and show why we expect Claude Code to win on FinTechCo's own work. Every number is sourced or labelled as an assumption. Mixed evidence on AI productivity is acknowledged, then answered with a measurement plan.

## Agenda (40 minutes of role play)

| Clock | Min | Segment | Purpose | Lead artifact |
| --- | --- | --- | --- | --- |
| 0:00 | 3 | Open: goals, agenda, what we heard; one question to each attendee | Confirm priorities and concerns; earn the right to present | Deck §1, `strategy/discovery.md` |
| 0:03 | 4 | How Claude Code works | One mental model for both audiences: an agent in your environment that plans, acts with your tools, verifies, and asks permission | Deck §2 |
| 0:07 | 3 | Why Claude Code: value and differentiators | What only an agentic tool does; why this one; fair comparison | Deck §3, battlecard |
| 0:10 | 2 | FinTechCo fit: three teams, their stacks, their work | Make it theirs before the demo | Deck §4, use-case catalog |
| 0:12 | 14 | Live demo: three acts | Show, not tell | ADR-004, `demo/RUNBOOK.md` |
| 0:26 | 4 | Security, governance and deployment in AWS/GCP | Answer the CTO's first objection directly, after they have seen the controls live | Deck §5, security brief |
| 0:30 | 4 | Measuring impact and ROI | The framework and the math, with assumptions | Deck §6, ROI calculator |
| 0:34 | 3 | Evaluation plan and rollout timeline | How to prove it, starter use cases, decision gate, path to company-wide | Deck §7, evaluation plan |
| 0:37 | 2 | Wrap-up and next steps | The ask, owners, dates | Deck §8, wrap-up kit |
| 0:39 | 1 | Buffer | Questions | — |

## Time checkpoints and cuts
- **0:12** demo must start. Behind? Drop the competitor table to one sentence; skip the fit slide (the demo covers it).
- **0:20** Act 2 must have started. Behind? Show the dashboard from the complete state instead of building it live.
- **0:26** demo must end. Behind? Act 3 becomes the 30-second narrated fallback.
- **0:30** ROI must start. Behind? Security goes to one slide plus "the leave-behind covers the rest".
- **0:37** wrap must start, whatever remains. Evaluation plan compresses to its timeline slide.

## Audience layering
Each content slide has an executive line (the title and one sentence) and technical depth in speaker notes and backup slides. Define every term the first time ("agentic", "MCP", "hooks"). The deck ends with an appendix of backup slides for Q&A: deployment architecture, data handling, controls catalog, competitive detail, pricing models, evaluation metrics detail.

## Narrative spine (one sentence per section)
1. You want productivity and new products shipped, safely, with one tool chosen in months.
2. Claude Code is an agent that works in your engineers' environment: it plans, uses your tools, checks its own work, and asks before it acts.
3. That changes the unit of help from a line of code to a finished, tested task — and it runs where your engineers already work.
4. Each of your three teams has work this shortens, in the stacks they use today.
5. (Demo) Here it is on payments code, macro data and an incident, with your controls on.
6. You control where it runs, what it can touch and what it records; it runs in your AWS or GCP accounts.
7. Measure it like any investment: adoption, flow, quality, then business outcomes, against your own baselines.
8. Prove it in eight weeks on your own work, then roll out in waves; here is who does what next.
