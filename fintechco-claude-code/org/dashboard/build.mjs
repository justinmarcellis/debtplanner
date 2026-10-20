#!/usr/bin/env node
// Program dashboard (D11, S2-PMO-01): one self-contained page showing the SDLC that produced D1-D10.
//   node org/dashboard/build.mjs   reads the board, sprints, hubs, RTM and claims; writes org/dashboard/index.html
// Everything on the page is read from files in this repo at build time; nothing is typed in by hand.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listTickets, teams as readTeams, config as readConfig } from '../fabric.mjs';
import { coverage } from '../rtm.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const json = (p) => JSON.parse(read(p));
const jsonl = (p) => (existsSync(join(ROOT, p)) ? read(p).split('\n').filter(Boolean).map((l) => JSON.parse(l)) : []);

export function collect() {
  const spec = json('brief/requirements.json');
  const tickets = listTickets().sort((a, b) => a.id.localeCompare(b.id));
  const cfg = readConfig();
  const rtm = coverage(spec, tickets);
  const sprints = readdirSync(join(ROOT, 'org', 'sprints')).filter((f) => f.endsWith('.json')).sort()
    .map((f) => json(`org/sprints/${f}`));
  const claims = json('research/claims.json');
  const claimStatus = claims.reduce((a, c) => ({ ...a, [c.status]: (a[c.status] ?? 0) + 1 }), {});
  const decisionsHub = jsonl('org/hubs/decisions.jsonl');
  const gates = Object.entries(cfg.gates).map(([id, text]) => {
    const rec = [...decisionsHub].reverse().find((m) => m.text.startsWith(`${id} `));
    const status = rec ? (/^G\d (passed|accepted)/.test(rec.text) ? 'passed' : 'failed') : 'pending';
    return { id, text, status, record: rec?.text ?? null, at: rec?.at ?? null, link: rec?.link ?? null };
  });
  const adrs = readdirSync(join(ROOT, 'org', 'decisions')).filter((f) => /^ADR-\d+/.test(f)).sort().map((f) => {
    const body = read(`org/decisions/${f}`);
    return { file: `org/decisions/${f}`, title: body.match(/^# (.*)$/m)?.[1] ?? f, status: body.match(/Status: ([a-z]+)/i)?.[1] ?? '' };
  });
  const t = readTeams();
  return {
    builtAt: new Date().toISOString(),
    program: cfg.program,
    budget: cfg.budget,
    teams: t.teams.map((x) => ({ id: x.id, name: x.name, director: x.director.model, manager: x.manager.model, ics: x.icRoles.length, owns: x.owns })),
    tickets: tickets.map((x) => ({
      id: x.id, title: x.title, team: x.team, status: x.status, points: x.points ?? 0, sprint: x.sprint, owner: x.owner,
      requirements: x.requirements ?? [], deliverables: x.deliverables ?? [], paths: x.paths ?? [],
      verdict: x.review?.verdicts?.at(-1) ?? null, firstPass: x.review?.firstPass ?? null,
      rescoped: (x.notes ?? []).some((n) => n.text.startsWith('Rescoped under ADR-007')),
    })),
    sprints: sprints.map((s) => ({ number: s.number, name: s.name, status: s.status, committed: s.committedPoints ?? s.review?.committedPoints ?? 0, review: s.review ?? null, retro: s.retro ?? null })),
    deliverables: Object.entries(spec.deliverables).map(([id, text]) => {
      const ts = tickets.filter((x) => (x.deliverables ?? []).includes(id));
      return { id, text, tickets: ts.map((x) => x.id), done: ts.filter((x) => x.status === 'done').length, paths: [...new Set(ts.flatMap((x) => x.paths ?? []))] };
    }),
    rtm: rtm.map((r) => ({ id: r.id, text: r.text, deliverables: r.deliverables, tickets: r.tickets, done: r.doneTickets, covered: r.covered })),
    claims: { total: claims.length, ...claimStatus },
    gates,
    adrs,
    decisions: decisionsHub.map((m) => ({ at: m.at, type: m.type, text: m.text, link: m.link ?? null })),
  };
}

export function render(d) {
  const data = JSON.stringify(d).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>FinTechCo Program Board</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Source+Serif+4:opsz,wght@8..60,600&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #F6F4EF; --surface: #FBFAF6; --ink: #1B1F24; --ink-2: #4A5560; --ink-3: #6B7480; --line: #E2DED5;
  --accent: #1F6F6B; --accent-soft: #E3EEEC; --data: #2a78d6; --track: #E2DED5;
  --good: #2E7D4F; --good-bg: #E4F1E8; --warn: #8A5A00; --warn-bg: #F7ECD6; --bad: #A33A2C; --bad-bg: #F6E1DD;
  color-scheme: light;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #13202B; --surface: #1A2A36; --ink: #ECEAE4; --ink-2: #B4BCC4; --ink-3: #8D97A1; --line: #2C3D4A;
    --accent: #4FB3A9; --accent-soft: #1E3A3A; --data: #3987e5; --track: #2C3D4A;
    --good: #6CC08F; --good-bg: #1D3427; --warn: #E3B35A; --warn-bg: #3A2F18; --bad: #EE8A7B; --bad-bg: #3E2420;
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --bg: #13202B; --surface: #1A2A36; --ink: #ECEAE4; --ink-2: #B4BCC4; --ink-3: #8D97A1; --line: #2C3D4A;
  --accent: #4FB3A9; --accent-soft: #1E3A3A; --data: #3987e5; --track: #2C3D4A;
  --good: #6CC08F; --good-bg: #1D3427; --warn: #E3B35A; --warn-bg: #3A2F18; --bad: #EE8A7B; --bad-bg: #3E2420;
  color-scheme: dark;
}
* { box-sizing: border-box; }
html, body { margin: 0; }
body { background: var(--bg); color: var(--ink); font: 15px/1.5 'IBM Plex Sans', system-ui, sans-serif; }
main { max-width: 1180px; margin: 0 auto; padding: 32px 16px 64px; }
h1, h2 { font-family: 'Source Serif 4', Georgia, serif; font-weight: 600; letter-spacing: -0.01em; }
h1 { font-size: 32px; line-height: 1.15; margin: 0 0 6px; }
h2 { font-size: 21px; margin: 0 0 4px; }
.lede { color: var(--ink-2); margin: 0; max-width: 72ch; }
.eyebrow { font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin: 0 0 8px; }
.meta { color: var(--ink-3); font-size: 13px; margin-top: 8px; }
section { margin-top: 40px; }
.section-head { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 8px 16px; margin-bottom: 14px; }
.section-head p { margin: 0; color: var(--ink-2); font-size: 14px; }
.card { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 16px 18px; }
.tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-top: 24px; }
.tile .k { font-size: 13px; color: var(--ink-2); }
.tile .v { font-size: 30px; font-weight: 600; line-height: 1.1; margin-top: 4px; font-variant-numeric: tabular-nums; }
.tile .s { font-size: 12px; color: var(--ink-3); margin-top: 2px; }
.gates { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
.gate h3 { margin: 0 0 6px; font-size: 15px; display: flex; justify-content: space-between; gap: 8px; align-items: center; }
.gate p { margin: 0; font-size: 13px; color: var(--ink-2); }
.gate .rec { margin-top: 8px; color: var(--ink); }
.pill { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; border-radius: 999px; padding: 2px 9px; white-space: nowrap; }
.pill svg { width: 12px; height: 12px; }
.ok { color: var(--good); background: var(--good-bg); }
.pend { color: var(--warn); background: var(--warn-bg); }
.fail { color: var(--bad); background: var(--bad-bg); }
.neutral { color: var(--ink-2); background: var(--line); }
.sprints { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
.sprint h3 { margin: 0; font-size: 16px; }
.sprint .row { display: flex; justify-content: space-between; font-size: 13px; color: var(--ink-2); margin-top: 6px; }
.sprint .row b { color: var(--ink); font-weight: 600; font-variant-numeric: tabular-nums; }
.sprint ul { margin: 10px 0 0; padding-left: 18px; font-size: 13px; color: var(--ink-2); }
.sprint li { margin: 3px 0; }
.meters { display: grid; gap: 10px; }
.meter { display: grid; grid-template-columns: minmax(120px, 220px) 1fr 84px; gap: 12px; align-items: center; font-size: 14px; }
.meter .bar { position: relative; height: 12px; background: var(--track); border-radius: 4px; overflow: hidden; }
.meter .fill { position: absolute; inset: 0 auto 0 0; background: var(--data); border-radius: 4px; }
.meter .num { text-align: right; color: var(--ink-2); font-variant-numeric: tabular-nums; font-size: 13px; }
.filters { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.filters button { font: inherit; font-size: 13px; padding: 4px 12px; border-radius: 999px; border: 1px solid var(--line); background: var(--surface); color: var(--ink-2); cursor: pointer; }
.filters button[aria-pressed="true"] { background: var(--accent); border-color: var(--accent); color: #fff; }
:root[data-theme="dark"] .filters button[aria-pressed="true"] { color: #13202B; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .filters button[aria-pressed="true"] { color: #13202B; } }
.table-wrap { overflow-x: auto; border: 1px solid var(--line); border-radius: 12px; background: var(--surface); }
table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
th, td { text-align: left; padding: 9px 12px; border-bottom: 1px solid var(--line); vertical-align: top; }
th { font-size: 12px; font-weight: 600; color: var(--ink-2); text-transform: uppercase; letter-spacing: .05em; background: var(--bg); position: sticky; top: 0; }
tr:last-child td { border-bottom: 0; }
td.num { text-align: right; font-variant-numeric: tabular-nums; }
code, .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12.5px; }
.paths { color: var(--ink-3); font-size: 12px; margin-top: 3px; word-break: break-word; }
.why { color: var(--ink-2); font-size: 12.5px; margin-top: 3px; }
.org { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 12px; }
.org .card h3 { margin: 0 0 4px; font-size: 15px; }
.org .card p { margin: 2px 0; font-size: 13px; color: var(--ink-2); }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 760px) { .two { grid-template-columns: 1fr; } .meter { grid-template-columns: 1fr 64px; } .meter .label { grid-column: 1 / -1; } }
ol.log { list-style: none; margin: 0; padding: 0; }
ol.log li { padding: 10px 0; border-bottom: 1px solid var(--line); font-size: 13.5px; }
ol.log li:last-child { border-bottom: 0; }
ol.log time { display: block; color: var(--ink-3); font-size: 12px; }
.tip { position: fixed; pointer-events: none; background: var(--ink); color: var(--bg); font-size: 12.5px; padding: 6px 9px; border-radius: 6px; max-width: 280px; opacity: 0; transition: opacity .1s; z-index: 10; }
.theme-toggle { float: right; font: inherit; font-size: 13px; border: 1px solid var(--line); background: var(--surface); color: var(--ink-2); border-radius: 999px; padding: 4px 12px; cursor: pointer; }
</style>
</head>
<body>
<main>
  <button class="theme-toggle" id="theme" type="button">Theme</button>
  <p class="eyebrow">Program board · FinTechCo × Claude Code</p>
  <h1>How the meeting kit was built</h1>
  <p class="lede">An AI-staffed engagement team of nine teams worked in sprints, under delegation controls and five quality gates, to produce the deck, demo and leave-behinds for a 40-minute meeting. Everything on this page is generated from the repository's board, sprints, hubs, traceability matrix and claims register.</p>
  <p class="meta" id="built"></p>
  <div class="tiles" id="tiles"></div>

  <section aria-labelledby="g-h">
    <div class="section-head"><h2 id="g-h">Quality gates</h2><p>Each gate is recorded in the decisions hub when it passes.</p></div>
    <div class="gates" id="gates"></div>
  </section>

  <section aria-labelledby="s-h">
    <div class="section-head"><h2 id="s-h">Sprints</h2><p>Sprint 1's fan-out was stopped by account limits; Sprint 2 switched to lean delivery (ADR-007).</p></div>
    <div class="sprints" id="sprints"></div>
  </section>

  <section aria-labelledby="d-h">
    <div class="section-head"><h2 id="d-h">Deliverables</h2><p>D1–D11 from the brief, with the tickets that produce each one.</p></div>
    <div class="table-wrap"><table><thead><tr><th>ID</th><th>Deliverable</th><th>Tickets done</th><th>Status</th></tr></thead><tbody id="deliv"></tbody></table></div>
  </section>

  <section aria-labelledby="t-h">
    <div class="section-head"><h2 id="t-h">Story points by team</h2><p>Done out of committed, all sprints.</p></div>
    <div class="card meters" id="meters"></div>
  </section>

  <section aria-labelledby="b-h">
    <div class="section-head"><h2 id="b-h">Board</h2><p id="board-sum"></p></div>
    <div class="filters" id="filters" role="group" aria-label="Filter by team"></div>
    <div class="table-wrap"><table><thead><tr><th>Ticket</th><th>Team</th><th>Pts</th><th>Status</th><th>Latest review</th></tr></thead><tbody id="board"></tbody></table></div>
  </section>

  <section aria-labelledby="r-h">
    <div class="section-head"><h2 id="r-h">Requirements traceability</h2><p id="rtm-sum"></p></div>
    <div class="table-wrap"><table><thead><tr><th>Req</th><th>Requirement</th><th>Deliverables</th><th>Done by</th><th>Covered</th></tr></thead><tbody id="rtm"></tbody></table></div>
  </section>

  <section aria-labelledby="o-h">
    <div class="section-head"><h2 id="o-h">Organization</h2><p>Each team: a director (strong tier), a manager (mid tier) and IC roles. Delegation controls in ADR-003.</p></div>
    <div class="org" id="org"></div>
  </section>

  <section aria-labelledby="l-h" class="two">
    <div>
      <div class="section-head"><h2 id="l-h">Decision records</h2></div>
      <div class="card"><ol class="log" id="adrs"></ol></div>
    </div>
    <div>
      <div class="section-head"><h2>Decisions hub</h2></div>
      <div class="card"><ol class="log" id="hub"></ol></div>
    </div>
  </section>
</main>
<div class="tip" id="tip" role="tooltip"></div>
<script>
const D = ${data};
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const icon = { ok: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6.5l2.2 2.2 4.8-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pend: '<svg viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6 3.8V6l1.5 1" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  fail: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 3.5l5 5M8.5 3.5l-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' };
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const pill = (kind, label) => '<span class="pill ' + kind + '">' + (icon[kind] ?? '') + esc(label) + '</span>';
const statusPill = (s) => s === 'done' ? pill('ok', 'done') : s === 'blocked' ? pill('fail', 'blocked') : s === 'in_progress' ? pill('pend', 'rework') : pill('neutral', s);
const fmtDate = (iso) => new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

$('built').textContent = 'Built ' + fmtDate(D.builtAt) + ' from the repository · run node org/dashboard/build.mjs to refresh';

const done = D.tickets.filter((t) => t.status === 'done');
const pts = (ts) => ts.reduce((a, t) => a + t.points, 0);
const covered = D.rtm.filter((r) => r.covered).length;
const gatesPassed = D.gates.filter((g) => g.status === 'passed').length;
const delivDone = D.deliverables.filter((x) => x.tickets.length && x.done === x.tickets.length).length;
$('tiles').innerHTML = [
  ['Requirements covered', covered + ' / ' + D.rtm.length, 'from the brief, traced to done tickets'],
  ['Deliverables complete', delivDone + ' / ' + D.deliverables.length, 'every producing ticket done'],
  ['Tickets done', done.length + ' / ' + D.tickets.length, pts(done) + ' of ' + pts(D.tickets) + ' story points'],
  ['Gates passed', gatesPassed + ' / ' + D.gates.length, 'G1 narrative to G5 release'],
  ['Sourced claims', String(D.claims.total), (D.claims.verified ?? 0) + ' verified · ' + (D.claims.partial ?? 0) + ' partial · ' + (D.claims.unverified ?? 0) + ' never cited'],
].map(([k, v, s]) => '<div class="card tile"><div class="k">' + esc(k) + '</div><div class="v">' + esc(v) + '</div><div class="s">' + esc(s) + '</div></div>').join('');

$('gates').innerHTML = D.gates.map((g) => {
  const kind = g.status === 'passed' ? 'ok' : g.status === 'failed' ? 'fail' : 'pend';
  return '<div class="card gate"><h3>' + esc(g.id) + pill(kind, g.status) + '</h3><p>' + esc(cap((g.text.split(' — ')[1] ?? g.text).replace(/\\s*\\((?:end of )?(?:Sprint \\d|Release)\\)/, ''))) + '</p>' +
    (g.record ? '<p class="rec">' + esc(g.record.replace(/^G\\d \\w+(?: \\([^)]*\\))?: /, '')) + '</p>' : '') + '</div>';
}).join('');

$('sprints').innerHTML = D.sprints.map((s) => {
  const r = s.review ?? {};
  const rows = [['Status', s.status], ['Committed points', s.committed], ['Completed points', r.completedPoints ?? '—'],
    ['First-pass acceptance', r.firstPassAcceptance != null ? Math.round(r.firstPassAcceptance * 100) + '%' : '—']];
  if (r.subagentTokens) rows.push(['Subagent tokens', (r.subagentTokens / 1e6).toFixed(1) + 'M']);
  if (r.usd) rows.push(['Measured spend', '$' + r.usd.toFixed(2)]);
  const notes = [...(r.shipped ?? []).slice(0, 3), ...(s.retro?.went_badly ?? []).slice(0, 1), ...(s.retro?.improvements ?? []).slice(0, 2)];
  return '<div class="card sprint"><h3>' + esc(s.name) + '</h3>' + rows.map(([k, v]) => '<div class="row"><span>' + esc(k) + '</span><b>' + esc(v) + '</b></div>').join('') +
    (notes.length ? '<ul>' + notes.map((n) => '<li>' + esc(n) + '</li>').join('') + '</ul>' : '') + '</div>';
}).join('');

$('deliv').innerHTML = D.deliverables.map((x) => {
  const complete = x.tickets.length && x.done === x.tickets.length;
  return '<tr><td class="mono">' + esc(x.id) + '</td><td>' + esc(x.text) + '<div class="paths">' + esc(x.paths.slice(0, 6).join(' · ')) + (x.paths.length > 6 ? ' …' : '') + '</div></td><td class="num">' + x.done + ' / ' + x.tickets.length +
    '</td><td>' + (complete ? pill('ok', 'complete') : pill('pend', 'open')) + '</td></tr>';
}).join('');

const teamName = Object.fromEntries(D.teams.map((t) => [t.id, t.name]));
const tip = $('tip');
$('meters').innerHTML = D.teams.map((t) => {
  const ts = D.tickets.filter((x) => x.team === t.id);
  const all = pts(ts), d = pts(ts.filter((x) => x.status === 'done'));
  const pct = all ? (100 * d) / all : 0;
  return '<div class="meter" data-tip="' + esc(t.name + ': ' + d + ' of ' + all + ' points done across ' + ts.length + ' tickets') + '"><span class="label">' + esc(t.name) + '</span><div class="bar"><div class="fill" style="width:' + pct.toFixed(1) + '%"></div></div><span class="num">' + d + ' / ' + all + '</span></div>';
}).join('');
document.querySelectorAll('[data-tip]').forEach((el) => {
  el.addEventListener('mousemove', (e) => { tip.textContent = el.dataset.tip; tip.style.opacity = 1; tip.style.left = Math.min(e.clientX + 14, innerWidth - 290) + 'px'; tip.style.top = e.clientY + 14 + 'px'; });
  el.addEventListener('mouseleave', () => { tip.style.opacity = 0; });
});

let team = 'all';
try { team = localStorage.getItem('board-team') || 'all'; } catch {}
function drawBoard() {
  const ts = D.tickets.filter((t) => team === 'all' || t.team === team);
  $('board-sum').textContent = ts.length + ' tickets · ' + ts.filter((t) => t.status === 'done').length + ' done';
  $('filters').innerHTML = ['all', ...D.teams.map((t) => t.id)].map((id) => '<button type="button" data-team="' + id + '" aria-pressed="' + (id === team) + '">' + esc(id === 'all' ? 'All teams' : teamName[id]) + '</button>').join('');
  $('board').innerHTML = ts.map((t) => {
    const v = t.verdict;
    const review = v ? pill(v.verdict === 'accept' ? 'ok' : 'pend', v.verdict === 'accept' ? 'accepted' : 'rework') + ' <span class="why">' + esc(v.by) + '</span><div class="why">' + esc(v.reason) + '</div>' : '<span class="why">—</span>';
    return '<tr><td><span class="mono">' + esc(t.id) + '</span><div>' + esc(t.title) + '</div><div class="paths">' + esc(t.owner ?? '') + (t.rescoped ? ' · rescoped under ADR-007' : '') + '</div></td><td>' + esc(teamName[t.team] ?? t.team) +
      '</td><td class="num">' + t.points + '</td><td>' + statusPill(t.status) + '</td><td>' + review + '</td></tr>';
  }).join('');
  $('filters').querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { team = b.dataset.team; try { localStorage.setItem('board-team', team); } catch {} drawBoard(); }));
}
drawBoard();

$('rtm-sum').textContent = covered + ' of ' + D.rtm.length + ' requirements have a done ticket';
$('rtm').innerHTML = D.rtm.map((r) => '<tr><td class="mono">' + esc(r.id) + '</td><td>' + esc(r.text) + '</td><td class="mono">' + esc(r.deliverables.join(' ')) + '</td><td class="mono">' + esc(r.done.join(' ') || '—') + '</td><td>' + (r.covered ? pill('ok', 'yes') : pill('pend', 'open')) + '</td></tr>').join('');

$('org').innerHTML = D.teams.map((t) => '<div class="card"><h3>' + esc(t.name) + '</h3><p>Director: ' + esc(t.director) + ' · Manager: ' + esc(t.manager) + '</p><p>' + t.ics + ' IC roles · owns <span class="mono">' + esc(t.owns.join(' ')) + '</span></p></div>').join('');

$('adrs').innerHTML = D.adrs.map((a) => '<li>' + esc(a.title) + '<time>' + esc(a.status) + ' · <span class="mono">' + esc(a.file) + '</span></time></li>').join('');
$('hub').innerHTML = [...D.decisions].reverse().map((m) => '<li>' + esc(m.text) + '<time>' + fmtDate(m.at) + ' · ' + esc(m.type) + (m.link ? ' · <span class="mono">' + esc(m.link) + '</span>' : '') + '</time></li>').join('');

$('theme').addEventListener('click', () => {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
});
</script>
</body>
</html>
`;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const html = render(collect());
  writeFileSync(join(ROOT, 'org', 'dashboard', 'index.html'), html);
  console.log(`org/dashboard/index.html written (${(html.length / 1024).toFixed(0)} KB)`);
}
