# Interview kit: introductions, questions for Anthropic, pre-flight

Owner: quality (S2-QE-01) · Covers the parts of the 50 minutes outside the role play (REQ-23, REQ-24, REQ-26, REQ-28) · Role play: `strategy/run-of-show.md` · Demo: `demo/RUNBOOK.md`

| Block | Minutes | Kit |
| --- | --- | --- |
| Introductions | 5 | §1 |
| Role play: FinTechCo meeting | 40 | `strategy/run-of-show.md` |
| My questions for Anthropic | 5 | §2 |

## 1. Introductions (5 minutes, before the role play)

The interviewers introduce themselves first. Note each person's name and role on the capture sheet, because I will use their names in the role play. Then I give a 60-second introduction (about 140 words) and hand over to the role play.

**Structure (fill the brackets; rehearse to 55–65 seconds):**

1. **Who I am, in one line.** "I'm [Your Name]. For the last [N] years I've been [current role], helping [kind of customer] adopt [kind of technology]."
2. **One proof point that maps to this role.** "Most recently I [led a technical evaluation / designed a rollout / built a demo] for [customer type], and it ended in [measurable outcome]."
3. **Why Anthropic, why this role.** "I'm here because [the specific reason: agentic coding changes the unit of work; Anthropic's approach to safety is something I can sell honestly to a skeptical CTO]."
4. **Set up the role play.** "For today I've prepared the way I would for a real customer: a researched plan for FinTechCo, a deck, a three-act demo for their three teams, and an evaluation plan they can say yes to. I'll run it as a forty-minute meeting, so please interrupt me as the CTO and Head of Digital Transformation would."

**Before the role play starts, confirm three things (15 seconds):**
- "Shall I treat you as the CTO and the Head of Digital Transformation from here?" (Who plays whom?)
- "I'll keep to forty minutes and stop for next steps around the thirty-seven-minute mark."
- "I'll share my screen now; tell me if the terminal text is too small."

Then: "Let's begin." Start the stopwatch.

## 2. Questions for Anthropic (5 minutes, after the role play)

Step out of role clearly ("Thank you; stepping out of the role play now"). With five minutes there is time for **two or three** questions with follow-ups. Pick by what came up in the conversation; the first three are the default.

| Priority | Question | Why I'm asking |
| --- | --- | --- |
| 1 | "What did you see in that meeting that you would want me to do differently with a real financial-services customer?" | Gets direct feedback while it's fresh; shows coachability. |
| 2 | "How does the Applied AI team measure success for an architect in the first six months: wins, adoption after the sale, or product feedback?" | Shows what the role is really rewarded for. |
| 3 | "When customers like FinTechCo ask for proof of productivity, the public evidence is mixed. How do Anthropic's architects handle that today, and is there a standard measurement approach you'd want me to use?" | Ties the role play's hardest question to the real job. |
| 4 | "How do architects feed what they learn from customers back into the Claude Code product? Is there a regular path, or is it informal?" | Influence on the product. |
| 5 | "Where do enterprise Claude Code rollouts most often stall after a successful pilot?" | Shows I'm thinking past the sale, about adoption. |
| 6 | "What does the team need most right now that it doesn't have?" | Where I'd add value first. |

Close: "Thank you. I enjoyed preparing this. Is there anything about my background you'd like me to clarify?"

## 3. Pre-flight checklist

### Day before (T−24 h)

