# ADR-007: Lean delivery mode

Status: accepted · Owner: eng-lead · Date: 2026-10-20 · Supersedes: ADR-000 §1-2 and ADR-003 §3 (per-ticket reviewer agents) for the rest of the engagement

## Context
Sprint 1 ran the full fan-out: seven Manager agents, eighteen IC agents and eighteen reviewer agents across four workflows. It was halted twice by account limits (weekly usage, then the org's monthly spend limit). Measured result: about 2.3M subagent tokens consumed, **one** ticket accepted (S1-ADO-02), plus useful partial output (74 sourced claims, a slide spec, templates). Most tokens went to context loading: every agent re-read the playbooks, the ADRs and the brief before writing anything. The sponsor's direction: build the solution in a much more cost-effective way.

## Decision
1. **Player-coach execution.** The orchestrator, which already holds every decision in context, executes the remaining tickets directly, team by team. Teams, ownership, tickets, gates and the RTM stay as the accountability record; a ticket's `owner` reads `eng-lead (for <team>)`.
2. **Mechanical gates replace per-ticket reviewer agents.** Each deliverable is checked by machines where it can be: unit tests (demo, ROI model, tooling), the contract and claims validator (no citation to a missing or unverified claim), the RTM check, and a headless Claude Code run for the demo hooks.
3. **One consolidated independent review.** Separation of duties is kept with a single reviewer agent (mid tier, one pass) over the whole kit at the end, recording one verdict per ticket. Its findings are fixed directly.
4. **Reuse before research.** Sprint 1's sourced claims are used as-is; new research is limited to the facts the deck actually states and is done with targeted fetches of official pages.
5. **Budget.** Remaining spend target: under $20 (vs. $175 planned). No workflows; at most two subagents (the consolidated review, optionally one headless demo check).

## Consequences
- Throughput depends on one context instead of eight; acceptable because the remaining work is integration-heavy (deck, demo, runbook) and benefits from one author.
- The illustrative SDLC is preserved, and the retro records the correction: the org model scaled cost with headcount, not with output.
- If budget returns, the sprint workflow (`org/workflows/sprint-team.js`) still works and can be used for parallel research or red-team passes.
