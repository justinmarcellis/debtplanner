# Slide spec: Claude Code for FinTechCo (G1 input)

> **Working paper (G1 input), superseded by the built deck in `deck/project/`.** Slide ids, placeholders and some wording here predate the build and the consolidated review (for example, permission wording now follows CLM-606: a permission check the organization sets, not "always asks first"). Present from `deck/project/` only.

Ticket S1-NAR-01 · author ic-narrative-storyliner · storyline in `deck/storyline.md` · visual rules in `deck/visual-system.md` (S1-NAR-02) · product facts as of October 2026.

## Title sequence

Grammar: every title is a topic title. Each one is a Title Case noun phrase of 2 to 5 words, with no verb, no colon and no question mark. The claim goes in the executive line, never in the title. Read in order, the titles give the agenda.

Main deck
1. Claude Code for FinTechCo
2. Agenda and Goals
3. Priorities and Context
4. The Agent Loop
5. Agents and Autocomplete
6. Extension Points
7. Value for FinTechCo
8. Competitive Differentiators
9. Fit by Team
10. Live Demo Plan
11. Demo Recap
12. Security Controls
13. Deployment in AWS and GCP
14. Measurement Framework
15. ROI Scenarios
16. Evaluation Timeline
17. Starter Use Cases
18. Next Steps and Owners
19. Questions and Discussion

Appendix (backup, shown only on request)
- A1. Deployment Architecture
- A2. Data Handling
- A3. Controls Catalog
- A4. Competitive Detail
- A5. Pricing Models
- A6. Metrics Detail
- A7. Evaluation Detail
- A8. Evidence Base
- A9. ROI Assumptions

## Clock

### How the columns are defined (so a reviewer can recompute them)
- **ADR min (s)**: the ADR-005 segment length in seconds. The ten rows sum to 2400 s (40:00).
- **Spoken s**: the sum of the notes seconds (N) of the slides listed in that row.
- **Interaction or demo s**: attendee answers and questions we plan for. In the demo row it is terminal time.
- **Planned s**: the time we rehearse to. Planned = spoken + interaction + slack. All rows sum to 2280 s (38:00), the G4 target.
- **Slack s**: the cushion inside each planned row, at least 10 s. Slack = planned − spoken − interaction.
- **Returned s**: ADR − planned. This time goes back to the end of the meeting. Together the rows return 120 s, so the plan ends at 38:00 with 2:00 left before 40:00 (REQ-01).
- **Planned start**: the cumulative planned time if we run to plan.
- **Latest start**: the ADR-005 checkpoints, unchanged. They are deadlines. We plan to reach each one early.

| # | ADR clock | Segment (ADR-005) | Slides | ADR min (s) | Spoken s | Interaction or demo s | Planned s | Slack s | Returned s | Planned start | Latest start (checkpoint) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0:00 | Open | s01 15 + s02 25 + s03 60 | 3 (180) | 100 | 50 (one question to each attendee) | 165 | 15 | 15 | 0:00 | none |
| 2 | 0:03 | How Claude Code works | s04 80 + s05 50 + s06 65 | 4 (240) | 195 | 10 (understanding check) | 220 | 15 | 20 | 2:45 | none |
| 3 | 0:07 | Why Claude Code | s07 75 + s08 60 | 3 (180) | 135 | 15 | 165 | 15 | 15 | 6:25 | none |
| 4 | 0:10 | FinTechCo fit | s09 80 | 2 (120) | 80 | 10 | 105 | 15 | 15 | 9:10 | none |
| 5 | 0:12 | Live demo: three acts | s10 27 + s11 13 | 14 (840) | 40 | 785 (terminal) | 840 | 15 | 0 | 10:55 | 0:12 demo starts · 0:20 Act 2 started · 0:26 demo ends |
| 6 | 0:26 | Security, governance, deployment | s12 95 + s13 75 | 4 (240) | 170 | 30 (CTO questions) | 220 | 20 | 20 | 24:55 | 0:26 (demo ends) |
| 7 | 0:30 | Measuring impact and ROI | s14 95 + s15 85 | 4 (240) | 180 | 20 | 220 | 20 | 20 | 28:35 | 0:30 ROI starts |
| 8 | 0:34 | Evaluation plan and rollout | s16 75 + s17 60 | 3 (180) | 135 | 15 | 165 | 15 | 15 | 32:15 | none |
| 9 | 0:37 | Wrap-up and next steps (never cut) | s18 70 | 2 (120) | 70 | 35 (agreeing owners and dates) | 120 | 15 | 0 | 35:00 | 0:37 wrap starts |
| 10 | 0:39 | Buffer (questions) | s19 10 | 1 (60) | 10 | 35 | 60 | 15 | 0 | 37:00 | none |
| | | **Total** | 19 slides | **2400** | **1115** | **1005** | **2280** | **160** | **120** | ends 38:00 | |

Checks:
- Demo row is 840 s = Act 1 300 + Act 2 360 + Act 3 120 + governance close 60 (ADR-004). The 40 s of slide speech sits inside it: s10 opens Act 1's five minutes and s11 closes the governance minute. That leaves 785 s of terminal time and 15 s of slack.
- Non-demo spoken plus interaction = 1075 + 220 = 1295 s, within the 1440 s limit.
- Every row has 15-20 s of slack.
- Wrap is 120 s and must start by 0:37. Run to plan, it starts at 35:00.

Demo timing inside row 5 (from ADR-004 and ADR-005). Planned start times assume the demo starts at 10:55.

| Act | Team | Budget (s) | Speech on slides (s) | Terminal (s) | Planned start | Checkpoint |
| --- | --- | --- | --- | --- | --- | --- |
| Act 1 payments-ledger | Software engineers | 300 | 27 (s10) | 273 | 10:55 | starts by 0:12 |
| Act 2 macro-risk | Data scientists | 360 | 0 | 360 | 15:55 | starts by 0:20 |
| Act 3 sre-ops | SREs | 120 | 0 | 120 | 21:55 | none |
| Governance close | All | 60 | 13 (s11) | 32 (+15 slack) | 23:55 | demo ends by 0:26 |
| **Total** | | **840** | **40** | **785** | | |

### Checkpoints and cut list

The ADR-005 checkpoints are unchanged. The text in the second column is quoted from ADR-005.

| Checkpoint | ADR-005 rule | What is dropped in this deck | Slides (Cut field) | Seconds recovered |
| --- | --- | --- | --- | --- |
| 0:12 | demo must start. Behind? Drop the competitor table to one sentence; skip the fit slide (the demo covers it). | s08 shrinks to one sentence: "We will measure every assistant the same way on your own work; the dated comparison is in the appendix." s09 is skipped, and s10 names each act's team instead. | s08 compress at 0:12 · s09 skip at 0:12 | s08 60 − 8 = 52; s09 80 spoken + 10 interaction = 90; total 142 |
| 0:20 | Act 2 must have started. Behind? Show the dashboard from the complete state instead of building it live. | Terminal only: open `dashboard/index.html` from the `complete` tag instead of building it live (`demo/RUNBOOK.md`) | no slide | Assumption: about 90 s; the G3 dry-run measures it |
| 0:26 | demo must end. Behind? Act 3 becomes the 30-second narrated fallback. | Terminal only: play Act 3 from `demo/fallback/` and narrate it | no slide | 120 − 30 = 90 |
| 0:30 | ROI must start. Behind? Security goes to one slide plus "the leave-behind covers the rest". | s13 is skipped. s12 stays, ends with "If time is short, the leave-behind covers the rest", then the s13 transition line. | s13 skip at 0:30 | 75 |
| 0:37 | wrap must start, whatever remains. Evaluation plan compresses to its timeline slide. | s17 is skipped and s16 stays. Anything still unsaid in §6 is dropped. s18 always runs in full. | s17 skip at 0:37 | 60, plus whatever remains |

Maximum recovery from the ADR cuts is 142 + 90 + 90 + 75 + 60 = 457 s. On top of that come 160 s of in-row slack and the 120 s returned to the end. The wrap (s18) and the demo-bridge slides are never cut.

## Main deck slide blocks

Field conventions:
- In the notes field, N is the speaking time at 140 words per minute (about 2.33 words per second). W is a plain word count of the quoted script, bracketed markers included. Markers are not spoken. They are kept short, so the spoken words alone also stay within 10% of N × 140 / 60.
- The on-slide field lists only what appears on the slide.
- A `[CLM-?: ...]` on the slide becomes a footer source line once Research resolves it.

### s01-cover — Claude Code for FinTechCo
- **Section:** §1 Open · spine 1
- **Kind:** cover
- **Executive line:** A proposal to evaluate Claude Code on FinTechCo's own work and reach a company-wide decision within months.
- **On slide:**
  - Title: Claude Code for FinTechCo
  - Subtitle: How it works · why it fits · how to prove it
  - Byline: Prepared by [Your Name], Applied AI Architect (candidate) · independent preparation
  - Date label: October 2026
- **Visual:** Cover template on night. Type only: no logos, no wordmarks, no imagery, no Anthropic brand assets. FinTechCo has no logo. The byline makes clear the deck is the candidate's own preparation.
- **Notes (15 s, 34 words):** "Thank you both for your time. I'm [Your Name]. In forty minutes I want to help you make one decision well: which coding tool to roll out at FinTechCo, and how to prove it."
- **Reqs:** REQ-12, REQ-25
- **Placeholders:** [Your Name]
- **Cut:** keep

### s02-agenda — Agenda and Goals
- **Section:** §1 Open · spine 1
- **Kind:** cards
- **Executive line:** Forty minutes answer your three questions: how it works, why it helps FinTechCo, and how to evaluate and roll it out.
- **On slide:**
  - Card 1: "1 · How it works" · 0:03 · "One picture, in plain terms"
  - Card 2: "2 · Why it helps FinTechCo" · 0:07 · "Value, fair comparison, live demo at 0:12"
  - Card 3: "3 · How to evaluate and roll out" · 0:26 · "Controls, measurement, business case, timeline"
  - Strip: Next steps at 0:37
