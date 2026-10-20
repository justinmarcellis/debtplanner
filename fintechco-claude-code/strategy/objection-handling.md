# Objection and Q&A bank: Claude Code for FinTechCo

Ticket S1-STR-02 · Deliverables D4 and D10 · Owner ic-strategy-objection-handler · Product facts as of October 2026 · Sprint 1 draft: placeholders are resolved in Sprint 2, and Trust reviews every tagged entry before release (ADR-003 section 4.2).

## Summary in three lines

- Thirty-two objections in eight groups, each with a sayable answer of 65 words or fewer (about 28 seconds at 140 words per minute), depth if pushed, sourced claims and one bridge back to an ADR-005 ask.
- Every answer concedes what is true first, never promises a productivity number, never says Claude Code makes FinTechCo compliant, and treats FinTechCo's compliance and security teams as the deciders of fit.
- Every external fact carries a [CLM-6xx] id from `research/claims/strategy.json`; anything not yet verifiable is a specific `[CLM-?: ...]` placeholder, listed at the end for Research and Trust.

## Index of objections

Scan by short form during the meeting, then jump to the entry. Asker is the person most likely to say it; the Head of Digital Transformation is abbreviated HDT.

| ID | Short form | Group | Asker |
| --- | --- | --- | --- |
| O-01 | Code leaves our perimeter | 1. Security and data | CTO |
| O-02 | You'll train on our code and prompts | 1. Security and data | CTO |
| O-03 | What does Anthropic keep, for how long | 1. Security and data | CTO |
| O-04 | Prompt injection and exfiltration | 1. Security and data | CTO |
| O-05 | Secrets and card data in repos | 1. Security and data | CTO |
| O-06 | Just say it is compliant | 2. Compliance and regulation | CTO |
| O-07 | Audit trail for auditors | 2. Compliance and regulation | CTO |
| O-08 | Model risk management | 2. Compliance and regulation | CTO |
| O-09 | Who is accountable; who owns the IP | 2. Compliance and regulation | CTO |
| O-10 | Invented packages, subtle bugs | 3. Quality and risk of AI-written code | CTO |
| O-11 | Review becomes the bottleneck | 3. Quality and risk of AI-written code | CTO |
| O-12 | Destructive or risky actions | 3. Quality and risk of AI-written code | CTO |
| O-13 | Payments rules no model knows | 3. Quality and risk of AI-written code | CTO |
| O-14 | METR says 19% slower | 4. Productivity evidence | CTO |
| O-15 | Give me one number for the board | 4. Productivity evidence | HDT |
| O-16 | Show me the ROI | 4. Productivity evidence | CTO |
| O-17 | Great in surveys, real in data? | 4. Productivity evidence | HDT |
| O-18 | Runaway token spend | 5. Cost | CTO |
| O-19 | Cost for 180 people | 5. Cost | CTO |
| O-20 | Seats, API or our cloud billing | 5. Cost | HDT |
| O-21 | If we already license an IDE assistant | 6. Competition and "we already have Copilot" | HDT |
| O-22 | Why win against other agents | 6. Competition and "we already have Copilot" | CTO |
| O-23 | Use our cloud vendors' assistants | 6. Competition and "we already have Copilot" | CTO |
| O-24 | Claude is already in other tools | 6. Competition and "we already have Copilot" | CTO |
| O-25 | Senior engineers will push back | 7. Change management and skills | HDT |
| O-26 | Junior skill atrophy | 7. Change management and skills | CTO |
| O-27 | First agentic tool, shelfware risk | 7. Change management and skills | HDT |
| O-28 | Shadow AI and personal accounts | 7. Change management and skills | CTO |
| O-29 | One vendor: terms, price, survival | 8. Vendor and concentration risk | CTO |
| O-30 | Outage or model retired | 8. Vendor and concentration risk | CTO |
| O-31 | Exit and lock-in | 8. Vendor and concentration risk | CTO |
| O-32 | Bedrock or Vertex versus direct | 8. Vendor and concentration risk | CTO |

## Top 8 to rehearse

Ranked by how much a wrong answer would hurt the meeting. Rehearse these aloud until each Answer takes under 30 seconds without notes.

1. **O-06 Just say it is compliant.** One word of overclaim ("compliant", "certified for your use") ends the CTO's trust and breaches ADR-003 and ADR-006. Say what Anthropic attests and what controls exist; the compliance team decides fit.
2. **O-01 Code leaves our perimeter.** A wrong statement about where data goes is a deployment-boundary error. Know the three routes and the one placeholder (Vertex retention terms for Claude).
3. **O-02 You'll train on our code.** Training and retention wording must be exact; know the consumer-account exception and the opt-in program.
4. **O-04 Prompt injection and exfiltration.** Never say it is solved. Concede it, name the layered controls and their documented limits (the sandbox covers shell commands only).
5. **O-14 METR says 19% slower.** Dismissing or cherry-picking the study destroys credibility. Know that METR calls its own 2025 results out of date and its 2026 data unreliable.
6. **O-15 Give me one number for the board.** The temptation to promise a productivity figure is strongest here. Give a method and a range of published results, never a forecast.
7. **O-07 Audit trail for auditors.** Overstating what OpenTelemetry or hooks satisfy for SOX or PCI is a compliance claim; keep it to what the controls record.
8. **O-21 If we already license an IDE assistant.** Disparaging a competitor, or implying FinTechCo owns a product, breaks the honesty rules. Keep it conditional and fair.

## How to use this bank

Each entry has an asker, a spoken Answer (executive line first, about 25 seconds), depth for when you are pushed (engineer level, ending with where more lives), the claim ids behind it, a Trust-review tag where data handling, retention, training, certifications, deployment boundaries or regulatory fit are touched, and a bridge back to one of the three ADR-005 asks. Where more lives is given by deliverable: D5 metrics and ROI, D6 evaluation and rollout plan, D7 security and compliance brief and threat model, D10 claims register and battlecard.

Rules for every answer:
- Concede what is true, then reframe. Never argue with a fair concern.
- No productivity number is ever promised. Published results are mixed; we measure on FinTechCo's own work.
- Compliance wording is always "Anthropic attests X; Claude Code provides these controls; your compliance team decides fit".
- No superlatives and no statement about a competitor beyond its own dated documentation.
- Product facts are "as of October 2026". Partial claims are spoken in their safe wording from the register. A `[CLM-?: ...]` placeholder is never spoken as fact; say "I will get that in writing for your review".
- Facts about FinTechCo come only from the brief: 120 software engineers, 40 data scientists, 20 SREs, AWS and GCP, no agentic coding tools today, evaluating several. Anything else about them is a question to ask, not a statement.

---

## 1. Security and data

