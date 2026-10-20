- **Objective:** agreement to start a measured Claude Code evaluation that can end in company-wide rollout in about four months, with named owners for first steps.
- **The ask:** the CTO opens a security and compliance review; the Head of Digital Transformation names a pilot cohort across all three teams and a metrics owner; together, a pilot kickoff date.
- **Biggest risk:** the CTO's security and enterprise-proof doubts start a debate before the demo that eats the wrap: interest, but no owners or dates.

# FinTechCo stakeholder map and meeting plan

Advisor, not seller (ADR-005). Plain text is from `brief/facts.json` (A1); **Typical:** = executives in regulated finance often feel this, not a FinTechCo fact; **Assumption:** = our inference, confirm in the room.

## 1. The two attendees

| | CTO | Head of Digital Transformation |
|---|---|---|
| Goals | Team productivity, new products, one agentic tool company-wide within months. Assumption: a choice they can defend to auditors | The same priorities. Assumption: a measured win that survives the CTO's review |
| Fears | Typical: code leaving the perimeter; unapproved agent actions; untraceable changes; adopting before peers prove it | Assumption: a stall in security review; a pilot without baselines; engineers led on a dotted line never adopt |
| Must hear | "You decide where it runs, what it touches and what it records, and your security team tests that before any real code." | "You'll measure this on your own teams, against your own baselines, and leave equipped to carry it internally." |
| Proof needed | Controls live (denied read, blocked write, audit log); policy users cannot override [CLM-659]; model calls through their own AWS or Google Cloud account [CLM-686] [CLM-687]; we cite one named adopter statement only as Anthropic publishes it (s07, Citi, with the page sent afterwards [CLM-631]), and the follow-up kit lists published customer statements: Anthropic's financial-services page carries statements from named firms, including one attributed to Citi about choosing Claude for its developer platform, and we describe no firm's deployment size or results [CLM-631] | ROI with stated assumptions (D5); evaluation plan with starter use cases and decision gate (D6); their teams' stacks in the demo |
| Engage | Peer to peer, technical, brief; concede risk first. Ask them first. Hand over in Act 1 (they pick a rehearsed block to see) and at 0:26: "What would your security team test first?" (top concern) | Warm, practical ally, never two against the CTO. Ask them second. Hand over at 0:34 (cohort, metrics owner); at 0:37 they restate next steps (practice for selling internally) |

**Signals to watch**

| Signal | Planned response |
|---|---|
| CTO raises security before 0:26 | Answer in 20 seconds only if it blocks; else park: "I'll show that live at 0:26." |
| CTO: "Who else like us runs this?" | Verified adopters only; if none, say so; follow up in D8 |
| CTO: "Studies show no gain" | Concede mixed evidence [CLM-666]; "so we measure on your work" (0:30) |
| CTO: "Is it compliant?" | Never say compliant: name controls; their compliance team decides fit; ask 1 |
| HoDT: "Let's just roll it out" | Turn to the CTO: "Measuring first is what makes the rollout stick." |
| HoDT wants an ROI number | Model and assumptions, no promise (D5); numbers need baselines and a metrics owner |
| HoDT quiet after a CTO objection | Give them a role: "How would your engineering managers judge this?" |

## 2. Absent stakeholders

| Stakeholder | Likely concern (typical, not a FinTechCo fact) | Will ask the champion | Leave-behind | Our offer |
|---|---|---|---|---|
| CISO | Data leaving the perimeter; agent actions; secrets | "Where does our code go; what can it run?" | D7 | Review package; working session within a week |
| Risk and compliance | Audit evidence; accountability for AI-written changes | "Who approved this change; can we prove it?" | D7 | Audit-trail walkthrough; attribution [CLM-664] |
| Model risk | Agent edits to fraud and credit-scoring models | "Does this change how models are validated?" | D6, D7 | No model code in the pilot before their sign-off |
| Engineering managers | Disruption, review load, measuring individuals | "What does it cost my team; how are we measured?" | D6, D5 | Team-level metrics only; enablement for their leads |
| Procurement | Terms, data processing, exit | "What are the terms; how do we exit?" | D8, D7 | Account-team introduction; pricing to be quoted |
| Finance | Cost predictability and payback | "What will it cost; when does it pay back?" | D5 | Calculator on their numbers; spend caps [CLM-685] |

**Champion kit** (what the Head of Digital Transformation carries away):
1. Pilot charter: cohort, starter use cases, success criteria, decision gate (D6).
2. ROI model and calculator, assumptions visible (D5).
3. Security brief and threat model for the CISO (D7).
4. Follow-up email and mutual action plan (D8).
5. Win themes as reusable lines; champion routine [CLM-691]; executive co-signed launch [CLM-692].

