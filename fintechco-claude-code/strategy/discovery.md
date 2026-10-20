# FinTechCo discovery guide

**Use the 3-minute Open (0:00 to 0:03, Deck §1) to confirm what we heard, ask each attendee one question, and get the CTO's top concern on the table. Then bend the next 34 minutes with the flow table, never past a 0:37 wrap.**

Rules for this page: every FinTechCo fact comes from `brief/facts.json`; anything else is a question, not a statement. Segment names, clock and cuts come from ADR-005. Deck section numbers follow the ADR-005 agenda table: §1 Open, §2 How Claude Code works, §3 Why Claude Code, §4 FinTechCo fit, then the live demo (Acts 1 to 3 and the governance close, ADR-004), §5 Security, governance and deployment, §6 Measuring impact and ROI, §7 Evaluation plan and rollout, §8 Wrap-up. Slide numbers come after G1. Speaking times assume about 140 words per minute.

## The Open, second by second (3:00)

| Start | Beat | Who speaks | Time |
|---|---|---|---|
| 0:00 | Aim and agenda | Candidate (39 words) | ~0:17 |
| 0:17 | What we heard | Candidate (69 words) | ~0:30 |
| 0:47 | Opening question to the CTO | Candidate (33 words) | ~0:14 |
| 1:01 | CTO answers | CTO | ~0:50 |
| 1:51 | Opening question to the Head of Digital Transformation | Candidate (25 words) | ~0:11 |
| 2:02 | Head of Digital Transformation answers | HoDT | ~0:45 |
| 2:47 | Bridge to §2 | Candidate (16 words) | ~0:07 |
| 2:54 | Slack | | ~0:06 |

If either answer passes about 1:15, summarize it back in one sentence, write it on the parking list and move on; the rest goes to the follow-ups below or to F-rows.

**Aim and agenda (39 words, ~17 seconds).**
> "Thank you both. My aim today is to help you decide how to evaluate Claude Code. I'll show how it works, run it live on work like yours, cover security, measurement and an evaluation plan, then agree next steps."

## What we heard (69 words, ~30 seconds)

Every fact below is from `brief/facts.json` (`description`, `market`, `infrastructure`, `priorities`, `costPosture`, `goal`, `currentState`, `teams`).

> "Here's what we heard; correct me where it's wrong. You run digital payments and traditional banking for US customers, on AWS and GCP. Your priorities are team productivity and shipping new products; cost-conscious, not cost-driven. You want one agentic coding tool company-wide within the next few months. You use none today, and you're evaluating Claude Code alongside other assistants, for 120 software engineers, 40 data scientists and 20 SREs."

Listen for corrections. Any correction outranks this page: write it on line 3 of the note template and adjust the talk track.

## Opening questions

**To the CTO (33 words, ~14 seconds).**
> "[name], before I show you anything: what would you need to see to let a small pilot team use an agent like this on real code, and what would make it a no?"

- Why: the brief profiles the CTO as highly security-conscious, concerned about regulatory compliance and skeptical without proven enterprise adoption. Their answer is the top concern that ADR-005 needs named and owned.
- Listen for: where code and data go (F-01), what the agent can do (F-02), proof from peers (F-03), evidence of value (F-04), compliance (F-09).

**To the Head of Digital Transformation (25 words, ~11 seconds).**
> "[name], picture this a few months from now, and it worked: what changed for your engineers, and who in engineering did you have to convince?"

