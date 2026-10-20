#!/usr/bin/env node
// ROI model for Claude Code at FinTechCo. Pure functions; zero dependencies.
//   node value/roi.mjs            print the scenarios table and sensitivity as markdown
// The calculator page (value/calculator/) inlines this file, so keep it browser-safe:
// no imports in the functions below, only in main().

export const TEAMS = [
  { id: 'swe', name: 'Software engineers', headcount: 'ASM-01' },
  { id: 'ds', name: 'Data scientists', headcount: 'ASM-02' },
  { id: 'sre', name: 'Site reliability engineers', headcount: 'ASM-03' },
];
export const SCENARIOS = ['conservative', 'base', 'upside'];

/** Inputs for one scenario: { 'ASM-01': value, ... }. */
export function scenarioInputs(assumptions, scenario) {
  return Object.fromEntries(assumptions.map((a) => [a.id, a[scenario]]));
}

/**
 * Annual steady-state economics plus a 24-month cash view.
 * Value = active users x hours saved x weeks x hourly loaded cost x realization (time redirected, not headcount cut).
 * Cost = usage per active user + one-time enablement + platform team.
 */
export function computeRoi(i) {
  const hourly = i['ASM-04'] / i['ASM-05'];
  const weeks = i['ASM-05'] / 40;
  const perTeam = TEAMS.map((t) => {
    const people = i[t.headcount];
    const active = people * i['ASM-07'];
    const hoursSaved = active * i['ASM-06'] * weeks * i['ASM-08'];
    return { id: t.id, name: t.name, people, active, hoursSaved, fte: hoursSaved / i['ASM-05'], value: hoursSaved * hourly, usageCost: active * i['ASM-09'] * 12 };
  });
  const sum = (k) => perTeam.reduce((a, t) => a + t[k], 0);
  const people = sum('people');
  const enablementOneTime = people * i['ASM-10'] * hourly;
  const platformAnnual = i['ASM-11'] * i['ASM-04'];
  const value = sum('value');
  const annualCost = sum('usageCost') + platformAnnual;
  const net = value - annualCost;
  // Monthly ramp: adoption rises linearly to steady state over ASM-12 months.
  const monthly = [];
  let cumulative = -enablementOneTime;
  let paybackMonth = null;
  for (let m = 1; m <= 24; m++) {
    const ramp = Math.min(1, m / i['ASM-12']);
    const flow = (value - sum('usageCost')) * ramp / 12 - platformAnnual / 12;
    cumulative += flow;
    monthly.push({ month: m, ramp, net: flow, cumulative });
    if (paybackMonth === null && cumulative >= 0) paybackMonth = m;
  }
  const year1 = monthly.slice(0, 12).reduce((a, r) => a + r.net, 0) - enablementOneTime;
  // Hours saved per active user per week at which annual value equals annual cost.
  const breakEvenHours = annualCost / (sum('active') * weeks * i['ASM-08'] * hourly);
  return {
    hourly, perTeam, people, active: sum('active'), fte: sum('fte'), value, annualCost, enablementOneTime, platformAnnual, net, breakEvenHours,
    roi: net / annualCost, year1Net: year1, paybackMonth, monthly,
  };
}

/** One-at-a-time sensitivity: swing each editable assumption from conservative to upside around the base case. */
export function sensitivity(assumptions, metric = (r) => r.net) {
  const base = scenarioInputs(assumptions, 'base');
  return assumptions
    .filter((a) => a.conservative !== a.upside)
    .map((a) => {
      const low = metric(computeRoi({ ...base, [a.id]: a.conservative }));
      const high = metric(computeRoi({ ...base, [a.id]: a.upside }));
      return { id: a.id, name: a.name, low, high, swing: Math.abs(high - low) };
    })
    .sort((x, y) => y.swing - x.swing);
}

export const usd = (v) => (v < 0 ? '−' : '') + '$' + Math.abs(Math.round(v)).toLocaleString('en-US');
export const musd = (v) => (v < 0 ? '−' : '') + '$' + (Math.abs(v) / 1e6).toFixed(2) + 'M';

/** Markdown for value/roi-model.md (tests check the doc matches this output). */
export function scenarioTable(assumptions) {
  const rows = SCENARIOS.map((s) => [s, computeRoi(scenarioInputs(assumptions, s))]);
  const line = (label, f) => `| ${label} | ${rows.map(([, r]) => f(r)).join(' | ')} |`;
  return [
    '| | Conservative | Base | Upside |',
    '| --- | --- | --- | --- |',
    line('Active users (steady state)', (r) => Math.round(r.active)),
    line('Capacity redirected (FTE-equivalent)', (r) => r.fte.toFixed(1)),
    line('Annual value of redirected time', (r) => musd(r.value)),
    line('Annual cost (usage + platform team)', (r) => musd(r.annualCost)),
    line('One-time enablement', (r) => musd(r.enablementOneTime)),
    line('Annual net benefit (steady state)', (r) => musd(r.net)),
    line('ROI (net / annual cost)', (r) => Math.round(r.roi * 100) + '%'),
    line('Year-1 net, including ramp and enablement', (r) => musd(r.year1Net)),
    line('Break-even: hours saved per active user per week', (r) => r.breakEvenHours.toFixed(1)),
    line('Payback month', (r) => (r.paybackMonth ? `month ${r.paybackMonth}` : 'beyond 24')),
  ].join('\n');
}

async function main() {
  const { readFileSync } = await import('node:fs');
  const assumptions = JSON.parse(readFileSync(new URL('./roi-assumptions.json', import.meta.url), 'utf8'));
  console.log(scenarioTable(assumptions));
  console.log('\nSensitivity of annual net benefit (base case, one assumption at a time):\n');
  console.log('| Assumption | Conservative value → net | Upside value → net | Swing |\n| --- | --- | --- | --- |');
  for (const s of sensitivity(assumptions)) console.log(`| ${s.name} | ${musd(s.low)} | ${musd(s.high)} | ${musd(s.swing)} |`);
}

if (typeof process !== 'undefined' && import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1] ?? '').href) await main();
