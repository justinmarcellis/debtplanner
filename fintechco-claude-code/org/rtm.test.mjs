import { test } from 'node:test';
import assert from 'node:assert/strict';
import { coverage, renderMarkdown } from './rtm.mjs';

const spec = {
  source: 'brief',
  deliverables: { D1: 'Deck' },
  requirements: [
    { id: 'REQ-01', text: 'a | b', deliverables: ['D1'], verify: 'v' },
    { id: 'REQ-02', text: 'c', deliverables: ['D1'], verify: 'v' },
  ],
};

test('a requirement is covered only by a done ticket', () => {
  const rows = coverage(spec, [
    { id: 'S1-NAR-01', status: 'done', requirements: ['REQ-01'] },
    { id: 'S1-NAR-02', status: 'review', requirements: ['REQ-02'] },
  ]);
  assert.equal(rows[0].covered, true);
  assert.deepEqual(rows[0].doneTickets, ['S1-NAR-01']);
  assert.equal(rows[1].covered, false);
  assert.deepEqual(rows[1].tickets, ['S1-NAR-02']);
});

test('markdown escapes pipes and reports coverage', () => {
  const md = renderMarkdown(spec, coverage(spec, [{ id: 'X', status: 'done', requirements: ['REQ-01'] }]));
  assert.match(md, /Coverage: \*\*50%\*\* \(1\/2\)/);
  assert.match(md, /a \\\| b/);
});