## 3. Win themes

### Win theme 1: finished tasks, measured on your work
Team productivity. It plans, edits, runs tests and checks results [CLM-694]; the gain is proved on FinTechCo baselines. Proof: we quote no productivity percentage; the evidence on AI coding productivity is mixed [CLM-666], which is why we measure on your work.

### Win theme 2: new products sooner, across all three teams
Shipping new products. One tool for payments and mobile code, fraud and credit-scoring analysis, incident triage. Proof: we cite no customer outcome on delivery speed; the pilot measures it on your own products (MET-12 roadmap throughput, MET-13 time to first release of a new product).

### Win theme 3: safe control, in your own cloud
Safe control: central policy [CLM-659], blocking hooks, audit trail, Amazon Bedrock or Vertex AI deployment [CLM-686] [CLM-687]. Proof: as of October 2026, Anthropic's Commercial Terms say it may not train models on Customer Content [CLM-600]; standard retention for Claude Code on commercial plans is 30 days, and zero data retention is available to qualified Enterprise accounts [CLM-602].

## 4. Risks to the meeting

| ID | Trigger | Mitigation | ADR-005 checkpoint or cut |
|---|---|---|---|
| R-01 | Security debate before the demo | 20-second answer only if it blocks; park the rest | 0:12 demo start: competitor table to one sentence, skip fit |
| R-02 | Demo step fails or runs a minute over | Switch to `demo/fallback/` output; narrate | 0:20 Act 2 from complete state; 0:26 Act 3 narrated |
| R-03 | "Name a bank using it"; nothing verified | Say so; own the follow-up in D8 | 0:07 Why segment; no extra time |
| R-04 | Champion pushes to skip evaluation | Advisor stance; return to the CTO's criteria | 0:34 evaluation; 0:37 compress to timeline slide |
| R-05 | ROI not started by 0:30 | Security to one slide plus the leave-behind | 0:30 cut; 0:37 wrap whatever remains |
| R-06 | Wrap reached with no named top concern | Ask for it in the first wrap line | 0:37 wrap; 0:39 buffer |

## 5. The ask (ADR-005)

1. **CTO:** opens a security and compliance review with us. We send the review package (D7); a working session with their security team within a week.
2. **Head of Digital Transformation:** names a pilot cohort across all three teams and a metrics owner to capture baselines.
3. **Together:** a pilot kickoff date.

Success in the room: both agree to 1 to 3, and the CTO's top concern is named and has an owner.

## Appendix

### A1. Persona trace to `brief/facts.json`

| Trait used in the body | Source field |
|---|---|
| CTO: 20+ years in financial services IT | `attendees[0].profile` |
| CTO: highly security-conscious; concerned about regulatory compliance | `attendees[0].profile` |
| CTO: technical depth; skeptical without proven enterprise adoption | `attendees[0].profile` |
| HoDT: champions AI initiatives in the bank | `attendees[1].profile` |
| HoDT: dotted-line leader of the engineering organization | `attendees[1].profile` |
| HoDT: has advocated modern tools for developer productivity | `attendees[1].profile` |
| Priorities: team productivity, shipping new products | `priorities` |
| Cost-conscious but not cost-driven | `costPosture` |
| One agentic tool company-wide within months; none in use today; evaluating alongside others | `goal`, `currentState` |
| 120 software engineers, 40 data scientists, 20 SREs; AWS and GCP; US customers | `teams`, `infrastructure`, `market` |

Everything else in this file (goals beyond the priorities, fears, likely reactions) is labelled Typical or Assumption and is confirmed or corrected through `strategy/discovery.md`.

### A2. Per-stakeholder detail

**CTO.**
- Why they matter: they own the risk decision; without the security review (ask 1) nothing else moves. Assumption: they also influence the budget for the tool.
- What a good meeting looks like to them (Assumption): fewer slides, controls seen working, honest limits, a plan their security team leads.
- Words to avoid: "secure by default", "compliant", "proven at banks" (unless a verified claim says exactly that), any productivity percentage presented as theirs.
- Depth to have ready (backup slides and D7): the data path for each deployment route (Anthropic API, Amazon Bedrock [CLM-686], Vertex AI [CLM-687]); managed settings precedence and lock-down keys [CLM-659] [CLM-677]; hooks as deterministic checks [CLM-694]; telemetry export [CLM-680]; data retention periods and zero-data-retention availability for Claude Code, as of October 2026 [CLM-602] [CLM-603]; certifications as listed in Anthropic's help center, dated March 16, 2026 (SOC 2 Type I and Type II, ISO 27001:2022, ISO/IEC 42001:2023 and a HIPAA-ready configuration), with the reports available through the Trust Center for FinTechCo's team to request and read for scope [CLM-618].
- If they ask for references: offer to ask Anthropic's account team whether a reference conversation is possible; never promise one.

