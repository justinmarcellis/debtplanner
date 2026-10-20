# Storyline: Claude Code for FinTechCo (G1 input)

Ticket S1-NAR-01 · author ic-narrative-storyliner · draft for gate G1 · product facts as of October 2026.
Inputs: ADR-005 (objective, agenda, checkpoints, spine, ask), ADR-004 (demo), ADR-006 (claims), ADR-003 (controls), `brief/facts.json`, `brief/requirements.json`, hub `adoption` (timeline spine), hub `trust` (control ids CC-1 to CC-9). Slide ids refer to `deck/slide-spec.md`.
Claims: every external fact carries `[CLM-?: what needs sourcing]`; no claim shard, `strategy/use-cases.json` or `value/metrics.json` existed when this was written, so use cases, metrics and ROI inputs are `[UC-?: ...]`, `[MET-?: ...]` and `[ASM-?: ...]`. FinTechCo facts are only those in `brief/facts.json` (120 / 40 / 20, 180 total); anything else about FinTechCo is marked "Assumption:".

Stance (ADR-005): a principal architect, not a salesperson. We recommend measuring every candidate tool the same way, show why we expect Claude Code to do well on FinTechCo's own work, and put proof and controls ahead of enthusiasm because the CTO is skeptical without proven enterprise adoption.

## The one thing to remember

> Claude Code is an agent that finishes tested tasks inside your controls and cloud; prove it on your work in eight weeks, then scale.

One sentence, 24 words. It is on screen during questions (s19-questions), and three slides set it up: s04-agent-loop (an agent that finishes tested tasks), s12-security-controls (inside your controls and cloud) and s16-evaluation-timeline (eight weeks, then scale).

## The narrative spine, expanded

