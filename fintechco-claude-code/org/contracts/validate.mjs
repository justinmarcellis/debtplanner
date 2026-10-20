#!/usr/bin/env node
// Validate the cross-team contract files against their schemas (a small JSON Schema subset:
// type, required, enum, pattern, minItems, items, properties). Zero dependencies.
//   node org/contracts/validate.mjs           validate every contract file that exists
//   node org/contracts/validate.mjs --strict  also fail on files that do not exist yet
// Claims are read from research/claims/*.json shards. Also checks: unique ids, and that every [CLM-###] cited in deck/strategy/rollout/value/security/demo
// markdown and slide files exists in research/claims.json with status verified or partial.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');

export const CONTRACTS = [
  { file: 'research/claims.json', schema: 'claims.schema.json' },
  { file: 'strategy/use-cases.json', schema: 'use-cases.schema.json' },
  { file: 'value/metrics.json', schema: 'metrics.schema.json' },
  { file: 'value/roi-assumptions.json', schema: 'roi-assumptions.schema.json' },
];

const typeOf = (v) => (Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v === 'number' && Number.isInteger(v) ? 'integer' : typeof v);
const typeOk = (want, v) => [want].flat().some((w) => w === typeOf(v) || (w === 'number' && typeof v === 'number'));

/** Return a list of error strings for value v against schema s. */
export function validate(s, v, path = '$') {
  const errs = [];
  if (s.type && !typeOk(s.type, v)) return [`${path}: expected ${[s.type].flat().join('|')}, got ${typeOf(v)}`];
  if (s.enum && !s.enum.includes(v)) errs.push(`${path}: ${JSON.stringify(v)} not in ${s.enum.join('|')}`);
  if (s.pattern && typeof v === 'string' && !new RegExp(s.pattern).test(v)) errs.push(`${path}: "${v}" does not match ${s.pattern}`);
  if (Array.isArray(v)) {
    if (s.minItems && v.length < s.minItems) errs.push(`${path}: needs at least ${s.minItems} items`);
    if (s.items) v.forEach((x, i) => errs.push(...validate(s.items, x, `${path}[${i}]`)));
  } else if (v && typeof v === 'object') {
    for (const k of s.required ?? []) if (!(k in v)) errs.push(`${path}: missing ${k}`);
    for (const [k, sub] of Object.entries(s.properties ?? {})) if (k in v) errs.push(...validate(sub, v[k], `${path}.${k}`));
  }
  return errs;
}

/** Duplicate ids in an array of {id}. */
export const duplicateIds = (list) => list.map((x) => x.id).filter((id, i, a) => a.indexOf(id) !== i);

/** Find [CLM-###] citations in text and report ones missing or not usable. */
export function checkCitations(text, claims) {
  const byId = new Map(claims.map((c) => [c.id, c]));
  const out = [];
  for (const m of text.matchAll(/\[CLM-(\d{3})\]/g)) {
    const c = byId.get(`CLM-${m[1]}`);
    if (!c) out.push(`CLM-${m[1]} not in register`);
    else if (c.retired || !['verified', 'partial'].includes(c.status)) out.push(`CLM-${m[1]} is ${c.retired ? 'retired' : c.status}`);
  }
  return [...new Set(out)];
}

/** Unresolved drafting placeholders that must not ship: [CLM-?: ...], TODO, TBD. Meeting-day fields like [date] are allowed. */
export function findPlaceholders(text) {
  return [...new Set([...text.matchAll(/\[CLM-\?[^\]]*\]|\bTODO\b|\bTBD\b/g)].map((m) => m[0].slice(0, 40)))];
}

const walk = (dir) => (existsSync(dir) ? readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  if (f === 'node_modules' || f.startsWith('.git')) return [];
  return statSync(p).isDirectory() ? walk(p) : [p];
}) : []);

function main() {
  const strict = process.argv.includes('--strict');
  let failed = false;
  const report = (ok, msg) => { if (!ok) failed = true; console.log(`${ok ? 'ok  ' : 'FAIL'} ${msg}`); };
  // Claims live in shards (research/claims/*.json); validate the merged view so citations resolve
  // even before `node org/claims.mjs` has rewritten research/claims.json.
  const claimsSchema = JSON.parse(readFileSync(join(HERE, 'claims.schema.json'), 'utf8'));
  const shardDir = join(ROOT, 'research', 'claims');
  let claims = [];
  for (const f of existsSync(shardDir) ? readdirSync(shardDir).filter((x) => x.endsWith('.json')).sort() : []) {
    const data = JSON.parse(readFileSync(join(shardDir, f), 'utf8'));
    const errs = validate(claimsSchema, data);
    report(!errs.length, `research/claims/${f}: ${Array.isArray(data) ? data.length : 0} claims${errs.length ? '\n  ' + errs.slice(0, 20).join('\n  ') : ''}`);
    if (Array.isArray(data)) claims.push(...data);
  }
  const dupClaims = duplicateIds(claims);
  if (dupClaims.length) report(false, `claim ids duplicated across shards: ${[...new Set(dupClaims)].join(', ')}`);
  for (const c of CONTRACTS) {
    const p = join(ROOT, c.file);
    if (c.file === 'research/claims.json') continue; // derived from shards
    if (!existsSync(p)) { report(!strict, `${c.file} (not created yet)`); continue; }
    const data = JSON.parse(readFileSync(p, 'utf8'));
    const errs = validate(JSON.parse(readFileSync(join(HERE, c.schema), 'utf8')), data);
    const dups = Array.isArray(data) ? duplicateIds(data) : [];
    report(!errs.length && !dups.length, `${c.file}: ${Array.isArray(data) ? data.length : 0} entries${errs.length ? '\n  ' + errs.slice(0, 20).join('\n  ') : ''}${dups.length ? '\n  duplicate ids: ' + dups.join(', ') : ''}`);
  }
  const cited = ['deck', 'strategy', 'rollout', 'value', 'security', 'demo', 'rehearsal', 'research']
    .flatMap((d) => walk(join(ROOT, d)))
    .filter((p) => /\.(md|html|json)$/.test(p) && !relative(ROOT, p).startsWith('research/claims'));
  let citations = 0;
  for (const p of cited) {
    const text = readFileSync(p, 'utf8');
    citations += (text.match(/\[CLM-\d{3}\]/g) ?? []).length;
    const issues = checkCitations(text, claims);
    if (issues.length) report(false, `${relative(ROOT, p)}: ${issues.join('; ')}`);
  }
  report(true, `${citations} citations in ${cited.length} files resolve to verified or partial claims`);
  // Release gate (G5): what the customer or the interviewer sees carries no drafting placeholders.
  // deck/slide-spec.md and the templates are working papers and keep their history.
  const release = cited.filter((p) => !/^deck\/(?!project\/)/.test(relative(ROOT, p)));
  const open = release.map((p) => [relative(ROOT, p), findPlaceholders(readFileSync(p, 'utf8'))]).filter(([, f]) => f.length);
  report(!open.length, `release files free of drafting placeholders${open.length ? '\n  ' + open.map(([p, f]) => `${p}: ${f.join(', ')}`).join('\n  ') : ''}`);
  process.exit(failed ? 1 : 0);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
