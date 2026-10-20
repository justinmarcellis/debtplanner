# ADR-001: Engagement layout, artifact formats and visual identity

Status: accepted · Owner: eng-lead · Date: 2026-10-20

## Layout
Everything lives under `fintechco-claude-code/` in this repository, so the unrelated Vite scaffold at the repo root is untouched. All paths in tickets are relative to `fintechco-claude-code/`.

| Path | Owner | Contents |
| --- | --- | --- |
| `brief/` | eng-lead | The interview brief (PDF and text), `requirements.json` (RTM source), `facts.json` |
| `research/` | research | `claims.json` (claims register), fact bases, competitive landscape, proof points, pricing |
| `strategy/` | strategy | Stakeholder map, discovery, objection handling and Q&A bank, use-case catalog, run-of-show, talk track, wrap-up kit |
| `deck/` | narrative | `storyline.md`, `slide-spec.md`, and the deck source under `deck/project/` (Slides artifact format) |
| `value/` | value | Metrics framework, ROI model (`roi.mjs` + tests), ROI calculator page |
| `rollout/` | adoption | Evaluation plan, pilot charter, rollout and enablement plan |
| `security/` | trust | Security and compliance brief, threat model, reference architecture |
| `demo/` | demo | Demo kit: `payments-ledger/`, `macro-risk/`, `sre-ops/`, `enterprise/`, `RUNBOOK.md`, setup and reset scripts, `fallback/` |
| `rehearsal/` | quality | Red-team reports, timing rehearsal, dry-run logs, pre-flight checklist, interview logistics kit |
| `org/` | pmo (tooling: eng-lead) | Board, hubs, sprints, scorecards, ADRs, playbooks, workflows, dashboard |

## Formats
- Documents: Markdown, GitHub-flavored, no HTML. Leave-behinds open with a three-line executive summary.
- Deck: the Slides artifact format — `deck/project/deck.json` plus one `deck/project/slides/<id>.html` per slide with speaker notes in a final `<aside>`. The format rules are in the scratchpad copy of the type's references (path given in each deck ticket). The deck exports to .pptx and PDF, which is how it gets into the Google Slides template the brief provides.
- Interactive pages (ROI calculator, demo dashboard, program dashboard): one self-contained HTML file each, no build step, data inline, charts as inline SVG drawn by plain JS. No external network calls at runtime.
- Code: Python 3.10+ for demo acts (stdlib plus pandas and numpy only, pytest for tests); Node 22 ES modules for org and value tooling (`node --test`).

## Visual identity (all visual artifacts)
- Typefaces: Source Serif 4 (display), IBM Plex Sans (text), JetBrains Mono (code). Google Fonts in the deck; the same stacks with system fallbacks in HTML pages.
- Palette: ink `#1B1F24`, paper `#F6F4EF`, night `#13202B` (cover, closing, section breaks), slate body `#4A5560`, hairline `#E2DED5`, accent teal `#1F6F6B` (on paper; `#4FB3A9` on night), accent amber `#D9952B` (always with ink text on it). Contrast checked: teal on paper 5.4:1, slate on paper 6.9:1, paper on night 15:1, ink on amber 6.7:1.
- No Anthropic logos, wordmarks or brand assets anywhere; no imitation of Anthropic's brand palette. The deck is the candidate's own work and says so on the cover. FinTechCo is fictional and is never given a logo.
- Charts follow color-never-alone: every series or status also carries a text label.
