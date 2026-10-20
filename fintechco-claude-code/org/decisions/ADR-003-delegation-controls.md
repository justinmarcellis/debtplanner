# ADR-003: Delegation controls

Status: accepted · Owner: eng-lead · Date: 2026-10-20

## Context
Nine teams of agents produce material a real candidate will say out loud to a skeptical, security-minded CTO. One wrong statistic, an overclaimed security property, or a demo step that fails live costs the meeting. Delegation has to be wide enough for parallel work and tight enough that nothing customer-facing ships without an owner, a reviewer and evidence.

## 1. Decision rights

R = does the work, A = accountable (one per row), C = consulted, I = informed.

| Decision | eng-lead | Director | Manager | IC | qe-acceptance | trust | research |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Meeting objective, the ask, agenda (ADR-005) | A/R | C | I | I | I | C | I |
| Storyline and slide titles (G1) | A | R (narrative) | C | C | I | C | C |
| Ticket decomposition, points, tier | I | A | R | C | I | I | I |
| Work product inside a ticket's paths | I | C | I | A/R | C | C | C |
| Ticket accepted as done | I | I | I | I | A/R | C (veto, §4) | C (veto, §4) |
| Any security, privacy or compliance statement | I | I | I | R | C | A | C |
| Any external fact, statistic, quote or customer name | I | I | I | R | C | C | A |
| Demo content and live prompts | C | A (demo) | R | R | C | C | I |
| Publishing, committing, pushing | A/R | I | I | I | C | I | I |
| Budget replan, stop, agent deprecation | A/R | C | I | I | I | I | I |

## 2. Authority limits by role

| Role | May | May not |
| --- | --- | --- |
| eng-lead (orchestrator) | Spawn workflows and agents; set budget; accept gates; commit by path; publish Artifacts; push and open the PR | Skip a gate it owns without recording why in `org/hubs/decisions.jsonl` |
| Director | Decide inside the team's scope; write short ADR addenda in its own folder; post decisions | Change another team's folder, the brief, or an accepted ADR |
| Manager | Create tickets (≤ the sprint's max per team) with paths only inside the team's folder; choose tier per ticket | Assign a deprecated agent configuration; assign strong tier to boilerplate; create tickets with overlapping paths |
| IC | Write the ticket's `paths`; run local commands and tests; WebSearch/WebFetch (research, trust, demo, strategy, value, adoption); post to hubs | Write outside `paths`; commit, push, publish, or post anywhere outside this repo; edit `package.json` at the repo root; store secrets |
| qe-acceptance | Read everything; run tests; record `accept` or `rework` | Fix the work it reviews |
| Red team (Sprint 3) | Attack material in character; file findings to the quality hub | Edit the material it attacks |

## 3. Separation of duties
- The author of a ticket never reviews it. Every ticket's reviewer is `qe-acceptance`, run as a separate agent with its own context.
- The claims register is maintained by Research; claims are consumed (cited) by other teams but only Research changes a claim's status.
- Trust signs off security wording; Narrative cannot reword a Trust-approved statement without re-review.
- Only the orchestrator writes to git history and to published Artifacts, so every customer-visible change passes one choke point.

## 4. Content controls (vetoes)
1. **Claims gate (G2).** Every external fact, statistic, quote, customer name, price, certification or competitor statement in customer-facing material (deck, notes, talk track, leave-behinds, demo narration) carries a claim id `[CLM-###]` from `research/claims.json` with status `verified` or `partial`. While drafting, write `[CLM-?: what needs sourcing]`; Research resolves these. Unresolved placeholders block release. See ADR-006.
2. **Trust veto.** Any statement about data handling, retention, training, certifications, deployment boundaries, or regulatory fit is reviewed by Trust before release.
3. **No brand impersonation.** No Anthropic logos or wordmarks; the deck is presented as the candidate's own preparation. Public customer names only as cited in the claims register.
4. **Synthetic data only** in the demo. Card numbers are test PANs from public test ranges; no real people or accounts. FRED data is public and attributed.

## 5. Tool and access policy for agents
- Network: read-only web research; FRED CSV downloads (demo team). No writes to any external service.
- Headless Claude Code (`claude -p`): only on tickets that say so (demo hook verification, quality dry-run), Sonnet or Haiku, in a temporary copy of the demo repo, with `--max-turns` set; record `total_cost_usd`.
- Git: agents run `git status` and `git diff` only. The orchestrator never runs `stash`, `checkout` or `reset` while a workflow is running and commits by path.

## 6. Quality gates
G1 narrative lock · G2 claims · G3 demo dry-run · G4 timing · G5 release. Definitions in `org/config.json` (`gates`) and `org/playbooks/sdlc.md`. A gate is passed when its evidence file exists and the owner records a `decision` in the decisions hub.

## 7. Budget controls
Per-sprint budgets and per-ticket caps in `org/config.json`. At 80% of a sprint budget the orchestrator replans (descope, lower tier, or move to reserve); at 100% it stops dispatch. Spend is attributed to tickets after each workflow (`org/spend.mjs`).

## 8. Escalation
IC → team hub `request` or `blocker` → Manager (next planning) → Director (decision) → eng-lead (cross-team or gate) → sponsor (milestone-only: budget beyond reserve, anything that changes the meeting's objective). Blockers are triaged by the orchestrator between workflow waves.

## 9. Audit trail
Every ticket keeps its status history, review verdicts and spend; hubs are append-only; decisions are in `org/hubs/decisions.jsonl`; git history holds every accepted change. The program dashboard renders all of it.