### O-01. "Our source code is the crown jewels. Why would I let it leave our perimeter for a model API?"
- **Asker:** CTO
- **Answer:** Fair concern: any hosted model means prompts leave the laptop, so the real question is where they go. Claude Code can run through your own AWS or GCP accounts, with your IAM and pinned models [CLM-614], and traffic is encrypted in transit [CLM-604]. Your security team decides which route fits; I'd like to walk them through each.
- **Trust-review:** required
- **If pushed:**
  - What leaves the machine: your prompts, the file contents and tool output Claude Code puts into context, and the model's replies, over TLS 1.2 or higher; the agent itself runs locally [CLM-604].
  - Three routes: Anthropic's own platform, Amazon Bedrock, or Google Cloud's Agent Platform (formerly Vertex AI), each with your credentials and IAM; the docs recommend a dedicated AWS account or GCP project for Claude Code [CLM-614].
  - On Bedrock, AWS says model providers have no access to Bedrock's deployment accounts, logs, or customer prompts and completions; retention is set per Region, and a few newer models require AWS-side retention for review, so check the specific model [CLM-615].
  - For Vertex I will not state Claude's retention or logging terms myself: [CLM-?: Google Cloud prompt-retention, logging and abuse-monitoring terms that apply to Claude as a partner model on its Agent Platform, from Google Cloud or Anthropic documentation].
  - Where more lives: D7 security brief (data-flow diagram per route) and the data handling backup slide.
- **Claims:** [CLM-614] deployment routes; [CLM-604] encryption; [CLM-615] Bedrock data handling (partial); [CLM-?: Google Cloud prompt-retention, logging and abuse-monitoring terms for Claude as a partner model on Vertex]
- **Bridge:** Let's put exactly this in front of your security team: I send the review package and we hold a working session within a week.

### O-02. "How do I know you won't train your models on our code and prompts?"
- **Asker:** CTO
- **Answer:** It's in the terms, not a promise: Anthropic's Commercial Terms say it may not train models on Customer Content, and Claude Code's documentation says the same for code and prompts, including through Bedrock and Vertex [CLM-600]. Personal consumer accounts work differently, so we would lock sign-in to your organization [CLM-609].
- **Trust-review:** required
- **If pushed:**
  - Sources: Commercial Terms section B and the Claude Code data-usage page; the terms page shows an effective date of June 17, 2025, and your signed agreement is what governs [CLM-600].
  - The only training path is an explicit opt-in, such as the Development Partner Program, which is available on the first-party API only, not on Bedrock or Vertex [CLM-600].
  - Consumer plans (Free, Pro, Max) have a user setting that can allow training, which is why managed settings should require login to your organization (forceLoginMethod and forceLoginOrgUUID) [CLM-600][CLM-609].
  - User-initiated paths to watch: /feedback, /bug and /share send conversation data to Anthropic and are retained for 5 years; they can be disabled, and on Bedrock and Vertex they are off by default and write to a local archive [CLM-602][CLM-605].
  - Where more lives: D7 (data handling table) and D10 (claims register with the exact terms).
- **Claims:** [CLM-600] no training on commercial inputs; [CLM-609] org-only login; [CLM-602] retention and feedback; [CLM-605] telemetry defaults
- **Bridge:** I'll add the training and retention terms to the review package so your counsel can read them against the agreement you would sign.

