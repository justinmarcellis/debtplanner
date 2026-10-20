# Engagement SDLC

The same lifecycle a software team uses, applied to preparing a customer meeting. Each phase is a sprint with planning, a build wave, acceptance review, and a review/retro written to `org/sprints/sprint-<n>.json`.

| Sprint | Phase | Goal | Exit gate | Evidence |
| --- | --- | --- | --- | --- |
| 0 | Inception | Brief decomposed into a traceable spec; org, controls and contracts in place | Spec baselined | `brief/requirements.json`, ADR-000…006, `org/teams.json`, `org/config.json` |
| 1 | Discovery and foundations | Facts gathered and sourced; stakeholders mapped; storyline drafted; demo foundations built; metrics and evaluation drafted | **G1** narrative lock | `research/claims.json`, `strategy/stakeholder-map.md`, `deck/storyline.md`, demo repos with passing tests |
| 2 | Build | Deck built; ROI model and calculator; evaluation and rollout plan; demo complete with runbook; run-of-show and wrap-up kit | All build tickets accepted | Deck source, `value/`, `rollout/`, `demo/RUNBOOK.md`, `strategy/run-of-show.md` |
| 3 | Harden | Red team as CTO and champion; claims verified; demo dry-run headless; timing rehearsal; fixes | **G2** claims, **G3** demo, **G4** timing | `rehearsal/*.md`, validator clean, dry-run log |
| R | Release | Publish deck and pages; RTM 100%; PR | **G5** release | Artifact links, `brief/requirements.md`, PR |

## Ceremonies
- **Planning:** Managers decompose the sprint's stories into parallel tickets (structured output), written to the board.
- **Build wave:** one IC agent per ticket, in parallel, inside disjoint paths.
- **Acceptance:** `qe-acceptance` reviews each ticket; one rework loop; verdicts recorded on the ticket.
- **Hub triage:** between waves the orchestrator reads `request`, `contract-change` and `blocker` posts and answers or tickets them.
- **Review and retro:** `node org/sprint.mjs close <n>`, then went-well / went-badly / manager notes and improvement items in `org/improvements.json`.
- **Scorecards:** `node org/scorecards.mjs --sprint <n>` ranks agent configurations (ADR-004 of the reference program: rank, diagnose, intervene, deprecate).

## Definition of Ready
Story names its requirement ids; paths are inside the team's folder and disjoint from other tickets; contracts and ADRs linked; acceptance criteria checkable.

## Definition of Done
Acceptance criteria met with evidence; named commands pass; claims rule satisfied for the sprint's stage; reviewer verdict `accept` recorded; spend attributed.
