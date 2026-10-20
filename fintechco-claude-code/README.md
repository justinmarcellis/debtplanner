# FinTechCo × Claude Code: interview kit

Everything prepared for a 40-minute mock customer meeting with FinTechCo's CTO and Head of Digital Transformation, built by an AI-staffed engagement team with an illustrative SDLC (sprints, tickets, delegation controls, quality gates). The brief is in `brief/interview-brief.pdf`; its 30 requirements and 11 deliverables are traced in `brief/requirements.md`.

## Use it in this order

1. **Rehearse:** `rehearsal/interview-kit.md` (introduction, questions for Anthropic, pre-flight, Google Meet test, credits) and `strategy/run-of-show.md` (the clock, checkpoints, cut list).
2. **Set up the demo:** `demo/README.md`, then `demo/setup.sh`; run it with `demo/RUNBOOK.md` (verbatim prompts, recovery lines, fallbacks).
3. **Present:** the deck, published as a Slides artifact (link below), with speaker notes on every slide.
4. **Close:** `strategy/wrap-up-kit.md` (the ask, mutual action plan, capture sheet, follow-up email).

## Deliverables

| ID | Deliverable | Where |
| --- | --- | --- |
| D1 | Slide deck with speaker notes (19 slides + 8 appendix) | Deck artifact · source `deck/project/` · spec `deck/slide-spec.md` |
| D2 | Live demo kit: three acts, one per team | `demo/` · `demo/RUNBOOK.md` · `demo/fallback/` |
| D3 | Run-of-show and talk track | `strategy/run-of-show.md` |
| D4 | Stakeholder strategy, discovery, objections | `strategy/stakeholder-map.md`, `discovery.md`, `objection-handling.md` (+ one-page `-card.md` versions) · `strategy/use-case-catalog.md` |
| D5 | Metrics framework, ROI model, ROI calculator | `value/metrics-framework.md` · `value/roi-model.md` · calculator artifact · source `value/calculator/` |
| D6 | Evaluation and rollout plan | `rollout/evaluation-plan.md` · `rollout/pilot-charter.md` · `rollout/rollout-plan.md` |
| D7 | Security and compliance brief, threat model | `security/security-brief.md` · `security/threat-model.md` |
| D8 | Wrap-up kit | `strategy/wrap-up-kit.md` |
| D9 | Interview logistics kit | `rehearsal/interview-kit.md` |
| D10 | Claims register and battlecard | `research/claims.md` (89 claims, sources and excerpts) · `research/battlecard.md` |
| D11 | Program dashboard | `org/dashboard/index.html` · dashboard artifact |

## Published artifacts (private until you share them)

- Deck: https://claude.ai/artifact/DgnjYMdh64AZj2sZGBmstc
- ROI calculator: https://claude.ai/artifact/PiQrFkVDM5WA6NHpkpVqgR
- Program dashboard: https://claude.ai/artifact/Vc6LQmtoBhuFLr6Reuahcx

## How it was built

- **Organization:** nine teams (strategy, research, narrative, value, adoption, trust, demo, quality, PMO), each with a director, a manager and IC roles: `org/teams.json`. Delegation controls (RACI, authority limits, separation of duties, vetoes, budget): `org/decisions/ADR-003-delegation-controls.md`.
- **Decisions:** `org/decisions/ADR-000` … `ADR-007`. ADR-007 records the mid-engagement correction to lean delivery after the agent fan-out proved too expensive for its output.
- **Board and sprints:** `org/board/tickets/`, `org/sprints/`, hubs in `org/hubs/`.
- **Gates:** G1 narrative lock, G2 claims, G3 demo dry-run, G4 timing, G5 release; outcomes in `org/hubs/decisions.jsonl` and on the dashboard.
- **Independent review:** one consolidated pass (`org/reviews/consolidated-review.md`): 3 blockers, 9 major and 18 minor findings, all fixed and held by `org/reviews/recheck.mjs`.
- **Still for the presenter:** two timed human rehearsals (`rehearsal/interview-kit.md` §4) and the meeting-day fields ([Your Name], dates, names).

## Checks

```bash
node org/contracts/validate.mjs                       # claims schema, every [CLM-###] verified or partial, no drafting placeholders
node --test 'org/**/*.test.mjs' value/roi.test.mjs    # tooling, validator, ROI model (doc matches code)
node org/timing.mjs --check                           # G4: speaker notes fit the 38:00 plan
node org/rtm.mjs --check                              # G5: every requirement has a done ticket
node org/reviews/recheck.mjs                          # the consolidated review's findings stay fixed
(cd demo/payments-ledger && python3 -m pytest -q)     # 3 failures by design: the planted PAY-1423 defect
(cd demo/payments-ledger && python3 -m pytest -q .claude/hooks/test_hooks.py)
(cd demo/macro-risk && python3 -m pytest -q)
node org/dashboard/build.mjs                          # rebuild the program dashboard
node demo/rehearse.mjs                                # scripted rehearsal: every runbook step headless, timed and costed ($2-3)
```

FinTechCo is fictional. Every number is either sourced (a `[CLM-###]` in `research/claims.md`) or labelled an assumption. No Anthropic brand assets are used.