- **Visual:** Three equal cards with a large numeral, label, clock time and one line each. The 0:37 strip is in amber with ink text.
- **Notes (25 s, 58 words):** "You asked three questions, so the agenda follows them. First, how Claude Code works, in plain terms. Second, why it would help FinTechCo, including a fourteen-minute live demo with one act for each of your teams. Third, how to evaluate it and roll it out safely. At the thirty-seven-minute mark I stop for next steps, whatever is left."
- **Reqs:** REQ-12, REQ-22
- **Placeholders:** none
- **Cut:** keep

### s03-priorities-context — Priorities and Context
- **Section:** §1 Open · spine 1
- **Kind:** cards
- **Executive line:** You want team productivity and new products shipped, safely, by choosing one agentic tool for 180 technical staff within months.
- **On slide:**
  - Card "Priorities": Team productivity · Shipping new products
  - Card "Goal": One agentic coding tool · company-wide · within months
  - Card "Today": 180 technical staff · AWS and GCP · no agentic tools yet
  - Strip: Cost-conscious, not cost-driven · evaluating several assistants
  - Two short prompts: "CTO: what would stop this?" · "Head of Digital Transformation: what result lets you scale it?"
- **Visual:** Three cards across, the strip below, and the two questions as small labels at the bottom. Every item comes from `brief/facts.json`.
- **Notes (60 s, 143 words):** "Here is what I understand; please correct me. Your priorities are team productivity and shipping new products. You are cost-conscious, but cost does not drive the decision. You want one agentic coding tool for all one hundred and eighty technical staff within months. By agentic I mean a tool that carries out multi-step work itself, reading code, running commands and checking results, rather than suggesting the next line [CLM-694]. You use no such tool today, and you are evaluating Claude Code alongside other assistants, so the comparison has to be fair. One question for each of you. CTO, what is the one concern that would stop this, whatever the benefits? And Head of Digital Transformation, what pilot result would let you take this organization-wide? [After both answers] Thank you. Let me start with how it works, because everything else rests on that picture."
- **Reqs:** REQ-10, REQ-12
- **Placeholders:** none (brief facts only) · cited ids: CLM-694 (definition of agentic coding)
- **Cut:** keep

### s04-agent-loop — The Agent Loop
- **Section:** §2 How it works · spine 2
- **Kind:** diagram (diagram-how-it-works)
- **Executive line:** Claude Code is an agent in your engineers' environment: it understands, plans, acts with your tools, verifies, and asks before it acts.
- **On slide:**
  - Region label: Developer's environment: repo · terminal · tests · git · cloud CLIs
  - 1 Understand: reads code and tickets
  - 2 Plan: proposes steps (plan mode)
  - 3 Act with tools: edits files, runs commands
  - 4 Verify: runs tests, reads results
  - Gate on the arrow into 3: Ask permission, per your policy
  - Arrow from 4 back to 1: repeat until done
  - Footer: Sources: Claude Code docs, October 2026 [CLM-693] [CLM-694] [CLM-?: permission defaults and rules]
- **Visual:** The diagram-how-it-works template. A loop of four nodes inside the environment region, with permission drawn as a gate on the step into Act, not as a fifth loop step. Each node has a plain label and a one-line technical subtitle.
- **Notes (80 s, 188 words):** "Here is the one picture I would like you both to keep. Claude Code is an agent: software that takes a goal, works out the steps and carries them out, using a Claude model, the AI that does the reasoning. It runs inside your engineers' own environment: the terminal, which is the text window where engineers type commands, their editor, the repository where the code lives, their tests, and their cloud command-line tools [CLM-693]. It works in a loop. One, it understands: it reads the code and the ticket. Two, it plans; in plan mode it shows you that plan before it changes anything [CLM-694]. Three, it acts with your tools: it edits files and runs commands such as your test suite. Four, it verifies: it reads the results and fixes what failed, then goes round again until the task is done. CTO, the gate in front of step three is the part for you. By default it asks permission before it edits a file or runs a command, and your administrators decide what it may do without asking [CLM-?: permission defaults and rules]. Engineers review every change."
- **Reqs:** REQ-02, REQ-12, REQ-15
- **Placeholders:** [CLM-?: permission defaults and rules] · cited ids: CLM-693 (surfaces), CLM-694 (agent loop, plan mode)
- **Cut:** keep

### s05-agents-autocomplete — Agents and Autocomplete
- **Section:** §2 How it works · spine 2
- **Kind:** compare
- **Executive line:** Autocomplete suggests the next line; an agent takes a goal and returns a finished, tested change for your review.
- **On slide:**
  - Column heads: Autocomplete | Agent
  - Unit of help: next line or block | finished, tested task
  - Who drives: engineer, keystroke by keystroke | engineer sets the goal and reviews
  - Who checks the work: the engineer | the agent runs tests, the engineer reviews
  - Where it works: editor | terminal, editor, automated jobs
  - Footer: Many assistants now offer both modes [CLM-?: competitor agent modes, official docs, October 2026]
- **Visual:** Compare template, two columns and four rows. The Agent column has the teal header.
- **Notes (50 s, 121 words):** "This is the difference that drives productivity. Autocomplete is the style of assistant that predicts the next line or block while an engineer types; the engineer drives every step and checks the result. An agent takes a goal, for example fix this rounding defect and prove it with a test, and returns a finished change, tests run, ready for review. The unit of help moves from a line of code to a task. To be fair, many assistants now offer an agent mode too [CLM-?: competitor agent modes, official docs, October 2026], and your engineers may use both. What differs between tools is how far they carry a task on their own, safely, and that is what the pilot should measure."
- **Reqs:** REQ-02, REQ-12, REQ-20
- **Placeholders:** [CLM-?: competitor agent modes, official docs, October 2026]
- **Cut:** keep

### s06-extension-points — Extension Points
- **Section:** §2 How it works · spine 2
- **Kind:** table
- **Executive line:** Five extension points let FinTechCo teach, connect, constrain and automate the agent without changing how engineers work.
- **On slide:**
  - Header: Extension point | Plain English | FinTechCo example
  - CLAUDE.md | Project instructions; guides, does not enforce | "Never log full card numbers"
  - MCP | Open standard to connect tools and data | Ticket tracker, read-only database
  - Hooks | Your scripts, run before or after a tool | Block card numbers; log every action
  - Subagents | Specialist helpers | Security reviewer, test writer
  - Headless (non-interactive) mode | Same agent, no person typing | CI job, alert triage
  - Footer: Sources: Claude Code docs, October 2026 [CLM-683] [CLM-694]
- **Visual:** Table template with 5 rows and 3 columns at 28px. The extension-point names are set in mono.
- **Notes (65 s, 162 words):** "Five extension points make the agent yours without changing how engineers work. CLAUDE.md is a plain text file in the repository that tells the agent your conventions, for example never log full card numbers; it guides the agent, while hooks and your allow and deny rules enforce [CLM-683]. MCP, the Model Context Protocol, is an open standard for connecting the agent to other tools and data, such as a ticket tracker or a read-only database. Hooks are your own scripts that run automatically at fixed points, before or after the agent uses a tool, and a hook can block the action outright. Subagents are specialist helpers with their own instructions, such as a security reviewer. Headless mode, which the documentation now calls non-interactive mode, runs the same agent from a script or from CI, continuous integration, the automated build and test pipeline, with no person typing [CLM-694]. You will see three of these in the demo. First, why this matters for FinTechCo."
- **Reqs:** REQ-02, REQ-12
- **Placeholders:** none · cited ids: CLM-683 (CLAUDE.md guides, hooks and permission rules enforce), CLM-694 (MCP, hooks, subagents, non-interactive mode formerly headless)
- **Cut:** keep

### s07-value-fintechco — Value for FinTechCo
- **Section:** §3 Why Claude Code · spine 3
- **Kind:** cards
- **Executive line:** Claude Code turns payments tickets, model notebooks and incidents into tested changes inside your controls, so teams ship more of the roadmap.
- **On slide:**
  - Card "Team productivity": tickets → tested changes · onboarding, tests, defects · Proof: [CLM-?: published enterprise customer outcome on engineering productivity, as published]
  - Card "New products shipped": saved hours → roadmap work · prototypes and dashboards without a front-end queue · Proof: [CLM-?: published customer outcome on delivery speed or time to market, as published]
  - Card "Safely, in your cloud": one policy for 180 people · your AWS or GCP accounts · Proof: [CLM-?: published adoption by a regulated financial-services enterprise, as published]
  - Footer: Customer names and results exactly as published; full list in A8
- **Visual:** Cards template, three cards. The proof line sits at the bottom of each card in slate with its source marker.
- **Notes (75 s, 176 words):** "So why would FinTechCo benefit? Three reasons, in the order of your priorities. Team productivity: the work that eats engineering weeks, such as learning an unfamiliar service, writing tests and chasing defects, becomes tasks the agent carries while engineers review. Shipping new products: hours saved go back into roadmap work, which is how productivity becomes new products, and a data scientist can turn an analysis into a client-ready dashboard without waiting for a front-end developer; you will see that in Act two. Safely: one policy, one action log and your own cloud accounts cover every team, so speed does not cost you control. CTO, I know proof of enterprise adoption matters more to you than any demo. The cards show published enterprise results, each with its source, and the appendix holds the full evidence base [CLM-?: enterprise customer stories, financial services first, as published]. I would treat them as reasons to run a pilot, not as a forecast for FinTechCo; your forecast should come from your own pilot data, measured the same way for every tool."
- **Reqs:** REQ-03, REQ-10, REQ-15, REQ-18
- **Placeholders:** [CLM-?: published enterprise customer outcome on engineering productivity, as published]; [CLM-?: published customer outcome on delivery speed or time to market, as published]; [CLM-?: published adoption by a regulated financial-services enterprise, as published]; [CLM-?: enterprise customer stories, financial services first, as published]
- **Cut:** keep

