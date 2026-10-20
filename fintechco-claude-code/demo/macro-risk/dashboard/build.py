"""Build dashboard/index.html: one self-contained file (data inline, SVG drawn by plain JS, no network).

Run after `python -m analysis.report`. Open the result in any browser.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "dashboard" / "index.html"


def payload() -> dict:
    ph = json.loads((ROOT / "outputs" / "phillips.json").read_text())
    fv = json.loads((ROOT / "outputs" / "fed_policy_vol.json").read_text())
    scatter = [r for r in ph["series"] if r["month"][:3] in ("201", "202")]
    return {
        "sample": ph["sample"], "latest": ph["latest"], "decades": ph["by_decade"],
        "rolling": ph["rolling_10y"], "scatter": scatter,
        "fed": {"summary": fv["summary"], "from": fv["events_from"], "to": fv["events_to"], "n": len(fv["events"]),
                "events": [{"date": e["date"], "dir": e["direction"]} for e in fv["events"]],
                "vix": fv["vix_monthly"], "target": [t for t in fv["target_monthly"] if t["month"] >= "1990"]},
    }


HTML = r"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Macro Risk Dashboard</title>
<style>
:root { color-scheme: light;
  --bg:#F6F4EF; --surface:#FBFAF6; --ink:#1B1F24; --ink-2:#4A5560; --muted:#6B7480; --rule:#E2DED5; --grid:#ECE8DF;
  --accent:#1F6F6B; --s1:#2a78d6; --s2:#eb6834; --band:rgba(42,120,214,.16); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { color-scheme: dark;
  --bg:#13202B; --surface:#17222B; --ink:#F2EFE8; --ink-2:#C5CCD3; --muted:#9AA5AF; --rule:#2A3742; --grid:#22303A;
  --accent:#4FB3A9; --s1:#3987e5; --s2:#d95926; --band:rgba(57,135,229,.22); } }
:root[data-theme="dark"] { color-scheme: dark;
  --bg:#13202B; --surface:#17222B; --ink:#F2EFE8; --ink-2:#C5CCD3; --muted:#9AA5AF; --rule:#2A3742; --grid:#22303A;
  --accent:#4FB3A9; --s1:#3987e5; --s2:#d95926; --band:rgba(57,135,229,.22); }
* { box-sizing: border-box; }
body { margin:0; background:var(--bg); color:var(--ink); font:16px/1.45 "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif; }
main { max-width:1180px; margin:0 auto; padding:28px 16px 48px; }
header { display:flex; justify-content:space-between; align-items:baseline; gap:16px; flex-wrap:wrap; }
h1 { font:600 30px/1.15 "Source Serif 4", Georgia, serif; margin:0; }
h2 { font:600 19px/1.3 "IBM Plex Sans", system-ui, sans-serif; margin:0 0 4px; }
.sub, .note { color:var(--ink-2); margin:4px 0 0; }
.note { font-size:13.5px; color:var(--muted); }
.eyebrow { color:var(--accent); font-weight:600; letter-spacing:.08em; text-transform:uppercase; font-size:12.5px; }
.kpis { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; margin:22px 0; }
.kpi, .card { background:var(--surface); border:1px solid var(--rule); border-radius:12px; padding:16px 18px; }
.kpi .v { font:600 32px/1.1 "IBM Plex Sans", system-ui, sans-serif; font-variant-numeric:tabular-nums; margin-top:6px; }
.kpi .l { color:var(--ink-2); font-size:14px; }
.grid2 { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,520px),1fr)); gap:16px; margin-top:16px; }
.card { position:relative; }
svg { display:block; width:100%; height:auto; overflow:visible; }
svg text { fill:var(--muted); font:12px system-ui, sans-serif; }
.legend { display:flex; gap:16px; flex-wrap:wrap; margin:6px 0 0; font-size:13.5px; color:var(--ink-2); }
.sw { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:6px; vertical-align:baseline; }
table { width:100%; border-collapse:collapse; font-variant-numeric:tabular-nums; font-size:14px; margin-top:8px; }
th, td { text-align:right; padding:7px 8px; border-bottom:1px solid var(--rule); }
th:first-child, td:first-child { text-align:left; }
th { color:var(--ink-2); font-weight:600; }
.tip { position:absolute; pointer-events:none; background:var(--ink); color:var(--surface); padding:6px 9px; border-radius:6px; font-size:13px; line-height:1.35; white-space:nowrap; opacity:0; transition:opacity .08s; z-index:2; }
.theme { background:none; border:1px solid var(--rule); color:var(--ink-2); border-radius:8px; padding:6px 10px; font:inherit; font-size:13px; cursor:pointer; }
footer { margin-top:24px; color:var(--muted); font-size:13px; }
</style>
</head>
<body>
<main>
<header>
  <div><p class="eyebrow">FinTechCo · credit &amp; portfolio risk</p>
  <h1>Macro risk dashboard</h1>
  <p class="sub">Inflation, labor-market slack and Fed policy, from public FRED data.</p></div>
  <button class="theme" id="theme" type="button">Toggle theme</button>
</header>
<section class="kpis" id="kpis"></section>
<div class="grid2">
  <div class="card"><h2>Rolling 10-year Phillips-curve slope</h2>
    <p class="note">Slope of core PCE inflation on the unemployment gap; shaded band is the 95% interval. Closer to zero = flatter.</p>
    <div id="rolling"></div></div>
  <div class="card"><h2>Slope by decade</h2>
    <p class="note">Negative = the textbook trade-off (tight labor market, higher inflation).</p>
    <div id="decades"></div></div>
  <div class="card"><h2>2010s vs 2020s: inflation and slack</h2>
    <p class="note">Each dot is a month. Lines are least-squares fits.</p>
    <div class="legend" id="scatter-legend"></div><div id="scatter"></div></div>
  <div class="card"><h2>VIX around Fed rate changes</h2>
    <p class="note" id="fed-note"></p>
    <table id="fed-table"></table></div>
</div>
<div class="card" style="margin-top:16px"><h2>Fed target rate and VIX, 1990 to today</h2>
  <p class="note">Two panels on one time axis (different units, so no shared y-axis). Ticks mark rate changes: up = hike, down = cut.</p>
  <div id="target"></div><div id="vix"></div></div>
<footer id="foot"></footer>
</main>
<script>
const D = __DATA__;
const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
const fmt = (v, d = 2) => { const t = v.toFixed(d); return Number(t) === 0 ? t.replace('-', '') : (v > 0 ? '+' : '') + t; };
const yr = (s) => new Date(s + (s.length === 7 ? '-01' : '')).getTime();

function frame(id, w, h, m) {
  const host = document.getElementById(id); host.innerHTML = '';
  const svg = el('svg', { viewBox: `0 0 ${w} ${h}`, role: 'img' }, host);
  const tip = document.createElement('div'); tip.className = 'tip'; host.parentElement.appendChild(tip);
  return { svg, tip, w, h, m, iw: w - m.l - m.r, ih: h - m.t - m.b, host };
}
const lin = (d0, d1, r0, r1) => (v) => r0 + (v - d0) / (d1 - d0) * (r1 - r0);
function yAxis(f, y, ticks, fmtT = (t) => t) {
  for (const t of ticks) {
    el('line', { x1: f.m.l, x2: f.w - f.m.r, y1: y(t), y2: y(t), stroke: css(t === 0 ? '--ink-2' : '--grid'), 'stroke-width': t === 0 ? 1 : 1 }, f.svg);
    const tx = el('text', { x: f.m.l - 6, y: y(t) + 4, 'text-anchor': 'end' }, f.svg); tx.textContent = fmtT(t);
  }
}
function xYears(f, x, years) {
  for (const yv of years) { const tx = el('text', { x: x(new Date(`${yv}-01-01`).getTime()), y: f.h - 6, 'text-anchor': 'middle' }, f.svg); tx.textContent = yv; }
}
function showTip(f, html, px, py) {
  f.tip.innerHTML = html; f.tip.style.opacity = 1;
  const r = f.host.getBoundingClientRect(), p = f.host.parentElement.getBoundingClientRect(), s = r.width / f.w;
  let left = r.left - p.left + px * s + 12; const top = r.top - p.top + py * s - 10;
  if (left + f.tip.offsetWidth > p.width - 8) left = r.left - p.left + px * s - f.tip.offsetWidth - 12;
  f.tip.style.left = left + 'px'; f.tip.style.top = top + 'px';
}
const hideTip = (f) => { f.tip.style.opacity = 0; };

function kpis() {
  const dec = Object.fromEntries(D.decades.map((d) => [d.decade, d]));
  const cut = D.fed.summary.find((r) => r.direction === 'cut'), hike = D.fed.summary.find((r) => r.direction === 'hike');
  const tiles = [
    [D.latest.inflation.toFixed(1) + '%', `Core PCE inflation, ${D.latest.month.slice(0, 7)}`],
    [fmt(D.latest.gap) + ' pts', 'Unemployment gap (rate minus CBO natural rate)'],
    [`${fmt(dec['2010s'].slope)} → ${fmt(dec['2020s'].slope)}`, 'Phillips slope, 2010s → 2020s'],
    [`${cut.avg_vix_before.toFixed(1)} vs ${hike.avg_vix_before.toFixed(1)}`, 'Average VIX the day before a cut vs a hike'],
  ];
  document.getElementById('kpis').innerHTML = tiles.map(([v, l]) => `<div class="kpi"><div class="v">${v}</div><div class="l">${l}</div></div>`).join('');
}

function rolling() {
  const f = frame('rolling', 560, 280, { l: 40, r: 12, t: 12, b: 26 });
  const xs = D.rolling.map((r) => yr(r.end));
  const x = lin(Math.min(...xs), Math.max(...xs), f.m.l, f.w - f.m.r);
  const lo = Math.min(...D.rolling.map((r) => r.ci_low)), hi = Math.max(...D.rolling.map((r) => r.ci_high));
  const y = lin(Math.floor(lo * 2) / 2, Math.ceil(hi * 2) / 2, f.h - f.m.b, f.m.t);
  const ticks = []; for (let t = Math.floor(lo * 2) / 2; t <= Math.ceil(hi * 2) / 2 + 1e-9; t += 0.5) ticks.push(+t.toFixed(1));
  yAxis(f, y, ticks, (t) => t.toFixed(1)); xYears(f, x, [1980, 1990, 2000, 2010, 2020]);
  const band = D.rolling.map((r, i) => `${x(xs[i])},${y(r.ci_high)}`).concat(D.rolling.slice().reverse().map((r, i) => `${x(xs[xs.length - 1 - i])},${y(r.ci_low)}`));
  el('polygon', { points: band.join(' '), fill: css('--band') }, f.svg);
  el('polyline', { points: D.rolling.map((r, i) => `${x(xs[i])},${y(r.slope)}`).join(' '), fill: 'none', stroke: css('--s1'), 'stroke-width': 2, 'stroke-linejoin': 'round' }, f.svg);
  const cross = el('line', { y1: f.m.t, y2: f.h - f.m.b, stroke: css('--ink-2'), 'stroke-dasharray': '3 3', opacity: 0 }, f.svg);
  const dot = el('circle', { r: 4.5, fill: css('--s1'), stroke: css('--surface'), 'stroke-width': 2, opacity: 0 }, f.svg);
  const hit = el('rect', { x: f.m.l, y: f.m.t, width: f.iw, height: f.ih, fill: 'transparent' }, f.svg);
  hit.addEventListener('mousemove', (ev) => {
    const pt = f.svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY; const p = pt.matrixTransform(f.svg.getScreenCTM().inverse());
    let i = 0, best = Infinity; xs.forEach((v, k) => { const d = Math.abs(x(v) - p.x); if (d < best) { best = d; i = k; } });
    const r = D.rolling[i]; cross.setAttribute('x1', x(xs[i])); cross.setAttribute('x2', x(xs[i])); cross.setAttribute('opacity', 1);
    dot.setAttribute('cx', x(xs[i])); dot.setAttribute('cy', y(r.slope)); dot.setAttribute('opacity', 1);
    showTip(f, `10 years to ${r.end.slice(0, 7)}<br><b>Slope ${fmt(r.slope)}</b><br>95%: ${fmt(r.ci_low)} to ${fmt(r.ci_high)}`, x(xs[i]), y(r.slope));
  });
  hit.addEventListener('mouseleave', () => { cross.setAttribute('opacity', 0); dot.setAttribute('opacity', 0); hideTip(f); });
}

function decades() {
  const f = frame('decades', 560, 280, { l: 60, r: 56, t: 8, b: 20 });
  const lo = Math.min(-1, ...D.decades.map((d) => d.slope)), hi = Math.max(1, ...D.decades.map((d) => d.slope));
  const x = lin(lo, hi, f.m.l, f.w - f.m.r); const bh = f.ih / D.decades.length;
  el('line', { x1: x(0), x2: x(0), y1: f.m.t, y2: f.h - f.m.b, stroke: css('--ink-2') }, f.svg);
  D.decades.forEach((d, i) => {
    const yy = f.m.t + i * bh + bh * 0.18, h = bh * 0.64, x0 = Math.min(x(0), x(d.slope)), w = Math.max(2, Math.abs(x(d.slope) - x(0)));
    const bar = el('rect', { x: x0, y: yy, width: w, height: h, rx: 4, fill: css('--s1') }, f.svg);
    const lab = el('text', { x: f.m.l - 8, y: yy + h / 2 + 4, 'text-anchor': 'end' }, f.svg); lab.textContent = d.decade;
    const val = el('text', { x: d.slope >= 0 ? x(d.slope) + 6 : x(d.slope) - 6, y: yy + h / 2 + 4, 'text-anchor': d.slope >= 0 ? 'start' : 'end', style: `fill:${css('--ink')}` }, f.svg); val.textContent = fmt(d.slope);
    const hit = el('rect', { x: f.m.l, y: f.m.t + i * bh, width: f.iw, height: bh, fill: 'transparent' }, f.svg);
    hit.addEventListener('mousemove', () => showTip(f, `<b>${d.decade}</b>: slope ${fmt(d.slope)}<br>95%: ${fmt(d.ci_low)} to ${fmt(d.ci_high)} · R² ${d.r2.toFixed(2)} · ${d.n} months`, x(d.slope), yy));
    hit.addEventListener('mouseleave', () => hideTip(f));
  });
}

function scatter() {
  const f = frame('scatter', 560, 300, { l: 40, r: 12, t: 10, b: 34 });
  const groups = [['2010s', '201', '--s1'], ['2020s', '202', '--s2']];
  const pts = D.scatter; const gx = pts.map((p) => p.gap), gy = pts.map((p) => p.inflation);
  const x = lin(Math.floor(Math.min(...gx)), Math.ceil(Math.max(...gx)), f.m.l, f.w - f.m.r);
  const y = lin(0, Math.ceil(Math.max(...gy)), f.h - f.m.b, f.m.t);
  const yt = []; for (let t = 0; t <= Math.ceil(Math.max(...gy)); t += 1) yt.push(t);
  yAxis(f, y, yt, (t) => t + '%');
  for (let t = Math.floor(Math.min(...gx)); t <= Math.ceil(Math.max(...gx)); t += 2) { const tx = el('text', { x: x(t), y: f.h - 18, 'text-anchor': 'middle' }, f.svg); tx.textContent = (t > 0 ? '+' : '') + t; }
  const xl = el('text', { x: (f.m.l + f.w - f.m.r) / 2, y: f.h - 2, 'text-anchor': 'middle' }, f.svg); xl.textContent = 'Unemployment gap (points) — right = more slack';
  const clip = el('clipPath', { id: 'plot-clip' }, el('defs', {}, f.svg));
  el('rect', { x: f.m.l, y: f.m.t, width: f.iw, height: f.ih }, clip);
  for (const [name, pre, col] of groups) {
    const g = pts.filter((p) => p.month.startsWith(pre)); const dec = D.decades.find((d) => d.decade === name);
    const xa = Math.min(...g.map((p) => p.gap)), xb = Math.max(...g.map((p) => p.gap));
    for (const p of g) {
      const c = el('circle', { cx: x(p.gap), cy: y(p.inflation), r: 4, fill: css(col), stroke: css('--surface'), 'stroke-width': 1.5, opacity: 0.9 }, f.svg);
      c.addEventListener('mousemove', () => showTip(f, `<b>${p.month.slice(0, 7)}</b><br>Core PCE ${p.inflation.toFixed(1)}% · gap ${fmt(p.gap)}`, x(p.gap), y(p.inflation)));
      c.addEventListener('mouseleave', () => hideTip(f));
    }
    el('line', { x1: x(xa), x2: x(xb), y1: y(dec.intercept + dec.slope * xa), y2: y(dec.intercept + dec.slope * xb), stroke: css(col), 'stroke-width': 2, 'clip-path': 'url(#plot-clip)' }, f.svg);
  }
  document.getElementById('scatter-legend').innerHTML = groups.map(([n, , c]) => { const d = D.decades.find((x) => x.decade === n); return `<span><span class="sw" style="background:${css(c)}"></span>${n} (slope ${fmt(d.slope)})</span>`; }).join('');
}

function fedTable() {
  const s = Object.fromEntries(D.fed.summary.map((r) => [r.direction, r]));
  document.getElementById('fed-note').textContent = `${D.fed.n} target changes, ${D.fed.from.slice(0, 4)}–${D.fed.to.slice(0, 7)}. Change in VIX from the day before the move.`;
  const row = (label, k, f = (v) => fmt(v, 1)) => `<tr><td>${label}</td><td>${f(s.cut[k])}</td><td>${f(s.hike[k])}</td></tr>`;
  document.getElementById('fed-table').innerHTML = `<tr><th></th><th>Cuts (${s.cut.events})</th><th>Hikes (${s.hike.events})</th></tr>` +
    row('VIX the day before (avg)', 'avg_vix_before', (v) => v.toFixed(1)) + row('Median change, 1 day', 'median_dvix_1d') + row('Median change, 5 days', 'median_dvix_5d') +
    row('Median change, 20 days', 'median_dvix_20d') + row('Share higher after 20 days', 'share_up_20d', (v) => Math.round(v * 100) + '%') +
    `<tr><td colspan="3" style="text-align:left;color:var(--muted)">Cuts cluster in crises (2001, 2008, 2020): volatility often drives the cut. Co-movement, not a policy effect.</td></tr>`;
}

function timeline(id, series, key, label, unit, events) {
  const f = frame(id, 1120, events ? 200 : 180, { l: 44, r: 12, t: 16, b: events ? 8 : 24 });
  const xs = series.map((p) => yr(p.month.slice(0, 7))); const x = lin(yr('1990-01'), Math.max(...xs), f.m.l, f.w - f.m.r);
  const vmax = Math.ceil(Math.max(...series.map((p) => p[key])) / 10) * 10 || 10;
  const y = lin(0, events ? Math.ceil(Math.max(...series.map((p) => p[key]))) : vmax, f.h - f.m.b, f.m.t);
  const ticks = events ? [0, 2, 4, 6, 8] : [0, 20, 40, 60, 80].filter((t) => t <= vmax);
  yAxis(f, y, ticks, (t) => t + unit); if (!events) xYears(f, x, [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025]);
  const t0 = el('text', { x: f.m.l, y: 11 }, f.svg); t0.textContent = label;
  el('polyline', { points: series.map((p, i) => `${x(xs[i])},${y(p[key])}`).join(' '), fill: 'none', stroke: css('--s1'), 'stroke-width': 2, 'stroke-linejoin': 'round' }, f.svg);
  if (events) for (const e of D.fed.events) {
    const ex = x(yr(e.date.slice(0, 7))), up = e.dir === 'hike';
    el('path', { d: up ? `M${ex - 4},${f.h - f.m.b} l4,-8 l4,8z` : `M${ex - 4},${f.h - f.m.b - 8} l4,8 l4,-8z`, fill: css(up ? '--s2' : '--s1') }, f.svg);
  }
  const cross = el('line', { y1: f.m.t, y2: f.h - f.m.b, stroke: css('--ink-2'), 'stroke-dasharray': '3 3', opacity: 0 }, f.svg);
  const hit = el('rect', { x: f.m.l, y: f.m.t, width: f.iw, height: f.ih, fill: 'transparent' }, f.svg);
  hit.addEventListener('mousemove', (ev) => {
    const pt = f.svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY; const p = pt.matrixTransform(f.svg.getScreenCTM().inverse());
    let i = 0, best = Infinity; xs.forEach((v, k) => { const d = Math.abs(x(v) - p.x); if (d < best) { best = d; i = k; } });
    cross.setAttribute('x1', x(xs[i])); cross.setAttribute('x2', x(xs[i])); cross.setAttribute('opacity', 1);
    showTip(f, `${series[i].month.slice(0, 7)}: <b>${series[i][key].toFixed(2)}${unit}</b>`, x(xs[i]), y(series[i][key]));
  });
  hit.addEventListener('mouseleave', () => { cross.setAttribute('opacity', 0); hideTip(f); });
}

function render() {
  document.querySelectorAll('.tip').forEach((t) => t.remove());
  kpis(); rolling(); decades(); scatter(); fedTable();
  timeline('target', D.fed.target, 'target', 'Fed funds target (upper bound), % — ▲ hike ▼ cut', '%', true);
  timeline('vix', D.fed.vix, 'vix', 'VIX, monthly average', '', false);
  document.getElementById('foot').innerHTML = `Source: Federal Reserve Bank of St. Louis (FRED): BLS, BEA, CBO, Federal Reserve Board, CBOE; downloaded 2026-10-20. Sample ${D.sample.start.slice(0, 7)} to ${D.sample.end.slice(0, 7)}. Descriptive statistics only; see outputs/findings.md for caveats. Synthetic client context; FinTechCo is fictional.`;
}
document.getElementById('theme').addEventListener('click', () => {
  const r = document.documentElement, dark = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  r.dataset.theme = dark ? 'light' : 'dark'; render();
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', render);
render();
</script>
</body>
</html>
"""


def build() -> Path:
    data = json.dumps(payload(), separators=(",", ":")).replace("</", "<\\/")
    OUT.write_text(HTML.replace("__DATA__", data))
    return OUT


if __name__ == "__main__":
    print(f"wrote {build()}")