- [ ] **Install Claude Code** with the provided script: `curl -fsSL https://claude.ai/install.sh | bash`, then `claude --version`.
- [ ] **API key.** Set the provided key (`export ANTHROPIC_API_KEY=...` in the shell profile, never in a repo or on screen). Run `claude -p "say ready"` to confirm it works.
- [ ] **Credits ($25).** A full three-act dry run measured **≈$2.30** on Sonnet (`demo/fallback/dry-run.md`). Budget: two full rehearsals (≈$5) + morning warm-up (≈$0.50) + the live demo (≈$2.30) ≈ **$8**, leaving more than $15 of headroom. Check the balance in the Console after each rehearsal.
- [ ] **Demo kit.** `demo/setup.sh` → repos in `~/fintechco-demo/` with the `start` and `complete` tags; Python packages (pandas, numpy, pytest) installed. Go is optional.
- [ ] **Workspace trust.** Run `claude` once in each demo repo and accept the trust prompt (allow rules in `.claude/settings.json` are ignored until the workspace is trusted).
- [ ] **Two full timed rehearsals** of the 40 minutes, with the stopwatch, following `strategy/run-of-show.md`. Log both in §4. `demo/reset.sh` before each one.
- [ ] **Fallbacks open-able:** `demo/fallback/act1/*.patch`, the prebuilt `macro-risk` dashboard, `demo/fallback/act3/INC-2291-triage.md`.
- [ ] **Deck.** Open the published deck; check presenter view shows the speaker notes; have the PDF export as a backup.

### Google Meet screen share (test on the day before, and again at T−30)

- [ ] Join a test meeting from a second device or account, so I can see what the audience sees.
- [ ] **Share a window, not the whole screen** (the browser with the deck, then the terminal). Practise switching between the two in under five seconds.
- [ ] On macOS: System Settings → Privacy & Security → Screen Recording → allow the browser. Restart the browser after granting it.
- [ ] Terminal readable on the second device: light theme, 18 pt+ font, about 110 columns.
- [ ] Notifications off (Do Not Disturb / Focus); close mail, chat and anything with names or keys on screen.
- [ ] Camera at eye level, audio checked, power cable in, wired network or strong Wi-Fi.
- [ ] Backup: the deck link ready to paste into chat if sharing fails twice.

### Morning of (T−60 to T−5)

- [ ] T−60: `demo/reset.sh`; warm-up each repo with `say ready` (not shown).
- [ ] T−30: RUNBOOK "Before the meeting" steps 1–5; tabs named **1 payments**, **2 macro**, **3 sre**; browser tab 1 = deck, tab 2 = prebuilt dashboard.
- [ ] T−15: stopwatch ready; sticky note with checkpoints *12 · 20 · 26 · 30 · 37*; capture sheet from `strategy/wrap-up-kit.md` §3 printed or open.
- [ ] T−5: water; join the Meet two minutes early; share-test once more.

## 4. Rehearsal log

Record each run. Two clean runs within 38:00 ± 1:00 are the exit criterion for gate G4 (human rehearsal), on top of the scripted check `node org/timing.mjs --check`.

| Run | Date | Total | Demo (A1 / A2 / A3) | Checkpoints hit (12 · 20 · 26 · 30 · 37) | Cuts used | Spend | Fix before next run |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Scripted (G4) | 2026-10-20 | 33:44 planned speech + interaction + demo | 2:06 / 3:33 / 0:45 (dry-run) | all, by plan | none | ≈$2.30 | s07, s08 notes trimmed to plan |
| 1 | | | | | | | |
| 2 | | | | | | | |

## 5. Self-check against the brief

Before the interview, confirm every item:

- [ ] Slides cover how it works (s04–s06), the value proposition (s07), differentiators (s08, a03), fit for all three teams (s09, demo), metrics and ROI (s14, s15, a06), and the evaluation plan with starter use cases (s16, s17).
- [ ] The live demo is 10–15 minutes and connects to FinTechCo's work (planned 14:00; dry-run terminal time 6:24).
- [ ] The wrap-up proposes clear next steps and starts by 0:37 (s18, the wrap-up kit).
- [ ] I can say where I'd cut if behind (run-of-show §3) and have rehearsed saying it aloud.
- [ ] Every number on the slides has a source or is labelled as an assumption (`node org/contracts/validate.mjs`).
- [ ] The 5 minutes of questions for Anthropic are protected: stop the role play by 40:00.