### s08-competitive-differentiators — Competitive Differentiators
- **Section:** §3 Why Claude Code · spine 3
- **Kind:** table
- **Executive line:** Judge every assistant on the same five dimensions and on your own work; this is where Claude Code differs as of October 2026.
- **On slide:**
  - Header: Dimension | Claude Code (Oct 2026) | Other assistants | Pilot test
  - Unit of work | Multi-step tasks, tests run [CLM-694] | Completion plus agent modes; varies [CLM-?: vendor docs] | Task completion rate [MET-?: flow - task completion rate]
  - Where it runs | Terminal, VS Code, JetBrains, desktop, web, CI [CLM-693] [CLM-694] | Mostly editor-based; varies [CLM-?: vendor docs] | Same task on each surface
  - Extensibility and policy | CLAUDE.md, MCP, hooks, managed settings [CLM-694] [CLM-659] | Varies by vendor [CLM-?: vendor docs] | Wire one internal tool; apply one policy
  - Deployment | Bedrock or Agent Platform (formerly Vertex AI) in your accounts [CLM-686] [CLM-687] | Varies by vendor [CLM-?: vendor docs] | Route through your cloud
  - Inline completion | Task-focused; runs inside VS Code and JetBrains [CLM-693] | Core strength of editor assistants [CLM-?: vendor docs] | Engineer survey [MET-?: experience - developer survey]
  - Footer: Each vendor's own documentation, accessed October 2026; detail in A4
