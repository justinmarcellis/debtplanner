#!/usr/bin/env node
// Build value/calculator/index.html from the tested model (value/roi.mjs) and assumptions.
//   node value/calculator/build.mjs
// The page inlines roi.mjs's functions verbatim (minus `export` and the CLI), so the calculator
// and value/roi-model.md always compute the same numbers.
import { readFileSync, writeFileSync } from 'node:fs';

const here = (p) => new URL(p, import.meta.url);
const roiSource = readFileSync(here('../roi.mjs'), 'utf8');
const model = roiSource.slice(roiSource.indexOf('export const TEAMS'), roiSource.indexOf('async function main()')).replace(/^export /gm, '');
const assumptions = JSON.parse(readFileSync(here('../roi-assumptions.json'), 'utf8'));
const shards = ['value-roi.json', 'value-metrics.json', 'strategy.json', 'adoption-eval.json', 'adoption-rollout.json'];
const claims = shards.flatMap((f) => { try { return JSON.parse(readFileSync(here(`../../research/claims/${f}`), 'utf8')); } catch { return []; } });
const cited = new Set(assumptions.flatMap((a) => [...a.basis.matchAll(/CLM-\d{3}/g)].map((m) => m[0])));
const sources = Object.fromEntries(claims.filter((c) => cited.has(c.id)).map((c) => [c.id, { url: c.sources[0].url, publisher: c.sources[0].publisher }]));
const json = (v) => JSON.stringify(v).replace(/</g, '\\u003c');

