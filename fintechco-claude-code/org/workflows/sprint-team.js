export const meta = {
  name: 'engagement-sprint-team',
  description: 'One sprint for a group of engagement teams: manager plans tickets, ICs build in parallel, independent acceptance review with one rework loop',
  phases: [
    { title: 'Plan', detail: 'team managers decompose stories into tickets' },
    { title: 'Build', detail: 'IC agents, one per ticket' },
    { title: 'Review', detail: 'qe-acceptance per ticket, one rework loop' },
  ],
}

// args: { sprint, root, teams: [{ id, code, name, hub, manager, icRoles, owns, stories, context, maxTickets, tickets? }] }
const S = args.sprint
const ROOT = args.root
const COMMON = `You are an agent on an AI-staffed engagement team preparing a principal Applied AI Architect candidate for an Anthropic onsite interview: a 40-minute mock customer meeting presenting Claude Code to the CTO and Head of Digital Transformation of FinTechCo (a fictional US fintech: 120 software engineers, 40 data scientists, 20 SREs; AWS and GCP; no agentic tools today), with a live demo and clear next steps.
Engagement root: ${ROOT} — cd there first; every path below is relative to it.
Before working read: org/playbooks/role-prompts.md (Common + your role), org/playbooks/standards.md, brief/facts.json, brief/requirements.json, and the org/decisions/ ADRs your ticket links (ADR-003 delegation controls and ADR-006 claims policy always apply). Do not re-decide ADRs.
Fabric: AGENT_ID=<your id> node org/cli.mjs ... (ticket <ID> status in_progress|review; post <hub> <type> "<text>" --ticket <ID>; hub <hub> to read). Read your team hub and the decisions hub before starting.
Claims (ADR-006): every external fact, statistic, price, certification, customer name, quote or competitor statement you write carries [CLM-###] from a claims shard (research/claims/*.json, id ranges in org/contracts/README.md) or a placeholder [CLM-?: what needs sourcing]. If your ticket's paths include a shard, source facts there yourself (official docs first; WebSearch/WebFetch are available — load them with ToolSearch query "select:WebSearch,WebFetch"). Never invent numbers, quotes or customer names.
Other agents are writing other folders right now. Write ONLY your ticket's paths. Do not git commit, push, stash or checkout. Do not publish anything or contact any external service except to read sources. No secrets, no Anthropic logos or brand assets, synthetic data only.`

const TICKETS = { type: 'object', properties: {
  tickets: { type: 'array', items: { type: 'object', properties: {
    id: { type: 'string' }, title: { type: 'string' }, story: { type: 'string' }, points: { type: 'number' },
    tier: { type: 'string', enum: ['strong', 'mid', 'fast'] }, owner: { type: 'string' },
    paths: { type: 'array', items: { type: 'string' } }, contracts: { type: 'array', items: { type: 'string' } },
    acceptance: { type: 'array', items: { type: 'string' } }, brief: { type: 'string' },
    requirements: { type: 'array', items: { type: 'string' } }, deliverables: { type: 'array', items: { type: 'string' } },
  }, required: ['id', 'title', 'points', 'tier', 'owner', 'paths', 'acceptance', 'brief', 'requirements'] } },
  notes: { type: 'string' },
}, required: ['tickets'] }

const BUILD = { type: 'object', properties: {
  summary: { type: 'string' }, filesWritten: { type: 'array', items: { type: 'string' } },
  verification: { type: 'string', description: 'What you ran or checked and the result' }, passed: { type: 'boolean' },
  assumptions: { type: 'array', items: { type: 'string' } },
  placeholders: { type: 'array', items: { type: 'string' }, description: 'Unresolved [CLM-?]/[UC-?]/[MET-?] placeholders left for later' },
  claimsAdded: { type: 'number' },
}, required: ['summary', 'filesWritten', 'verification', 'passed'] }

const VERDICT = { type: 'object', properties: {
  verdict: { type: 'string', enum: ['accept', 'rework'] },
  criteria: { type: 'array', items: { type: 'object', properties: { criterion: { type: 'string' }, met: { type: 'boolean' }, evidence: { type: 'string' } }, required: ['criterion', 'met', 'evidence'] } },
  reasons: { type: 'string' }, nits: { type: 'array', items: { type: 'string' } },
}, required: ['verdict', 'criteria', 'reasons'] }

const MODEL = { strong: 'opus', mid: 'sonnet', fast: 'haiku' }