### O-03. "What does Anthropic keep, for how long, and who over there can see it?"
- **Asker:** CTO
- **Answer:** On commercial plans the standard retention period is 30 days, and zero data retention is available to qualified Enterprise accounts, enabled per organization [CLM-602]. Session transcripts also sit on each developer's machine for 30 days by default [CLM-602]. Who inside Anthropic can access data I will get you in writing rather than answer from memory.
- **Trust-review:** required
- **If pushed:**
  - Zero data retention: prompts and responses are processed in real time and not stored after the response, except where needed to comply with law or combat misuse; flagged sessions may be kept up to 2 years [CLM-603].
  - It is per organization, needs enablement by Anthropic after an eligibility review, covers Anthropic's direct platform only, and does not cover MCP servers or other third-party integrations [CLM-603].
  - It switches off features that need storage: cloud sessions, Remote Control and /feedback; the docs also list newer models that require retention by default and so are not available to ZDR organizations [CLM-603].
  - On Bedrock the retention mode is yours per Region [CLM-615]; on Vertex: [CLM-?: Google Cloud retention terms for Claude as a partner model]. Personnel access: [CLM-?: Anthropic's documented controls on employee access to customer data, from the Trust Center or privacy documentation].
  - Where more lives: D7 (retention options table) and the data handling backup slide.
- **Claims:** [CLM-602] retention; [CLM-603] ZDR scope; [CLM-615] Bedrock retention (partial); [CLM-?: Anthropic personnel access controls for customer data]; [CLM-?: Google Cloud retention terms for Claude on Vertex]
- **Bridge:** Let's make retention a named line item in the security review: standard 30 days or zero retention, your team's call.

### O-04. "A poisoned README, web page or MCP server could make it exfiltrate our data. Prompt injection is not solved."
- **Asker:** CTO
- **Answer:** You're right to worry, and Anthropic's documentation is plain that no system is completely immune [CLM-608]. So we layer controls: permission prompts, no auto-approved network fetches, an optional operating-system sandbox with a network allowlist, and an approved list of MCP servers [CLM-608][CLM-607][CLM-610]. Your red team can test all of it in the pilot.
- **Trust-review:** required
- **If pushed:**
  - Documented safeguards: permission prompts for sensitive operations, curl and wget not auto-approved, detection of commands it cannot analyze, fail-closed matching, and fetched pages summarized by a separate model call [CLM-608].
  - Sandbox: the operating system limits what shell commands can write and which domains they reach, and the domain allowlist starts empty; but it is off by default, covers shell commands only (file tools, MCP servers and hooks run outside it), and by default can read most of the machine, including ~/.ssh and ~/.aws [CLM-607].
  - So an administrator enables it in managed settings, denies credential paths and makes it fail closed [CLM-609][CLM-607]; for the most sensitive repositories the docs suggest running the whole process in a container or VM [CLM-608].
  - MCP: by default anyone can connect any server and Anthropic does not audit servers; restrict to an allowlist or a fixed set [CLM-610]. Residual risk: a developer approves a bad command; that is why review stays human [CLM-608].
  - Where more lives: D7 threat model (injection and exfiltration paths) and the controls catalog backup slide.
- **Claims:** [CLM-608] prompt-injection safeguards; [CLM-607] sandbox and limits; [CLM-610] MCP control; [CLM-609] managed settings
- **Bridge:** I'd like your red team's injection scenarios in the working session, so the pilot controls are built against them.

### O-05. "Our repos have secrets and card data in places they shouldn't. What stops it reading or sending them?"
- **Asker:** CTO
- **Answer:** Be careful here: inside the project folder Claude Code can read files without asking [CLM-606], so anything readable there can reach the model. You close that with deny rules on secret paths and the sandbox's credential protections, set once in managed settings [CLM-607][CLM-609]. Card data belongs out of repositories; our demo uses synthetic data only.
- **Trust-review:** required
- **If pushed:**
  - Default exposure: file reads inside the working directory do not prompt, and sandboxed commands can read most of the machine, including credential files, unless denyRead or credentials settings say otherwise [CLM-606][CLM-607].
  - Controls: permission deny rules (deny is evaluated first and a managed deny cannot be overridden) [CLM-606][CLM-609], plus a PreToolUse hook that blocks reads of named paths [CLM-611]. Bash deny rules match command text and are not a security boundary, so pair them with the sandbox [CLM-606].
  - What it reads can persist: local transcripts are plaintext for 30 days by default (cleanupPeriodDays changes that) [CLM-602]; OpenTelemetry prompt content is redacted unless you turn it on [CLM-612].
  - Card data and secrets in repositories: [CLM-?: PCI DSS requirements on storing cardholder data and on development environments and tools that can reach it, for FinTechCo's compliance team to confirm].
  - Where more lives: D7 (secrets and card-data handling, threat model).
- **Claims:** [CLM-606] permissions; [CLM-607] sandbox; [CLM-609] managed settings; [CLM-611] hooks; [CLM-602] local transcripts; [CLM-612] OpenTelemetry redaction; [CLM-?: PCI DSS requirements on cardholder data in development environments and tools]
- **Bridge:** Step one of the pilot setup is a secrets scan and a deny-list, owned by your security team; let's put that on the review agenda.

## 2. Compliance and regulation

### O-06. "Just tell me: is Claude Code SOX, PCI and GLBA compliant?"
- **Asker:** CTO
- **Answer:** I won't call any tool compliant; your compliance team decides fit against your controls. What I can give you is what Anthropic attests, including SOC 2 and ISO 27001, through its Trust Center [CLM-618], and the controls Claude Code provides: permissions, sandbox, managed policy and logging [CLM-609]. Your team maps those to SOX, PCI DSS and GLBA.
- **Trust-review:** required
- **If pushed:**
  - Anthropic's help center (March 16, 2026) lists, for its commercial products: a HIPAA-ready configuration with a BAA, ISO 27001:2022, ISO/IEC 42001:2023, and SOC 2 Type I and Type II; reports are available through the Trust Center. I have not read the reports, and your team should check scope and period [CLM-618].
  - Controls Claude Code provides: permission rules and modes [CLM-606], optional sandbox [CLM-607], managed settings [CLM-609], hooks [CLM-611] and OpenTelemetry export [CLM-612]. These are controls to map, not a conclusion.
  - SOX: [CLM-?: SOX requirements on IT general controls and change management relevant to developer tooling, for FinTechCo's audit team to confirm]. PCI DSS: [CLM-?: PCI DSS requirements relevant to developer tools and systems that can reach cardholder data]. GLBA: [CLM-?: GLBA Safeguards Rule requirements on service providers and customer information].
  - Open the live Trust Center before the meeting; its listing did not render for my tooling, so reconcile it with the help-center wording [CLM-618].
  - Where more lives: D7 (control-mapping worksheet for your compliance team) and D10 (claims register).
- **Claims:** [CLM-618] attestations (partial); [CLM-609] managed settings; [CLM-606]; [CLM-607]; [CLM-611]; [CLM-612]; [CLM-?: SOX ITGC and change-management requirements for developer tooling]; [CLM-?: PCI DSS requirements for developer tools near cardholder data]; [CLM-?: GLBA Safeguards Rule service-provider requirements]
- **Bridge:** Name the person on your side who runs the fit assessment; I'll bring the control inventory to the working session.

### O-07. "What audit trail will my auditors get: who asked for what, what it ran, what changed?"
- **Asker:** CTO
- **Answer:** A detailed activity record is possible, but you assemble it from parts. Claude Code can stream OpenTelemetry events for prompts, tool results and permission decisions to your own collector [CLM-612], hooks can write your own records [CLM-611], and a gateway can log each request against a user identity [CLM-613]. Whether that satisfies your auditors is their call.
- **Trust-review:** required
- **If pushed:**
  - OpenTelemetry is opt-in; events include user_prompt, tool_result, api_request and tool_decision; prompt text stays redacted unless OTEL_LOG_USER_PROMPTS is set, and tool details need OTEL_LOG_TOOL_DETAILS; administrators set it in managed settings so developers cannot redirect it [CLM-612]. Richer logs capture sensitive content, so decide that with security and privacy.
  - Gateway route: a self-hosted Claude apps gateway records a per-request audit log with identity-provider identity; on Bedrock, AWS recommends AWS CloudTrail for API and user activity [CLM-613].
  - Git trail: commit trailers and pull-request lines can attribute changes, but whoever controls the setting can hide them, so lean on your branch protection and review records [CLM-632].
  - Anthropic-side feeds: [CLM-?: whether Anthropic's Compliance API or audit logs cover Claude Code activity, which plans include them, and what local CLI sessions are excluded, from Anthropic's Compliance API documentation].
  - SOX evidence: [CLM-?: what evidence SOX change-management and access testing expects for developer tooling, for FinTechCo's internal audit to confirm]. Where more lives: D7 (logging architecture).
- **Claims:** [CLM-612] OpenTelemetry; [CLM-611] hooks; [CLM-613] gateway and CloudTrail; [CLM-632] attribution; [CLM-?: Compliance API and audit-log coverage of Claude Code]; [CLM-?: SOX evidence expectations for developer tooling]
- **Bridge:** Ask your internal audit lead what evidence they would want; that shapes the pilot's logging design and goes in the review package.

### O-08. "Our regulators expect model risk management. Where does an AI coding tool fit?"
- **Asker:** CTO
- **Answer:** That depends on how your model risk policy classifies developer tools, and that's your risk function's call, not mine. What I can offer is a clear boundary: Claude Code proposes code, people review it, and your existing pipeline gates it [CLM-632]. Your risk team can then classify it with the facts in front of them.
- **Trust-review:** required
- **If pushed:**
  - Two separate questions: whether the coding tool itself is a model under your policy, and the fraud and credit-scoring models your data scientists build with it. Those models stay subject to your existing development and independent validation, whoever wrote the code.
  - Evidence the pilot can produce: plan-then-approve, tests as verification targets, human review, and change attribution [CLM-633][CLM-632].
  - Regulatory text: [CLM-?: text of US federal banking model risk management guidance on what counts as a model and on development and validation, and whether it covers developer-assistance tools, for FinTechCo's risk and compliance teams to confirm].
  - For the data science team, add reproducibility: notebooks and training code written with assistance get the same lineage and review as hand-written ones (policy to agree with the risk function).
  - Where more lives: D7 (control mapping) and D6 (pilot guardrails for the data science cohort).
- **Claims:** [CLM-632] attribution and review; [CLM-633] verification practices; [CLM-?: US federal banking model risk management guidance and its application to developer tools]
- **Bridge:** Invite someone from model risk to the security and compliance working session so the classification question has an owner.

### O-09. "When AI-written code breaks something or violates policy, who is accountable? And who owns the IP?"
- **Asker:** CTO
- **Answer:** Accountability stays where it is today: the engineer who approves a change and the reviewers who merge it. Anthropic's documentation says the user reviews code and commands before approval [CLM-632]. On ownership, the Commercial Terms say you keep your inputs and own the outputs, with an IP defense commitment that has exclusions [CLM-601]. Your counsel should read the actual contract.
- **Trust-review:** required
- **If pushed:**
  - Operating model: the same code owners, branch protection, required reviews and CI gates apply, so an AI-assisted change is a normal pull request with a named human author. Nothing merges on the tool's authority.
  - Traceability: commit trailers and pull-request attribution are configurable and can be hidden, so tie accountability to your own pull-request template and ticket link rather than the trailer alone [CLM-632].
  - IP: Commercial Terms sections B (ownership) and K (defense), with exclusions for your modifications, combinations with other technology, your inputs, knowing infringement, patents and trademarks; negotiated terms may differ [CLM-601].
  - Open-source licence exposure in generated code: [CLM-?: Anthropic documentation on licence-compliance risk of generated code and any code-referencing or duplicate-detection feature in Claude Code].
  - Where more lives: D7 (accountability model) and D10 (the terms as sourced).
- **Claims:** [CLM-632] attribution and user review; [CLM-601] ownership and IP defense (partial); [CLM-?: licence-compliance risk guidance for generated code]
- **Bridge:** Add accountability and IP terms to the review package, and let's agree the pull-request template the pilot cohort will use.

## 3. Quality and risk of AI-written code

### O-10. "It hallucinates. What about invented packages and subtle bugs that sail through review?"
- **Asker:** CTO
- **Answer:** It will make mistakes, including naming packages that don't exist; researchers have measured that for code-generating models [CLM-627]. The defense is your existing gates rather than trust: tests, an internal package registry, dependency scanning and review. Claude Code can run tests to check its own work, which helps catch issues before review [CLM-633].
- **If pushed:**
  - The study: 576,000 samples from 16 models; at least 5.2% hallucinated packages on average for commercial models and 21.7% for open-source, with 205,474 unique invented names. It measured raw code generation, not Claude Code, so test the rate in the pilot [CLM-627].
  - The risk is a supply-chain one: attackers can register invented names. Controls: install only from an internal registry or allowlist, a PreToolUse hook that blocks installs of unlisted packages [CLM-611], and permission rules that require approval for install commands [CLM-606].
  - Subtle bugs: give it verification targets such as tests, use plan mode, and run /security-review on the branch [CLM-633]. These help; none guarantees correct code.
  - Treat quality as a guardrail metric: change failure rate and escaped defects, alongside speed [CLM-624].
  - Where more lives: D5 (guardrail metrics) and D7 (supply-chain controls).
- **Claims:** [CLM-627] package hallucination (partial); [CLM-633] verification practices; [CLM-611] hooks; [CLM-606] permissions; [CLM-624] DORA (partial)
- **Bridge:** Name a metrics owner now, so quality guardrails are captured from the first baseline week.

### O-11. "My seniors will drown in AI-generated pull requests. Doesn't review become the bottleneck?"
- **Asker:** CTO
- **Answer:** It can. DORA's 2024 research linked AI adoption to worse delivery stability and throughput even as individual productivity rose, and its 2025 work describes AI as a multiplier of how teams already work [CLM-624]. So the pilot measures review time and change failure rate, keeps changes small, and stops if review queues grow.
- **If pushed:**
  - DORA 2024: individual productivity, flow and job satisfaction up; delivery stability and throughput down. DORA 2025 (nearly 5,000 respondents, 90% adoption): throughput now linked to AI, and AI a mirror and multiplier. These are survey associations, not causal effects [CLM-624].
  - DORA's fundamentals still apply: small batches and solid test coverage [CLM-624].
  - Pilot guardrails from your own Git and CI data: pull-request size, review latency, rework rate, change failure rate, with agreed stop thresholds.
  - Use Claude Code as a first-pass reviewer with /security-review, and treat it as a first pass, not a replacement for a human reviewer [CLM-633].
  - Where more lives: D5 (flow and quality metrics, thresholds) and D6 (pilot stop rules).
- **Claims:** [CLM-624] DORA (partial); [CLM-633] verification and review practices
- **Bridge:** Agree the review-load guardrails with your engineering leads when the metrics owner is named.

### O-12. "What stops it doing something destructive: deleting files, touching production, changing payment logic?"
- **Asker:** CTO
- **Answer:** You set the limits before the first session. Permission rules are evaluated deny-first, so you can forbid commands or paths outright, and managed deny rules can't be overridden by developers [CLM-606][CLM-609]. Add the sandbox and keep production credentials off developer machines, so a bad approval has a small blast radius [CLM-607].
- **Trust-review:** required
- **If pushed:**
  - Modes: Manual mode asks before edits and commands; Auto mode uses a classifier; administrators set the starting mode and can disable bypass and auto modes. Do not say it always asks first [CLM-606].
  - Deny rules beat allow rules at every level; a broad deny such as Bash(aws *) blocks every matching call. Bash rules match command text and are not a boundary around the program, so back them with the sandbox [CLM-606].
  - Sandbox: writes limited to the working directory plus what you add, network limited to an allowlist; administrators can require it, fail closed if it cannot start, and disable unsandboxed retries [CLM-607][CLM-609].
  - Hooks: a PreToolUse hook can block any tool call, for example anything touching production configuration or payment modules [CLM-611].
  - Where more lives: D7 (controls catalog) and the controls backup slide.
- **Claims:** [CLM-606] permissions; [CLM-609] managed settings; [CLM-607] sandbox; [CLM-611] hooks
- **Bridge:** Let's list the actions you would deny on day one; that list becomes the pilot's managed settings.

### O-13. "Our payments code has rules no model knows: idempotency, rounding, ledger invariants. How would it get that right?"
- **Asker:** CTO
- **Answer:** On its own, it won't, any more than a new hire would. It learns your rules from what you give it: a project instructions file, your tests and examples in the repository, and you check the result against those tests and review [CLM-633]. That's why the pilot starts on bounded tasks behind your existing release gates.
- **If pushed:**
  - Encode the invariants where it reads them: a CLAUDE.md in the repository, loaded into context at the start of every session, plus an organization-wide one that developers cannot exclude [CLM-633][CLM-609].
  - Make them executable: ledger-reconciliation, idempotency and rounding tests act as verification targets it can run against its own changes [CLM-633].
  - Start where mistakes are cheap and checkable: tests, refactors, documentation, mobile and internal tooling; payments logic changes keep your two-reviewer rule (policy to agree).
  - Measure with change failure rate and escaped defects on the pilot cohort's payments-adjacent work [CLM-624].
  - Where more lives: D6 (starter use cases per team) and D5 (guardrail metrics).
- **Claims:** [CLM-633] verification targets and CLAUDE.md; [CLM-609] org-wide CLAUDE.md; [CLM-624] DORA (partial)
- **Bridge:** Pick two or three bounded starter tasks per team with your engineering leads when you name the pilot cohort.

## 4. Productivity evidence

### O-14. "I've read the METR study: experienced developers were 19% slower with AI. Why should I believe any of this?"
- **Asker:** CTO
- **Answer:** You should read it, and I'd start there. In METR's 2025 trial, experienced developers in their own repositories took 19% longer, yet believed they were faster [CLM-621]. Its 2026 follow-up didn't reproduce a slowdown, though METR calls that data unreliable [CLM-621]. The evidence is mixed, which is why we measure on your work.
- **If pushed:**
  - Design: randomized at the issue level; 16 developers, 246 issues; they forecast a 24% speedup and afterwards still believed AI had sped them up by 20% [CLM-621].
  - METR's own caveats: not representative of most software work, possible participation bias, learning effects beyond 50 hours not ruled out, and its page now says the results are out of date [CLM-621].
  - The 2026 follow-up (57 developers, 143 repositories, 800+ tasks): point estimates favoured AI but the intervals include no effect, and METR calls the signal unreliable because developers declined to work without AI [CLM-621].
  - Other results point the other way: about 21% less time on one task in a Google trial, wide interval, preprint [CLM-622]; 26% more completed tasks across three field experiments [CLM-623]; DORA 2024 was mixed [CLM-624].
  - Lessons for the pilot: randomize by task, measure from systems rather than opinion, and watch selection when a group must work without the tool [CLM-621]. Where more lives: D5 and D6.
- **Claims:** [CLM-621] METR (partial); [CLM-622] Google trial (partial); [CLM-623] field experiments; [CLM-624] DORA (partial)
- **Bridge:** That is the reason to name a metrics owner today: baselines first, then a fair comparison.

### O-15. "Vendors quote 50% faster. Give me one number I can take to my board."
- **Asker:** HDT
- **Answer:** I won't give you a number I can't defend, and I'd distrust any vendor who does. Published results run from slower to faster depending on who was studied and how it was measured [CLM-621][CLM-623]. Let's set a pilot target against your own baseline and take that measured result to your board.
- **If pushed:**
  - Anthropic's own survey of 132 of its staff self-reported about a 50% boost; those are self-reports from the vendor's employees, not anonymous, so I would not use them as evidence for you [CLM-625].
  - Google trial: about 21% less time on one enterprise task, wide interval, preprint [CLM-622]. Field experiments: 26.08% more completed tasks (standard error 10.3%), earlier-generation assistant, larger gains for less experienced developers [CLM-623]. METR: 19% longer in 2025 [CLM-621].
  - These measure different things (time per task, tasks completed, opinion), so they cannot be averaged into one figure.
  - Board framing: a range, a method, a baseline and a decision gate; the number you present is the one you measured.
  - Where more lives: D5 (metrics framework and ROI scenarios with sensitivity).
- **Claims:** [CLM-621] METR (partial); [CLM-623] field experiments; [CLM-622] Google trial (partial); [CLM-625] Anthropic survey (partial)
- **Bridge:** Name the metrics owner who will produce the number your board sees.

### O-16. "Show me the ROI. What's the payback, and what will you commit to?"
- **Asker:** CTO
- **Answer:** I'll commit to a method, not a number. We baseline your cycle time, review time and defect rates now, run the pilot, and compute ROI from your measurements, with assumptions and sensitivity shown so you see what has to be true for payback. Cost inputs start from Anthropic's published enterprise averages [CLM-619]; your price is to be quoted.
- **If pushed:**
  - Benefit side: hours saved times loaded cost times a realization rate, plus time-to-market effects on your priorities (team productivity, shipping new products). Loaded engineering cost: [CLM-?: loaded annual cost of a US software engineer from a named labor-statistics or salary source, for the value team to set as an assumption].
  - Cost side: licences or tokens, enablement time, review overhead. Anchor: about $150 to $250 per developer per month on average, below $30 per active day for 90% of users, as Anthropic reports, not as a forecast for you [CLM-619].
  - Sensitivity: the calculator shows the break-even share of engineering time that must be saved, and how payback moves if realization is half what you hoped.
  - Lagging outcomes to watch: lead time for payments and mobile features, incident time to resolve, change failure rate [CLM-624].
  - Where more lives: D5 (ROI model and interactive calculator).
- **Claims:** [CLM-619] published cost averages; [CLM-624] DORA (partial); [CLM-?: loaded annual cost of a US software engineer from a named source]
- **Bridge:** Pick a date for baselines and a metrics owner; the ROI model runs on those inputs.

### O-17. "My developers will say it's great. How do I know that's real and not just feel-good?"
- **Asker:** HDT
- **Answer:** Because self-reports can mislead: METR's developers believed AI had sped them up by 20% when it had slowed them down by 19% [CLM-621]. So pair a developer survey with measures from your own systems: cycle time, review time and change failure rate. Opinion goes on the scorecard, but it doesn't carry it.
- **If pushed:**
  - Leading indicators: adoption and active days. The analytics dashboard covers Teams and Enterprise; on Bedrock or Vertex, Anthropic's dashboards do not cover the usage, so use OpenTelemetry [CLM-620][CLM-612].
  - Flow and quality: lead time, pull-request cycle time, review latency, change failure rate and escaped defects, in the DORA style [CLM-624].
  - Design: baseline period, matched cohorts, task-level comparison where possible, and a written plan for dropouts [CLM-621].
  - Avoid gaming: no lines-of-code targets; accepted lines are a usage signal, not a value measure.
  - Where more lives: D5 (leading and lagging metrics, baselines, guardrails) and D6 (pilot design).
- **Claims:** [CLM-621] METR (partial); [CLM-620] visibility; [CLM-612] OpenTelemetry; [CLM-624] DORA (partial)
- **Bridge:** Name the metrics owner and a baseline start date so the first week of data is clean.

## 5. Cost

### O-18. "Token spend is unpredictable. What stops a runaway bill?"
- **Asker:** CTO
- **Answer:** Fair worry: it's usage-based, and long sessions and automation can cost more than people expect [CLM-619]. But you get caps. Teams and Enterprise have spend limits at organization, group or member level, and on Bedrock or Vertex you use your cloud's budget controls, with OpenTelemetry for near-real-time per-user tracking [CLM-620].
- **If pushed:**
  - Teams and Enterprise: the per-seat allowance is the default ceiling; usage credits plus spend limits let you permit more, at organization, group or member level [CLM-620]. Console organizations use workspace spend limits [CLM-620].
  - Cloud routes: billed per token to your cloud account under your budgets; Anthropic's dashboards do not cover it, so per-user attribution comes from OpenTelemetry or a gateway that can add per-user spend limits [CLM-620].
  - Levers: choose the model to fit the job (an unpinned primary model bills at the higher Opus rate), clear context between tasks, lower the effort level, and be wary of agent teams, which use roughly 7x the tokens in plan mode [CLM-630][CLM-619].
  - Rate-limit planning: the docs give per-user tokens-per-minute recommendations by organization size [CLM-620].
  - Where more lives: D5 (cost model and controls) and D6 (pilot spend cap per cohort).
- **Claims:** [CLM-619] cost behaviour; [CLM-620] spend controls; [CLM-630] model pinning and rates
- **Bridge:** Let's set a spend cap per pilot cohort at kickoff; I'll bring the options.

### O-19. "What will this cost for 180 people? Give me a number."
- **Asker:** CTO
- **Answer:** I can give you Anthropic's published range, not a quote. Across enterprise deployments Anthropic reports about $150 to $250 per developer per month, with 90% of users under $30 per active day [CLM-619]. Your price is to be quoted, and a pilot gives you a baseline from your own usage, which beats an average.
- **If pushed:**
  - Arithmetic only, not a forecast: 180 people at $150 to $250 would be $27,000 to $45,000 a month if every one were an average user [CLM-619].
  - Averages hide spread: heavy users, automation and multi-instance runs cost more, and the docs say costs vary widely [CLM-619]. Our assumption to test: SRE incident automation, data science notebooks and application development will each use it differently.
  - Seats versus tokens: Teams and Enterprise draw on per-seat allowances; Console and cloud routes bill per token [CLM-620].
  - List prices and volume terms: [CLM-?: current list price of Claude for Enterprise or Teams seats and any volume terms for about 180 users, to be quoted by Anthropic sales and dated].
  - Where more lives: D5 (ROI ranges and sensitivity) and D6 (seat waves across the four-month rollout).
- **Claims:** [CLM-619] cost averages; [CLM-620] billing models; [CLM-?: current list price and volume terms for 180 seats]
- **Bridge:** Pilot cohort first, then a quote sized to the measured baseline; let's agree the kickoff date.

### O-20. "Seats, API, or through our own cloud: which billing model? We're cost-conscious, not cost-driven."
- **Asker:** HDT
- **Answer:** It's a trade between simplicity and control. Per-seat Teams or Enterprise plans have the least to run and the fullest admin features; Bedrock or Vertex put spend on your existing cloud bill with your budgets and IAM, but some features aren't available that way [CLM-620][CLM-614]. I'd decide after the security review, not on price.
- **Trust-review:** required
- **If pushed:**
  - Teams and Enterprise: seat allowance as the default ceiling, usage credits, spend limits, an analytics dashboard and server-managed settings [CLM-620][CLM-609]. Anthropic's admin guide names this as the default recommendation when you want no infrastructure to run [CLM-614].
  - Bedrock and Vertex: you inherit existing cloud compliance controls and billing, and your existing commercial agreement applies to Claude Code usage through them unless otherwise agreed [CLM-614].
  - Trade-offs: features such as cloud sessions, Code Review and Remote Control need a claude.ai account, and Anthropic's analytics dashboards do not cover cloud-routed usage [CLM-614][CLM-620].
  - Managed settings reach each route differently: server-managed needs Teams or Enterprise; cloud routes use device management, a file, or a gateway [CLM-609].
  - Where more lives: D5 (billing comparison) and D7 (deployment options and data-flow diagrams).
- **Claims:** [CLM-620] spend controls; [CLM-614] deployment routes; [CLM-609] managed settings
- **Bridge:** Let's let the security review decide the route, then fix the billing path before the kickoff date.

## 6. Competition and "we already have Copilot"

### O-21. "If we already license an IDE assistant for our engineers, why add Claude Code?"
- **Asker:** HDT
- **Answer:** If you do, that's a good base, and many IDE assistants have added agent features. The question isn't brand, it's which tool completes real tasks on your code with the controls you need. So I'd measure every candidate on the same tasks and compare results, not feature lists [CLM-628].
- **If pushed:**
  - You told us you have no agentic coding tool today and are evaluating several; I'm not assuming what you license.
  - The market is converging: GitHub announced on February 26, 2026 that Claude and Codex are available as coding agents for Copilot Business and Pro, included in the subscription and in public preview. Check the current status before relying on it [CLM-628].
  - What to test is not autocomplete versus agent but multi-file work: plan, edit across files, run tests, iterate, with approvals. Run it per team on starter use cases from D6.
  - One protocol for every tool: same tasks, same repositories, same reviewers, criteria written before the pilot, metrics from D5, and a decision gate, because the goal is a single tool.
  - Where more lives: D6 (evaluation protocol) and D10 (battlecard).
- **Claims:** [CLM-628] GitHub announcement
- **Bridge:** Let's agree the shared task set and the decision-gate date at pilot kickoff.

### O-22. "You're up against other agents in our evaluation. Why should Claude Code win?"
- **Asker:** CTO
- **Answer:** I'd rather you decide on evidence than on my pitch. I expect Claude Code to do well on multi-step tasks in your repositories, but I can't show that until the same tasks run through every tool you're evaluating. So I'm proposing one protocol for all of them, with criteria set in advance.
- **If pushed:**
  - What I would test as hypotheses, not claims: multi-file changes, test-and-fix loops, incident triage in shell, and the admin controls and deployment options in D7.
  - No superlatives without a named, dated source: [CLM-?: independent, named and dated benchmark or study comparing agentic coding tools on realistic tasks, to be cited only if it exists].
  - Fair protocol: per team, payments, mobile and banking infrastructure tasks for engineers, fraud and credit-scoring notebooks for data scientists, incidents for SREs; same time-box, blinded review where possible, shared success criteria.
  - Selection risk: people dropping out when forced to work without a tool distorted METR's 2026 data, so plan crossover and dropout handling up front [CLM-621].
  - Compare controls on the same checklist for every tool; ask each vendor for equivalents. Where more lives: D6 and D10 (battlecard).
- **Claims:** [CLM-621] METR lessons (partial); [CLM-?: independent named and dated comparison of agentic coding tools]
- **Bridge:** Name the pilot cohort and I'll draft the shared task set with your engineering leads.

### O-23. "We're on AWS and GCP. Why not just use whatever coding assistant our cloud vendors ship?"
- **Asker:** CTO
- **Answer:** That's a legitimate option and belongs in the evaluation. Cloud-vendor assistants may fit your procurement and identity setup well. Claude Code can also run in those same clouds, through Bedrock or Vertex, on your IAM [CLM-614]. Judge both on tasks and controls; I won't characterize their products beyond their own documentation.
- **If pushed:**
  - Their capabilities, data handling and pricing: [CLM-?: current official descriptions of AWS's and Google Cloud's own coding assistants, covering capabilities, data handling and pricing, from their official documentation].
  - Overlap: using Claude Code through Bedrock or Vertex puts model spend on your cloud account and under your cloud agreement [CLM-614][CLM-620].
  - Compare on the same grid: task completion, controls (managed policy, sandbox, audit), data boundary, cost, and developer adoption.
  - The goal is a single tool, so the decision gate picks one with evidence.
  - Where more lives: D10 (battlecard) and D6 (evaluation protocol).
- **Claims:** [CLM-614] deployment routes; [CLM-620] cloud billing; [CLM-?: AWS and Google Cloud coding assistants, official capabilities, data handling and pricing]
- **Bridge:** Let's include one cloud-native option in the evaluation protocol and agree the kickoff date.

### O-24. "I've read that Claude models are already available inside other assistants. So why would I need Claude Code?"
- **Asker:** CTO
- **Answer:** Right: some assistants now offer Claude as a model or an agent; GitHub announced exactly that in February 2026 [CLM-628]. The model is only part of the experience; the harness, controls and workflow around it differ by product. Which combination works best on your tasks is exactly what the evaluation tests.
- **Trust-review:** required
- **If pushed:**
  - The announcement: Claude and Codex as coding agents for Copilot Business and Pro, included in the subscription, in public preview, with an administrator enabling agents; status may have changed since [CLM-628].
  - What differs: where it runs, the permission model and admin controls [CLM-606][CLM-609], deployment through your Bedrock or Vertex accounts [CLM-614], MCP, hooks and what is logged [CLM-610][CLM-611][CLM-612].
  - A useful experiment: the same model family in different harnesses isolates the effect of the harness. Do not assume Claude Code wins; test it.
  - Data terms depend on whom you contract with, so each route needs its own review: [CLM-?: GitHub's data-handling, retention and training terms for Claude models within Copilot, from GitHub's official documentation].
  - Where more lives: D10 (battlecard) and D7.
- **Claims:** [CLM-628] GitHub announcement; [CLM-606]; [CLM-609]; [CLM-614]; [CLM-610]; [CLM-611]; [CLM-612]; [CLM-?: GitHub data-handling terms for Claude within Copilot]
- **Bridge:** Let's put the harness-versus-model comparison into the pilot design and agree who owns the evaluation scorecard.

## 7. Change management and skills

### O-25. "My senior engineers will push back. They think it's a toy, and they're faster without it."
- **Asker:** HDT
- **Answer:** Some of them may be right on some tasks. In METR's trial, experienced developers in their own repositories were slower with AI, while a large field experiment found larger gains for less experienced developers [CLM-621][CLM-623]. So let your seniors define the tasks and judge the results; a pilot they shaped is one they'll respect.
- **If pushed:**
  - The evidence cuts both ways, and the likely pattern, a hypothesis to test, is that value depends on task type and familiarity. Record results by seniority and task type [CLM-621][CLM-623].
  - Give seniors ownership: they write the repository conventions, define the test targets, approve the hooks and own the deny-list [CLM-609][CLM-611][CLM-633].
  - Use opt-in champions per team rather than a mandate in the first weeks; METR's 2026 data shows selection effects when people are made to work without a tool [CLM-621].
  - For anyone who says "faster without it": a time-boxed comparison on their own backlog, assigning tasks to with-tool or without-tool by coin flip.
  - Where more lives: D6 (enablement and champions plan) and D5.
- **Claims:** [CLM-621] METR (partial); [CLM-623] field experiments; [CLM-609]; [CLM-611]; [CLM-633]
- **Bridge:** When you name the pilot cohort, include two or three senior engineers per team as co-designers.

### O-26. "If the AI does the work, will our juniors ever learn? Won't their skills atrophy?"
- **Asker:** CTO
- **Answer:** It's a real risk, and Anthropic's own study found it: engineers who used AI to learn a new library scored 17% lower on a quiz than those coding by hand [CLM-626]. But how they used it mattered; those who asked conceptual questions did better than those who delegated [CLM-626]. So we set learning-oriented guidelines for juniors and measure the effect.
- **If pushed:**
  - The study: 52 mostly junior engineers learning one Python library; 50% versus 67% on the quiz; the biggest gap on debugging; the small speed gain was not statistically significant [CLM-626].
  - Interaction patterns, which are qualitative and not causal: full delegation (4 people) scored about 39%; conceptual questions (7 people) about 65% [CLM-626].
  - Limits the authors state: small sample, one library, comprehension measured right after the task, and a setup unlike an agentic tool, which they expect could have a more pronounced effect [CLM-626].
  - Guidelines to propose: juniors explain every change before merge, ask before they delegate, use plan mode to understand the approach, and take part in reviews. Measure onboarding time, debugging exercises and review comments.
  - Where more lives: D6 (enablement plan) and D5. A field experiment found less experienced developers completed more tasks, so both effects can be true [CLM-623].
- **Claims:** [CLM-626] Anthropic skill-formation study; [CLM-623] field experiments
- **Bridge:** Let's make junior learning one of the pilot's named guardrail metrics when we name the metrics owner.

### O-27. "We've never run an agentic tool. How do we avoid a messy rollout and shelfware?"
- **Asker:** HDT
- **Answer:** Start small and structured: a pilot cohort across all three teams, named champions, a baseline, and a decision gate before wider rollout. You track adoption weekly, so shelfware shows up early [CLM-620]. Agentic means it plans, acts with your tools and checks its work, not just autocompletes, so enablement is part of the plan.
- **If pushed:**
  - Shape (the plan, not a fact): a pilot of about eight weeks, then waves to all 180 technical staff within roughly four months, with a decision gate between.
  - Adoption telemetry: the analytics dashboard on Teams and Enterprise, OpenTelemetry on any provider; on Bedrock or Vertex, Anthropic's dashboards do not cover the usage [CLM-620][CLM-612].
  - Day-one defaults: managed settings carry the safe permissions, sandbox and MCP list, and an organization-wide CLAUDE.md carries conventions, so no team starts from scratch [CLM-609].
  - Define terms for the room: agentic, MCP and hooks are explained on first use in the deck.
  - Where more lives: D6 (rollout waves and enablement) and D5 (adoption metrics).
- **Claims:** [CLM-620] adoption visibility; [CLM-612] OpenTelemetry; [CLM-609] managed settings
- **Bridge:** Name the pilot cohort across all three teams and agree a kickoff date; waves follow from the gate.

### O-28. "Engineers will route around the rules: personal accounts, shadow tools, keys in .env."
- **Asker:** CTO
- **Answer:** They will unless the sanctioned path is easier and the policy is enforced centrally. Managed settings can require sign-in to your organization's account, restrict providers and MCP servers, and can't be overridden by developers [CLM-609][CLM-610]. They don't stop someone using an unrelated tool on a personal laptop; that's a policy and data-loss-prevention problem you already manage.
- **Trust-review:** required
- **If pushed:**
  - forceLoginMethod and forceLoginOrgUUID restrict logins to your organization; when set, API-key sessions are blocked at startup, and allowedProviders limits which providers a machine may use [CLM-609].
  - Why it matters: consumer accounts (Free, Pro, Max) carry a user training setting; commercial terms do not allow training on Customer Content [CLM-600].
  - Delivery matters: plist, HKLM registry and file locations need admin rights to write; the Windows user registry location is writable without elevation and is not an enforcement channel [CLM-609].
  - Visibility: with OpenTelemetry tool details enabled you can see which MCP servers are used and aggregate them centrally [CLM-610][CLM-612].
  - Where more lives: D7 (policy enforcement and delivery options).
- **Claims:** [CLM-609] managed settings; [CLM-610] MCP control; [CLM-600] no training on commercial inputs; [CLM-612] OpenTelemetry
- **Bridge:** Put managed-settings enforcement on the security review agenda so day-one policy is agreed before kickoff.

## 8. Vendor and concentration risk

### O-29. "You're one vendor, and a young one. What if terms or prices change, or you disappear?"
- **Asker:** CTO
- **Answer:** Concentration risk is fair to price in. Your signed agreement governs terms and price, not today's web page, so protections belong in the contract. Technically, you reduce lock-in by building integrations on the open MCP standard [CLM-629] and by running through Bedrock or Vertex, under your existing cloud agreements [CLM-614].
- **If pushed:**
  - Contract protections to ask for: price protection, notice before model retirement, termination assistance, data deletion. Notice terms: [CLM-?: Anthropic's published model deprecation and notice commitments, from its model deprecations documentation].
  - MCP: Anthropic announced on December 9, 2025 that it is donating MCP to the Linux Foundation's Agentic AI Foundation, co-founded with Block and OpenAI, committed to keeping it open-source and vendor-neutral. That makes your integrations portable, not Claude Code's own configuration [CLM-629].
  - Through Bedrock or Vertex, billing and IAM sit under your cloud agreements, and Anthropic's legal page says your existing commercial agreement applies to Claude Code usage there unless otherwise agreed [CLM-614].
  - Third-party risk: your vendor-risk process will want attestation reports and concentration analysis; Anthropic's list is in the help center and Trust Center [CLM-618].
  - Where more lives: D7 and D10 (claims register).
- **Claims:** [CLM-629] MCP donation; [CLM-614] cloud routes and agreements; [CLM-618] attestations (partial); [CLM-?: Anthropic model deprecation and notice commitments]
- **Bridge:** Include your third-party risk team in the review package so concentration questions are answered with documents.

### O-30. "What happens when the service is down, or the model we depend on is retired mid-project?"
- **Asker:** CTO
- **Answer:** Both can happen, so we design for them. Pin model versions so changes land when you choose; if a model is unavailable, unpinned tiers fall back, and a pinned version fails unless you've configured a fallback chain [CLM-630]. Uptime commitments are a contract topic, and I'll bring the written ones from Anthropic and the cloud providers.
- **Trust-review:** required
- **If pushed:**
  - The docs advise pinning for multi-user deployments, because aliases resolve to a built-in default that can lag the newest release or not yet be enabled in your account [CLM-630].
  - Behavior: unpinned sessions switch to an earlier version or a lower tier; a pinned model keeps its model and requests fail without a fallback chain; administrators can restrict models with availableModels and enforceAvailableModels [CLM-630].
  - Cloud routes: model availability varies by region and endpoint type, so test your regions and global endpoints before rollout [CLM-630].
  - Uptime and status: [CLM-?: published service-level commitments and status history for Claude models from Anthropic, Amazon Bedrock and Google Cloud, from their official SLA and status pages].
  - Practice it: include an outage drill in the pilot with the SRE team. Where more lives: D7 (resilience) and D6.
- **Claims:** [CLM-630] pinning and fallback; [CLM-?: service-level commitments and status history for Claude models on Anthropic, Bedrock and Vertex]
- **Bridge:** Let's schedule an outage drill with your SREs inside the pilot plan.

### O-31. "How do we exit? What do we lose if we change tools in a year?"
- **Asker:** CTO
- **Answer:** Less than you'd fear, though not nothing. Your code and commits stay yours, and integrations built as MCP servers use an open standard [CLM-629][CLM-601]. What's specific to Claude Code is its configuration: instruction files, hooks, managed settings and skills, which you would re-create. We'd write the exit criteria into the decision gate.
- **Trust-review:** required
- **If pushed:**
  - Portable: your repositories, tests and CI, and MCP servers; the Commercial Terms say you own the outputs, subject to the terms [CLM-629][CLM-601].
  - Not portable: Claude Code's own configuration and policy. Instruction files are plain text and easy to adapt; hooks, managed settings and skills are specific to the product. Effort to re-create: unknown, so we will log it during the pilot.
  - Data on exit: with zero data retention nothing is stored server-side after the response; otherwise standard retention is 30 days, and local transcripts stay on developer machines until cleaned up [CLM-603][CLM-602].
  - Keep the evaluation harness (task set, metrics, scorecard) reusable, so switching later is a measurement, not an argument. Claude Code's binary must not be modified when run, per Anthropic's legal page.
  - Where more lives: D6 (decision gate and exit criteria) and D10.
- **Claims:** [CLM-629] MCP donation; [CLM-601] ownership (partial); [CLM-603] ZDR scope; [CLM-602] retention
- **Bridge:** Agree exit criteria as part of the decision gate before the pilot starts; I'll draft them with your team.

### O-32. "Why Bedrock or Vertex instead of going direct? What do we lose?"
- **Asker:** CTO
- **Answer:** Mostly you gain control and lose a few features. Through Bedrock or Vertex, usage rides your own cloud accounts, IAM and budgets [CLM-614]. But cloud sessions, Code Review and Remote Control need a claude.ai account and aren't available through cloud credentials alone, and Anthropic's analytics dashboards don't cover that usage [CLM-614][CLM-620].
- **Trust-review:** required
- **If pushed:**
  - Bedrock: AWS credential chain and SSO, IAM actions for model invocation, Guardrails through request headers, a dedicated account recommended; the WebSearch tool is not available on Bedrock [CLM-614].
  - Vertex (now Google Cloud's Agent Platform): Application Default Credentials, the aiplatform.user role, global, multi-region or regional endpoints, with model availability varying by endpoint [CLM-614][CLM-630].
  - Data: on Bedrock, model providers have no access to logs, prompts or completions, and retention is per Region [CLM-615]; on Vertex: [CLM-?: Google Cloud retention and logging terms for Claude as a partner model]. Telemetry, error reports and /feedback are off by default on both [CLM-605]; encryption uses KMS or CMEK options [CLM-604].
  - Two clouds, one policy: managed settings by device management or file, or a gateway for remote delivery [CLM-609]. Zero data retention applies to Anthropic's direct platform only, so cloud routes follow the cloud provider's retention policy [CLM-603].
  - Where more lives: D7 (data-flow diagram per route) and the deployment backup slide.
- **Claims:** [CLM-614] routes; [CLM-615] Bedrock data handling (partial); [CLM-605]; [CLM-604]; [CLM-609]; [CLM-603]; [CLM-630]; [CLM-620]; [CLM-?: Google Cloud retention and logging terms for Claude on Vertex]
- **Bridge:** Let the security working session choose the route; I'll bring the data-flow diagram for each.

---

## Open placeholders for Research and Trust

Each is a specific item to source before release (ADR-006). None may be spoken as fact until resolved.

- Vertex: Google Cloud prompt-retention, logging and abuse-monitoring terms for Claude as a partner model (O-01, O-03, O-32). Recorded as unverified; Google's data-governance page does not address partner models.
- Anthropic personnel access controls for customer data (O-03).
- Compliance API and audit-log coverage of Claude Code activity, plan eligibility, and local-session exclusions (O-07). Recorded as unverified.
- Regulatory texts for FinTechCo's compliance team: SOX ITGC and change management; PCI DSS for developer tools and cardholder data; GLBA Safeguards Rule service-provider requirements; US federal banking model risk management guidance (O-05, O-06, O-07, O-08).
- Licence-compliance guidance for generated code (O-09).
- Loaded annual cost of a US software engineer from a named source (O-16).
- Current list price and volume terms for about 180 seats, dated and linked (O-19).
- Independent, named and dated comparison of agentic coding tools, only if one exists (O-22).
- AWS and Google Cloud coding assistants: official capabilities, data handling and pricing (O-23).
- GitHub's data-handling terms for Claude within Copilot (O-24).
- Anthropic model deprecation and notice commitments (O-29).
- Service-level commitments and status history for Claude models on Anthropic, Bedrock and Vertex (O-30).

Candidate checks before the meeting: open trust.anthropic.com and reconcile its live certification list with [CLM-618]; re-read the Citi statement on Anthropic's financial-services page in full if you plan to quote it [CLM-631]; confirm the current status of the GitHub announcement in [CLM-628].
