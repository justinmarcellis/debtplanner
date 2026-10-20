#!/usr/bin/env node
// Mechanical re-check of the consolidated review's rework findings (ADR-007: findings are fixed
// directly; this script is the evidence that each one stays fixed).
//   node org/reviews/recheck.mjs     exit 1 if any check fails
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const walk = (d) => readdirSync(join(ROOT, d)).flatMap((f) => {
  const p = join(d, f);
  return statSync(join(ROOT, p)).isDirectory() ? walk(p) : [p];
});
// What the customer or the interviewer sees; deck/slide-spec.md and storyline.md are marked superseded.
const release = ['deck/project', 'strategy', 'rollout', 'security', 'value', 'rehearsal', 'research/battlecard.md', 'demo/RUNBOOK.md', 'demo/README.md', 'demo/enterprise/README.md']
  .flatMap((p) => (statSync(join(ROOT, p)).isDirectory() ? walk(p) : [p]))
  .filter((p) => /\.(md|html|json)$/.test(p));
// Guidance that quotes a phrase in order to forbid it ("Do not say ...") is not a violation.
const none = (re, files = release, text = read) => files.filter((p) => text(p).split('\n').some((l) => re.test(l) && !/Do not say/.test(l))).map((p) => relative('.', p));
const visible = (p) => read(p).replace(/<aside>[\s\S]*?<\/aside>/g, '');
const has = (p, re) => re.test(read(p));

const checks = [
  ['F1 audit hook in all three demo repos', () => ['payments-ledger', 'macro-risk', 'sre-ops'].every((r) =>
    existsSync(join(ROOT, 'demo', r, '.claude/hooks/audit_log.py')) && has(`demo/${r}/.claude/settings.json`, /audit_log\.py/))],
  ['F1 governance close counts every act', () => has('demo/RUNBOOK.md', /wc -l ~\/fintechco-demo\/\*\/\.claude\/audit\/audit\.jsonl/)],
  ['F2 runbook shows the .env denial and a deterministic hook block', () =>
    has('demo/RUNBOOK.md', /Read \.env/) && has('demo/RUNBOOK.md', /pci_guard\.py < \.claude\/hooks\/examples\/pan-edit\.json/)],
  ['F3 no "asks before it acts" phrasing', () => none(/asks? (permission )?before (it )?act|asks first|asks permission as it goes/i).length === 0],
  ['F4 laptop telemetry default stated per route', () => none(/telemetry and error reporting are off by default and/).length === 0 && has('security/security-brief.md', /CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC/)],
  ['F5 no unconditional "existing agreement applies"', () => none(/(existing commercial agreement applies|Your existing commercial agreement|under your agreement)(?![^.]*unless otherwise agreed)/i).length === 0],
  ['F6 no "inference runs in your account/project"', () => none(/Where inference runs|inference runs in (your|FinTechCo's own)/i).length === 0],
  ['F7 ROI read-out matches the sensitivity table', () => none(/more than everything else combined|roughly breaks even|On conservative-to-base assumptions|Evidence-bounded/).length === 0],
  ['F8 managed policy sets Manual start and disables auto mode', () => {
    const p = JSON.parse(read('demo/enterprise/managed-settings.json')).permissions;
    return p.defaultMode === 'default' && p.disableAutoMode === 'disable' && p.disableBypassPermissionsMode === 'disable';
  }],
  ['F9 CI workflow never interpolates the issue title into run:', () => {
    const y = read('demo/sre-ops/ci/claude-triage.yml');
    const runs = y.split('\n').filter((l) => /^\s*run:/.test(l));
    return runs.every((l) => !/\$\{\{/.test(l)) && /ANTHROPIC_DEFAULT_SONNET_MODEL/.test(y) && /\^INC-\[0-9\]\+\$/.test(y);
  }],
  ['F10 setup.sh stages fallbacks next to the repos; runbook uses python3', () =>
    has('demo/setup.sh', /dashboard-complete\.html/) && has('demo/setup.sh', /cp -R "\$SRC\/enterprise" "\$SRC\/fallback"/) && !/\bpython -m/.test(read('demo/RUNBOOK.md'))],
  ['F11 evaluation plan covers unblindable signals, counterbalancing, 8+ risks', () => {
    const e = read('rollout/evaluation-plan.md');
    const risks = (e.split('## 5. Risks')[1] ?? '').split('## 6.')[0].split('\n').filter((l) => /^\| [A-Z]/.test(l) && !/^\| Risk/.test(l));
    return /What cannot be blinded/.test(e) && /Counterbalancing/.test(e) && /Other AI tools/.test(e) && risks.length >= 8 && has('rollout/pilot-charter.md', /\[CLM-619\]/);
  }],
  ['F12 no unsourced competitor characterisations', () => none(/Many assistants now offer|built around inline completion|No forced IDE switch|adds the full agent with enterprise policy/).length === 0],
  ['m4 Copilot note is dated', () => none(/Claude is also (available|offered) as a coding agent inside/).length === 0],
  ['m5 no repo paths on slide faces (speaker notes may name files)', () => none(/(value|strategy|rollout|security)\/[a-z-]+\.(md|mjs)/, release.filter((p) => p.startsWith('deck/project/slides/s')), visible).length === 0],
  ['m10 one mid-pilot milestone (PW6)', () => none(/week-6 readout|PW5 \(Feb 8–12\)/).length === 0],
];

let failed = 0;
for (const [name, fn] of checks) {
  let ok = false;
  try { ok = fn(); } catch (e) { ok = false; }
  if (!ok) failed++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}`);
}
console.log(`${checks.length - failed}/${checks.length} re-checks pass`);
process.exit(failed ? 1 : 0);