- Why: they champion AI and lead engineering on a dotted line. The first half gives us their success measure (the metrics owner's job); the second names the absent stakeholders they must persuade (stakeholder map, section 2).
- Listen for: a team to start with (F-07, F-08), speed to rollout (F-05), a number for the board (F-06), no baselines (F-10), other tools (F-12).

**Bridge to §2 (16 words, ~7 seconds).**
> "Thank you. I'll come back to both of those. Let me start with how it works."

## Follow-ups (use in the room only if time allows; otherwise at the natural handover points)

**CTO.**

| # | Follow-up (spoken) | Why we ask |
|---|---|---|
| C1 | "Is the bigger worry where code and prompts go, or what the agent can do on an engineer's machine?" | Decides whether §5 leads with the deployment data path or with permissions, hooks and the audit trail (F-01 or F-02). |
| C2 | "When you say proven enterprise adoption, what counts as proof for you: a named peer, an independent assessment, or your own team's test?" | We cite only verified claims (ADR-006). This tells us which proof to bring in the follow-up kit (D8) instead of improvising one in the room. |
| C3 | "Who would run the security review on your side, and what do they usually need from a vendor first?" | Ask 1 needs an owner and a working session within a week; the answer shapes the review package (D7). Assumption: a vendor security review process exists. |
| C4 | "Before code reaches payments or banking systems today, what checks does it pass?" | Places the agent's output inside whatever review gates they use; tells us which controls to point at in Act 1 and §5. |

**Head of Digital Transformation.**

| # | Follow-up (spoken) | Why we ask |
|---|---|---|
| H1 | "Which of the three teams would you start with, and who on each would volunteer?" | Seeds the pilot cohort across all three teams (ask 2); volunteers become the first champions. |
| H2 | "What do you measure today about how fast work moves, and who owns those numbers?" | Finds the metrics owner and the baselines (ask 2, D5). If nothing is measured, the plan needs a baseline window first (F-10). |
| H3 | "How will you compare the tools you're evaluating, and who makes the final call?" | The brief says they are evaluating several assistants. We offer one protocol for every tool (D6) and learn the decision path. |
| H4 | "When you've introduced modern tools before, what made engineers adopt them, or not?" | They have advocated modern tools; this shows the change-management risk the rollout plan must answer. |

## Deeper questions for the security working session or follow-up call

Not for the 40 minutes. They go into the review package (D7) and the working session the CTO opens (ask 1). Product facts carry claim ids; anything unsourced is left out.

| # | Question | What it decides |
|---|---|---|
| S1 | Which repositories, environments and data classes are in scope for the pilot, and which are off-limits, for example anything that holds card or customer data? | Pilot repositories and the permission deny rules. |
| S2 | Which route should model calls take: Anthropic's API, Amazon Bedrock [CLM-686] or Vertex AI [CLM-687]? Which accounts, regions and egress rules apply? | Deployment architecture and the data-flow diagram in D7. |
| S3 | Which identity provider and provisioning process must access go through? [CLM-662] | Sign-in and seat administration for the pilot cohort. |
| S4 | How are developer machines managed, and can your device management deliver a managed settings policy? [CLM-675] | How central policy reaches every pilot laptop. |
| S5 | Where should agent activity go (logging or monitoring platform), how long is it kept, and what would an auditor want to see for an AI-assisted change? [CLM-656] [CLM-684] | Telemetry export, retention and audit evidence. |
| S6 | How are secrets stored and scanned today, and which paths must the agent never read? | Deny rules and hooks for secrets. |
| S7 | Which data retention and training terms does your vendor-risk process require? [CLM-600] [CLM-602] | Whether standard terms fit or a review is needed. |
| S8 | Which data-science work needs model-risk sign-off, and should model code stay out of the pilot? | Scope of the data-science starter use cases. |
| S9 | Which external tools or MCP servers (MCP: the open standard for connecting the agent to other systems) may it connect to? [CLM-678] | The MCP allowlist in managed settings. |
| S10 | If the agent did something unexpected, how would you want to detect, stop and investigate it? | Pilot incident runbook, including how access is revoked. |
| S11 | Which documents does your third-party risk review require? Anthropic's attestation reports are available through its Trust Center, and we would ask your team to request them and read their scope themselves. [CLM-618] | Contents of the review package (D7). |

## Flow adjustments

Base plan (ADR-005): §1 Open 0:00 (3) · §2 How 0:03 (4) · §3 Why 0:07 (3) · §4 Fit 0:10 (2) · Live demo 0:12 (14: Act 1 five, Act 2 six, Act 3 two, governance close one) · §5 Security 0:26 (4) · §6 ROI 0:30 (4) · §7 Evaluation 0:34 (3) · §8 Wrap 0:37 (2) · Buffer 0:39 (1).

Rules: every expansion is paid for by a named cut in the same row, so the plan stays at 40 minutes and the wrap starts by 0:37. If two rows fire, pay in ADR-005 cut-list order: §4 Fit has two minutes to give, then the §3 competitor table goes to one sentence, then §7 shrinks to its timeline slide. Never take time from §8 or the buffer.

| ID | If we hear... | Expand, cut or reorder (ADR-005 segments) | Minutes | Effect on 0:12 · 0:26 · 0:37 |
|---|---|---|---|---|
| F-01 | CTO: "Where does our code go?" (data path is the top concern) | Expand §5 Security: lead with the Bedrock or Vertex AI data path. Cut §4 Fit (the demo covers fit) | +1 §5, −1 §4 = 0 | Demo starts 0:11 · ends 0:25; §5 runs 0:25 to 0:30 · 0:37 holds |
| F-02 | CTO: "What stops it doing something dangerous?" | Reorder: call out the deny rule and hook block in Act 1 as they happen. Expand the governance close. Cut Act 2 (dashboard from complete state, the ADR-005 0:20 cut) | +1 close, −1 Act 2 = 0 | 0:12 holds · 0:26 holds · 0:37 holds |
| F-03 | CTO: "Who else like us uses this?" | Expand §3 Why with verified adopters only, or say none is verified yet and promise it in D8. Cut the §3 competitor table to one sentence | +1, −1 inside §3 = 0 | 0:12 holds · 0:26 holds · 0:37 holds |
| F-04 | CTO: "The productivity studies are mixed" | Expand §6 ROI: concede mixed evidence [CLM-666], then the measurement plan. Cut §4 Fit | +1 §6, −1 §4 = 0 | Demo 0:11 · ends 0:25; §5 0:25 to 0:29; §6 0:29 to 0:34 · 0:37 holds |
| F-05 | HoDT: "We've decided; how fast can we roll out?" | Expand §7: the pilot is wave 1, with a decision gate. Cut the §3 competitor table to one sentence | +1 §7, −1 §3 = 0 | Demo 0:11 · ends 0:25; §7 0:33 to 0:37 · 0:37 holds |
| F-06 | HoDT: "The board will want an ROI number" | Expand §6: assumptions, sensitivity, who owns baselines. Cut §7 to its timeline slide | +1 §6, −1 §7 = 0 | 0:12 holds · 0:26 holds; §6 0:30 to 0:35 · 0:37 holds |
| F-07 | Either: "Data science is where we need help" | Expand Act 2 (macro-risk analysis). Cut Act 1 (shorter codebase tour) | +1 Act 2, −1 Act 1 = 0 | 0:12 holds; Act 2 starts 0:16, before the 0:20 checkpoint · 0:26 holds · 0:37 holds |
| F-08 | Either: "Incidents and uptime are the pain" | Expand Act 3 (show the same triage as a CI or alert job). Cut Act 2 (dashboard from complete state) | +1 Act 3, −1 Act 2 = 0 | 0:12 holds · 0:26 holds · 0:37 holds |
| F-09 | CTO: "Is this compliant with our regulations?" | No compliance claim. Name it as the top concern now; expand §5 with the controls their review will test. Cut §4 Fit | +1 §5, −1 §4 = 0 | Demo 0:11 · ends 0:25 · 0:37 holds; the concern gets an owner in §8 |
| F-10 | HoDT: "We don't have baselines today" | Expand §7: a baseline window before pilot kickoff. Cut §6 to the framework plus one scenario | −1 §6, +1 §7 = 0 | 0:12 holds · 0:26 holds; §7 0:33 to 0:37 · 0:37 holds |
| F-11 | Either: "I have to leave at 0:30" (or any time before 0:37) | Reorder: §5 to one slide plus the leave-behind (the ADR-005 0:30 cut), then the §8 ask while both are present; §6 and §7 continue with the remaining attendee; the 0:37 slot becomes a recap of owners and dates | −2 §5, +2 ask moved earlier = 0 | 0:12 holds · 0:26 holds; ask at 0:28 · 0:37 recap holds |
| F-12 | Either: "We're comparing you with another tool" | Expand §7: one evaluation protocol for every tool (D6). Cut the §3 competitor table to one sentence; detail stays in the battlecard (D10) | +1 §7, −1 §3 = 0 | Demo 0:11 · ends 0:25 · 0:37 holds |
| F-13 | Either: "We only have 35 minutes" | Apply ADR-005 cuts up front: skip §4 Fit, competitor table to one sentence, Act 2 from complete state, Act 3 narrated | −2 §4, −1 §3, −1 Act 2, −1 Act 3 = −5 | Demo 0:09 · ends 0:21 · wrap 0:32, 3 minutes before their hard stop |
| F-14 | Either: "Just start presenting" | Use the default flow below | −2 Open, +1 §5, +1 §7 = 0 | Demo 0:10 · ends 0:24 · 0:37 holds |

## Default flow: "just start presenting"

If either attendee waves off discovery, do not push. Shorten the Open to one minute and ask the two opening questions later, where they do the most work.

| Clock | Segment | Change |
|---|---|---|
| 0:00 | §1 Open (1 min) | Short recap (29 words, ~12 seconds): "Of course. What we heard: productivity and new products, one agentic tool chosen within months, several options on the table. I'll ask you each one question along the way." Then the agenda line |
| 0:01 | §2 How Claude Code works (4) | Unchanged |
| 0:05 | §3 Why Claude Code (3) | Unchanged |
| 0:08 | §4 FinTechCo fit (2) | Unchanged |
| 0:10 | Live demo (14) | Starts two minutes early |
| 0:24 | §5 Security (5) | Opens with the CTO opening question; the answer is the top concern |
| 0:29 | §6 ROI (4) | Unchanged |
| 0:33 | §7 Evaluation (4) | Opens with the Head of Digital Transformation opening question; the answer shapes the pilot cohort |
| 0:37 | §8 Wrap (2) | Unchanged |
| 0:39 | Buffer (1) | Unchanged |

## Note-taking template (feeds the 0:37 wrap)

Fill in during the meeting; read lines 1 and 2 back as the ask, and send line 3 in the follow-up kit (D8).

```
1 CONCERN  CTO top concern, in their words: ________  -> owner: ________  -> by: ________
2 PILOT    Cohort (SWE / DS / SRE): ________ ; metrics owner: ________ ; kickoff date: ________
3 PARKED   Parked questions and corrections -> who answers, by when: ________
```

## Sourcing notes for this file
- S7 points to the training and retention terms [CLM-600] [CLM-602].
- S11 points to the attestation reports through the Trust Center, in the partial wording of [CLM-618].

Cited verified or partial claims (from `research/claims/adoption-*.json` and `research/claims/strategy.json`): CLM-600, CLM-602, CLM-618, CLM-656, CLM-662, CLM-666, CLM-675, CLM-678, CLM-684, CLM-686, CLM-687. Security wording needs Trust review before release (ADR-003 section 4.2). The objection and Q&A bank and the use-case catalog (sibling strategy tickets) hold the answers these questions lead to.