**Head of Digital Transformation.**
- Why they matter: they carry the case after we leave, to engineers who report to them only on a dotted line (REQ-16).
- What they need to sell it (Assumption): a story engineering managers accept (team-level measurement, no individual scorecards), a security path the CTO already owns, early wins they can show within weeks.
- How we help after the meeting: send the follow-up kit (D8) promptly (timing set in D8); offer to co-present the pilot charter to engineering managers; share the champion routine [CLM-691] and the advice to answer engineer doubts with a demonstration on the person's own code [CLM-697].
- Watch for: promising outcomes to peers before baselines exist. Our counter: "Let's commit to the measurement, not the number." Mixed evidence: [CLM-666].

**Absent stakeholders, depth.**
- CISO: typically wants the threat model, the deployment data flow and the list of enforced controls before a working session. Bring D7 and the governance close from the demo (managed settings, hooks, audit log).
- Risk and compliance: typically asks what evidence an auditor would see for an AI-assisted change. Answer with controls and commit attribution [CLM-664]; their team decides regulatory fit. We name no specific regulation or supervisory guidance in the room; their team maps those requirements.
- Model risk: typical model-governance practice validates model changes before production. Pilot rule: data-science starter use cases avoid production fraud and credit-scoring models unless model risk has signed off.
- Engineering managers: the objection and Q&A bank (sibling strategy ticket) holds answers on skills and review load; the use-case catalog (sibling strategy ticket) names starter use cases per team.
- Procurement and finance: we state no list prices; FinTechCo pricing is "to be quoted" (ADR-006). Spend controls by deployment route [CLM-685].

### A3. Further risks

| ID | Risk and trigger | Likelihood / impact | Owner | Mitigation | ADR-005 checkpoint or cut |
|---|---|---|---|---|---|
| R-07 | "Is it compliant?" or a demand for a guaranteed productivity number | Medium / high | Candidate | Controls, not compliance; mixed evidence [CLM-666], then the measurement plan | 0:26 security; 0:30 ROI |
| R-08 | Google Meet screen share fails or the terminal is unreadable | Low / high | Candidate | Pre-flight (D9); share the deck only and narrate from `demo/fallback/` | 0:12 demo start; 0:26 demo end |
| R-09 | One attendee joins late or must leave early | Medium / high | Candidate | Discovery F-11: bring the ask forward while both are present | 0:37 wrap moves earlier |
| R-10 | Asked to compare with a named competitor in detail | Medium / medium | Candidate | Same evaluation protocol for every tool (D6); factual, dated points only (D10); no disparagement | 0:07 Why; competitor table to one sentence if behind at 0:12 |
| R-11 | Cost becomes the lead topic before 0:30 | Low / medium | Candidate | Cost-conscious, not cost-driven: one-line answer, spend controls [CLM-685], detail in D5 | 0:30 ROI |
| R-12 | API credits or rate limits hit mid-demo | Low / high | Candidate | Fallback outputs; model default per ADR-004 | 0:20 Act 2 from complete state; 0:26 Act 3 narrated |

### A4. The ask, as spoken at 0:37 (73 words, ~31 seconds at 140 wpm)

"Here is what I'd suggest as next steps. First, [CTO], would you open a security and compliance review with us? We'll send the review package and meet your security team within a week. Second, [Head of Digital Transformation], could you name a pilot cohort across all three teams and someone to own the baselines? Third, can we agree a kickoff date today? And [CTO], your top concern was ___: who should own it?"

### A5. Items this file deliberately does not state
- Named adopters and customer outcomes: one statement cited in the room exactly as Anthropic's financial-services page attributes it (s07), never paraphrased as an outcome; the follow-up email sends the page [CLM-631].
- Productivity figures: none quoted; the evidence is mixed [CLM-666] and results come from FinTechCo's own baselines.
- Training, retention and certifications: stated only as in [CLM-600], [CLM-602], [CLM-603] and the partial wording of [CLM-618]; FinTechCo's team reads the reports.
- Named US financial regulations and supervisory guidance: not named; FinTechCo's compliance team maps them.
- Claude Code list prices: not stated; FinTechCo pricing is "to be quoted".

Cited verified or partial claims (from `research/claims/adoption-*.json` and `research/claims/strategy.json`): CLM-600, CLM-602, CLM-603, CLM-618, CLM-631, CLM-659, CLM-664, CLM-666, CLM-677, CLM-680, CLM-685, CLM-686, CLM-687, CLM-691, CLM-692, CLM-694, CLM-697. Statements on data handling, deployment and controls need Trust review before release (ADR-003 section 4.2).
