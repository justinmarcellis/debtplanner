# Run of show: FinTechCo × Claude Code (40-minute role play)

Owner: strategy (S2-STR-01) · Sources: ADR-004 (demo), ADR-005 (agenda, checkpoints), `deck/slide-spec.md` (clock), `demo/fallback/dry-run.md` (measured demo times) · Timing check: `node org/timing.mjs --check` (gate G4)

The 50-minute interview runs in three blocks: 5 minutes of introductions (`rehearsal/interview-kit.md`), the 40-minute role play below, and 5 minutes of my questions for Anthropic. The role play is planned to **38:00**, which leaves **2:00** before the hard stop. The verbatim talk track is in each slide's speaker notes; this page is the clock you run the meeting by.

## 1. Minute by minute

The clock starts when I say "Let's begin" after the introductions. The *Latest* column holds the ADR-005 checkpoints. They are deadlines: if one is missed, apply that row's cut (§3) at once, without commentary.

| Planned | Latest | Segment | Slides | What I do | Watch for |
| --- | --- | --- | --- | --- | --- |
| 0:00 | — | Open | s01 → s03 | Thank them; state the one decision; agenda follows their three questions; play back priorities; **ask each attendee one question** (CTO: "What would have to be true for you to approve an agentic tool?" · HDT: "Which team would you start with, and why?") | The CTO's answer is the top concern I write on s18. Note it verbatim. |
| 2:45 | — | How it works | s04 → s06 | One picture: an agent in their environment that understands, plans, acts, verifies, behind a permission check their policy sets. Define *agent*, *terminal*, *MCP*, *hooks* on first use | Check understanding with the HDT: "Does that match how you'd explain it to your board?" |
| 6:25 | — | Why Claude Code | s07, s08 | Three reasons in their priority order; mixed evidence stated openly; five dimensions with the pilot test for each | If the CTO pushes on competitors: "Same tasks, same metrics, on your code" → appendix a03 |
| 9:10 | — | Fit by team | s09 | One line per team: SWE, DS, SRE, in their stacks | Skip whole slide if past 0:11 (cut A) |
| 10:55 | **0:12** | Demo: Act 1 (SWE) | s10 → terminal | payments-ledger: tour → find the penny bug → fix with test → PCI hook blocks a PAN log → secrets denied | Measured 2:06 terminal in the dry-run. Narrate while it works; don't read output aloud. |
| 15:55 | **0:20** | Demo: Act 2 (DS) | terminal | macro-risk: FRED data → Phillips curve by decade → dashboard | Measured 3:33. If the start is past 0:20, open the prebuilt dashboard (cut B). |
| 21:55 | — | Demo: Act 3 (SRE) | terminal | `./triage.sh incidents/INC-2291`: read-only, headless triage; human approves rollback | Measured 0:45. **If past 0:24, use the 30-second narrated fallback (cut C).** |
| 23:55 | **0:26** | Governance close | s11 | "One agent, three teams, one policy, one audit trail" — show the audit log line count | Back on slides by 0:26 at the latest. |
| 24:55 | — | Security and deployment | s12, s13 | Five questions, five controls; AWS/GCP routing | The CTO's segment: allow 30 s for questions; answer, then point to the security brief. |
| 28:35 | **0:30** | Impact and ROI | s14, s15 | Five tiers of metrics (adoption, flow, quality, experience, business) with guardrails; ROI as a range from stated assumptions | HDT segment. Offer the calculator; don't open it live unless asked. |
| 32:15 | — | Evaluation and rollout | s16, s17 | Eight weeks to a decision; gate in week 9; 180 people by week 17; six starter use cases | If past 0:36, skip s17 (cut E). |
| 35:00 | **0:37** | Wrap-up (never cut) | s18 | Three decisions with owners and dates; write the top concern and owner live | Ask for each decision by name and wait for an answer (`strategy/wrap-up-kit.md`). |
| 37:00 | — | Buffer | s19 | One sentence to remember; questions | Stop at 38:00–39:30 whatever is open; offer a follow-up. |
| 38:00 | 40:00 | End | — | "Thank you both. I'll send the follow-up tomorrow." | Then step out of role for the questions to Anthropic. |

Measured inside the plan (G4, 2026-10-20): speech plus interaction plus demo is 33:44 against the 38:00 plan. The difference is the 160 s of in-row slack plus the shorter-than-budget demo acts. All ten segments are within their speech budgets.

## 2. Keeping time

- **A visible clock.** Run a stopwatch on the second monitor (or phone face-up) and start it at "Let's begin". The checkpoints are written on a sticky note next to it: *12 · 20 · 26 · 30 · 37*.
- **Glance points.** Check the clock at every section divider slide and every time the terminal finishes a prompt. Not otherwise.
- **Say it when you adapt.** Adapting is part of the evaluation (REQ-22). Use one neutral sentence, then move on:
  - "I'm watching our time, so I'll show you the finished dashboard rather than build it."
  - "In the interest of time, here's this morning's run of the incident triage; same prompt, same result."
  - "Security is in more depth in the leave-behind; let me get to how you'd measure this."
  - "I want to leave proper time for next steps, so let me go straight there."
- **Ahead of time?** Don't add content. Take more questions in the segment you're in, or ask the HDT a discovery question from `strategy/discovery-card.md`.

