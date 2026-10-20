import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validate, duplicateIds, checkCitations } from './validate.mjs';

const schema = JSON.parse(readFileSync(new URL('./claims.schema.json', import.meta.url), 'utf8'));
const good = {
  id: 'CLM-001', claim: 'x', category: 'product', status: 'verified', accessed: '2026-10-20',
  sources: [{ title: 't', url: 'https://example.com', publisher: 'p' }],
};

test('a well-formed claim validates', () => {
  assert.deepEqual(validate(schema, [good]), []);
});

test('bad id, enum and missing field are reported', () => {
  const errs = validate(schema, [{ ...good, id: 'CLM-1', status: 'maybe', sources: undefined }]);
  assert.ok(errs.some((e) => e.includes('does not match')));
  assert.ok(errs.some((e) => e.includes('not in verified')));
  assert.ok(errs.some((e) => e.includes('missing sources') || e.includes('expected array')));
});

test('duplicate ids are found', () => {
  assert.deepEqual(duplicateIds([{ id: 'A' }, { id: 'B' }, { id: 'A' }]), ['A']);
});

test('citations must exist and be usable', () => {
  const claims = [good, { ...good, id: 'CLM-002', status: 'unverified' }];
  assert.deepEqual(checkCitations('ok [CLM-001] bad [CLM-002] gone [CLM-003]', claims), ['CLM-002 is unverified', 'CLM-003 not in register']);
});

test('drafting placeholders are found; meeting-day fields are not', async () => {
  const { findPlaceholders } = await import('./validate.mjs');
  assert.deepEqual(findPlaceholders('cite [CLM-?: vendor docs] then TODO and TBD'), ['[CLM-?: vendor docs]', 'TODO', 'TBD']);
  assert.deepEqual(findPlaceholders('by [date], owner [name], [Your Name], [CLM-602]'), []);
});