function managerPrompt(team) {
  return `${COMMON}
Your id: ${team.manager} (Manager, ${team.name}). Planning ticket: S${S}-${team.code}-00. Team hub: ${team.hub}.
Your team owns: ${team.owns.join(', ')}. Tickets may write only inside those paths, plus a claims shard file research/claims/<shard>.json in the id range the story names (org/contracts/README.md).
IC roles available: ${team.icRoles.join(', ')}.
Sprint ${S} stories for your team:
${team.stories.map((s, i) => `${i + 1}. ${s}`).join('\n')}
${team.context ? 'Context: ' + team.context : ''}
Decompose the stories into at most ${team.maxTickets ?? 3} tickets that can ALL run in parallel now: disjoint paths (no two tickets write the same file or folder), no dependsOn between them. Break dependencies on other teams with the contracts in org/contracts/ and labelled placeholders. Size in Fibonacci points (calibration in org/config.json). Tier per ticket: fast for formatting/data entry, mid for most writing and code, strong only for narrative architecture, threat modelling or work whose judgment quality decides the meeting. Acceptance criteria must be checkable by a reviewer reading files and running named commands; include "node org/contracts/validate.mjs passes" for any ticket writing a contract file or claims shard. Every ticket lists the requirement ids (REQ-xx) and deliverable ids (Dx) it serves.
IDs: S${S}-${team.code}-01, -02, ... Owner ids: ic-${team.hub}-<role>. Reviewer: qe-acceptance.
"brief" is the IC's implementation guidance (max ~350 words): what to produce, structure, sources to use, the audience, pitfalls. Include everything the IC needs that is not in the linked files.
Create the tickets in the fabric: write a JSON array (each with id, team "${team.id}", title, story, points, tier, owner, reviewer "qe-acceptance", sprint ${S}, status "ready", dependsOn [], paths, contracts, acceptance, brief, requirements, deliverables) to a temp file under /tmp and pipe it: AGENT_ID=${team.manager} node org/cli.mjs ticket-new < /tmp/<file>.json
Then: AGENT_ID=${team.manager} node org/cli.mjs ticket S${S}-${team.code}-00 status review. Return the same tickets.`
}

function icPrompt(t, team) {
  return `${COMMON}
Your id: ${t.owner} (IC, ${team.name}). Ticket: ${t.id} "${t.title}". Team hub: ${team.hub}.
Paths you may write: ${t.paths.join(', ')}
Contracts and decisions: ${(t.contracts ?? []).join(', ') || 'see brief'}
Requirements served: ${(t.requirements ?? []).join(', ')}
Acceptance criteria:
${t.acceptance.map((a) => '- ' + a).join('\n')}
Brief from your manager:
${t.brief}
${team.context ? 'Team context: ' + team.context : ''}
Set the ticket in_progress now; when your work meets every criterion and your checks pass, set it to review. Return what you built.`
}

function reviewPrompt(t, team, build, round) {
  return `${COMMON}
Your id: qe-acceptance (independent acceptance reviewer). Review ticket ${t.id} "${t.title}" (${team.name}), round ${round}.
Paths in scope: ${t.paths.join(', ')}
Acceptance criteria:
${t.acceptance.map((a) => '- ' + a).join('\n')}
The IC reported: ${JSON.stringify(build ?? {}).slice(0, 3000)}
Check every criterion against the files and by RUNNING any named commands yourself. Then the checklist in org/playbooks/standards.md: claims rule (no unsourced statistic, price, certification, customer name or quote; placeholders are allowed in Sprint 1-2), contract conformance (node org/contracts/validate.mjs), only in-scope paths changed (git status --short; other teams write in parallel, judge only files plausibly from this ticket), audience fit. Do not fix the work.
Record the verdict yourself before returning: AGENT_ID=qe-acceptance node org/cli.mjs review ${t.id} <accept|rework> "<one-line reason>"
Accept when every criterion is met; list minor nits separately rather than reworking for them.`
}

async function runTicket(t, team) {
  const model = MODEL[t.tier] ?? 'sonnet'
  let build = await agent(icPrompt(t, team), { label: `${t.id} ${t.owner}`, phase: 'Build', model, schema: BUILD })
  let review = await agent(reviewPrompt(t, team, build, 1), { label: `${t.id} review`, phase: 'Review', model: 'sonnet', schema: VERDICT })
  let rounds = 1
  if (review && review.verdict === 'rework') {
    const fix = await agent(`${icPrompt(t, team)}
REWORK requested by the acceptance reviewer. Fix exactly these issues, re-run your checks, set the ticket to review:
${review.reasons}
Unmet criteria: ${JSON.stringify((review.criteria ?? []).filter((c) => !c.met))}`, { label: `${t.id} ${t.owner} rework`, phase: 'Build', model, schema: BUILD })
    build = fix ?? build
    review = await agent(reviewPrompt(t, team, build, 2), { label: `${t.id} review r2`, phase: 'Review', model: 'sonnet', schema: VERDICT })
    rounds = 2
  }
  return { id: t.id, team: team.id, points: t.points, tier: t.tier, owner: t.owner, verdict: review?.verdict ?? 'unknown', rounds,
    passed: build?.passed ?? false, summary: build?.summary?.slice(0, 700), assumptions: build?.assumptions ?? [],
    placeholders: build?.placeholders ?? [], claimsAdded: build?.claimsAdded ?? 0, reviewReasons: review?.reasons, nits: review?.nits ?? [] }
}

const results = await pipeline(
  args.teams,
  // Pre-planned tickets (orchestrator follow-ups) skip the manager stage.
  (team) => team.tickets ? { tickets: team.tickets } : agent(managerPrompt(team), { label: `S${S}-${team.code}-00 ${team.manager} planning`, phase: 'Plan', model: 'sonnet', schema: TICKETS }),
  (plan, team) => {
    if (!plan || !plan.tickets?.length) { log(`${team.id}: manager returned no tickets`); return [] }
    log(`${team.id}: ${plan.tickets.length} tickets, ${plan.tickets.reduce((a, t) => a + t.points, 0)} pts`)
    return parallel(plan.tickets.map((t) => () => runTicket(t, team)))
  },
)
return results.flat().filter(Boolean)
