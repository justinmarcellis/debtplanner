#!/usr/bin/env node
// Scripted rehearsal of the live demo: runs every RUNBOOK.md step headless on fresh repos, times
// and costs each one, checks the outcomes, and projects the meeting clock against the ADR-005
// checkpoints using the speaker notes (org/timing.mjs) plus the measured terminal time.
//   node demo/rehearse.mjs [DEST] [--model sonnet]      (about $2-3 of API credit, about 8 minutes)
// Writes demo/fallback/rehearsal.json. Prompts are read from RUNBOOK.md, so the runbook is what gets tested.
import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { SEGMENTS, timing, notesOf } from '../org/timing.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const args = process.argv.slice(2);
const MODEL = args.includes('--model') ? args[args.indexOf('--model') + 1] : 'sonnet';
const DEST = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--model') ?? join(homedir(), 'fintechco-demo-rehearsal');
const REPO = { 1: 'payments-ledger', 2: 'macro-risk', 3: 'sre-ops' };
const WPM = 140;
// What a trusted live session may do without a prompt: file tools (edits are accepted, as when the
// presenter approves them) plus the repo's own allow rules. The repo's deny rules still apply.
const allowedFor = (cwd) => {
  const rules = JSON.parse(readFileSync(join(cwd, '.claude', 'settings.json'), 'utf8')).permissions?.allow ?? [];
  return ['Read', 'Grep', 'Glob', 'Edit', 'Write', ...rules].join(',');
};

const words = (s) => s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
const sh = (cmd, cwd, env = {}) => {
  const t0 = Date.now();
  const r = spawnSync('bash', ['-c', cmd], { cwd, env: { ...process.env, ...env }, encoding: 'utf8', timeout: 300_000 });
  return { seconds: (Date.now() - t0) / 1000, out: `${r.stdout ?? ''}${r.stderr ?? ''}`.trim(), code: r.status };
};

/** Steps from RUNBOOK.md: id, act, command (the last backticked text, or the first for Act 3), and the Say line. */
export function parseRunbook(md) {
  const steps = [];
  for (const line of md.split('\n')) {
    const m = line.match(/^\| (\d)([a-z]′?) \| (.*)$/);
    if (!m) continue;
    const cells = m[3].split(' | ');
    if (/^Show /.test(cells[0])) continue;
    const ticks = [...cells[0].matchAll(/`([^`]+)`/g)].map((x) => x[1]);
    if (!ticks.length) continue;
    const say = (cells[2] ?? '').replace(/^"|"$/g, '');
    steps.push({ id: m[1] + m[2], act: Number(m[1]), command: m[1] === '3' ? ticks[0] : ticks.at(-1), say });
  }
  const close = md.split('\n').find((l) => l.startsWith('Tab 1:')) ?? '';
  const intros = [...md.matchAll(/^Say: \*"(.*)"\*$/gm)].map((x) => x[1]);
  return { steps, governance: [...close.matchAll(/`!([^`]+)`/g)].map((x) => x[1]), intros };
}

function claude(prompt, cwd, cont) {
  const t0 = Date.now();
  const a = ['-p', prompt, '--model', MODEL, '--output-format', 'json', '--permission-mode', 'acceptEdits', '--allowedTools', allowedFor(cwd), '--max-turns', '40'];
  if (cont) a.push('--continue');
  const r = spawnSync('claude', a, { cwd, encoding: 'utf8', timeout: 600_000, maxBuffer: 64 << 20 });
  let j = {};
  try { j = JSON.parse(r.stdout); } catch { j = { result: (r.stdout || r.stderr || '').slice(0, 400), is_error: true }; }
  return { seconds: (Date.now() - t0) / 1000, cost: j.total_cost_usd ?? 0, result: String(j.result ?? '').trim(), error: Boolean(j.is_error) };
}