- **Visual:** Table template with 5 rows and 4 columns at 26-28px. Cells stay neutral, with no ticks, crosses or color scoring. The pilot-test column is in teal.
- **Notes (60 s, 145 words):** "You are evaluating Claude Code alongside other assistants, and you should. These are five dimensions I would judge any of them on, with the pilot test for each. Unit of work: Claude Code takes multi-step tasks end to end. Where it runs: terminal, editors and CI [CLM-693]. Extensibility and policy: the extension points you just saw, plus managed settings, a central policy file administrators deploy that engineers cannot override [CLM-659]. Deployment: Amazon Bedrock or Google Cloud's Agent Platform, formerly Vertex AI, the managed AI services of your two clouds, in your own accounts [CLM-686] [CLM-687]. Inline completion is a core strength of editor assistants, and these products change monthly, so the appendix is dated and sourced from vendor documentation [CLM-?: competitor official docs]. The fair test is the same tasks and metrics on your code. So let me make it concrete for your three teams."
- **Reqs:** REQ-04, REQ-21, REQ-12
- **Placeholders:** [CLM-?: vendor docs] (one per competitor cell, from each vendor's official docs); [CLM-?: competitor official docs]; [MET-?: flow - task completion rate]; [MET-?: experience - developer survey] · cited ids: CLM-693, CLM-694, CLM-659, CLM-686, CLM-687
- **Cut:** compress at 0:12

### s09-fit-by-team — Fit by Team
- **Section:** §4 FinTechCo fit · spine 4
- **Kind:** cards
- **Executive line:** Each of your three teams has work Claude Code shortens, in the stacks they use today.
- **On slide:**
  - Card "120 Software Engineers": payments · mobile apps · banking infrastructure · `Python · TypeScript · Java` · onboarding, test-first fixes, migrations [UC-?: SWE use cases] · Demo Act 1
  - Card "40 Data Scientists": fraud · credit scoring · customer behavior · `Python · Jupyter · pandas · scikit-learn · TensorFlow` · data prep, exploration, prototypes, dashboards [UC-?: DS use cases] · Demo Act 2
  - Card "20 SREs": incidents · uptime · `Python · shell · Go` · triage, runbook automation, postmortems [UC-?: SRE use cases] · Demo Act 3
  - Strip: 180 technical staff · one tool · one policy
  - Footer: Notebook support: [CLM-?: Jupyter notebook support]
- **Visual:** Cards template, three cards. Each has a big headcount numeral, the focus area, a mono stack tag, the starter wins and an act chip in amber with ink text.
- **Notes (80 s, 188 words):** "Here is how it fits each of your three teams, in their own stacks. Your one hundred and twenty software engineers build digital payments, mobile apps and banking infrastructure in Python, TypeScript and Java. Their first wins are onboarding to unfamiliar services, test-first defect fixes, where the failing test is written before the fix, and code migrations such as framework upgrades [UC-?: SWE use cases]. Your forty data scientists build fraud, credit-scoring and customer-behavior models in Python, Jupyter notebooks, pandas, scikit-learn and TensorFlow; a notebook is a document that mixes code, charts and notes. Their wins are data acquisition and cleaning, exploratory analysis, model prototypes and dashboards [UC-?: DS use cases]. Your twenty site reliability engineers, SREs, manage incidents and keep systems up in Python, shell scripts and Go. Their wins are incident triage from logs and metrics, runbook automation, a runbook being a step-by-step operating procedure, and postmortem drafts, the write-up after an incident [UC-?: SRE use cases]. One agent, one policy, all one hundred and eighty people, which is what a single company-wide tool requires. Each team gets one act in the demo, which is next."
- **Reqs:** REQ-05, REQ-10, REQ-12
- **Placeholders:** [UC-?: SWE use cases]; [UC-?: DS use cases]; [UC-?: SRE use cases]; [CLM-?: Jupyter notebook support]
- **Cut:** skip at 0:12

### s10-demo-plan — Live Demo Plan
- **Section:** Demo (no deck § number) · spine 5
- **Kind:** table
- **Executive line:** Fourteen minutes, three acts, one per team, with security controls switched on throughout.
- **On slide:**
  - Header: Act | Team | Minutes | What you will see
  - Act 1 | Software engineers | 5 | Payments ledger: tour, cent-rounding fix test-first, card-number hook blocks a write
  - Act 2 | Data scientists | 6 | FRED macro data: inflation vs unemployment, Fed moves vs volatility, dashboard
  - Act 3 | SREs | 2 | Incident INC-2291 triaged headless, read-only
  - Close | Governance | 1 | Central policy, action log, routing to your cloud
  - Footer: Synthetic data only · FRED data is public and attributed [CLM-?: FRED attribution and terms]
- **Visual:** Table template with 4 rows and 4 columns at 28px. The minutes column is in tabular figures. This is the last slide shown before the terminal.
- **Notes (27 s, 68 words):** "Fourteen minutes, three acts, one for each team, with the controls on the whole time. Act one is a payments service with a one-cent rounding defect in merchant statements. Act two is public macro data from FRED, the St. Louis Fed's economic database [CLM-?: FRED]. Act three is an incident, triaged with no person typing. I'm switching to the terminal now. [Fallback line: 'This morning's run, same prompt.']"
- **Reqs:** REQ-08, REQ-05
- **Placeholders:** [CLM-?: FRED attribution and terms]; [CLM-?: FRED]
- **Cut:** keep

### s11-demo-recap — Demo Recap
- **Section:** Demo (no deck § number) · spine 5
- **Kind:** statement
- **Executive line:** One agent served three teams, and every step ran under one central policy and left an audit record.
- **On slide:**
  - Statement: One agent · three teams · one policy · every step logged
- **Visual:** Statement template on paper, one serif line of 9 words, centered. This is the first slide back from the terminal.
- **Notes (13 s, 32 words):** "That was one agent serving three teams. Every step ran under one central policy, and the audit log, a record of every action, captured all of it. Now, how you control that."
- **Reqs:** REQ-08
- **Placeholders:** none
- **Cut:** keep

### s12-security-controls — Security Controls
- **Section:** §5 Security · spine 6
- **Kind:** table
- **Executive line:** You control where it runs, what it can touch and what it records, through central policy that you set.
- **On slide:**
  - Header: Your question | Control | Seen in the demo | Id
  - What can it touch? | Permission rules; sandboxing [CLM-677] | Tests allowed; secrets file denied | CC-1, CC-3
  - What must it never do? | Hooks enforce policy in code [CLM-683] | Card-number write blocked | CC-4
  - Who sets policy? | Managed settings, highest precedence [CLM-659] | Governance close | CC-2
  - What does it record? | Audit log; OpenTelemetry export, prompts redacted by default [CLM-656] | Audit file from Acts 1-3 | CC-6
  - Where does it run? | Bedrock (AWS) or Agent Platform, formerly Vertex AI (GCP), your accounts [CLM-686] [CLM-687] | Provider environment variables | CC-7
  - Footer: Sources: Claude Code docs, October 2026, as cited per row · Trust review required
- **Visual:** Table template with 5 rows and 4 columns at 28px. The question column is in ink and bold. Ids are in mono and match `security/security-brief.md`.
- **Notes (95 s, 214 words):** "CTO, this is your section, and you have already seen most of it live, so I will be brief and precise. Five questions, five controls. What can it touch? Permission rules allow or deny specific commands and files, so in the demo it ran tests but could not read the secrets file; sandboxing, which fences off the file system and network for the commands it runs, adds a second wall [CLM-677]. What must it never do? Hooks enforce policy in code, like the card-number guard that blocked a write in Act one [CLM-683]. Who sets policy? Managed settings, a policy file your administrators deploy centrally; nothing in an engineer's own settings overrides it [CLM-659]. What does it record? Every tool call can be logged, and usage and events export through OpenTelemetry, an open standard for telemetry, with prompt text redacted by default [CLM-656]. Where does it run? Model calls can go through Amazon Bedrock in your AWS account or Google Cloud's Agent Platform, formerly Vertex AI, in your GCP project, the managed AI services of your two clouds [CLM-686] [CLM-687]. Data handling, retention and certifications are in the appendix and the security brief, with sources, and I would expect your security team to test them. If time is short, the leave-behind covers the rest."
- **Reqs:** REQ-15, REQ-17, REQ-12
- **Placeholders:** none · cited ids: CLM-677, CLM-683, CLM-659, CLM-656, CLM-686, CLM-687 (Trust review still required, ADR-003 §4.2)
- **Cut:** keep

### s13-deployment-aws-gcp — Deployment in AWS and GCP
- **Section:** §5 Security · spine 6
- **Kind:** diagram (diagram-deployment)
- **Executive line:** Claude Code can run through Amazon Bedrock in your AWS account or Google's Agent Platform in your GCP project, under your identity and billing.
- **On slide:**
  - Nodes: Laptop (engineers) · CI (headless) → Claude Code → Amazon Bedrock (FinTechCo AWS account) | Google Cloud Agent Platform, formerly Vertex AI (FinTechCo GCP project)
  - Annotations: Policy (managed settings) · Audit (logs, OpenTelemetry) · Identity (cloud IAM, SSO)
  - Footer: Sources: [CLM-686] [CLM-687] [CLM-690] [CLM-658] · boundary labels need Trust review
- **Visual:** The diagram-deployment template. Two sources on the left, Claude Code in the middle, the two cloud boxes on the right, and the three annotations as nouns. Data-boundary wording follows the template's "[CLM-?: ...] Trust review required" comments.
- **Notes (75 s, 181 words):** "This is the deployment picture your architects will ask for. Engineers run Claude Code on their laptops, and the same agent runs headless in CI. A few environment variables, settings read when the tool starts, route every model request to Amazon Bedrock in a FinTechCo AWS account or to Agent Platform in a FinTechCo GCP project [CLM-686] [CLM-687], and the documentation recommends a dedicated account or project for each [CLM-660] [CLM-661]. Your cloud's identity and access management, IAM, the system that decides who may call which service, then governs access, and spend is seen and capped in your cloud billing console [CLM-658]. Engineers authenticate with your cloud credentials, including single sign-on, SSO, one corporate login [CLM-690]. Around it sit three things you control: policy through managed settings, audit through logs and OpenTelemetry, and identity through IAM and SSO. What data leaves your accounts, and what is retained, is in the appendix with sources; I would rather your security team test it than take my word. Controls make it safe to try; the next question is how you will know it worked."
- **Reqs:** REQ-17, REQ-02, REQ-15
- **Placeholders:** none · cited ids: CLM-686, CLM-687 (provider variables, IAM), CLM-660, CLM-661 (dedicated account or project), CLM-658 (billing and spend), CLM-690 (authentication)
- **Cut:** skip at 0:30

### s14-measurement-framework — Measurement Framework
- **Section:** §6 Measure · spine 7
- **Kind:** table
- **Executive line:** Measure it like any investment: adoption, flow, quality, then business outcomes, against your own baselines and with guardrails.
- **On slide:**
  - Strip (top): Published evidence is mixed [CLM-666], which is why we measure on your work
  - Header: Tier | Example metrics | Signal | Guardrail
  - Adoption and engagement | Weekly active users; sessions per user [MET-?: adoption - weekly active share] | Leading, weeks | Team level only, no leaderboards
  - Flow | PR cycle time; change lead time [MET-?: flow - PR cycle time] | Leading to lagging | Review time does not rise
  - Quality | Change fail rate; escaped defects; review rework [MET-?: quality - change fail rate] | Lagging | Must not get worse
  - Experience | Developer survey [MET-?: experience - developer survey] | Leading | Trust in output
  - Business | Features shipped; time to market [MET-?: business - features shipped] | Lagging, months | Incidents per release
  - Strip (bottom): Baseline captured in weeks 1-2 from Git host, CI, tracker, incident tooling (Assumption: these systems exist) · same metrics for every tool · metric names per DORA [CLM-655]
- **Visual:** Table template with 5 rows and 4 columns at 26px. The Signal column uses text labels (Leading / Lagging) as well as a teal or slate color. The two strips sit above and below the table.
- **Notes (95 s, 219 words):** "Measuring business impact is a concern for you both, so I start with an honest note on evidence. The evidence on AI coding productivity is mixed: a 2025 randomized trial found experienced open-source developers took 19% longer with AI tools, a 2024 enterprise trial (preprint) estimated about 21% less time on task, the 2025 trial's authors now say current tools likely help but their newer data is unreliable, and DORA 2024 linked AI adoption to higher individual productivity but lower delivery throughput and stability. Which is why we measure on your work. [CLM-666] DORA is Google Cloud's software delivery research program [CLM-653]. Adoption and engagement are leading indicators, early signals within weeks: who uses it and how often. Flow is how fast work moves: pull-request cycle time from opening to merge, a pull request being a proposed change awaiting review, and change lead time to production [CLM-655]. Quality is the guardrail tier, measures that must not get worse: change fail rate, the share of changes that cause a production failure, and escaped defects, the ones that reach customers. Experience is a short developer survey. Business outcomes are lagging indicators that show up over months: features shipped, time to market. Everything is compared with your own baseline, the measurement before anyone uses the tool, the same way for every assistant."
- **Reqs:** REQ-06, REQ-13, REQ-21, REQ-12
- **Placeholders:** [MET-?: adoption - weekly active share]; [MET-?: flow - PR cycle time]; [MET-?: quality - change fail rate]; [MET-?: experience - developer survey]; [MET-?: business - features shipped] · cited ids: CLM-666 (partial; its safeWording is spoken verbatim in the notes), CLM-655, CLM-653
- **Cut:** keep

### s15-roi-scenarios — ROI Scenarios
- **Section:** §6 Measure · spine 7
- **Kind:** table
- **Executive line:** ROI is a range built from stated assumptions, and the pilot replaces each assumption with a number measured at FinTechCo.
- **On slide:**
  - Header: Input or result | Conservative | Base | Upside
  - Hours saved per adopter per week | [ASM-?: hours saved, conservative] | [ASM-?: hours saved, base] | [ASM-?: hours saved, upside]
  - Steady-state adoption | [ASM-?: adoption, conservative] | [ASM-?: adoption, base] | [ASM-?: adoption, upside]
  - Annual value of redirected hours | [ASM-?: roi.mjs output] | [ASM-?: roi.mjs output] | [ASM-?: roi.mjs output]
  - Annual cost (seats, usage, enablement) | [ASM-?: cost, conservative] | [ASM-?: cost, base] | [ASM-?: cost, upside]
  - Payback (months) | [ASM-?: payback] | [ASM-?: payback] | [ASM-?: payback]
  - Strip: Break-even [ASM-?: break-even hours per adopter per week] · most sensitive input [ASM-?: sensitivity ranking] · spend caps available per setup [CLM-685] · calculator in the leave-behind
  - Footer: Inputs and bases in A9 · prices are list prices until quoted [CLM-?: list prices, dated]
- **Visual:** Table template with 5 rows and 4 columns at 28px. Numbers are right-aligned in tabular figures. Base is in ink, the other two columns in slate. The break-even strip is in amber with ink text.
- **Notes (85 s, 205 words):** "Now the math, with every assumption visible. Return on investment, ROI, here means the value of engineering hours redirected to roadmap work, set against licence, usage and enablement costs. The model multiplies four inputs: people who adopt it, hours saved per adopter per week, realization, which is the share of saved hours that becomes delivered work, and the loaded cost of an hour, meaning salary plus benefits and overhead [ASM-?: input values]. It runs team by team, because your engineers, data scientists and SREs may differ in both cost and likely savings. It shows three scenarios, conservative, base and upside, and payback, the months until cumulative value covers cumulative cost [ASM-?: scenario outputs]. Sensitivity, meaning which input moves the answer most, is the useful part, and the break-even line shows how many hours per adopter per week would cover the cost [ASM-?: break-even hours]. The calculator in your leave-behind lets your finance team change any input and watch the result move. You are cost-conscious but not cost-driven, so I would lead with throughput and time to market and treat cost as the floor. Every assumption here is replaced by a measured number before the go or no-go decision. Here is how we get those numbers."
- **Reqs:** REQ-06, REQ-10, REQ-14, REQ-18
- **Placeholders:** [ASM-?: hours saved, conservative / base / upside]; [ASM-?: adoption, conservative / base / upside]; [ASM-?: roi.mjs output]; [ASM-?: cost, conservative / base / upside]; [ASM-?: payback]; [ASM-?: break-even hours per adopter per week]; [ASM-?: sensitivity ranking]; [ASM-?: input values]; [ASM-?: scenario outputs]; [ASM-?: break-even hours]; [CLM-?: list prices, dated] · cited ids: CLM-685
- **Cut:** keep

### s16-evaluation-timeline — Evaluation Timeline
- **Section:** §7 Evaluation · spine 8
- **Kind:** diagram (generic: timeline)
- **Executive line:** Prove it in eight weeks on your own work, decide at week nine, and enable all 180 people about four months after kickoff.
- **On slide:**
  - Bar 1: PW1-2 Readiness · Jan 11-22
  - Bar 2: PW3-8 Pilot, six weeks · Jan 25-Mar 5
  - Gate: PW9 Decision gate · Mar 8-12 · go / extend / stop
  - Bar 3: PW10-17 Rollout waves · Mar 15-May 7
  - Milestone: All 180 enabled · Fri May 7, 2027
  - Label: Assumption: illustrative kickoff Mon 2027-01-11; an earlier start shifts every date
  - Complexity row: Install low · Policy and cloud routing medium · Enablement medium
  - Axis note: PW = program week, counted from kickoff
- **Visual:** Generic diagram on the 1664x700 host. A horizontal week axis PW1-PW17 with three bars and a diamond gate at PW9, drawn as SVG with labels pinned over it as text. The complexity row uses three chips with text labels, not color alone.
- **Notes (75 s, 175 words):** "Here is the path to company-wide, with dates you can hold us to. The dates assume a kickoff on Monday, January eleventh; start sooner and every date moves earlier by the same number of weeks. Weeks one and two are readiness: security review closed, policy configured, cloud routing in place, and baselines captured before anyone starts. Weeks three to eight are a six-week pilot with a pilot cohort, a named group drawn from all three teams, working on the starter use cases you will see next. Week nine is the decision gate, a meeting where you decide go, extend or stop on the evidence, and the answer can be no, including choosing a different tool. Weeks ten to seventeen roll out in waves, groups enabled one after another, so all one hundred and eighty people are working with it by Friday, May seventh, about four months after kickoff. Implementation complexity: low for installation, which is one command [CLM-693], medium for policy and cloud routing, and medium for enablement, because this is your first agentic tool."
- **Reqs:** REQ-07, REQ-11, REQ-19
- **Placeholders:** none (dates are labelled Assumption; timeline spine from hub `adoption`) · cited ids: CLM-693 (one-command install)
- **Cut:** keep

### s17-starter-use-cases — Starter Use Cases
- **Section:** §7 Evaluation · spine 8
- **Kind:** cards
- **Executive line:** Start with two low-risk, measurable use cases per team, each with a baseline, a guardrail and a visible result in week one.
- **On slide:**
  - Card "Software engineers (120)": [UC-?: test-first fix of a payments defect, Python or Java] · [UC-?: guided onboarding to an unfamiliar service, TypeScript] · `Python · TypeScript · Java`
  - Card "Data scientists (40)": [UC-?: cleaning and exploring a fraud or credit-scoring dataset in Jupyter and pandas] · [UC-?: analysis to shareable dashboard] · `Python · Jupyter · pandas · scikit-learn · TensorFlow`
  - Card "SREs (20)": [UC-?: read-only headless incident triage from logs and metrics] · [UC-?: runbook to tested shell or Go script] · `Python · shell · Go`
  - Strip: each with a baseline, success criteria and a guardrail [MET-?: success criteria per starter]
- **Visual:** Cards template, three cards. Each card has two starter lines and a mono stack tag.
- **Notes (60 s, 142 words):** "These are the starter use cases, two per team, each chosen for a measurable baseline, a small blast radius, meaning little can go wrong if it fails, and a visible result in the first week. Software engineers: a test-first fix of a real payments defect, and a guided onboarding tour of an unfamiliar service [UC-?: SWE starters]. Data scientists: cleaning and exploring a fraud or credit-scoring dataset in a Jupyter notebook, and turning an analysis into a shareable dashboard [UC-?: DS starters]. SREs: read-only incident triage from logs and metrics, and turning a runbook, an operating procedure, into a tested script [UC-?: SRE starters]. Each has success criteria and a guardrail in the evaluation plan. Head of Digital Transformation, treat this as a starting list for your team leads to adjust to their own backlogs. So here is who does what next."
- **Reqs:** REQ-07, REQ-05
- **Placeholders:** [UC-?: test-first fix of a payments defect, Python or Java]; [UC-?: guided onboarding to an unfamiliar service, TypeScript]; [UC-?: cleaning and exploring a fraud or credit-scoring dataset in Jupyter and pandas]; [UC-?: analysis to shareable dashboard]; [UC-?: read-only headless incident triage from logs and metrics]; [UC-?: runbook to tested shell or Go script]; [UC-?: SWE starters]; [UC-?: DS starters]; [UC-?: SRE starters]; [MET-?: success criteria per starter]
- **Cut:** skip at 0:37

### s18-next-steps-owners — Next Steps and Owners
- **Section:** §8 Wrap-up · spine 8
- **Kind:** closing
- **Executive line:** Three decisions today start the evaluation: a security review, a pilot cohort with a metrics owner, and a kickoff date.
- **On slide:**
  - Row 1: CTO · Open the security and compliance review; working session with your security team · package Day 2 [date] · session by Day 7 [date] (package sent by [Your Name])
  - Row 2: Head of Digital Transformation · Name the pilot cohort across all three teams and a metrics owner · by Day 14 [date]
  - Row 3: Together · Agree the pilot kickoff date · today · proposed Mon 2027-01-11 (Assumption)
  - Label: Top concern: [named in the room] · owner: [name]
  - Label: Follow-up email Day 1: deck, security brief, evaluation plan, ROI model
- **Visual:** Closing template on night: three owner / action / date rows, as in the ADR-005 ask. The top-concern line is left blank and filled in live. Dates are written as [date] until the meeting day is set.
- **Notes (70 s, 165 words):** "To close, three decisions today start the evaluation, and each has an owner and a date on the slide. First, CTO: will you open a security and compliance review with us? We send the review package within two days and hold a working session with your security team within a week. Second, Head of Digital Transformation: will you name a pilot cohort across all three teams, and a metrics owner, the person who captures baselines and reports the numbers each week, within two weeks? Third, together: can we agree a pilot kickoff date today? I have proposed Monday, January eleventh, so the pilot starts after the year-end holidays [CLM-665], and earlier works too. CTO, earlier you named a concern that could stop this; I am writing it here with an owner, so it is tracked from today. You will have a follow-up email tomorrow with this deck, the security brief, the evaluation plan and the ROI model. What would you change about these three steps?"
- **Reqs:** REQ-09, REQ-11, REQ-16
- **Placeholders:** [Your Name]; [date] (three, set on the meeting day); [named in the room]; [name] · cited ids: CLM-665 (holiday dates)
- **Cut:** keep

### s19-questions — Questions and Discussion
- **Section:** Buffer · the one thing to remember
- **Kind:** statement
- **Executive line:** Claude Code is an agent that finishes tested tasks inside your controls and cloud; prove it on your work in eight weeks, then scale.
- **On slide:**
  - Statement: Finished, tested tasks inside your controls, proven on your own work in eight weeks.
  - Small label: Questions
- **Visual:** Statement template, amber variant: one serif sentence of 14 words in ink on amber. This is the deck's single amber statement and stays up during questions.
- **Notes (10 s, 23 words):** "One thing to keep: an agent that finishes tested tasks inside your controls, proven on your own work in eight weeks. Your questions?"
- **Reqs:** REQ-09, REQ-12
- **Placeholders:** none
- **Cut:** keep

## Appendix slide blocks

These are backup slides for Q&A, shown only on request. They are outside the clock, and their notes are spoken only if asked. They cover the seven ADR-005 and ticket topics: deployment architecture (a01), data handling (a02), controls catalog (a03), competitive detail (a04), pricing models (a05), metrics detail (a06) and evaluation detail (a07). Two more add CTO evidence (a08) and ROI inputs (a09).

### a01-deployment-architecture — Deployment Architecture
- **Section:** Appendix · backs §5 (spine 6)
- **Kind:** diagram (generic: request path)
- **Executive line:** Prompts and permitted files travel from the laptop or CI runner to a model endpoint in your own cloud account, and tools run locally.
- **On slide:**
  - Step 1: Engineer prompt (laptop or CI runner)
  - Step 2: Claude Code reads permitted files, runs permitted tools locally
  - Step 3: Model request → Bedrock endpoint (FinTechCo AWS account) or Agent Platform, formerly Vertex AI, endpoint (FinTechCo GCP project) [CLM-686] [CLM-687]
  - Step 4: Response returns to the session
  - Step 5: Telemetry → OpenTelemetry collector → your monitoring (Assumption: FinTechCo chooses the collector and monitoring tool)
  - Label: Private connectivity [CLM-?: AWS PrivateLink for Bedrock; Private Service Connect for Agent Platform]
  - Label: Dedicated AWS account and GCP project recommended [CLM-660] [CLM-661]
  - Footer: Boundary labels are neutral nouns · Trust review required
- **Visual:** Generic diagram with five numbered boxes left to right, two dashed boundary regions (the device or CI runner, and the cloud account), and labels pinned as text.
- **Notes (40 s, 91 words):** "If your architects want the detail, this is the request path. An engineer's prompt and the files the agent is permitted to read go from the laptop or CI runner to the model endpoint in your own AWS or GCP account [CLM-686] [CLM-687]. Private network paths that avoid the public internet are listed with sources [CLM-?: private connectivity options]. Tool execution stays local, under permission rules and hooks. Telemetry flows through OpenTelemetry to a collector you choose. Your security team should validate each boundary label with us in the working session."
- **Reqs:** REQ-17, REQ-12
- **Placeholders:** [CLM-?: AWS PrivateLink for Bedrock; Private Service Connect for Agent Platform]; [CLM-?: private connectivity options] · cited ids: CLM-686, CLM-687, CLM-660, CLM-661
- **Cut:** keep

### a02-data-handling — Data Handling
- **Section:** Appendix · backs §5 (spine 6)
- **Kind:** table
- **Executive line:** Five data questions your security team will ask, each answered with a dated source and open to verification in the review.
- **On slide:**
  - Header: Question | Answer (October 2026) | Source
  - What is sent to the model? | Prompts, files read, command output for the session | [CLM-?: data sent to the model]
  - Used for training? | Per commercial terms and provider path | [CLM-?: training policy, commercial and cloud provider]
  - How long is it retained? | Per deployment path | [CLM-?: retention per path]
  - Where is it processed? | Your chosen Bedrock or Agent Platform region | [CLM-?: regional processing]
  - Usage telemetry on the cloud path? | Metrics are not sent back to Anthropic | [CLM-658]
  - Footer: Trust review required before use (ADR-003 §4.2)
- **Visual:** Table template with 5 rows and 3 columns at 26px.
- **Notes (40 s, 101 words):** "Five data questions, each with an answer and a source. What is sent to the model: the prompts, file contents and command output a session uses [CLM-?: data sent]. Whether it is used for training: the commercial terms answer this [CLM-?: training policy]. How long it is retained depends on the deployment path [CLM-?: retention per path]. Where it is processed depends on the region you choose in Bedrock or Agent Platform [CLM-?: regional processing]. And on that cloud path, usage metrics are not sent back to Anthropic [CLM-658]. I would rather your team verify each one in the working session."
- **Reqs:** REQ-15, REQ-17
- **Placeholders:** [CLM-?: data sent to the model]; [CLM-?: training policy, commercial and cloud provider]; [CLM-?: retention per path]; [CLM-?: regional processing]; [CLM-?: data sent]; [CLM-?: training policy] · cited ids: CLM-658
- **Cut:** keep

### a03-controls-catalog — Controls Catalog
- **Section:** Appendix · backs §5 (spine 6)
- **Kind:** table
- **Executive line:** Nine controls, with the same ids as the security brief, each naming what it enforces and the evidence an auditor can inspect.
- **On slide:**
  - Header: Id | Control | Enforces | Audit evidence
  - CC-1 | Permission modes and rules | allow, ask, deny per tool, file, command | settings files
  - CC-2 | Managed settings | central policy, not overridable | managed settings file
  - CC-3 | Sandboxing | file system and network isolation | sandbox config
  - CC-4 | Hooks | your code at fixed points; can block | hook scripts, audit log
  - CC-5 | MCP allowlisting | which tool servers may connect | MCP config
  - CC-6 | OpenTelemetry export | usage and event telemetry | collector data
  - CC-7 | Bedrock / Agent Platform path | model calls in your accounts | env config, cloud logs
  - CC-8 | Auth, SSO, credentials (incl. headless CI) | who can run it | identity and CI secret config
  - CC-9 | Data-handling settings | retention and telemetry options | settings
  - Footer: Sources: CC-2 [CLM-659] [CLM-675] · CC-4 [CLM-683] · CC-5 [CLM-678] [CLM-679] · CC-6 [CLM-656] · CC-7 [CLM-686] [CLM-687] · CC-8 [CLM-690] · CC-1, CC-3 [CLM-677] · CC-9 [CLM-?: data-handling settings] · ids from `security/security-brief.md` · Trust review required
- **Visual:** Table template with 9 rows and 4 columns at 24px, one line per row (the template's 5-row limit is lifted by the smaller size). Ids are in mono.
- **Notes (40 s, 94 words):** "This is the full catalog behind the five controls on the main slide, with the same ids as the security brief. Permission modes and rules; managed settings; sandboxing; hooks; MCP allowlisting, which limits the external tools the agent may connect to; OpenTelemetry export; the Bedrock and Agent Platform provider path; authentication, single sign-on and credentials, including headless CI; and data-handling settings. Each row names what the control enforces and the evidence your auditors can inspect [CLM-659] [CLM-683] [CLM-678] [CLM-656] [CLM-686] [CLM-690]. Your security team can test every one of them in the working session."
- **Reqs:** REQ-15, REQ-12
- **Placeholders:** [CLM-?: data-handling settings] · cited ids: CLM-659, CLM-675, CLM-677, CLM-678, CLM-679, CLM-683, CLM-656, CLM-686, CLM-687, CLM-690
- **Cut:** keep

### a04-competitive-detail — Competitive Detail
- **Section:** Appendix · backs §3 (spine 3)
- **Kind:** table
- **Executive line:** A dated snapshot from each vendor's own documentation, stating every product's strengths, on the same dimensions as the main slide.
- **On slide:**
  - Header: Product | Surfaces | Agentic tasks | Enterprise controls | Your-cloud deployment
  - Claude Code (Oct 2026) | Terminal, VS Code, JetBrains, desktop, web, CI [CLM-693] [CLM-694] | Multi-step tasks, plan mode [CLM-694] | Managed settings, hooks, OpenTelemetry [CLM-659] [CLM-683] [CLM-656] | Bedrock; Agent Platform, formerly Vertex AI [CLM-686] [CLM-687]
  - [CLM-?: competitor A name] | [CLM-?: A surfaces] | [CLM-?: A agent mode] | [CLM-?: A controls] | [CLM-?: A deployment]
  - [CLM-?: competitor B name] | [CLM-?: B surfaces] | [CLM-?: B agent mode] | [CLM-?: B controls] | [CLM-?: B deployment]
  - [CLM-?: competitor C name] | [CLM-?: C surfaces] | [CLM-?: C agent mode] | [CLM-?: C controls] | [CLM-?: C deployment]
  - Footer: Vendors' official docs only, accessed October 2026 · a snapshot; products change monthly
- **Visual:** Table template with 4 rows and 5 columns at 24px. Text only: no logos, no ticks, no scoring colors.
- **Notes (40 s, 91 words):** "This is the detailed comparison, dated October 2026 and sourced only from each vendor's own documentation [CLM-?: competitors' official docs]. Read it as a snapshot, because these products change monthly. For each product the table shows surfaces, agentic tasks, enterprise controls and deployment in your own cloud, the same dimensions as the main slide, and where another assistant is strong, the table says so. My recommendation does not change with the snapshot: run the same tasks and the same metrics on every tool you shortlist, and let your own data decide."
- **Reqs:** REQ-04, REQ-21
- **Placeholders:** [CLM-?: competitor A, B, C names and each cell, from that vendor's official docs]; [CLM-?: competitors' official docs] · cited ids: CLM-693, CLM-694, CLM-659, CLM-683, CLM-656, CLM-686, CLM-687
- **Cut:** keep

### a05-pricing-models — Pricing Models
- **Section:** Appendix · backs §6 (spine 7)
- **Kind:** table
- **Executive line:** Three ways to pay, seats, API usage or your cloud bill, at dated list prices; FinTechCo's own price is to be quoted.
- **On slide:**
  - Header: Model | Billed by | Fits | Source
  - Seat plans [CLM-?: plan names] | per user per month | predictable budgets | [CLM-?: plan prices and inclusions, dated, link]
  - API pay-as-you-go | per token used | headless and CI jobs | [CLM-?: API token prices, dated, link]
  - Amazon Bedrock | your AWS bill | AWS-routed teams | [CLM-?: Bedrock pricing page, dated]
  - Google Cloud Agent Platform (Vertex AI) | your GCP bill | GCP-routed teams | [CLM-?: Agent Platform pricing page, dated]
  - FinTechCo price | to be quoted | none | none
  - Strip: Usage reference: about $13 per developer per active day, $150-250 per developer per month, average across enterprise deployments [CLM-663] · spend caps per setup [CLM-685]
- **Visual:** Table template with 5 rows and 4 columns at 26px. The "to be quoted" cell is in amber with ink text.
- **Notes (35 s, 88 words):** "There are three ways to pay, and your actual price is to be quoted. Seat plans charge per user per month, which suits predictable budgets [CLM-?: plan pricing, dated]. Usage is charged per token, a small chunk of text; Anthropic's documentation puts the enterprise average at around thirteen dollars per developer per active day [CLM-663]. Through Amazon Bedrock or Agent Platform, usage is billed and capped on your cloud account [CLM-685]. The ROI model uses list prices until a quote arrives, and the calculator updates when it does."
- **Reqs:** REQ-14, REQ-18
- **Placeholders:** [CLM-?: plan names]; [CLM-?: plan prices and inclusions, dated, link]; [CLM-?: API token prices, dated, link]; [CLM-?: Bedrock pricing page, dated]; [CLM-?: Agent Platform pricing page, dated]; [CLM-?: plan pricing, dated] · cited ids: CLM-663, CLM-685
- **Cut:** keep

### a06-metrics-detail — Metrics Detail
- **Section:** Appendix · backs §6 (spine 7)
- **Kind:** table
- **Executive line:** The headline metric set, with definitions, pilot thresholds labelled as assumptions, and a guardrail for every metric.
- **On slide:**
  - Header: Metric | Tier | Signal | Pilot threshold (Assumption) | Guardrail
  - [MET-?: adoption - weekly active share of cohort] | adoption | leading | [MET-?: threshold] | team level only
  - [MET-?: flow - PR cycle time] | flow | leading | [MET-?: threshold] | review time
  - [MET-?: flow - change lead time] | flow | lagging | [MET-?: threshold] | change fail rate
  - [MET-?: quality - change fail rate] | quality | lagging | must not rise | none (is a guardrail)
  - [MET-?: experience - developer survey score] | experience | leading | [MET-?: threshold] | trust in output
  - [MET-?: business - features shipped per quarter] | business | lagging | measured after pilot | incidents per release
  - Footer: Definitions from `value/metrics.json` · delivery metrics per DORA [CLM-655] · usage via OpenTelemetry or the analytics dashboard [CLM-656] [CLM-657]; on the cloud path, OpenTelemetry only [CLM-658] · AI-assisted commits and PRs attributed by default [CLM-664]
- **Visual:** Table template with 6 rows and 5 columns at 24px.
- **Notes (40 s, 94 words):** "This is the headline metric set with definitions, data sources and pilot thresholds, drawn from the metrics contract your metrics owner will run [MET-?: headline set]. Flow and quality follow the DORA metrics, a published framework for software delivery throughput and stability [CLM-655]. Every threshold is an assumption until you confirm it, every metric is reported at team level only, and each has a guardrail, a counter-metric that must not get worse. The same definitions apply to every tool you evaluate, so the comparison stays fair and your engineers know exactly what is measured."
- **Reqs:** REQ-06, REQ-13, REQ-21
- **Placeholders:** [MET-?: adoption - weekly active share of cohort]; [MET-?: flow - PR cycle time]; [MET-?: flow - change lead time]; [MET-?: quality - change fail rate]; [MET-?: experience - developer survey score]; [MET-?: business - features shipped per quarter]; [MET-?: threshold]; [MET-?: headline set] · cited ids: CLM-655, CLM-656, CLM-657, CLM-658, CLM-664
- **Cut:** keep

### a07-evaluation-detail — Evaluation Detail
- **Section:** Appendix · backs §7 (spine 8)
- **Kind:** table
- **Executive line:** At week nine you choose go, extend or stop on agreed evidence, and stop is a real outcome, including choosing another tool.
- **On slide:**
  - Header: Gate outcome | Evidence required | What happens next
  - Go | success criteria met, no guardrail breached [MET-?: success criteria] | waves start PW10, Mon 2027-03-15 (Assumption)
  - Extend | promising but incomplete signal | named fix; extra weeks set in the evaluation plan; dates shift
  - Stop | criteria missed or a guardrail broke | no rollout, or evaluate another tool on the same metrics
  - Decision owner | per `rollout/evaluation-plan.md` | recorded in the mutual action plan
  - Comparison method | same tasks, same metrics for every shortlisted tool | results shared with both attendees
- **Visual:** Table template with 5 rows and 3 columns at 26px. The first column has three text labels (Go, Extend, Stop) with color as a second cue.
- **Notes (40 s, 88 words):** "This is how the week-nine decision gate works. Go means the pilot met its success criteria with no guardrail breached, and rollout waves start the following Monday. Extend means the signal is promising but incomplete, so the pilot continues for a set period with a named fix, and later dates shift. Stop means the criteria were missed or a guardrail broke, and the answer is no, or a different tool. The decision owner, the evidence and the comparison method are written into the evaluation plan [MET-?: success criteria]."
- **Reqs:** REQ-07, REQ-11, REQ-21
- **Placeholders:** [MET-?: success criteria]
- **Cut:** keep

### a08-evidence-base — Evidence Base
- **Section:** Appendix · backs §3 and §6 (spines 3 and 7)
- **Kind:** table
- **Executive line:** Enterprise proof as published, and productivity research that points in different directions, which is why we measure on your work.
- **On slide:**
  - Header: Evidence | Finding, as published | Type | Source
  - Enterprise customer story 1 | [CLM-?: outcome as published] | customer story | [CLM-?: customer story 1 link and date]
  - Enterprise customer story 2 | [CLM-?: outcome as published] | customer story | [CLM-?: customer story 2 link and date]
  - Adoption figure | [CLM-?: enterprise adoption figure as published by Anthropic] | company announcement | [CLM-?: announcement link and date]
  - METR randomized trial, 2025 | Experienced open-source developers took 19% longer with AI tools on their own repositories | randomized trial | [CLM-650]
  - METR update, Feb 2026 | Estimated speedups for returning developers; METR calls the signal unreliable | trial update | [CLM-651]
  - DORA 2024 | AI adoption: higher individual productivity, flow and satisfaction; lower delivery stability and throughput | survey research | [CLM-653]
  - DORA 2025 | AI amplifies an organization's existing strengths and weaknesses | survey research | [CLM-654]
  - Footer: Evidence is mixed, which is why we measure on your work
- **Visual:** Table template with 7 rows and 4 columns at 24px, one line per row. The study rows share one band so that the mixed findings read as one group.
- **Notes (40 s, 100 words):** "CTO, this is the full evidence base, so you can judge it yourself and check every source. Customer stories and adoption figures appear exactly as published, with dates [CLM-?: enterprise customer stories]. The studies point in different directions: a 2025 randomized trial found experienced open-source developers took 19% longer with AI tools [CLM-650], METR's 2026 update estimated speedups but calls that signal unreliable [CLM-651], and DORA's 2024 research linked AI adoption to higher individual productivity but lower delivery throughput and stability [CLM-653], which is why we measure on your work. The pilot then shows which pattern holds for your teams."
- **Reqs:** REQ-15, REQ-06, REQ-03
- **Placeholders:** [CLM-?: outcome as published] (two); [CLM-?: customer story 1 link and date]; [CLM-?: customer story 2 link and date]; [CLM-?: enterprise adoption figure as published by Anthropic]; [CLM-?: announcement link and date]; [CLM-?: enterprise customer stories] · cited ids: CLM-650, CLM-651, CLM-653, CLM-654
- **Cut:** keep

### a09-roi-assumptions — ROI Assumptions
- **Section:** Appendix · backs §6 (spine 7)
- **Kind:** table
- **Executive line:** Every ROI input has a conservative, base and upside value and a stated basis, and the calculator recomputes payback as you change them.
- **On slide:**
  - Header: Input | Conservative | Base | Upside | Basis
  - Headcount SWE / DS / SRE | 120 / 40 / 20 | 120 / 40 / 20 | 120 / 40 / 20 | `brief/facts.json`
  - Loaded cost per hour, by team | [ASM-?] | [ASM-?] | [ASM-?] | [CLM-?: published wage and compensation data]
  - Hours saved per adopter per week | [ASM-?] | [ASM-?] | [ASM-?] | Assumption until [MET-?: flow - time saved proxy]
  - Steady-state adoption | [ASM-?] | [ASM-?] | [ASM-?] | Assumption
  - Realization factor | [ASM-?] | [ASM-?] | [ASM-?] | Assumption
  - Seat and usage cost | [ASM-?] | [ASM-?] | [ASM-?] | usage reference [CLM-663]; seats [CLM-?: list prices, dated]
  - Footer: Ids and values from `value/roi-assumptions.json`; editable in the calculator
- **Visual:** Table template with 6 rows and 5 columns at 24px. Numbers are right-aligned in tabular figures.
- **Notes (35 s, 88 words):** "These are the inputs behind the ROI scenarios, each with a conservative, base and upside value and its basis, either a source or a labelled assumption [ASM-?: input set]. Headcounts are your figures: one hundred and twenty, forty and twenty. Loaded costs come from published wage data until your finance team supplies actuals [CLM-?: wage data source]. Hours saved stays an assumption until the pilot measures it. Change any input in the calculator and the payback and break-even update at once, so finance can test its own view."
- **Reqs:** REQ-06, REQ-14
- **Placeholders:** [ASM-?] (one per scenario cell); [ASM-?: input set]; [CLM-?: published wage and compensation data]; [CLM-?: wage data source]; [MET-?: flow - time saved proxy]; [CLM-?: list prices, dated] · cited ids: CLM-663
- **Cut:** keep

## Porting note (Google Slides template)

The brief names the template "[MAKE A COPY] Applied AI Architect Interview Slide Deck - Claude Cod…", truncated in the PDF. Its link was not in the brief (ADR-002), so it cannot be read here. The deck is built in the Slides artifact format (ADR-001) and ported by the candidate. Palette roles, type scale, sizes and the Google Slides fallback fonts are defined in `deck/visual-system.md` and are not repeated here. Sizes convert at px = pt × 2, so 24px is 12pt.

### Rebuilding each kind in the template

| Kind | Template layout to use | Fonts (roles per visual-system.md) | Colors (roles per visual-system.md) | Rebuild steps |
| --- | --- | --- | --- | --- |
| cover | Title slide | Display face for the title, text face for the subtitle and byline; fallbacks as listed | Night background, paper text | Title, subtitle and byline "Prepared by [Your Name] … independent preparation". Add no logos or brand assets, and remove any that the master inserts into this deck's content. |
| section | Section header | Display face for the numeral and title | Night background, paper text, accent on the numeral | One numeral, one title, one sentence. (This deck has no section slides; the layout is kept for an optional divider.) |
| statement | Title only, with the title placeholder deleted (or the template's big-number layout if it has one) | Display face, one sentence | Paper, or the single amber variant with ink text (s19 only) | One centered sentence of 18 words or fewer. Do not add body text. |
| compare | Title and two columns | Text face for cells, bold for row labels | Paper, ink text, accent header on the right-hand column | Use two text columns with matching row labels, or a 3-column table if row alignment drifts. |
| table | Title only, then Insert › Table | Text face at 12-14pt; mono for ids | Paper; header row ink on hairline; no colored cells | Set column widths to match the spec; keep 5 rows or fewer at 14pt (a03, a06, a08 and a09 use 12pt). |
| diagram | Title only, then the diagram artwork as an image, with labels as text boxes | Text face for labels, mono for code names | Paper; accent strokes per visual-system.md | Export the SVG artwork as PNG and place it as an image. Recreate each label as a text box so it stays editable. Check every label against its box. |
| cards | Title only, then three rounded rectangles, grouped | Display numeral, text face body, mono stack tag | Paper cards on paper with hairline borders; amber chips carry ink text | Make cards equal size with equal gaps. For four cards, reduce the width and keep the gaps. |
| closing | Title only on a night background (or the template's closing layout) | Text face for rows, display face for the title | Night background, paper text, accent dates | Three owner / action / date rows, plus a blank line for the top concern. |

### Port procedure (candidate, step by step)
1. Export the finished deck from the Slides artifact as .pptx, with speaker notes, and as PDF. The PDF is the screen-share fallback.
2. In Google Drive, open the template link from the brief and use "Make a copy". Work only in the copy.
3. Fill in the disposition table below for every old slide before importing anything.
4. In the copy, use File › Import slides, upload the .pptx and select all. Decide on "Keep original theme" from the disposition table: keep it off to adopt the template's masters, or on to keep this deck's look.
5. Fonts: check that the display, text and mono faces in `deck/visual-system.md` appear in the font menu. If not, apply the listed fallbacks (Georgia, Arial, Courier New) deck-wide, then check every slide for overflow, starting with the tables.
6. Diagrams (s04, s13, s16, a01): confirm the artwork imported as an image and each label as a separate text box. Nudge any label that moved.
7. Speaker notes: open each slide's notes pane and check against the Notes field in this spec. Paste in any notes that did not import.
8. Replace [Your Name] everywhere. Turn [date] into calendar dates once the meeting day is set. At release, every [CLM-?: ...], [UC-?: ...], [MET-?: ...] and [ASM-?: ...] must already be resolved (G2), and source lines appear as footers.
9. Rehearse on Google Meet: share the browser tab or window in presenter view with notes on a second screen. Switch to the terminal (18pt or larger, light theme, one window per act) and back. Time each segment against the clock table and the 0:12, 0:20, 0:26, 0:30 and 0:37 checkpoints.
10. Keep three fallbacks open: the PDF, the Slides artifact link, and `demo/fallback/` for the demo.

### Old template deck disposition (labelled blank)

BLANK. The template could not be read locally (ADR-002). Fill in one row per old slide when the copy is opened. Default rules:
- keep: layouts and masters that host our kinds.
- edit: any old slide whose topic maps to a slide here; replace its content with ours.
- delete: product claims, statistics, customer names or quotes that do not map to a verified or partial claim id, plus any slide that duplicates one of ours.
- new: every slide in this spec with no old counterpart.

| Old slide # | Old title | Disposition (keep / edit / delete / new) | Replaced by (slide id) | Note |
| --- | --- | --- | --- | --- |
| [BLANK] | [BLANK] | [BLANK] | [BLANK] | [BLANK] |
| [BLANK] | [BLANK] | [BLANK] | [BLANK] | [BLANK] |
| [BLANK] | [BLANK] | [BLANK] | [BLANK] | [BLANK] |
| (new) | All slides in this spec | new until matched | s01-s19, a01-a09 | Change to "edit" when an old slide is reused as the host |

Cover rule: s01 states that the deck is the candidate's own preparation ("Prepared by [Your Name], Applied AI Architect (candidate) · independent preparation"). It carries no logos and no brand assets. FinTechCo is fictional and has no logo.

## Requirement map

| REQ | What the reviewer checks | Satisfied by | How |
| --- | --- | --- | --- |
| REQ-02 | How-it-works legible to non-engineers and engineers | s04-agent-loop, s05-agents-autocomplete, s06-extension-points (also s13) | One loop picture with plain labels and technical subtitles; every term defined in the notes; depth in a01 |
| REQ-03 | Value proposition in FinTechCo terms, claims sourced | s07-value-fintechco (also a08) | Three cards in FinTechCo's priorities, each with a sourced proof line |
| REQ-04 | Fair differentiators, battlecard for Q&A | s08-competitive-differentiators, a04-competitive-detail | Five dimensions with a pilot test each; competitors' strengths stated; dated, vendor-sourced; `research/battlecard.md` for Q&A |
| REQ-05 | Per-team slide naming 120 / 40 / 20 and their stacks | s09-fit-by-team (also s17, s10) | One card per team with headcount, focus and stack from `brief/facts.json`; one demo act each |
| REQ-06 | Metrics framework with leading and lagging metrics, baselines, guardrails; ROI with assumptions and sensitivity | s14-measurement-framework, s15-roi-scenarios, a06-metrics-detail, a09-roi-assumptions | Tiers labelled leading or lagging; baseline strip; guardrail column; three ROI scenarios with payback, break-even and sensitivity |
| REQ-07 | Evaluation plan with named starter use cases per team, success criteria, decision gate, timeline | s16-evaluation-timeline, s17-starter-use-cases, a07-evaluation-detail | Two named starters per team; PW9 gate with go, extend or stop; dated timeline |
| REQ-08 | Demo slides consistent with ADR-004 | s10-demo-plan, s11-demo-recap | Acts 1-3 plus governance close at 5 + 6 + 2 + 1 min; notes name the switch to the terminal and the fallback line; 40 s of speech |
| REQ-09 | Wrap slide with owners and dates; wrap starts by 0:37 | s18-next-steps-owners (s19 for the buffer) | Three owner / action / date rows from ADR-005; top concern with an owner; planned start 35:00, latest 0:37, never cut |
| REQ-10 | Benefit tied to team productivity and shipping new products | s07-value-fintechco, s03-priorities-context, s09-fit-by-team, s15-roi-scenarios | Cards named after the two priorities; ROI framed on redirected hours and time to market |
| REQ-11 | Complexity assessment and a dated timeline to company-wide rollout in about four months | s16-evaluation-timeline (also a07, s18) | PW1-PW17 dated from the illustrative K = Mon 2027-01-11; all 180 by Fri 2027-05-07; complexity row |
| REQ-12 | Layered for mixed expertise: executive line first, depth on request, jargon defined | Every slide block (executive line field), glossary in `deck/storyline.md`, appendix a01-a09 | Executive line of 25 words or fewer; plain-English definitions at first use; depth in notes and backup slides |
| REQ-22 | Time checkpoints and a cut list | Clock table and cut list (this file); the Cut field on every slide; s02-agenda shows the 0:37 stop | Checkpoints unchanged; seconds recovered per checkpoint |
| REQ-25 | Original deck; mapping notes for porting into the Google Slides template | Porting note (this file); s01-cover | Kind-by-kind rebuild table, port procedure, disposition table left blank and labelled |
| REQ-13 | Impact measurement gets its own slide | s14-measurement-framework | Supporting coverage beyond this ticket's list |
| REQ-14 | ROI scenarios with assumptions and payback | s15-roi-scenarios, a09-roi-assumptions, a05-pricing-models | Supporting |
| REQ-15 | Security section and sourced enterprise proof points for the CTO | s12-security-controls, s07-value-fintechco, a02, a03, a08 | Supporting |
| REQ-17 | Bedrock and Vertex AI deployment with data-flow diagram | s13-deployment-aws-gcp, a01-deployment-architecture | Supporting |
| REQ-18 | Value framed on throughput and time to market; cost shown, not led | s07-value-fintechco, s15-roi-scenarios | Supporting |
| REQ-19 | All 180 in about four months with a decision gate | s16-evaluation-timeline | Supporting |
| REQ-20 | Agentic vs autocomplete explained | s05-agents-autocomplete | Supporting |
| REQ-21 | Evaluation fair and comparable across tools | s08, s14, a04, a06, a07 | Supporting |

## Open items

None of these changes an ADR. Where sources conflict, the plan follows the stricter one.

1. **Buffer: 1, 2 or 3 minutes.** ADR-005 gives a 1-minute buffer (0:39-0:40). REQ-01 asks for 2 minutes. G4 targets a 38-minute rehearsal. Plan: the ADR-005 1-minute buffer row stays as planned question time (s19). The planned total is 2280 s (38:00), so 2:00 also remains before 40:00. This satisfies G4 and REQ-01 without moving any ADR-005 clock time. Owner: eng-lead to confirm (request already posted to hub `decisions` by mgr-narrative).
2. **"Wrap starts at 0:37" versus a 38:00 plan.** With wrap (2 min) and buffer (1 min) at their ADR clock times, the plan cannot end at 38:00. It would end at 40:00. Plan: 0:37 is read as the latest start, the ADR-005 checkpoint, which is unchanged. The rehearsed plan starts the wrap at 35:00, and the wrap is never cut. Owner: eng-lead.
3. **Deck § numbering versus spine numbering.** ADR-005 labels deck sections §1-§8, while its spine counts the demo as sentence 5. This is resolved by the map in `deck/storyline.md`: the demo has no § number, §5 and §6 are spine 6 and 7, and §7 and §8 share spine 8. No ADR edit is needed.
4. **Appendix topics: six or seven.** ADR-005 lists "evaluation metrics detail" as one backup topic. The ticket asks for metrics detail and evaluation detail separately. Plan: both are provided (a06, a07), together with deployment, data handling, controls, competitive and pricing (a01-a05), plus a08 and a09.
5. **Demo slide speech inside a 14-minute demo with no slack.** ADR-004's acts sum to exactly 840 s. This spec puts the 40 s of slide speech inside Act 1 (27 s) and the governance minute (13 s), leaving 785 s of terminal time and 15 s of slack. Owner: demo team. The G3 dry-run must confirm that Act 1 fits 273 s of terminal time and the governance close fits 32 s.
6. **The rollout lands about 6.5 months after today's date.** The adoption team's illustrative kickoff (Mon 2027-01-11) puts "all 180 enabled" on Fri 2027-05-07. That is about four months from kickoff (REQ-19) but 199 days after 2026-10-20. The brief's goal is "within the next few months". Plan: the deck says "about four months after kickoff" and that an earlier kickoff shifts every date. Owner: adoption and eng-lead, to decide whether a pre-holiday kickoff should be the default.
7. **Time recovered at 0:20.** ADR-004 does not say how long the live dashboard build takes, so the cut table's 90 s is an assumption. Owner: demo team, to measure at G3.
8. **Extra cut levers proposed, not adopted.** Compressing s06 at 0:12, and s15 to its break-even strip if §6 starts after 0:31, would add about 60 s of recovery. ADR-005 lists neither, so every Cut field follows ADR-005 only. Owner: eng-lead, to decide.
9. **Trust review.** s12, s13 and a01-a03 make security, data-handling and deployment statements. They need Trust sign-off before release (ADR-003 §4.2). Control ids CC-1 to CC-9 follow hub `trust`.
10. **Contracts only partly available.** When this was finished, only the adoption claim shards existed (CLM-650 to CLM-697). Their verified or partial ids are cited where the wording matches, and partial claims use their safeWording verbatim (CLM-666 on s14). The product, competitive, proof-point, pricing, trust and demo shards, `strategy/use-cases.json`, `value/metrics.json` and `value/roi-assumptions.json` did not exist yet. The rest therefore stays `[CLM-?: ...]`, `[UC-?: ...]`, `[MET-?: ...]` or `[ASM-?: ...]`, for Sprint 2 to resolve. Enterprise proof points (s07, a08) are the largest open gap for the CTO; owner: research (S1-RES-03).
11. **Brand assets in the template.** The Google Slides template comes from the interviewer and may carry brand marks in its master. This engagement adds no logos or brand assets (ADR-001, ADR-003 §4.3). The candidate decides about the template's own master elements when porting and records the choice in the disposition table.
12. **Vertex AI is now Agent Platform.** As of October 2026, Claude Code's documentation calls the GCP path "Google Cloud's Agent Platform, formerly Vertex AI" [CLM-661]. ADR-004, REQ-17 and the S1-NAR-02 diagram template say "Vertex AI". This spec says "Agent Platform, formerly Vertex AI" the first time it appears on each slide and in notes, without editing either ADR. Owner: S1-NAR-02, to update the diagram-deployment label (request posted to hub `narrative`).
13. **Headless is now non-interactive mode.** The documentation now calls `claude -p` "non-interactive mode (formerly called headless mode)" [CLM-694]. The deck keeps "headless", the ADR-004 and ticket term, and gives the current name where it defines the term (s06).
14. **"Two env vars" in ADR-004.** The ADR-004 governance close mentions "the two env vars" that route to Bedrock or Vertex. The docs list `CLAUDE_CODE_USE_BEDROCK` plus `AWS_REGION` for Bedrock, and `CLAUDE_CODE_USE_VERTEX` plus `CLOUD_ML_REGION` and `ANTHROPIC_VERTEX_PROJECT_ID` for Agent Platform [CLM-686] [CLM-687]. s12 and s13 therefore say "a few environment variables" and "provider environment variables". Owner: demo team, to align the narration and `demo/enterprise/*.env.example` (request posted to hub `demo`).
15. **Adoption metrics on the cloud path.** Through Bedrock or Agent Platform, usage metrics are not sent back to Anthropic, so the analytics dashboard does not cover them. Per-user attribution comes from OpenTelemetry or a gateway [CLM-658]. Owner: value team, to set adoption and engagement data sources accordingly (note posted to hub `value`).
16. **Readiness lead time on GCP.** Claude model access on Agent Platform may take 24-48 hours to approve [CLM-687]. The Bedrock use-case form is one-time per account [CLM-686]. Both belong in the PW1-2 readiness checklist. Owner: adoption team.
17. **Word counts include markers.** The W in each Notes field counts every word, bracketed markers included. Markers are short, so both W and the spoken words alone stay within 10% of N × 140 / 60. When Sprint 2 builds the slides, it moves markers to footers and keeps the spoken text.