The eight sentences are quoted verbatim from ADR-005. Each one gets beats (in speaking order), proof (what makes it believable, with its slide and claim status) and a transition line (the last spoken sentence of that section's final slide in `deck/slide-spec.md`).

### Spine 1 · Open (deck §1, s01-s03)

> You want productivity and new products shipped, safely, with one tool chosen in months.

Beats
1. Thank them and frame the forty minutes around one decision made well: which coding tool to roll out, and how to prove it (s01-cover).
2. The agenda follows their three questions from the invitation: how it works, why it helps FinTechCo, how to evaluate and roll it out. Next steps start at 0:37 whatever is left (s02-agenda).
3. Play back only what the brief gives: priorities are team productivity and shipping new products; cost-conscious but not cost-driven; one agentic tool company-wide within months; 180 technical staff on AWS and GCP; no agentic tools today; evaluating Claude Code alongside other assistants. "Agentic" gets its plain-English definition here (s03-priorities-context).
4. Ask one question of each attendee. CTO: "What is the one concern that would stop this, whatever the benefits?" Head of Digital Transformation: "What pilot result would let you take this to the whole organization?" Write the CTO's answer down. It comes back on s18 with an owner.

Proof: brief facts only. This section states no external facts.

Transition: "Thank you. Let me start with how it works, because everything else rests on that picture."

### Spine 2 · How Claude Code works (deck §2, s04-s06)

> Claude Code is an agent that works in your engineers' environment: it plans, uses your tools, checks its own work, and asks before it acts.

Beats
1. One mental model for both audiences: an agent inside the developer's environment (terminal, editor, repository, tests, cloud CLIs) running a loop of understand, plan, act with tools, verify. Ask permission is drawn as a gate on the step into act (s04-agent-loop).
2. The CTO's hook is the gate. By default it asks before it edits or runs anything, administrators decide what is pre-approved, and engineers review every change (s04).
3. The unit of help moves from the next line to a finished, tested task. In fairness, many assistants now have agent modes, and the pilot should measure how far each tool carries a task (s05-agents-autocomplete).
4. Five extension points make it FinTechCo's own: CLAUDE.md, MCP, hooks, subagents and headless mode. Three of them appear in the demo (s06-extension-points).

Proof: [CLM-?: Claude Code overview: reads code, edits files, runs commands, October 2026]; [CLM-?: plan mode]; [CLM-?: permission defaults and rules]; [CLM-?: Claude Code docs for CLAUDE.md, MCP, hooks, subagents, headless mode]; [CLM-?: competitor agent modes, from each vendor's official docs, October 2026].

Transition: "You will see three of these in the demo. First, why this matters for FinTechCo."

### Spine 3 · Why Claude Code (deck §3, s07-s08)

> That changes the unit of help from a line of code to a finished, tested task — and it runs where your engineers already work.

Beats
1. Value, in FinTechCo's own priorities (s07-value-fintechco):
   - Team productivity: learning unfamiliar services, writing tests and chasing defects become tasks the agent carries while engineers review.
   - Shipping new products: saved hours go back to roadmap work, and a data scientist can build a client-ready dashboard without a front-end queue (shown in Act 2).
   - Safely: one policy, one audit trail and FinTechCo's own cloud accounts.
2. Proof before enthusiasm. Published enterprise results are shown with their sources and offered as reasons to run a pilot, not as a forecast (s07; full list on a08-evidence-base).
3. A fair comparison on five dimensions, each with the pilot test that settles it. Other assistants' strengths, such as inline completion, are stated plainly. The detail is dated and comes from each vendor's own documentation (s08-competitive-differentiators; a04-competitive-detail).
4. The stance, said out loud: measure every tool the same way on your code.

Proof: [CLM-?: enterprise customer stories, financial services first, names and outcomes exactly as published]; [CLM-?: supported surfaces: terminal, editor, CI]; [CLM-?: Amazon Bedrock and Google Cloud Vertex AI support]; [CLM-?: managed settings]; [CLM-?: each competitor's official docs, October 2026].

Transition: "The fair test is the same tasks and the same metrics on your code. So let me make it concrete for your three teams."

### Spine 4 · FinTechCo fit (deck §4, s09)

> Each of your three teams has work this shortens, in the stacks they use today.

Beats
1. 120 software engineers: digital payments, mobile apps, banking infrastructure; Python, TypeScript, Java. Wins: onboarding to unfamiliar services, test-first defect fixes, migrations [UC-?: SWE use cases].
2. 40 data scientists: fraud detection, credit scoring, customer behavior; Python, Jupyter, pandas, scikit-learn, TensorFlow. Wins: data acquisition and cleaning, exploratory analysis, model prototypes, dashboards [UC-?: DS use cases].
3. 20 SREs: incidents and uptime; Python, shell scripts, Go. Wins: incident triage, runbook automation, postmortem drafts [UC-?: SRE use cases].
4. One agent and one policy for all 180 people. Each team gets one demo act (s09-fit-by-team).

Proof: `brief/facts.json` for teams, sizes, focus areas and stacks; [UC-?: ...] ids from `strategy/use-cases.json`; [CLM-?: Jupyter notebook support].

Transition: "Each team gets one act in the demo, which is next."

### Spine 5 · Live demo (no deck section; bridge slides s10-s11; ADR-004)

> (Demo) Here it is on payments code, macro data and an incident, with your controls on.

Beats
1. s10-demo-plan sets up three acts and a governance close (14 minutes), then the presenter says "I'm switching to the terminal now." The fallback line, if a step stalls: "Here is this morning's run of the same prompt."
2. Act 1, software engineers, 5 min, `payments-ledger`: a tour of an unfamiliar payments service; ticket PAY-1423 ("statements off by a cent") fixed test-first, `float` to `Decimal`, tests green, clean diff; Claude flags the pre-existing card-number logging line; the PCI hook blocks a write that would log a full card number; reading `.env` is denied by policy.
3. Act 2, data scientists, 6 min, `macro-risk`: FRED series fetched with a data dictionary; Phillips-curve flattening (slope by decade, rolling slope; correlation, not a causal claim); an event study of Fed policy moves against VIX; a one-file interactive dashboard.
4. Act 3, SREs, 2 min, `sre-ops`: `./triage.sh incidents/INC-2291` runs Claude Code headless with read-only tools and returns a structured triage. The same command is shown as a CI job.
5. Governance close, 1 min: `managed-settings.json`, project `settings.json`, the audit log the hooks wrote during Acts 1-3, the two environment variables that route through Amazon Bedrock or Vertex AI, OpenTelemetry export.
6. s11-demo-recap: one agent, three teams, one policy, every step logged.

Proof: the live run itself. Fallbacks are in `demo/fallback/` and the `complete` tag (ADR-004 reliability rules); [CLM-?: FRED attribution]; [CLM-?: settings, hook, permission and environment-variable names verified in Claude Code docs] (demo-claude-code shard). Checkpoints: 0:12 demo starts, 0:20 Act 2 has started, 0:26 demo ends.

Transition: "Now, how you control that." (closes s11)

### Spine 6 · Security, governance and deployment (deck §5, s12-s13)

> You control where it runs, what it can touch and what it records; it runs in your AWS or GCP accounts.

Beats
1. The CTO's section, mostly seen live already. Five questions map to five controls (s12-security-controls):
   - What can it touch: permission rules and sandboxing (CC-1, CC-3).
   - What must it never do: hooks (CC-4).
   - Who sets policy: managed settings (CC-2).
   - What does it record: audit log and OpenTelemetry (CC-6).
   - Where does it run: Bedrock or Vertex AI in FinTechCo's own accounts (CC-7).
2. The deployment picture for their architects: laptop and CI, then Claude Code, then Amazon Bedrock in a FinTechCo AWS account or Vertex AI in a FinTechCo GCP project. Policy, audit and identity surround it (s13-deployment-aws-gcp).
3. Data handling, retention and certifications are on the appendix slides and in the security brief, with sources. We invite their security team to test the claims rather than take our word for them (a01-a03).
4. Compressed form at the 0:30 checkpoint: s12 only, plus "the leave-behind covers the rest."

Proof: control ids CC-1 to CC-9 from hub `trust` and `security/security-brief.md`; [CLM-?: permission rules and sandboxing]; [CLM-?: blocking hooks]; [CLM-?: managed settings precedence]; [CLM-?: OpenTelemetry export]; [CLM-?: provider environment variables for Bedrock and Vertex AI]; [CLM-?: authentication options per deployment path]. Every statement here needs Trust review before release (ADR-003 §4.2).

Transition: "Controls make it safe to try; the next question is how you will know it worked."

### Spine 7 · Measuring impact and ROI (deck §6, s14-s15)

> Measure it like any investment: adoption, flow, quality, then business outcomes, against your own baselines.

Beats
1. Evidence first, honestly. Published AI-productivity results are mixed: some studies report speedups, one reports experienced developers slowing down, and industry research ties AI adoption to both throughput and stability effects, which is why we measure on your work (s14-measurement-framework).
2. Five tiers:
   - Adoption and engagement: leading indicators.
   - Flow: pull-request cycle time and lead time.
   - Quality: the guardrail tier.
   - Experience: a short developer survey.
   - Business outcomes: lagging indicators.

   All are measured against FinTechCo's own baselines, reported at team level only, and applied the same way to every tool evaluated (s14).
3. ROI is the value of redirected hours, set against licence, usage and enablement costs. It is shown as conservative, base and upside scenarios with payback, sensitivity and a break-even line. Cost is the floor, not the lead, because FinTechCo is cost-conscious but not cost-driven (s15-roi-scenarios).
4. The pilot replaces every assumption with a measured number before the decision gate.

Proof: [CLM-?: controlled study reporting faster task completion]; [CLM-?: randomized study reporting experienced developers slower]; [CLM-?: DORA finding on AI adoption and delivery]; [MET-?: ...] from `value/metrics.json`; [ASM-?: ...] from `value/roi-assumptions.json`; the ROI calculator (D5).

Transition: "Every assumption here is replaced by a measured number before the decision gate. Here is how we get those numbers."

### Spine 8 · Evaluation, rollout and next steps (deck §7 s16-s17, deck §8 s18, buffer s19)

> Prove it in eight weeks on your own work, then roll out in waves; here is who does what next.

Beats
1. Dated path (s16-evaluation-timeline). Assumption: illustrative kickoff K = Monday 2027-01-11; a different K moves every date by the same number of weeks.
   - PW1-2 (Jan 11-22): readiness.
   - PW3-8 (Jan 25-Mar 5): six-week pilot.
   - PW9 (Mar 8-12): decision gate; go, extend or stop, and the answer can be no.
   - PW10-17 (Mar 15-May 7): rollout waves. All 180 enabled by Friday 2027-05-07, about four months after kickoff.

   Implementation complexity: install low, policy and cloud routing medium, enablement medium.
2. Two starter use cases per team, each with a baseline, a guardrail and a result in week one (s17-starter-use-cases).
3. The ask: three decisions, owners and dates. The CTO's top concern goes on the slide with an owner, and a follow-up email goes out on Day 1 (s18-next-steps-owners).
4. Close on the one thing to remember and take questions (s19-questions).

Proof: `rollout/evaluation-plan.md` and `rollout/rollout-plan.md` (timeline spine in hub `adoption`); [UC-?: two starters per team]; [MET-?: success criteria and guardrails]; install is one command (`brief/facts.json`, meeting.installCommand).

Transitions: "So here is who does what next." (closes s17) · "What would you change about these three steps?" (closes s18).

## Agenda-to-spine map

ADR-005 numbers its deck sections §1-§8, and its spine counts the demo as sentence 5 even though the demo has no deck section. This spec keeps both numberings unchanged and maps them:
- §1-§4 equal spine 1-4.
- The demo is spine 5, with no § number. Its two bridge slides carry Section "Demo".
- §5 and §6 are spine 6 and 7, offset by one.
- §7 (evaluation) and §8 (wrap) both belong to spine 8: §7 is its first clause and §8 its last clause.
- The buffer has no spine sentence. It replays the one thing to remember.

| ADR clock | Min | ADR-005 segment | ADR-005 lead artifact | Spine sentence | Deck section (this spec) | Slides |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 3 | Open: goals, agenda, what we heard; one question to each attendee | Deck §1, `strategy/discovery.md` | 1 | §1 Open | s01-cover, s02-agenda, s03-priorities-context |
| 0:03 | 4 | How Claude Code works | Deck §2 | 2 | §2 How it works | s04-agent-loop, s05-agents-autocomplete, s06-extension-points |
| 0:07 | 3 | Why Claude Code: value and differentiators | Deck §3, battlecard | 3 | §3 Why Claude Code | s07-value-fintechco, s08-competitive-differentiators (backup a04, a08) |
| 0:10 | 2 | FinTechCo fit: three teams, their stacks, their work | Deck §4, use-case catalog | 4 | §4 Fit | s09-fit-by-team |
| 0:12 | 14 | Live demo: three acts | ADR-004, `demo/RUNBOOK.md` | 5 | Demo (no § number) | s10-demo-plan, terminal Acts 1-3 and governance close, s11-demo-recap |
| 0:26 | 4 | Security, governance and deployment in AWS/GCP | Deck §5, security brief | 6 | §5 Security | s12-security-controls, s13-deployment-aws-gcp (backup a01, a02, a03, a05) |
| 0:30 | 4 | Measuring impact and ROI | Deck §6, ROI calculator | 7 | §6 Measure | s14-measurement-framework, s15-roi-scenarios (backup a06, a09) |
| 0:34 | 3 | Evaluation plan and rollout timeline | Deck §7, evaluation plan | 8 (first clause) | §7 Evaluation | s16-evaluation-timeline, s17-starter-use-cases (backup a07) |
| 0:37 | 2 | Wrap-up and next steps | Deck §8, wrap-up kit | 8 (last clause) | §8 Wrap-up | s18-next-steps-owners |
| 0:39 | 1 | Buffer | none | none (the one thing to remember) | Buffer | s19-questions |

## Attendee matrix

The CTO is a veteran of 20+ years in financial services IT. They are highly security-conscious, concerned about regulatory compliance, technically deep, and skeptical without proven enterprise adoption. The Head of Digital Transformation (HoDT) champions AI, is the dotted-line leader of engineering, and advocates for modern developer tools. Both profiles are from `brief/facts.json`.

| Spine | Attendee | What they need | What we show (slide) | Objection pre-empted |
| --- | --- | --- | --- | --- |
| 1 Open | CTO | Evidence that we understood their constraints before any pitch | Playback of brief facts only, then a direct question about the concern that would stop this (s03) | "Another vendor pitch that ignores our risk posture" |
| 1 Open | HoDT | Confirmation that the meeting serves productivity, new products and a decision within months | Agenda built on their three questions, with next steps at 0:37 (s02, s03) | "This turns into a long evaluation with no decision" |
| 2 How it works | CTO | A precise model of what the agent can do on a machine, and where approval sits | Loop diagram with the permission gate and plan mode (s04) | "An autonomous agent will change code or run commands without approval" |
| 2 How it works | HoDT | A simple picture to retell internally | One loop picture; line of code versus finished task (s04, s05) | "Engineers already have autocomplete; what is different?" |
| 3 Why | CTO | Sourced proof of enterprise adoption, not anecdotes | Proof cards with sources (s07) and the full evidence base (a08) [CLM-?: enterprise customer stories as published] | "No proof that this works at an enterprise like ours" |
| 3 Why | HoDT | Value in business terms and a fair reason to choose one tool | Productivity and new-product value (s07); a five-dimension comparison with the pilot test for each (s08, a04) | "Why this tool and not the one everyone talks about?" |
| 4 Fit | CTO | Coverage of the whole estate, including Java, Go and shell, not just Python | Stacks named per team (s09) | "It only helps one team or one language" |
| 4 Fit | HoDT | One tool that serves all 180 people | Three team cards with 120 / 40 / 20 and their work (s09) | "Data scientists and SREs will be left out" |
| 5 Demo | CTO | Controls that work live, not promised | Hook blocks a card-number write; `.env` read denied; Act 3 is headless and read-only; the governance close shows policy, audit log and cloud routing (ADR-004) | "Demos are staged, or the controls are only prompt instructions" |
| 5 Demo | HoDT | A visible win for each team in its own stack | Acts 1-3 on payments code, macro data and an incident (s10, terminal) | "The demo has nothing to do with our work" |
| 6 Security | CTO | Where data goes, what is logged, who owns policy | Controls mapped to their questions (s12); deployment diagram (s13); data handling and controls catalog (a01-a03) | "Our code and data leave our boundary, and there is no audit trail" |
| 6 Security | HoDT | A security path that will not stall the rollout | Security review with a working session inside a week (s12, s18 ask item 1) | "Security review will take months" |
| 7 Measure | CTO | Honest evidence and measurable outcomes with guardrails | Mixed evidence stated plainly, then the framework with a quality guardrail tier (s14) | "Productivity numbers are vendor hype" |
| 7 Measure | HoDT | Numbers to defend the investment to finance | ROI scenarios with assumptions, payback, sensitivity and the calculator (s15, a09) | "We cannot prove ROI to finance" |
| 8 Evaluate and next steps | CTO | A gate that can say no, and limited scope until then | Week-9 decision gate with go, extend or stop (s16, a07) | "The pilot becomes a rollout by default" |
| 8 Evaluate and next steps | HoDT | A dated path to company-wide in months, and a clear role | Dated timeline (s16), starters per team (s17), cohort and metrics-owner ask (s18) | "This will take a year" |

## The ask

Quoted from ADR-005. Dates are relative to the meeting day (Day 0) and become calendar dates on the slide once the meeting is scheduled. Assumption: illustrative kickoff Monday 2027-01-11, the adoption timeline spine.

| # | ADR-005 item (verbatim) | Owner | Our part | Date | Slide that makes it |
| --- | --- | --- | --- | --- | --- |
| 1 | **CTO:** opens a security and compliance review with us (we send the review package; a working session with their security team within a week). | CTO | [Your Name] sends the review package (security brief, controls catalog, data-handling answers) and runs the working session | Package by Day 2; working session by Day 7 | s18-next-steps-owners (teed up on s12-security-controls) |
| 2 | **Head of Digital Transformation:** names a pilot cohort across all three teams and a metrics owner to capture baselines. | Head of Digital Transformation | We supply the pilot charter, the starter use cases and the metric definitions | By Day 14; baselines captured in PW1-2 | s18-next-steps-owners (teed up on s14, s16 and s17) |
| 3 | **Together:** a pilot kickoff date. | CTO and Head of Digital Transformation | We propose a date and the readiness checklist | Agreed in the room (Day 0); proposed K = Monday 2027-01-11 (Assumption) | s18-next-steps-owners (teed up on s16-evaluation-timeline) |

Success in the room (ADR-005): "both attendees agree to (1)-(3), and the CTO's top concern is named and has an owner." s18 has a labelled line for that concern and its owner, filled in live from the CTO's answer on s03. The follow-up email on Day 1 carries the deck, the security brief (D7), the evaluation plan (D6), the ROI model (D5) and the mutual action plan (D8).

## Glossary

Each term is defined in plain English in the speaker notes of the slide listed, the first time it is used in the deck. Terms that s08 defines are defined again on s12, because s08 is compressed at the 0:12 checkpoint.

| Term | Plain English, as spoken | First defined |
| --- | --- | --- |
| agentic | Describes a tool that carries out multi-step work itself, reading code, running commands and checking results, rather than suggesting the next line | s03-priorities-context |
| agent | Software that takes a goal, works out the steps and carries them out | s04-agent-loop |
| model (Claude model) | The AI that does the reasoning behind the agent | s04-agent-loop |
| terminal | The text window where engineers type commands | s04-agent-loop |
| repository | Where a team's code lives, with its history | s04-agent-loop |
| CLI (command-line tool) | A program engineers drive by typing commands, such as a cloud provider's tools | s04-agent-loop |
| plan mode | A mode in which the agent shows its plan for approval before changing anything | s04-agent-loop |
| permission prompt | The agent asks before it edits a file or runs a command, unless policy pre-approves it | s04-agent-loop |
| autocomplete (inline completion) | An assistant that predicts the next line or block while an engineer types | s05-agents-autocomplete |
| agent mode | A setting in an assistant that lets it carry a multi-step task | s05-agents-autocomplete |
| CLAUDE.md | A plain text file in the repository that tells the agent the team's conventions | s06-extension-points |
| MCP (Model Context Protocol) | An open standard for connecting the agent to other tools and data | s06-extension-points |
| hooks | The team's own scripts that run automatically before or after the agent uses a tool; a hook can block the action | s06-extension-points |
| subagent | A specialist helper with its own instructions, such as a security reviewer, that the main agent hands work to | s06-extension-points |
| headless mode | The same agent run from a script or pipeline, with no person typing | s06-extension-points |
| CI (continuous integration) | The automated build and test pipeline | s06-extension-points |
| managed settings | A policy file administrators deploy centrally that engineers cannot override | s08-competitive-differentiators (again on s12) |
| Amazon Bedrock / Google Cloud Vertex AI | The managed AI services inside AWS and GCP | s08-competitive-differentiators (again on s12) |
| test-first fix | The failing test is written before the fix, so the fix is proven | s09-fit-by-team |
| Jupyter notebook | A document that mixes code, charts and notes | s09-fit-by-team |
| SRE (site reliability engineer) | An engineer who manages incidents and keeps systems up | s09-fit-by-team |
| runbook | A step-by-step operating procedure | s09-fit-by-team |
| postmortem | The written review after an incident | s09-fit-by-team |
| FRED | The St. Louis Fed's public economic database | s10-demo-plan |
| audit log | A record of every action the agent took | s11-demo-recap |
| permission rules | Allow or deny lists for specific commands and files | s12-security-controls |
| sandboxing | Fencing off the file system and network for the commands the agent runs | s12-security-controls |
| OpenTelemetry | An open standard for exporting telemetry, here usage and events, to monitoring tools | s12-security-controls |
| environment variables | Settings a tool reads when it starts | s13-deployment-aws-gcp |
| IAM (identity and access management) | The cloud system that decides who may call which service | s13-deployment-aws-gcp |
| SSO (single sign-on) | One corporate login across tools | s13-deployment-aws-gcp |
| leading indicator | An early signal that moves within weeks, such as usage | s14-measurement-framework |
| lagging indicator | A result that shows up over months, such as features shipped | s14-measurement-framework |
| pull request | A proposed code change waiting for review | s14-measurement-framework |
| cycle time | How long a pull request takes from opening to merge | s14-measurement-framework |
| change failure rate | The share of changes that cause a failure in production | s14-measurement-framework |
| guardrail | A counter-metric that must not get worse | s14-measurement-framework |
| baseline | The measurement taken before anyone uses the tool | s14-measurement-framework |
| ROI (return on investment) | The value of redirected engineering hours set against licence, usage and enablement costs | s15-roi-scenarios |
| realization | The share of saved hours that becomes delivered work | s15-roi-scenarios |
| loaded cost | Salary plus benefits and overhead, per hour | s15-roi-scenarios |
| payback | The months until cumulative value covers cumulative cost | s15-roi-scenarios |
| sensitivity | Which input moves the answer the most | s15-roi-scenarios |
| break-even | The hours saved per adopter per week that would cover the cost | s15-roi-scenarios |
| readiness | Weeks 1-2: security review closed, policy configured, cloud routing in place, baselines captured | s16-evaluation-timeline |
| pilot cohort | A named group drawn from all three teams that uses the tool during the pilot | s16-evaluation-timeline |
| decision gate | A meeting where FinTechCo decides go, extend or stop on the evidence | s16-evaluation-timeline |
| rollout waves | Groups enabled one after another | s16-evaluation-timeline |
| blast radius | How much can go wrong if something fails | s17-starter-use-cases |
| metrics owner | The person who captures baselines and reports the numbers | s18-next-steps-owners |
| private connectivity | Network paths to the model endpoint that avoid the public internet | a01-deployment-architecture |
| token | A small chunk of text, the unit API usage is priced in | a05-pricing-models |
| DORA metrics | A published framework of software delivery measures (throughput and stability) | a06-metrics-detail |
| MCP allowlisting | Limiting which external tool servers the agent may connect to | a03-controls-catalog |