function main() {
  const runbook = readFileSync(join(HERE, 'RUNBOOK.md'), 'utf8');
  const { steps, governance, intros } = parseRunbook(runbook);
  execFileSync(join(HERE, 'setup.sh'), [DEST], { stdio: 'ignore' });
  const version = execFileSync('claude', ['--version'], { encoding: 'utf8' }).trim();
  const started = new Set();
  const results = [];
  for (const s of steps) {
    const cwd = join(DEST, REPO[s.act]);
    let r;
    if (s.command.startsWith('!')) r = { ...sh(s.command.slice(1), cwd), cost: 0, kind: 'shell' };
    else if (s.command.startsWith('./')) r = { ...sh(s.command, cwd, { CLAUDE_MODEL: MODEL }), cost: 0, kind: 'headless script' };
    else { r = { ...claude(s.command, cwd, started.has(s.act)), kind: 'claude' }; started.add(s.act); }
    const excerpt = (r.result ?? r.out ?? '').replace(/\s+/g, ' ').slice(0, 220);
    results.push({ id: s.id, act: s.act, kind: r.kind, seconds: Math.round(r.seconds), cost: Number((r.cost ?? 0).toFixed(3)), sayWords: words(s.say), excerpt, error: r.error ?? (r.code ? `exit ${r.code}` : false) });
    console.log(`${s.id.padEnd(3)} ${mmss(r.seconds).padStart(5)}  $${(r.cost ?? 0).toFixed(2)}  ${excerpt.slice(0, 110)}`);
  }
  const gov = governance.map((c) => sh(c.replaceAll('~/fintechco-demo', DEST), join(DEST, REPO[1])));
  const govSeconds = gov.reduce((a, g) => a + g.seconds, 0);

  // Outcome checks: what the audience is told they will see.
  const p = (r, c) => sh(c, join(DEST, REPO[r])).out;
  const checks = {
    act1Tests: p(1, 'python3 -m pytest -q 2>&1 | tail -1'),
    act1FeesDecimal: /Decimal/.test(p(1, 'cat ledger/fees.py')) && !/float\(amount\)/.test(p(1, 'cat ledger/fees.py')),
    act1PanLogGone: !/card\.pan/.test(p(1, "grep -n 'log\\.' ledger/settlement.py || true")),
    act1HookExit2: /exit 2/.test(results.find((r) => r.id === '1d′')?.excerpt ?? ''),
    act1EnvNotLeaked: !/not-a-real-password-demo-only/.test(results.find((r) => r.id === '1e')?.excerpt ?? ''),
    act1EnvBlockedByRule: /denied|deny rule|blocked|permission/i.test(results.find((r) => r.id === '1e')?.excerpt ?? ''),
    act2DataGapFound: /Oct(ober)?[ -]2025|2025-10/i.test(results.find((r) => r.id === '2a')?.excerpt ?? '') || /2025-10|October 2025/.test(p(2, 'cat data/README.md 2>/dev/null')),
    act2Dashboard: existsSync(join(DEST, REPO[2], 'dashboard', 'index.html')),
    act3Cause: /7c1e9a2/.test(p(3, 'cat incidents/INC-2291/triage.md 2>/dev/null')),
    act3OnlyTriageChanged: p(3, 'git status --short').trim() === '?? incidents/INC-2291/triage.md',
    auditLines: Object.fromEntries(Object.values(REPO).map((r) => [r, Number(sh('wc -l < .claude/audit/audit.jsonl 2>/dev/null || echo 0', join(DEST, r)).out) || 0])),
  };

  // Projected meeting clock: slide speech and planned interaction from the notes, plus the demo as measured,
  // plus the runbook's Say lines read aloud at 140 wpm (live narration while output streams is extra).
  const deck = JSON.parse(readFileSync(join(ROOT, 'deck', 'project', 'deck.json'), 'utf8'));
  const notes = Object.fromEntries(deck.order.filter((id) => id.startsWith('s')).map((id) => [id, notesOf(readFileSync(join(ROOT, 'deck', 'project', 'slides', `${id}.html`), 'utf8'))]));
  const seg = timing(notes);
  const act = (n) => results.filter((r) => r.act === n).reduce((a, r) => a + r.seconds + (r.sayWords * 60) / WPM, 0) + (words(intros[n - 1] ?? '') * 60) / WPM;
  const sayGov = (words(intros[3] ?? '') * 60) / WPM;
  const s10 = seg[4].slides[0].seconds, s11 = seg[4].slides[1].seconds;
  const len = (i) => seg[i].speech + seg[i].other;
  let t = 0;
  const at = {};
  for (let i = 0; i < 4; i++) t += len(i);
  at.demoStart = t;
  t += s10 + act(1); at.act2Start = t;
  t += act(2) + act(3) + govSeconds + sayGov + s11; at.demoEnd = t;
  t += len(5); at.roiStart = t;
  t += len(6) + len(7); at.wrapStart = t;
  t += len(8) + len(9); at.end = t;
  const limits = { demoStart: 720, act2Start: 1200, demoEnd: 1560, roiStart: 1800, wrapStart: 2220 };
  const clock = Object.fromEntries(Object.entries(at).map(([k, v]) => [k, { at: mmss(v), seconds: Math.round(v), ok: limits[k] ? v <= limits[k] : v <= 2280 }]));
  const sum = (n) => results.filter((r) => r.act === n);
  const acts = [1, 2, 3].map((n) => ({ act: n, terminal: mmss(sum(n).reduce((a, r) => a + r.seconds, 0)), withSayLines: mmss(act(n)), cost: Number(sum(n).reduce((a, r) => a + r.cost, 0).toFixed(2)) }));
  const report = { date: new Date().toISOString().slice(0, 10), claudeCode: version, model: MODEL, dest: DEST, steps: results, governanceSeconds: Math.round(govSeconds), acts, checks, clock, note: 'Headless run. Act 3 runs through triage.sh, which writes markdown, so its cost is not reported here (about $0.15 in the G3 dry-run). The clock counts slide speech, planned interaction, measured terminal time and the runbook Say lines; it leaves out the in-row slack and live narration while output streams.' };
  writeFileSync(join(HERE, 'fallback', 'rehearsal.json'), JSON.stringify(report, null, 2) + '\n');
  console.log('\nActs:', acts.map((a) => `A${a.act} ${a.terminal} terminal (${a.withSayLines} with Say lines) $${a.cost}`).join(' · '));
  console.log('Checks:', JSON.stringify(checks));
  console.log('Clock:', Object.entries(clock).map(([k, v]) => `${k} ${v.at}${v.ok ? '' : ' LATE'}`).join(' · '));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