## 3. Cut list (in order)

| Cut | Trigger | Action | Recovers |
| --- | --- | --- | --- |
| A | Demo not started by **0:12** | s08 → one sentence ("We'll measure every assistant the same way on your own work; the comparison is in the appendix"). Skip s09; s10 names each act's team instead. | ≈142 s |
| B | Act 2 not started by **0:20** | Open `dashboard/index.html` from the `complete` tag; show the two findings; skip the live build (RUNBOOK 2b recovery line) | ≈90 s |
| C | Clock past **0:24** at Act 3, or demo not ending by **0:26** | Play `demo/fallback/act3/INC-2291-triage.md` and narrate for 30 s | ≈90 s |
| D | ROI not started by **0:30** | Skip s13. End s12 with "If time is short, the leave-behind covers the rest." | ≈75 s |
| E | Wrap not started by **0:37** | Skip s17; s16 only. Anything unsaid in the evaluation section is dropped. | ≈60 s + |
| — | Never cut | s10, s11 (demo bridges) and s18 (wrap). | — |

Most a meeting can recover from the cuts: about 457 s, plus 160 s of in-row slack and 120 s returned to the end.

## 4. Talk track: the lines that matter

The full script is in the speaker notes. These are the lines to know without notes.

| Moment | Line |
| --- | --- |
| Opening | "In forty minutes I want to help you make one decision well: which coding tool to roll out at FinTechCo, and how to prove it." |
| The mental model | "Claude Code is an agent in your engineers' own environment. It understands, plans, acts with your tools and checks its own work, and a permission check your policy sets stands in front of every action." |
| Agents vs. autocomplete | "Autocomplete suggests the next line. An agent takes a goal and gives you back a finished, tested change to review." |
| Into the demo | "Fourteen minutes, three acts, one for each of your teams, with the controls on the whole time." |
| The PCI hook fires | "That's not the model being careful. That's your policy, in code, stopping a card number reaching a log." |
| Out of the demo | "One agent served three teams, and every step ran under one central policy and left an audit record." |
| Mixed evidence | "The evidence is mixed, and I'd rather show you all of it. That's why we measure on your work, against your baselines, with quality guardrails." |
| ROI | "ROI is a range built from stated assumptions. The pilot replaces each assumption with a number measured here." |
| The ask | "Three decisions today start the evaluation: a security review, a pilot cohort with a metrics owner, and a kickoff date." |
| Close | "An agent that finishes tested tasks inside your controls, proven on your own work in eight weeks." |

## 5. Playing to the room

| Attendee | Their stake | Where I serve it | Do | Don't |
| --- | --- | --- | --- | --- |
| CTO (skeptic, security, compliance) | Risk, regulation, proof of enterprise adoption | s04 permission gate; Act 1 hook and deny rule; s12/s13; a01, a02; security brief | Name controls precisely, cite sources, say "I don't know; I'll find out by Thursday" when I don't. Address them directly at s04, s07, s12, s18. | Overclaim certifications or retention terms; promise anything outside the docs. |
| Head of Digital Transformation (champion) | Productivity, adoption, a story for the board | s07, s09, Act 2, s14–s16, s18 | Give them the plan they can carry internally: cohort, metrics owner, dates. Invite them to answer the CTO's practical questions about their teams. | Let them oversell to the CTO; if they do, bring it back to "we'll measure it". |

The full persona map, discovery questions and objection bank are in `strategy/stakeholder-map.md`, `strategy/discovery.md` and `strategy/objection-handling.md`; one-page cards for the meeting are the `-card.md` versions.

## 6. Questions that need the appendix

| If asked | Answer briefly, then show |
| --- | --- |
| "Where does our code go? Is it used for training? How long is it kept?" | a01 Data handling; `security/security-brief.md` |
| "What exactly can an admin lock down?" | a02 Controls catalog |
| "How would you compare tools fairly? What about Copilot?" | a03 Comparing tools fairly |
| "What will it cost?" | a04 Cost and cost controls (the account team quotes FinTechCo's price) |
| "Does this actually make developers faster?" | a05 Evidence base |
| "Where do the ROI numbers come from?" | a06 ROI assumptions; the ROI calculator |
| "How does the company-wide rollout work?" | a07 Rollout waves |

Rule for every question: answer in one or two sentences, show the slide only if they want more, and come back to the clock.

## 7. Contingencies

| What goes wrong | Response |
| --- | --- |
| Screen share fails | Re-share the window (not the screen). If it fails twice, send the deck link in chat and narrate from the notes; use the fallbacks for the demo. |
| Claude Code is slow or errors | Don't debug live. Use the act's recovery line from `demo/RUNBOOK.md` ("This morning's run, same prompt.") |
| API credits run low | The dry-run cost about $2.30 for all three acts; `/cost` before the meeting. If credits are exhausted, use the fallbacks. |
| The CTO goes deep on one control | Answer it properly; it's the most important thing in the room. Then cut forward (D, then E) to protect the wrap. |
| An attendee must leave early | Go straight to s18 for that person's decision, then continue. |
| A question I can't answer | "I don't know, and I don't want to guess on a security question. I'll come back to you by [day] in writing." Write it on the follow-up list. |
