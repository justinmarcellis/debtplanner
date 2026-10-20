# Ticket template, standards and review checklist (v1)

## Ticket template
```json
{
  "id": "S1-RES-01", "team": "research", "title": "...", "story": "As the candidate I need ... so that ...",
  "points": 5, "tier": "mid", "owner": "ic-research-claude-code-researcher", "reviewer": "qe-acceptance",
  "status": "ready", "sprint": 1, "dependsOn": [],
  "contracts": ["org/contracts/claims.schema.json", "org/decisions/ADR-006-claims-and-evidence.md"],
  "paths": ["research/claude-code-facts.md", "research/claims.json"],
  "acceptance": ["Given ... when ... then ...", "node org/contracts/validate.mjs passes"],
  "requirements": ["REQ-02", "REQ-29"],
  "deliverables": ["D10"]
}
```
Every ticket cites the requirement ids it serves (`brief/requirements.json`); `node org/rtm.mjs` derives coverage from them.

## Writing standards (customer-facing material)
- Lead with the point. One idea per paragraph or slide. Executive line first, depth after.
- FinTechCo's words: payments, mobile, banking infrastructure, fraud, credit scoring, incidents. Their numbers: 120 / 40 / 20 (180 total).
- Plain English; define a term the first time (agentic, MCP, hooks, subagent, headless).
- Claims rule (ADR-006): `[CLM-###]` or `[CLM-?: …]` on every external fact. "As of October 2026" for product facts.
- No superlatives without attribution; no disparagement of competitors; acknowledge mixed evidence.
- Spoken material carries an estimated speaking time (~140 words per minute).

## Code standards (demo and tooling)
- Python 3.10+, stdlib + pandas + numpy; pytest; type hints on public functions; money as `Decimal`.
- Node 22 ES modules, zero dependencies, `node --test`.
- Deterministic tests; no network in tests (FRED data comes from the committed cache).
- Every script runnable from a clean checkout with one documented command.

## Review checklist (qe-acceptance)
1. Each acceptance criterion met (cite file, line, or command output).
2. Commands named in the ticket run and pass.
3. Only the ticket's paths changed (`git status --short` from the engagement root; other teams write in parallel, so judge only files plausibly from this ticket).
4. Claims rule: no unsourced statistic, price, certification, customer name or quote; placeholders allowed in Sprint 1-2 drafts, not in release material.
5. Contract conformance: `node org/contracts/validate.mjs` passes for any contract file the ticket wrote.
6. No secrets, no real personal data, no Anthropic brand assets.
7. Audience fit: an executive can get the point from the first line; an engineer finds the depth.