const page = `<title>FinTechCo ROI Calculator</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,600&display=swap">
<style>
/* Layout: inputs rail on the left, results on the right; stacks to one column on phones. */
:root {
  --bg:#F6F4EF; --surface:#FBFAF6; --ink:#1B1F24; --ink-2:#4A5560; --muted:#6B7480; --rule:#E2DED5; --grid:#ECE8DF;
  --accent:#1F6F6B; --s1:#2a78d6; --s2:#eb6834; --good:#1F6F6B; --bad:#B4432A;
  --display:"Source Serif 4", Georgia, serif; --text:"IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --bg:#13202B; --surface:#17222B; --ink:#F2EFE8; --ink-2:#C5CCD3; --muted:#9AA5AF; --rule:#2A3742; --grid:#22303A;
  --accent:#4FB3A9; --s1:#3987e5; --s2:#d95926; --good:#4FB3A9; --bad:#E07B62; color-scheme: dark; } }
:root[data-theme="dark"] {
  --bg:#13202B; --surface:#17222B; --ink:#F2EFE8; --ink-2:#C5CCD3; --muted:#9AA5AF; --rule:#2A3742; --grid:#22303A;
  --accent:#4FB3A9; --s1:#3987e5; --s2:#d95926; --good:#4FB3A9; --bad:#E07B62; color-scheme: dark; }
body { background:var(--bg); color:var(--ink); font:15px/1.5 var(--text); }
.wrap { max-width:1180px; margin:0 auto; padding-block:28px 48px; padding-left:max(16px, env(safe-area-inset-left, 0px)); padding-right:max(16px, env(safe-area-inset-right, 0px)); }
h1 { font:600 32px/1.15 var(--display); margin:0; text-wrap:balance; }
h2 { font:600 15px/1.3 var(--text); margin:0 0 10px; letter-spacing:.02em; }
.eyebrow { color:var(--accent); font-weight:600; letter-spacing:.08em; text-transform:uppercase; font-size:12px; margin:0 0 6px; }
.lede { color:var(--ink-2); max-width:70ch; margin:8px 0 0; }
.layout { display:grid; grid-template-columns:minmax(0, 340px) minmax(0, 1fr); gap:20px; margin-top:22px; align-items:start; }
@media (max-width: 860px) { .layout { grid-template-columns:minmax(0, 1fr); } }
.panel { background:var(--surface); border:1px solid var(--rule); border-radius:12px; padding:16px 18px; min-width:0; }
.presets { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; }
.presets button { flex:1; min-width:90px; font:500 14px var(--text); padding:8px 10px; border-radius:8px; border:1px solid var(--rule); background:transparent; color:var(--ink-2); cursor:pointer; }
.presets button[aria-pressed="true"] { background:var(--ink); color:var(--surface); border-color:var(--ink); }
.presets button:focus-visible, input:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
.field { display:grid; grid-template-columns:1fr 92px; gap:4px 10px; align-items:center; padding:9px 0; border-top:1px solid var(--rule); }
.field label { font-size:13.5px; color:var(--ink); }
.field input[type=number] { width:100%; font:500 14px var(--text); font-variant-numeric:tabular-nums; text-align:right; padding:5px 7px; border:1px solid var(--rule); border-radius:6px; background:var(--bg); color:var(--ink); }
.field input[type=range] { grid-column:1 / -1; width:100%; accent-color:var(--accent); }
.field small { grid-column:1 / -1; color:var(--muted); font-size:12px; }
.kpis { display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:10px; }
@media (max-width: 560px) { .kpis { grid-template-columns:repeat(2, minmax(0, 1fr)); } }
.kpi { background:var(--surface); border:1px solid var(--rule); border-radius:12px; padding:14px 16px; }
.kpi .v { font:600 28px/1.1 var(--text); font-variant-numeric:tabular-nums; }
.kpi .l { color:var(--ink-2); font-size:13px; margin-top:4px; }
.kpi .v.neg { color:var(--bad); }
.stack { display:grid; gap:16px; min-width:0; }
.note { color:var(--muted); font-size:13px; margin:0 0 8px; }
.tablewrap { overflow-x:auto; }
table { width:100%; border-collapse:collapse; font-variant-numeric:tabular-nums; font-size:14px; }
th, td { text-align:right; padding:7px 8px; border-bottom:1px solid var(--rule); white-space:nowrap; }
th:first-child, td:first-child { text-align:left; }
th { color:var(--ink-2); font-weight:600; }
svg { display:block; width:100%; height:auto; overflow:visible; }
svg text { fill:var(--muted); font:12px var(--text); }
.tip { position:absolute; pointer-events:none; background:var(--ink); color:var(--surface); padding:6px 9px; border-radius:6px; font-size:12.5px; white-space:nowrap; opacity:0; }
.chartbox { position:relative; }
.sources li { margin:4px 0; color:var(--ink-2); font-size:13px; }
.sources a { color:var(--accent); }
footer { color:var(--muted); font-size:12.5px; margin-top:18px; max-width:90ch; }
@media (prefers-reduced-motion: reduce) { * { transition:none !important; } }
</style>
<div class="wrap">
  <p class="eyebrow">FinTechCo · Claude Code evaluation</p>
  <h1>What is Claude Code worth to FinTechCo?</h1>
  <p class="lede">Change any assumption and the model recalculates. Value is engineering time redirected to the roadmap, not headcount cut. The inputs start at the base case from the brief's team sizes; replace them with your own figures.</p>
  <div class="layout">
    <aside class="panel" aria-label="Assumptions">
      <div class="presets" role="group" aria-label="Scenario presets">
        <button type="button" id="preset-conservative" data-preset="conservative">Conservative</button>
        <button type="button" id="preset-base" data-preset="base" aria-pressed="true">Base</button>
        <button type="button" id="preset-upside" data-preset="upside">Upside</button>
      </div>
      <div id="fields"></div>
    </aside>
    <section class="stack" aria-live="polite">
      <div class="kpis" id="kpis"></div>
      <div class="panel"><h2>Cumulative net benefit, first 24 months</h2>
        <p class="note">Includes one-time enablement and the adoption ramp. The point where the line crosses zero is payback.</p>
        <div class="chartbox"><div id="cash"></div><div class="tip" id="tip"></div></div></div>
      <div class="panel"><h2>By team, at steady state</h2><div class="tablewrap"><table id="teams"></table></div></div>
      <div class="panel"><h2>What moves the answer</h2>
        <p class="note">Annual net benefit when one assumption moves to its conservative or upside value and the rest stay as entered.</p>
        <div id="tornado"></div></div>
      <div class="panel sources"><h2>Where the starting values come from</h2><ul id="sources"></ul></div>
    </section>
  </div>
  <footer>Model: value/roi.mjs (unit-tested), the same code behind the ROI leave-behind. Usage price uses Anthropic's published enterprise average; FinTechCo's actual price is to be quoted. FinTechCo is fictional; this is an illustration for the evaluation, not a quote.</footer>
</div>
<script type="module">
${model}
const ASSUMPTIONS = ${json(assumptions)};
const SOURCES = ${json(sources)};
const FIELDS = {
  'ASM-01': { step: 1, min: 0, max: 400 }, 'ASM-02': { step: 1, min: 0, max: 200 }, 'ASM-03': { step: 1, min: 0, max: 100 },
  'ASM-04': { step: 5000, min: 100000, max: 350000, fmt: (v) => usd(v) }, 'ASM-06': { step: 0.5, min: 0, max: 12 },
  'ASM-07': { step: 0.05, min: 0.1, max: 1, pct: true }, 'ASM-08': { step: 0.05, min: 0.1, max: 1, pct: true },
  'ASM-09': { step: 10, min: 0, max: 600 }, 'ASM-10': { step: 1, min: 0, max: 24 }, 'ASM-11': { step: 0.25, min: 0, max: 4 }, 'ASM-12': { step: 1, min: 1, max: 12 },
};
let inputs = scenarioInputs(ASSUMPTIONS, 'base');
const $ = (id) => document.getElementById(id);
const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const NS = 'http://www.w3.org/2000/svg';
const el = (t, a, p) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); p && p.appendChild(e); return e; };

function renderFields() {
  $('fields').innerHTML = ASSUMPTIONS.filter((a) => FIELDS[a.id]).map((a) => {
    const f = FIELDS[a.id]; const unit = f.pct ? '%' : a.unit;
    const v = f.pct ? Math.round(inputs[a.id] * 100) : inputs[a.id];
    return '<div class="field"><label for="in-' + a.id + '">' + a.name + '</label>' +
      '<input type="number" id="in-' + a.id + '" data-id="' + a.id + '" value="' + v + '" step="' + (f.pct ? 5 : f.step) + '" min="' + (f.pct ? f.min * 100 : f.min) + '" max="' + (f.pct ? f.max * 100 : f.max) + '" aria-describedby="u-' + a.id + '">' +
      '<input type="range" id="rg-' + a.id + '" data-id="' + a.id + '" value="' + v + '" step="' + (f.pct ? 5 : f.step) + '" min="' + (f.pct ? f.min * 100 : f.min) + '" max="' + (f.pct ? f.max * 100 : f.max) + '" aria-label="' + a.name + '">' +
      '<small id="u-' + a.id + '">' + unit + ' · conservative ' + show(a, a.conservative) + ', upside ' + show(a, a.upside) + '</small></div>';
  }).join('');
  for (const inp of $('fields').querySelectorAll('input')) inp.addEventListener('input', (e) => {
    const id = e.target.dataset.id, f = FIELDS[id]; let v = Number(e.target.value); if (!Number.isFinite(v)) return;
    inputs[id] = f.pct ? v / 100 : v;
    const twin = e.target.type === 'range' ? $('in-' + id) : $('rg-' + id); twin.value = e.target.value;
    document.querySelectorAll('.presets button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    renderResults();
  });
}
const show = (a, v) => (FIELDS[a.id]?.pct ? Math.round(v * 100) + '%' : FIELDS[a.id]?.fmt ? FIELDS[a.id].fmt(v) : v);

function renderResults() {
  const r = computeRoi(inputs);
  const tiles = [
    [musd(r.net), 'Annual net benefit at steady state', r.net < 0],
    [Math.round(r.roi * 100) + '%', 'ROI (net ÷ annual cost)', r.roi < 0],
    [r.paybackMonth ? 'Month ' + r.paybackMonth : 'Beyond 24 months', 'Payback, including ramp and enablement', !r.paybackMonth],
    [musd(r.year1Net), 'Year-1 net, including ramp and enablement', r.year1Net < 0],
    [r.fte.toFixed(1) + ' FTE', 'Capacity redirected to the roadmap', false],
    [r.breakEvenHours.toFixed(1) + ' h', 'Break-even: hours saved per active user per week', false],
  ];
  $('kpis').innerHTML = tiles.map(([v, l, neg]) => '<div class="kpi"><div class="v' + (neg ? ' neg' : '') + '">' + v + '</div><div class="l">' + l + '</div></div>').join('');
  $('teams').innerHTML = '<tr><th>Team</th><th>People</th><th>Active</th><th>Hours redirected / yr</th><th>Value / yr</th><th>Usage cost / yr</th></tr>' +
    r.perTeam.map((t) => '<tr><td>' + t.name + '</td><td>' + t.people + '</td><td>' + Math.round(t.active) + '</td><td>' + Math.round(t.hoursSaved).toLocaleString('en-US') + '</td><td>' + usd(t.value) + '</td><td>' + usd(t.usageCost) + '</td></tr>').join('') +
    '<tr><td>Platform team + enablement</td><td></td><td></td><td></td><td></td><td>' + usd(r.platformAnnual) + ' + ' + usd(r.enablementOneTime) + ' once</td></tr>';
  cash(r); tornado();
}

function cash(r) {
  const host = $('cash'); host.innerHTML = '';
  const W = 640, H = 240, m = { l: 64, r: 14, t: 12, b: 28 };
  const svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Cumulative net benefit by month' }, host);
  const ys = r.monthly.map((p) => p.cumulative).concat([0, -r.enablementOneTime]);
  const lo = Math.min(...ys), hi = Math.max(...ys), pad = (hi - lo) * 0.08 || 1;
  const x = (mth) => m.l + (mth / 24) * (W - m.l - m.r), y = (v) => m.t + (hi + pad - v) / (hi - lo + 2 * pad) * (H - m.t - m.b);
  const step = Math.pow(10, Math.floor(Math.log10((hi - lo) / 3 || 1))); const nice = [1, 2, 5].map((k) => k * step).find((s) => (hi - lo) / s <= 5) || step * 10;
  for (let t = Math.ceil((lo - pad) / nice) * nice; t <= hi + pad; t += nice) {
    el('line', { x1: m.l, x2: W - m.r, y1: y(t), y2: y(t), stroke: css(Math.abs(t) < 1e-6 ? '--ink-2' : '--grid') }, svg);
    el('text', { x: m.l - 6, y: y(t) + 4, 'text-anchor': 'end' }, svg).textContent = musd(t);
  }
  for (const mth of [0, 6, 12, 18, 24]) el('text', { x: x(mth), y: H - 6, 'text-anchor': 'middle' }, svg).textContent = mth === 0 ? 'Start' : 'Month ' + mth;
  const pts = [[0, -r.enablementOneTime], ...r.monthly.map((p) => [p.month, p.cumulative])];
  el('polyline', { points: pts.map(([a, b]) => x(a) + ',' + y(b)).join(' '), fill: 'none', stroke: css('--s1'), 'stroke-width': 2, 'stroke-linejoin': 'round' }, svg);
  if (r.paybackMonth) el('circle', { cx: x(r.paybackMonth), cy: y(r.monthly[r.paybackMonth - 1].cumulative), r: 5, fill: css('--s1'), stroke: css('--surface'), 'stroke-width': 2 }, svg);
  const dot = el('circle', { r: 4.5, fill: css('--s1'), stroke: css('--surface'), 'stroke-width': 2, opacity: 0 }, svg);
  const hit = el('rect', { x: m.l, y: m.t, width: W - m.l - m.r, height: H - m.t - m.b, fill: 'transparent' }, svg);
  const tip = $('tip');
  hit.addEventListener('mousemove', (ev) => {
    const b = svg.getBoundingClientRect(); const px = (ev.clientX - b.left) * W / b.width;
    const mth = Math.max(0, Math.min(24, Math.round((px - m.l) / (W - m.l - m.r) * 24))); const v = mth === 0 ? -r.enablementOneTime : r.monthly[mth - 1].cumulative;
    dot.setAttribute('cx', x(mth)); dot.setAttribute('cy', y(v)); dot.setAttribute('opacity', 1);
    tip.textContent = (mth === 0 ? 'Start' : 'Month ' + mth) + ': ' + musd(v); tip.style.opacity = 1;
    const s = b.width / W; let left = x(mth) * s + 10; if (left + 140 > b.width) left -= 160; tip.style.left = left + 'px'; tip.style.top = (y(v) * s - 30) + 'px';
  });
  hit.addEventListener('mouseleave', () => { dot.setAttribute('opacity', 0); tip.style.opacity = 0; });
}

function tornado() {
  const rows = ASSUMPTIONS.filter((a) => a.conservative !== a.upside).map((a) => {
    const low = computeRoi({ ...inputs, [a.id]: a.conservative }).net, high = computeRoi({ ...inputs, [a.id]: a.upside }).net;
    return { name: a.name.replace(/ \\(.*\\)/, ''), low, high, swing: Math.abs(high - low) };
  }).filter((r) => r.swing > 1).sort((p, q) => q.swing - p.swing);
  const cur = computeRoi(inputs).net; const host = $('tornado'); host.innerHTML = '';
  const W = 640, rowH = 34, m = { l: 270, r: 70, t: 22, b: 6 }, H = m.t + rows.length * rowH + m.b;
  const svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Sensitivity of annual net benefit' }, host);
  const vals = rows.flatMap((r) => [r.low, r.high]).concat(cur); const lo = Math.min(...vals), hi = Math.max(...vals);
  const x = (v) => m.l + (v - lo) / ((hi - lo) || 1) * (W - m.l - m.r);
  el('line', { x1: x(cur), x2: x(cur), y1: m.t - 6, y2: H - m.b, stroke: css('--ink-2') }, svg);
  el('text', { x: x(cur), y: 12, 'text-anchor': 'middle' }, svg).textContent = 'As entered ' + musd(cur);
  rows.forEach((r, i) => {
    const yy = m.t + i * rowH + 6, h = rowH - 12;
    el('text', { x: m.l - 10, y: yy + h / 2 + 4, 'text-anchor': 'end' }, svg).textContent = r.name.length > 42 ? r.name.slice(0, 41) + '…' : r.name;
    const seg = (v, col) => el('rect', { x: Math.min(x(cur), x(v)), y: yy, width: Math.max(2, Math.abs(x(v) - x(cur))), height: h, rx: 3, fill: css(col) }, svg);
    seg(r.low, '--s2'); seg(r.high, '--s1');
    el('text', { x: Math.max(x(r.low), x(r.high)) + 6, y: yy + h / 2 + 4 }, svg).textContent = musd(Math.max(r.low, r.high));
  });
  const legend = document.createElement('p'); legend.className = 'note';
  legend.innerHTML = '<span style="color:var(--s2)">■</span> conservative value · <span style="color:var(--s1)">■</span> upside value';
  host.appendChild(legend);
}

function renderSources() {
  $('sources').innerHTML = ASSUMPTIONS.filter((a) => FIELDS[a.id]).map((a) => {
    const linked = a.basis.replace(/\\[(CLM-\\d{3})\\]/g, (_, id) => SOURCES[id] ? '<a href="' + SOURCES[id].url + '" target="_blank" rel="noopener">' + SOURCES[id].publisher + '</a>' : id);
    return '<li><b>' + a.name + '</b>: ' + linked + '</li>';
  }).join('');
}

document.querySelectorAll('.presets button').forEach((b) => b.addEventListener('click', () => {
  inputs = scenarioInputs(ASSUMPTIONS, b.dataset.preset);
  document.querySelectorAll('.presets button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  renderFields(); renderResults();
}));
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', renderResults);
new MutationObserver(renderResults).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
renderFields(); renderResults(); renderSources();
</script>
`;
writeFileSync(here('./index.html'), page);
console.log('wrote value/calculator/index.html', (page.length / 1024).toFixed(0) + ' KB', Object.keys(sources).length + ' sources');
