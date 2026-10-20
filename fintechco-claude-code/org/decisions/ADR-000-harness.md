# ADR-000: Running an agent engagement team inside this harness

Status: accepted · Owner: eng-lead · Date: 2026-10-20

## Context
The sponsor asked for this interview preparation to be run "like our others": a proper organization with delegation controls, an illustrative SDLC, and scrum teams doing the work. The reference is the fnol-platform program (`org/` in that repo), which ran nine teams of Director, Manager and ICs through sprints with a file-based board.

## What the harness can and cannot do
- The orchestrator spawns subagents through the Workflow tool (deterministic fan-out) and the Agent tool.
- Subagents **cannot spawn subagents**. Directors and Managers cannot dispatch ICs themselves.
- Each workflow runs at most **2 agents at once** on this 4-CPU container. Several workflows can run side by side.
- Agents share one filesystem and one git checkout. There is no live message bus between running agents.
- Subagents can load WebSearch and WebFetch through ToolSearch. FRED's public CSV endpoint (`fred.stlouisfed.org/graph/fredgraph.csv`) is reachable without an API key; the keyed FRED API is not configured.
- The `claude` CLI (Claude Code 2.1.x) is installed and runs headless (`claude -p`), billed to the session. A one-prompt Haiku probe cost $0.0025.
- Only the orchestrator publishes Artifacts, commits and pushes (ADR-003).

## Decision
1. **Logical hierarchy, physical fan-out.** The orchestrator spawns Managers, ICs and reviewers as separate agents with role prompts from `org/playbooks/role-prompts.md`. Reporting lines live in `org/teams.json` and on tickets (`owner`, `reviewer`), not in process trees.
2. **Manager decomposition runs as an agent that returns tickets as structured output**; the workflow dispatches those tickets to IC agents and then to the acceptance reviewer, with one rework loop.
3. **Signaling through the fabric.** Agents post typed messages to hubs (`node org/cli.mjs post <hub> <type> ...`) and read hubs before starting. Questions that would block are avoided by contract-first design (`org/contracts/`, the ADRs, `brief/facts.json`); a remaining one is posted as `request` and the IC proceeds on a labelled assumption.
4. **Disjoint ownership.** Each ticket names the paths it may write. Each team owns one top-level folder (`org/teams.json`). Cross-team needs go through hubs.
5. **Token accounting** from harness transcripts after each workflow, attributed to tickets by label (`node org/spend.mjs <transcript dir>`).
6. **Concurrency cap:** 8 agents engagement-wide (4 workflows x 2); agents are API-bound so CPU is not the constraint.
7. **Headless Claude Code runs** are allowed only on Quality's demo dry-run tickets and Demo's hook-verification tickets, Sonnet or Haiku only, capped per ticket (`org/config.json` budget.headlessDemoRunCapUsd).
