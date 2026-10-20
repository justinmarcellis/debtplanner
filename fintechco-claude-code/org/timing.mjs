#!/usr/bin/env node
// Gate G4 (timing): speaker-notes length of the published deck vs. the slide-spec clock.
//   node org/timing.mjs          print per-slide and per-segment timing
//   node org/timing.mjs --check  exit 1 if the main deck's speech no longer fits the 38:00 plan
// Speech time = spoken words / 140 wpm. Bracketed markers ([CLM-...], [Fallback line: ...]) and the
// trailing "(NN seconds ...)" stage note are not spoken and are excluded.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WPM = 140;

/** Segments from the slide-spec clock (ADR-005): slides, planned seconds, non-speech seconds. */
export const SEGMENTS = [
  { id: 1, name: 'Open', slides: ['s01', 's02', 's03'], planned: 165, other: 50 },
  { id: 2, name: 'How Claude Code works', slides: ['s04', 's05', 's06'], planned: 220, other: 10 },
  { id: 3, name: 'Why Claude Code', slides: ['s07', 's08'], planned: 165, other: 15 },
  { id: 4, name: 'FinTechCo fit', slides: ['s09'], planned: 105, other: 10 },
  { id: 5, name: 'Live demo', slides: ['s10', 's11'], planned: 840, other: 785 },
  { id: 6, name: 'Security and deployment', slides: ['s12', 's13'], planned: 220, other: 30 },
  { id: 7, name: 'Impact and ROI', slides: ['s14', 's15'], planned: 220, other: 20 },
  { id: 8, name: 'Evaluation and rollout', slides: ['s16', 's17'], planned: 165, other: 15 },
  { id: 9, name: 'Wrap-up (never cut)', slides: ['s18'], planned: 120, other: 35 },
  { id: 10, name: 'Buffer', slides: ['s19'], planned: 60, other: 35 },
];
export const PLAN_TOTAL = 2280; // 38:00, leaving 2:00 before 40:00

/** Spoken words in a speaker-notes string. */
export function spokenWords(notes) {
  const text = notes
    .replace(/\[[^\]]*\]/g, ' ')
    .replace(/\(\s*\d+\s*seconds?[^)]*\)\s*$/i, ' ')
    .replace(/&[a-z]+;/g, ' ');
  return text.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
}

export function notesOf(html) {
  const m = html.match(/<aside[^>]*>([\s\S]*?)<\/aside>/i);
  return m ? m[1].replace(/<[^>]*>/g, ' ') : '';
}

/** Per-segment speech seconds vs. the planned seconds left for speech (planned - other - 10 s minimum slack). */
export function timing(slideNotes) {
  return SEGMENTS.map((seg) => {
    const slides = seg.slides.map((p) => {
      const id = Object.keys(slideNotes).find((k) => k.startsWith(p + '-'));
      const words = id ? spokenWords(slideNotes[id]) : 0;
      return { id: id ?? p, words, seconds: Math.round((words * 60) / WPM) };
    });
    const speech = slides.reduce((a, s) => a + s.seconds, 0);
    const budget = seg.planned - seg.other - 10;
    return { ...seg, slides, speech, budget, slack: seg.planned - seg.other - speech, ok: speech <= budget };
  });
}

function main() {
  const deck = JSON.parse(readFileSync(join(ROOT, 'deck', 'project', 'deck.json'), 'utf8'));
  const notes = {};
  for (const id of deck.order) {
    if (!id.startsWith('s')) continue;
    notes[id] = notesOf(readFileSync(join(ROOT, 'deck', 'project', 'slides', `${id}.html`), 'utf8'));
  }
  const rows = timing(notes);
  let total = 0;
  for (const r of rows) {
    total += r.speech + r.other;
    const detail = r.slides.map((s) => `${s.id} ${s.words}w/${s.seconds}s`).join(', ');
    console.log(`${String(r.id).padStart(2)} ${r.name.padEnd(26)} speech ${String(r.speech).padStart(4)}s of ${String(r.budget).padStart(4)}s  slack ${String(r.slack).padStart(3)}s  ${r.ok ? 'ok ' : 'OVER'}  ${detail}`);
  }
  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  console.log(`Speech + interaction + demo: ${mmss(total)} (plan ${mmss(PLAN_TOTAL)}, hard stop 40:00)`);
  const over = rows.filter((r) => !r.ok);
  if (process.argv.includes('--check') && (over.length || total > PLAN_TOTAL)) {
    console.error(`G4 FAIL: ${over.map((r) => r.name).join(', ') || 'total over plan'}`);
    process.exit(1);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
