import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { computeRoi, scenarioInputs, sensitivity, scenarioTable, SCENARIOS } from './roi.mjs';

const assumptions = JSON.parse(readFileSync(new URL('./roi-assumptions.json', import.meta.url), 'utf8'));
const base = scenarioInputs(assumptions, 'base');

test('headcount comes from the brief (120 / 40 / 20)', () => {
  const r = computeRoi(base);
  assert.deepEqual(r.perTeam.map((t) => t.people), [120, 40, 20]);
  assert.equal(r.people, 180);
});

test('base case arithmetic', () => {
  const r = computeRoi(base);
  // 135 active x 4 h x 46 weeks x 0.6 realization = 14,904 hours
  assert.equal(Math.round(r.perTeam.reduce((a, t) => a + t.hoursSaved, 0)), 14904);
  assert.ok(Math.abs(r.fte - 14904 / 1840) < 1e-9);
  assert.equal(Math.round(r.annualCost), 135 * 200 * 12 + 0.5 * 200000);
  assert.ok(r.net > 0 && r.paybackMonth <= 6);
});

test('break-even hours zero the annual net', () => {
  const r = computeRoi(base);
  const atBreakEven = computeRoi({ ...base, 'ASM-06': r.breakEvenHours });
  assert.ok(Math.abs(atBreakEven.net) < 1);
});

test('scenarios are ordered conservative < base < upside', () => {
  const nets = SCENARIOS.map((s) => computeRoi(scenarioInputs(assumptions, s)).net);
  assert.ok(nets[0] < nets[1] && nets[1] < nets[2]);
});

test('hours saved is the most sensitive assumption', () => {
  assert.equal(sensitivity(assumptions)[0].id, 'ASM-06');
});

test('value/roi-model.md shows exactly the numbers the code produces', () => {
  const doc = readFileSync(new URL('./roi-model.md', import.meta.url), 'utf8');
  assert.ok(doc.includes(scenarioTable(assumptions)), 'regenerate the table with: node value/roi.mjs');
});
