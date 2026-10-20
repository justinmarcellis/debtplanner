# Rollout, enablement and operating model

- **Plan:** From the decision gate in program week 9 (PW9), reach all 180 technical staff (120 software engineers, 40 data scientists, 20 site reliability engineers) by Friday 2027-05-07 in four two-week waves, starting from a pilot cohort that keeps working through the gate.
- **How it lands and stays safe:** Peer champions, hands-on workshops in each team's own stack, and a small center of excellence that owns templates, central policy, approval of every outside tool connection, cost alerts and support.
- **Decisions we need:** Open the security review, name the pilot cohort and a metrics owner, and set the kickoff date. Every date below assumes Monday 2027-01-11 (illustrative) and shifts week for week.

Product facts are as of October 2026 and carry a claim id such as [CLM-675] from the claims register. Figures without a claim id are planning assumptions, tagged (A1) to (A28) and listed under RACI and assumptions. Owners are roles, not named people. SWE, DS and SRE mean software engineers, data scientists and site reliability engineers; PW n is program week n, and PW1 starts on Monday K (see Timeline). D2 is the demo kit and its governance pack, D5 the metrics framework, D6 the evaluation plan and pilot charter (this plan is the rollout half of D6), D7 the security and compliance brief.

**Terms used in this plan**

| Term | What it means |
| --- | --- |
| Agentic | Given a task, the tool reads files, runs commands and edits code, checks its own work, and asks permission as it goes; a person reviews the result [CLM-694] |
| Plan mode | Claude researches and proposes changes without editing files; Shift+Tab switches it on [CLM-694] |
| Non-interactive mode | `claude -p` runs one prompt and exits, for scripts and CI; formerly called headless mode [CLM-694] |
| MCP (Model Context Protocol) | An open standard for connecting Claude Code to outside tools and data, such as a ticket tracker or a database; each connection is an MCP server [CLM-694] |
| Hook | A script that runs automatically at a fixed point, for example before a tool runs, so a rule is applied every time [CLM-694] |
| Subagent | A helper with its own context window and permissions that does one delegated job and returns a summary [CLM-694] |
| Skill and slash command | A saved instruction file (SKILL.md) run by typing /name; a custom command file and a skill work the same way [CLM-682] |
| Plugin and marketplace | A plugin bundles skills, hooks, subagents and MCP servers; a marketplace is a catalog the company controls [CLM-681] |
| CLAUDE.md | A text file in a repository that Claude reads at the start of every session: build commands, conventions, rules [CLM-683] |
| Managed settings | Organization-wide policy files that sit above every user and project setting; developers cannot override them [CLM-659] |
| OpenTelemetry (OTel) | An open standard for sending usage metrics and events to the company's own monitoring tools [CLM-656] |
| MDM | Device-management tooling that pushes files and settings to laptops |
| Center of excellence (CoE) | The small team that owns standards, templates, policy and support during and after the rollout |
| Champion | A volunteer engineer who helps peers adopt the tool in their own squad |

## Waves

**Starting point.** The pilot cohort is 30 people: 18 SWE, 8 DS, 4 SRE (A2). It keeps working through the PW9 gate and counts in every cumulative figure below. **Enabled** means access provisioned, workshop done, central policy verified on the machine, and a named champion. Wave sizes and splits are planning assumptions (A3); only Wave 1's net-new count changes if the pilot charter names a different cohort, and the end state stays 180.

| Wave | Window | Teams added | Cumulative headcount | Entry prerequisites | Exit criteria | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| Wave 1 | PW10-11, Mon 2027-03-15 to Fri 2027-03-26 | SWE +20, DS +6, SRE +4 (+30) | 60 (SWE 38, DS 14, SRE 8) | PW9 gate returns go, signed by the CTO and the Head of Digital Transformation; managed settings v1 and OTel telemetry live since the pilot; security-review conditions closed or accepted in writing; CoE staffed; champions named for the cohort (A5); workshops booked | At least 90% of the cohort finished a workshop and 80% used the tool on a real task in week 2; no open Sev-1 or Sev-2 issue caused by the tool; support first-response target met on 90% of tickets (A7); cost per active user inside the alert band (A17) | CoE lead |
| Wave 2 | PW12-13, Mon 2027-03-29 to Fri 2027-04-09 | SWE +24, DS +10, SRE +6 (+40) | 100 (SWE 62, DS 24, SRE 14) | Wave 1 exit signed; workshops fixed from Wave 1 feedback; approved MCP list v1 published; internal plugin marketplace live with starter skills; provider quota confirmed for 100 users (A18) | Wave 1 thresholds met again; each team has at least one champion-contributed skill or CLAUDE.md template merged; MCP approvals inside target turnaround on 80% of requests (A15); second internal showcase held | Enablement lead |
| Wave 3 | PW14-15, Mon 2027-04-12 to Fri 2027-04-23 | SWE +32, DS +9, SRE +4 (+45) | 145 (SWE 94, DS 33, SRE 18) | Wave 2 exit signed; quota headroom above the peak seen in Waves 1-2 (A18); support rota staffed for the larger cohort; SRE non-interactive triage pattern signed off by security if it will be used | Wave 1 thresholds met again; support tickets per 100 users falling for two weeks running (A7); adoption health green or amber with a written plan (A21) | Platform and cloud lead |
| Wave 4 | PW16-17, Mon 2027-04-26 to Fri 2027-05-07 | SWE +26, DS +7, SRE +2 (+35) | 180 (SWE 120, DS 40, SRE 20) | Wave 3 exit signed; steady-state CoE staffing and budget approved; last-wave squads briefed (A4); office hours doubled for the final two weeks | All 180 enabled by Fri 2027-05-07, checked against the machine inventory; adoption health reviewed; handover to steady-state support and governance signed; final report to the CTO and the Head of Digital Transformation; 30- and 90-day reviews scheduled | Rollout lead |

**Why this order.** Wave 1 already includes all three teams, so each team's stack, repo and tooling problems surface while the cohort is small. Pilot champions seed each wave. Directors choose the squad order inside each wave; the squads with the most restrictive change calendars or regulated code paths go last (A4).

**Contingency if the PW9 gate returns extend or stop.**

- **Extend:** The pilot runs on for the number of weeks written into the gate decision, 2 or 4 (A22). The pilot cohort stays enabled, no new cohort is onboarded, and the CoE keeps readiness work moving (templates, MCP list, telemetry). Every wave date and the end date move by the same number of weeks: a 2-week extension moves the end date to Fri 2027-05-21, and a 4-week extension to Fri 2027-06-04. The gate decision lists the evidence that would change the answer, so the extension has a test.
- **Stop:** Pilot access ends on a date agreed at the gate; telemetry and findings are kept as the baseline for whichever tool is chosen next. The wave structure, workshops, champions, support model and approval processes in this plan do not depend on one product, so they carry over to the tool that wins the evaluation. Cloud access is closed by removing model access and the IAM roles or service accounts created for the pilot.
- **Split decision:** If the gate says go for some teams and extend for others, the go teams keep their waves, the others slip by the extension, and the 180 date moves only for the slipped teams.

## Enablement

### Champions network

- **Ratio:** One champion per 10 engineers, at least one per squad: about 18 in total, 12 SWE, 4 DS, 2 SRE (A5).
- **Time:** 1 to 2 hours a week, protected by their manager (A6). Anthropic's champion kit sizes the role at about 15 minutes posting wins, 20 minutes answering questions, 5 minutes hosting a weekly thread and 0 to 30 minutes pairing [CLM-691].
- **Duties:** Post one prompt or win a week in `#claude-code`; answer questions in public so the answer is reusable; host the Friday thread "What did Claude help you with this week?"; offer one 15-minute pairing session to anyone starting; co-facilitate their cohort's workshop; feed gaps to the CoE as template or skill proposals; name the next champion [CLM-691].
- **Not a duty:** Security, data-handling and policy questions go to the CoE, not an improvised answer [CLM-691].
- **Rhythm:** A 30-minute champions sync every two weeks, run by the enablement lead (A6).

### Hands-on workshops, per team, in the team's own stack

Format: half a day, about 3 hours, at most 12 people, a champion co-facilitating (A8). Roughly 30 minutes of concepts (the agentic loop, plan mode, permissions), 2 hours working on a real item from the team's own repo, 30 minutes to review the diff and capture a CLAUDE.md snippet. Pre-work is the install and sign-in, plus the free Claude Academy courses if people want them [CLM-693]. Anthropic's own advice is to start with codebase questions and small fixes, with a plan first [CLM-693]. Success: each participant ships one real change through normal review within 5 working days (A8).

| Team and stack | Real task in the team's own repo | Output | Starter use case |
| --- | --- | --- | --- |
| SWE, Python | Add missing unit tests to an owned service and fix one small bug; plan first, tests first | Pull request through normal review | UC-SWE-02 |
| SWE, TypeScript | Add tests and tighten types in a real component or service | Pull request through normal review | UC-SWE-01 |
| SWE, Java | Explain an unfamiliar class and its call sites, then add unit tests and one small, safe refactor | Pull request through normal review | UC-SWE-01 |
| DS, Jupyter, pandas, scikit-learn, TensorFlow | Turn pandas data-prep cells into tested functions; review a scikit-learn pipeline for data leakage and add cross-validation; explain a TensorFlow training script and add a reproducible evaluation step. Synthetic or masked data only, rule confirmed by security | Notebook diff and tests, reviewed by a second data scientist | UC-DS-02 |
| SRE, Python, shell, Go | Triage a closed incident from its logs using read-only tools; turn one runbook step into a tested shell function; fix a small Go issue with a test; run the same triage non-interactively with `claude -p` and read-only tools | Structured triage note, tested script, Go pull request | UC-SRE-01, UC-SRE-02 |

### CLAUDE.md and settings templates

The CoE publishes one starter repository, `claude-code-starter`, with every template below and a one-page guide. Rules that must hold go in permission rules or hooks, not CLAUDE.md, because CLAUDE.md is context, not enforced configuration [CLM-683].

| Layer | File | Owner | Contents |
| --- | --- | --- | --- |
| Organization policy | Managed policy CLAUDE.md: `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS), `/etc/claude-code/CLAUDE.md` (Linux, WSL), `C:\Program Files\ClaudeCode\CLAUDE.md` (Windows); users cannot exclude it [CLM-683] | CoE policy owner, approved by security reviewer | Plain-language security and compliance rules: no secrets or card numbers in code, logs or prompts; plan mode for multi-file changes; review every diff |
| Project | `./CLAUDE.md` or `./.claude/CLAUDE.md`, plus `.claude/rules/` for path-scoped rules [CLM-683] | Squad champion | Build and test commands, conventions, no-go directories, definition of done; start with `/init`, edit by hand, stay under 200 lines [CLM-683] |
| Personal | `~/.claude/CLAUDE.md`, `CLAUDE.local.md` [CLM-683] | Developer | Personal preferences only |
| Managed settings | `managed-settings.json` (see Governance) [CLM-675] | CoE policy owner | Organization policy; not a team template |
| Project settings | `.claude/settings.json` per stack preset: Python, TypeScript, Java, notebook, ops (shell and Go) [CLM-675] | Squad champion, CoE reviews the preset | Allow the stack's test, lint and build commands and read-only git; deny reads of `.env` and `secrets/` paths, as in the documented example policy [CLM-677]; no `git push` from the tool |

### Shared skills, plugins and slash commands

A skill is a SKILL.md file in `.claude/skills/NAME/` in a repo, `~/.claude/skills/NAME/` for one person, a plugin's `skills/` folder, or the managed settings directory for everyone; custom commands in `.claude/commands/` still work and create the same /name command [CLM-682]. Sharing runs through an internal plugin marketplace: a private git repository registered on every machine with `extraKnownMarketplaces` and its plugins turned on with `enabledPlugins` [CLM-681]. Anyone proposes a skill by pull request; the CoE reviews tool scope, secrets and network calls within 3 business days (A11); every release is versioned with a changelog.

| Starter skill | Team | What it does |
| --- | --- | --- |
| `/explain-module` | All | Tour of a module and its call sites for onboarding and code review |
| `/test-gap` | SWE | Find untested branches, propose tests in plan mode first |
| `/pr-summary` | All | Draft the pull request description: what changed, risks, test evidence |
| `/notebook-review` | DS | Check a notebook for leakage, seeds, splits and metric choice |
| `/incident-triage` | SRE | Read-only triage of an incident folder into a structured note |
| `/ship` | All | Run tests and lint before committing [CLM-691] |

### Office hours

Two 45-minute sessions a week for the whole rollout, run by a CoE member and a rotating champion; in each wave's onboarding week add a daily 30-minute drop-in (A9). Bring a stuck prompt or a diff. Questions are logged and the weekly FAQ and template updates come from them.

### Internal showcase

Three 45-minute showcases, at the end of PW7, PW13 and PW17 (A10): three 10-minute demos, one each from SWE, DS and SRE, then 15 minutes of questions. Every demo shows the prompt, the diff review and the test result, plus one thing that did not work. Between showcases, the Friday thread keeps wins visible [CLM-691].

## Governance operating model

The control catalog and example files are in the D2 governance pack; the reasoning and threat model are in D7. This section says who runs them and how they change.

### Center of excellence

A small team, five core roles and three part-time stack representatives, about 2.2 full-time equivalents during PW1-17 and about 0.9 afterwards (A12).

| Role | Does | Time, PW1-17 | Time, steady state |
| --- | --- | --- | --- |
| CoE lead | Runs the CoE, owns the waves with the rollout lead, chairs the weekly review | 50% | 20% |
| Platform and security engineer (policy owner) | Writes and ships managed settings, runs the MCP and plugin mechanics | 50% | 20% |
| Enablement lead | Workshops, templates, champions, office hours, showcase | 50% | 20% |
| Data and cost engineer | Telemetry pipeline, dashboards, alerts, monthly report | 30% | 10% |
| Security reviewer (named by the CTO) | Approves material policy changes, MCP servers and plugins | 10% | 5% |
| Stack representatives (one each from SWE, DS, SRE) | Bring team needs, review templates and skills for their stack | 10% each | 5% each |

**Decision rights.** The CoE decides standards, templates and policy proposals. The security reviewer can veto any loosening of policy and any MCP server or plugin that touches sensitive data. Engineering directors decide cohort order and squad participation. The CTO owns risk acceptance. **Rhythm:** a 30-minute CoE stand-up each week; a fortnightly steering call with the Head of Digital Transformation and the security reviewer; a monthly report to the CTO (A12).

### Policy management through managed settings

**Delivery.** The baseline assumes FinTechCo runs Claude Code through its own AWS and GCP accounts (A13). Server-managed settings from the claude.ai admin console are bypassed when a session is set up for Bedrock or Vertex [CLM-676], so policy v1 is delivered as endpoint-managed settings: a `managed-settings.json` placed by FinTechCo's device-management or configuration tooling at the operating-system path, optionally split into numbered files in `managed-settings.d/` such as `10-telemetry.json` and `20-security.json` so each owner edits only their part [CLM-675]. If FinTechCo also licenses Claude for Enterprise seats, server-managed settings become an option: fetched at startup and hourly, one policy for the whole organization, Owner role required [CLM-676]. Managed settings rank above user, project and local settings [CLM-659].

**Policy v1 (starting position, security reviewer signs).**

| Control | Setting | v1 position |
| --- | --- | --- |
| Permission rules | `allowManagedPermissionRulesOnly`, `permissions.deny`, `permissions.disableBypassPermissionsMode` | Only managed rules apply; deny reads of `./.env` and `./secrets/**`; bypass mode disabled; developers can add allow rules but not remove managed ones [CLM-677] |
| Hooks | `allowManagedHooksOnly` | Restricts which hooks run; the security reviewer confirms the exact effect list in the settings reference before sign-off [CLM-677] |
| Plugins | `strictKnownMarketplaces`, `blockedMarketplaces`, `disableSideloadFlags` | Allow the official marketplace and the company marketplace only; reject `--plugin-dir` style sideloading [CLM-681] |
| MCP servers | `allowedMcpServers`, `deniedMcpServers`, `allowManagedMcpServersOnly` | Approved list only (see approval process) [CLM-678] |
| Models and providers | `availableModels`, `enforceAvailableModels`, `allowedProviders`, `ANTHROPIC_DEFAULT_OPUS_MODEL` and the Sonnet and Haiku equivalents | Pin model versions; restrict to the approved provider; `allowedProviders` needs v2.1.285 or later [CLM-688, CLM-689] |
| Version floor | `minimumVersion`, later `requiredMinimumVersion` | Keep the fleet on supported versions [CLM-689] |
| Telemetry | `env` block with `CLAUDE_CODE_ENABLE_TELEMETRY` and the OTel exporter variables | On for everyone; prompt text stays off [CLM-684] |
| Sandbox | `sandbox.enabled`, `sandbox.network.allowedDomains` | Security reviewer decides per team; SRE and DS first [CLM-677] |
| Cost reporting | `modelPricing` | Set to contracted rates once known; changes reporting, not billing [CLM-685] |

**Change process.**

| Step | Owner | What happens | Target turnaround (A14) |
| --- | --- | --- | --- |
| 1. Propose | Anyone, through a champion | Change request: which key, why, risk, rollback | Same day |
| 2. Triage | Platform and security engineer | Routine (adds a stack's test or lint command) or material (loosens a deny, adds a hook, allows a new MCP or plugin source, changes model or provider) | 2 business days |
| 3. Review | CoE lead for routine; security reviewer for material, with a CTO delegate if regulated data is involved | Written approval with named approver | 2 days routine, 5 days material |
| 4. Canary | Platform and security engineer | Apply to CoE laptops and three champions; `/status` shows `Enterprise managed settings` on the `Setting sources` line, `claude doctor` shows no dropped entries, the blocked action is refused [CLM-676] | 2 business days |
| 5. Release | Platform and security engineer | Canary, then current wave, then fleet; policy files live in a git repo with approver names; machine policy is re-read on change and MDM policy is checked every 30 minutes [CLM-676] | 1 to 2 business days |
| 6. Announce | Enablement lead | Tell users what is now allowed or blocked, because a blocked item otherwise disappears without explanation [CLM-679] | Same day as release |
| 7. Review and roll back | CoE lead | Weekly look at denials and friction; roll back by reverting the commit; emergency changes approved by the security reviewer and CoE lead the same day; full policy review each quarter | Weekly; emergency same day |

### MCP server approval process

By default anyone can connect any MCP server, and Anthropic does not security-audit or manage MCP servers, so FinTechCo owns the vetting [CLM-678]. Servers are sorted into three tiers. **Tier 1:** read-only access to internal, low-sensitivity systems. **Tier 2:** can write to non-production systems. **Tier 3:** touches production, customer or cardholder data, or secrets (A15).

| Step | Owner | Criteria | Target turnaround (A15) |
| --- | --- | --- | --- |
| 1. Request | Requesting engineer with a champion | Form: purpose, team and repo, data touched, read or write tools, transport (remote HTTPS or local command), maintainer or vendor, how users sign in | Acknowledged in 1 business day |
| 2. Classify | Platform and security engineer | Assign Tier 1, 2 or 3 from the form | 1 business day |
| 3. Security review | Security reviewer | Maintainer and license; per-user sign-in, no shared secrets (managed MCP files are readable by every user on the machine) [CLM-678]; data flow and where it runs; tool list and write scopes; logging; pinned version for local commands; exposure to untrusted content | Tier 1: 3; Tier 2: 5; Tier 3: 10 business days |
| 4. Trial | Requesting team | 3 to 5 users, non-production, 1 to 2 weeks; watch connections and usage in telemetry [CLM-680]; Tier 1 may skip | Tier 2: 5; Tier 3: 10 business days |
| 5. Decide | CoE lead for Tier 1-2; security reviewer and a CTO delegate for Tier 3 | Written decision with conditions: scopes, teams, expiry date | Tier 1-2: 1; Tier 3: 2 business days |
| 6. Publish | Platform and security engineer | Add an exact `serverUrl` (remote) or `serverCommand` (local) entry to `allowedMcpServers` through the policy change process; never allow by `serverName` alone, because it is only a label users choose [CLM-679]; keep `allowManagedMcpServersOnly` on so user allowlists are ignored; add known-bad servers to `deniedMcpServers` [CLM-679]; or provide the server to everyone with `managedMcpServers` or a plugin [CLM-678] | 2 business days (Tier 3: 3) |
| 7. Verify and tell | Platform and security engineer, enablement lead | `claude mcp list` shows what loads; adding an unlisted test server is refused as not allowed by enterprise policy [CLM-679]; post the approved list and its install commands on the internal page, because Claude Code has no built-in registry to browse [CLM-678] | 1 business day |
| 8. Re-certify | CoE lead | Every 6 months, on a vendor or version change, or after an incident; retire servers unused for 90 days using telemetry [CLM-680] | Every 6 months; each review done within 5 business days |

End-to-end target: Tier 1 within 10 business days, Tier 2 within 20, Tier 3 within 30 (A15). A starter list of Tier 1 servers is approved during readiness so the pilot is not waiting on the process; the actual tools are FinTechCo's choice.

### Usage and cost monitoring

**What we watch.**

| Signal | Source | Cadence |
| --- | --- | --- |
| Adoption: active users, sessions, repeat use | OTel `claude_code.session.count` and `claude_code.active_time.total` [CLM-656]; the Claude Code analytics dashboard if Claude for Teams or Enterprise seats are also used [CLM-657] | Weekly |
| Cost and tokens | OTel `claude_code.cost.usage` and `claude_code.token.usage` [CLM-656]; the AWS and Google Cloud billing consoles [CLM-658] | Daily alert, weekly review |
| Output indicators | OTel `claude_code.pull_request.count`, `claude_code.commit.count`, `claude_code.lines_of_code.count` [CLM-656]; indicators only, outcome metrics (for example MET-05, MET-08 and MET-12) belong to D5 and are owned by the metrics owner named at the meeting | Weekly |
| Friction and safety | `claude_code.tool_decision` accept and reject events; `claude_code.mcp_server_connection` events; `claude doctor` warnings from sampled machines [CLM-684, CLM-680, CLM-676] | Weekly |
| Capacity | Provider quota and throttling dashboards in the cloud consoles | Daily during waves |

Anthropic's dashboards do not cover usage that runs through Bedrock or Vertex, so OTel and the cloud billing consoles are the spine of monitoring [CLM-658]. Telemetry carries the user's email address and prompt text is off by default; the plan keeps it off, reports at team level by default, limits per-user views to the CoE and security, and does not use per-user data in performance reviews [CLM-684].

**Review cadence (A16).** Automated alerts daily; CoE review weekly (30 minutes) from PW3 to PW17; monthly report to the CTO and the Head of Digital Transformation; quarterly policy and cost review after PW17.

**Alert thresholds, all assumptions (A17).** The anchors are the vendor's documented figures: an average of about $13 per developer per active day, and under $30 per active day for 90% of users [CLM-663]. FinTechCo's own baseline comes from the pilot, and FinTechCo pricing is to be quoted.

| Alert | Threshold | Action | Owner |
| --- | --- | --- | --- |
| One user's daily cost | Above $30: note to the CoE next day. Above $60: same-day check with the user and champion | Look for runaway loops, long sessions, Opus left on | Data and cost engineer |
| Cohort average cost per active user per day | Above $20 for 5 working days in a row | Review model default, session habits, subagent and loop use | Data and cost engineer |
| Projected monthly spend | 80% of the approved budget: review. 100%: pause new cohorts until decided | Budget is set by FinTechCo finance | CoE lead |
| Spend spike | Day over day up more than 50% with no new cohort that week | Find the cause before the next day | Data and cost engineer |
| Adoption dip | Weekly active share of enabled users below 60% for two weeks | Champion outreach, re-run the workshop, remove blockers | Enablement lead |
| Throttling | Provider throttling errors on more than 1% of requests in a day | Request more quota, stagger onboarding | Platform and cloud lead |
| Policy and security | Attempts to connect an unapproved MCP server; policy warnings on more than 2% of sampled machines | Same-day review by the security reviewer | Security reviewer |

**Budget guard-rails.** Cloud provider budget alerts are the cap in v1 [CLM-685]; a self-hosted gateway can add per-user spend limits later if needed [CLM-685]. Quota request starting point: 180 users at 15,000 to 20,000 tokens per minute each is 2.7 to 3.6 million tokens per minute, based on Anthropic's guidance for 100 to 500 users, which also warns that live training sessions need more, so workshops are staggered across days (A18) [CLM-685]. Workshops teach the cost habits: clear between unrelated tasks, use Sonnet for most tasks and Opus for hard ones, plan before large changes, switch off unused MCP servers [CLM-696].

## Support model

Targets below are assumptions, to be replaced by the CoE's service-desk targets and the vendor contract (A19).

| Tier | Who | Channel | Handles | Response target |
| --- | --- | --- | --- | --- |
| 0. Self-service | Starter repo, FAQ, `/status`, Claude Academy courses [CLM-693] | Internal wiki | How-to, setup checks | Not applicable |
| 1. Peers | Champions | `#claude-code` channel, pairing | How do I, prompt help | First reply within 4 working hours |
| 2. CoE rota | One CoE engineer on duty each week | Service-desk queue named Claude Code, plus the channel | Access, settings, plugin and MCP requests, template problems | Acknowledge in 4 working hours; fix or workaround in 2 working days |
| 3. Platform specialists | Cloud, network, identity and security teams | Existing internal ticket queues | Bedrock and Vertex IAM and quota, device delivery, sign-in, proxy | Their existing targets; the CoE tracks each ticket to closure |
| 4. Vendors | Anthropic through the in-product Get help messenger, where owners and admins reach human specialists [CLM-695]; AWS or Google Cloud support for provider service problems | Messenger, account team, cloud provider consoles | Product defects, account and billing, provider outages | Agreed in FinTechCo's contract with Anthropic, not promised in public documentation [CLM-695] |

**Severity and targets (A19).**

| Severity | Example | Acknowledge | Mitigation or workaround |
| --- | --- | --- | --- |
| Sev-1 | Suspected data exposure or policy bypass; tool down for all users | 15 minutes, on-call CoE lead | Plan within 1 hour |
| Sev-2 | A wave is blocked: provisioning fails, quota exhausted, a policy push breaks many machines | 1 working hour | 1 working day |
| Sev-3 | One person blocked | 4 working hours | 3 working days |
| Sev-4 | How-to or feature request | 1 working day | Next FAQ or template update |

**Escalation path.**

1. Developer asks a champion or the channel.
2. Not solved in the target time: ticket to the CoE rota.
3. Needs a specialist: CoE hands to the cloud, network, identity or security team and keeps ownership.
4. Needs the vendor: an Owner or Admin opens Anthropic's Get help messenger; other seats go through an owner or admin; response targets and any live working sessions are agreed in FinTechCo's contract with Anthropic, not promised in public documentation [CLM-695]. Provider quota or outage issues go to AWS or Google Cloud support, and rate-limit increases on Google Cloud go through Google Cloud support [CLM-687].
5. Decisions that need authority go to the CoE lead, then the Head of Digital Transformation, then the CTO. Anything that looks like data exposure skips the queue and goes straight to FinTechCo's security-incident process.

Hypercare: in each wave's onboarding week a CoE member is in a shared "wave room" four hours a day (A19). The CoE reviews the top five issues every week and turns them into FAQ, template or workshop changes.

## Implementation complexity assessment

Effort is person-days of FinTechCo staff time, shown as ranges (A20). They are planning assumptions, not quotes. The last column says when each item must be done: PW3 for the pilot, PW10 for Wave 1.

### Easy: days, low risk

| Item | Why it is easy | Effort (assumption) | Owner role | Needed by |
| --- | --- | --- | --- | --- |
| Install and sign in on a developer machine | One command; native installs update in the background [CLM-693] | 15 minutes per developer (A26) | Developer, champion helps | PW3 |
| Starter CLAUDE.md per repo | `/init` drafts it, a champion edits it [CLM-683] | 0.5 day per repo | Squad champion | PW3 |
| Project skills and slash commands | A SKILL.md file in `.claude/skills/NAME/` [CLM-682] | 0.25 day each | Champion | PW10 |
| Channel, office hours, showcase calendar | Calendar and chat setup | 1 day | Enablement lead | PW3 |
| First cost view | Cloud billing console per account [CLM-658] | 0.5 day | Data and cost engineer | PW3 |

### Takes real work: weeks, no new risk decision

| Item | Why it takes real work | Effort (assumption) | Owner role | Needed by |
| --- | --- | --- | --- | --- |
| Amazon Bedrock provisioning | Dedicated AWS account recommended [CLM-660]; one-time use-case form per account, access immediate [CLM-686]; IAM policy with four Bedrock actions [CLM-686]; pinned model versions [CLM-688]; region and quota choices | 6 to 10 days | Cloud platform engineer, AWS | PW3 or PW10 (A28) |
| Google Cloud (Vertex) provisioning | Dedicated project recommended [CLM-661]; Model Garden approval can take 24 to 48 hours [CLM-661]; quota per region and project variables [CLM-687]; pinned models [CLM-688] | 6 to 10 days | Cloud platform engineer, GCP | PW3 or PW10 (A28) |
| Usage telemetry pipeline | Collector, backend, dashboards, alerts; exporter variables set centrally [CLM-684] | 8 to 12 days | Data and cost engineer | PW3 basic, PW10 full |
| Internal plugin marketplace and starter skills | A repo, a review routine, versioning, policy keys [CLM-681] | 5 to 8 days | Enablement lead | PW10 |
| Workshop content in five tracks (SWE x3, DS, SRE) and practice repos | Real tasks per stack, tested before use | 12 to 18 days | Enablement lead with champions | PW3 pilot tracks, PW10 all |
| Network egress, proxy and certificates | `HTTPS_PROXY` and `HTTP_PROXY` setup [CLM-688]; VPNs and TLS-inspecting proxies can break browser sign-in [CLM-690] | 3 to 5 days | Network engineer | PW3 |
| Code-review and definition-of-done changes | Checklist, pull request template, norms for all three teams | 3 to 5 days | Engineering directors | PW10 |
| Champions program set-up | Selection, charter, protected time | 3 days | Rollout lead | PW3 |
| Support rota and queue | Queue, rota, runbook | 2 to 3 days | CoE lead | PW3 |

### Needs security sign-off: effort is small, the decision is not

| Item | Why it needs sign-off | Effort (assumption) | Owner role | Needed by |
| --- | --- | --- | --- | --- |
| SSO and developer identity | Decides who can reach the tool, for how long, and what happens at leaving. Claude account SSO is set at the account level; AWS uses an IAM Identity Center profile and Google Cloud uses Application Default Credentials [CLM-690]; group mapping and session length are security decisions | 5 to 8 days | Identity and access lead | PW3 |
| Managed settings v1 and change process | Files are quick to deploy [CLM-675] but each key is a security decision: permission rules, hooks, sandbox, models [CLM-677] | 5 to 8 days | Platform and security engineer | PW3 |
| MCP approval process and first approved list | Default is open and not vendor-audited [CLM-678]; every server is a data path | 3 to 5 days to stand up; 3 to 5 more per Tier 2 or 3 server | Security reviewer | PW5 |
| Plugin and hook policy | Plugins can bundle hooks and MCP servers, which run code on developer machines [CLM-681] | 3 to 5 days | Security reviewer | PW10 |
| Data-handling rules for prompts, notebooks and logs | What code and data may be used, masking, retention. This plan makes no regulatory-fit claim; D7 and FinTechCo compliance decide | 3 to 5 days | CISO delegate with compliance | PW3 |
| Non-interactive automation for SRE | Unattended runs need credentials and a read-only tool list; uses `claude -p` [CLM-694] | 5 to 8 days | SRE lead with security reviewer | PW14 |
| Telemetry privacy and retention | Prompt logging stays off, per-user views restricted, retention set [CLM-684] | 2 to 3 days | Privacy or security lead | PW3 |

**Totals and critical path (A20).** The "takes real work" items sum to 48 to 74 person-days (excluding per-developer and per-repo items) and the sign-off items to 26 to 42, so 74 to 116 person-days in total, of which 69 to 108 fall before Wave 1 at PW10 (the SRE automation item is due at PW14). That is why the CoE of about 2.2 full-time equivalents borrows cloud, network, identity and compliance staff part-time. For the pilot start at PW3 the minimum is: one provider provisioned, managed settings v1, a sign-in path, basic telemetry, pilot workshop tracks, data-handling rules and the support rota. Everything else lands during the pilot, before Wave 1 at PW10; the second provider is ready by PW10 (A28).

## Timeline

K is the Monday of PW1. **K = Monday 2027-01-11 is an illustrative assumption, not a commitment** (A1); the kickoff date is agreed in the meeting. **Shifting rule:** if K moves, every date moves by the same number of weeks, so PW(n) is always K plus (n - 1) weeks, and the program ends on the Friday of PW17. For example K = Monday 2027-02-01 moves every date three weeks later, with all 180 enabled by Friday 2027-05-28. Calendar risk: any K between now and early January puts the pilot weeks across Thanksgiving or the year-end holidays (A23) [CLM-665]. Inside the illustrative window, Monday 2027-01-18 (PW2) and Monday 2027-02-15 (PW6) are US federal holidays, so do not plan workshops on those days [CLM-665]. The pilot and gate rows summarize the evaluation plan (D6); the wave rows are this plan.

| Week | Monday date | Phase/wave | Milestone | Cumulative enabled |
| --- | --- | --- | --- | --- |
| PW1 | 2027-01-11 | Readiness | Security review opened; cloud accounts, access and baselines in progress | 0 |
| PW2 | 2027-01-18 | Readiness | Policy v1, telemetry and pilot workshops ready; kickoff checklist signed off | 0 |
| PW3 | 2027-01-25 | Pilot week 1 | Pilot kickoff: 30-person cohort trained and enabled across all three teams | 30 |
| PW4 | 2027-02-01 | Pilot week 2 | Champions share first wins; baseline comparison starts; first office hours | 30 |
| PW5 | 2027-02-08 | Pilot week 3 | First approved MCP servers published; weekly adoption health check begins | 30 |
| PW6 | 2027-02-15 | Pilot week 4 | Mid-pilot review: issues, cost run-rate and policy changes triaged | 30 |
| PW7 | 2027-02-22 | Pilot week 5 | Internal showcase, one demo per team; wave workshop content finalized | 30 |
| PW8 | 2027-03-01 | Pilot week 6 | Pilot ends; results compiled against baselines for the gate | 30 |
| PW9 | 2027-03-08 | Decision gate | Go, extend or stop decision; pilot cohort keeps working | 30 |
| PW10 | 2027-03-15 | Wave 1 | Wave 1 onboarding: workshops for SWE, DS and SRE cohorts | 45 |
| PW11 | 2027-03-22 | Wave 1 | Wave 1 exit review; Wave 2 prerequisites checked | 60 |
| PW12 | 2027-03-29 | Wave 2 | Wave 2 onboarding; approved MCP list reviewed and extended | 80 |
| PW13 | 2027-04-05 | Wave 2 | Wave 2 exit review; second internal showcase | 100 |
| PW14 | 2027-04-12 | Wave 3 | Wave 3 onboarding; provider quota headroom confirmed | 122 |
| PW15 | 2027-04-19 | Wave 3 | Wave 3 exit review; support load and cost run-rate checked | 145 |
| PW16 | 2027-04-26 | Wave 4 | Wave 4 onboarding; final cohorts trained | 165 |
| PW17 | 2027-05-03 | Wave 4 | All 180 enabled by Friday 2027-05-07; handover to steady state | 180 |

## Change management

FinTechCo has no agentic tools today, so this is a change in how work is done, not a software install.

### Agentic versus autocomplete, in plain English

Autocomplete finishes the line you are typing: you write, it predicts. An agentic tool takes a task, for example "the statement totals are off by a cent, fix it and prove it", and works through it: it reads the code, makes a plan, edits several files, runs the tests, reads the failures and tries again, asking permission before it acts and stopping when you say so [CLM-694]. The unit of help moves from a line of code to a finished change that a person reviews.

| Tool type | You give it | It does | You review |
| --- | --- | --- | --- |
| Autocomplete | The line you are typing | Suggests the next words | Each suggestion as you accept it |
| Chat assistant | A question | Answers in text you copy over yourself [CLM-694] | The text, then your own edits |
| Agentic tool | A task | Reads files, runs commands, edits across files, checks its own work [CLM-694] | The diff and the test results, as for any pull request |

### What changes

| Area | Today | After rollout | First step and owner |
| --- | --- | --- | --- |
| Code review | Reviewers read code written by a colleague | Same standard whoever or whatever wrote it; the author owns every line they merge. Pull request template gains one line: tool used and how the result was verified. Commits created by the tool carry an attribution trailer by default, which the `attribution` setting can change [CLM-664]. Reviewers look hardest at tests, scope against the ticket, secrets and card numbers, and unexplained dependency changes | Engineering directors publish the checklist before Wave 1 |
| Onboarding | New joiners read docs and ask neighbors | A new joiner tours a repo by asking questions of it, completes the workshop in their first two weeks, and reads the repo's CLAUDE.md; a champion runs `/team-onboarding` to generate a setup guide from real sessions [CLM-691] | Enablement lead adds it to the joiner checklist |
| Ways of working | Individuals plan and type | Plan first (Shift+Tab for plan mode [CLM-694]), small tasks, tests as the proof of done, CLAUDE.md kept current like any other doc, prompts and skills shared in the open | Each squad names a CLAUDE.md owner |
| Planning and targets | Velocity and estimates as today | No change to sprint commitments or individual targets for the first 8 weeks while baselines are measured (A27) | Engineering directors |
| Incidents | Humans triage from logs | SREs may use read-only triage; actions on production still follow the existing change and approval rules | SRE lead |

### Manager role

Managers decide whether this becomes a habit. They:

1. Say why, in their own words, and use the tool themselves.
2. Protect time: the half-day workshop for everyone and the champion's weekly hours (A27).
3. Set one expectation: try it on a real task within two weeks of your workshop, review it like any other pull request, and say what did not work.
4. Ask in one-to-ones: what did you try, what blocked you? They do not use individual usage numbers, or the analytics leaderboard, to rank people.
5. Remove blockers fast: access, quota, a missing template, a stuck approval.
6. Bring concerns to the CoE rather than settling them locally.

### Handling skepticism

Skepticism from engineers is healthy and the plan treats it as input. Each wave cohort includes engineers who did not volunteer. Anthropic's champion kit suggests acknowledging the concern, offering a short reframe and proposing one concrete demonstration on the person's own code [CLM-697]. We do not ask anyone to take the productivity case on trust: the pilot measures it on FinTechCo's own work against baselines (D5, D6).

| Concern | Response | Evidence to offer |
| --- | --- | --- |
| "I am faster without it" | Likely true for routine code you write daily; try it on the work you avoid: legacy files, unfamiliar services, test scaffolding [CLM-697] | Time one tedious task both ways |
| "I do not trust AI to touch production code" | Agreed, nothing lands unread: use plan mode, then review the diff as for any pull request [CLM-697]; central policy limits what the tool can do | Plan mode on a real file |
| "It will make juniors weaker" | Start by asking it to explain a file and its callers before changing anything [CLM-697] | Run an explain-and-trace exercise together |
| "I tried it once and it was wrong" | Usually missing context: reference the files, run `/init`, paste the real error [CLM-697] | Re-run the original prompt with context |
| "What about security and regulation?" | Not for improvising. The CoE answers, using D7 | Link to the D7 summary |
| "No time to learn another tool" | Two-minute install, one real bug; if it does not pay back in the first session, set it aside [CLM-697] | The workshop task |

### Launch communications

Before the first announcement, work through the pre-launch checklist: `#claude-code` channel created and linked; install command tested on one machine in FinTechCo's environment; security and data-handling link ready; one concrete first task per team; a named owner for the channel for the first 48 hours; an executive sponsor, here the CTO, to send or co-sign the announcement [CLM-692]. Anthropic's guidance asserts higher first-week adoption for executive-sent launches but publishes no measured effect size, so we quote no number [CLM-692]. Re-check version-specific details against the current documentation before each wave, since Claude Code ships frequently [CLM-692].

### How adoption health is checked

Weekly during PW3-PW17, then monthly, with the result attached to each wave's exit review. Definitions that feed the business case are D5's: adoption and engagement in MET-01 to MET-03, flow in MET-04 to MET-07 and MET-15.

| Check | Signal | Healthy (A21) |
| --- | --- | --- |
| Activation | Share of enabled people who completed a real task within 2 weeks | At least 80% |
| Weekly active share | Enabled people active in the week, from OTel sessions [CLM-656] | At least 70% |
| Repeat use | People active in 3 of the last 4 weeks, so "tried once and stopped" is visible [CLM-691] | At least 60% |
| Champion coverage | One champion per 10 engineers; questions answered within a day | Coverage held; no question older than 1 day |
| Friction | Support tickets per 100 users; policy denials per active user [CLM-684] | Falling week on week |
| Cost | Cost per active user against the alert band [CLM-663] | Inside band |
| Delivery signals | Share of merged pull requests marked as tool-assisted (PR template field; the analytics dashboard label if Teams or Enterprise seats are used [CLM-657]); review time; test failures after merge | No worsening against baseline |
| Sentiment | Three-question pulse survey after weeks 2 and 6 of each cohort | Neutral or better, comments read by the CoE |

**Bands (A21).** Green: all rows healthy. Amber: one or two rows short; the CoE agrees a fix with the squad within a week. Red: weekly active share below 50% or two rows short for two weeks; the wave does not exit until a recovery plan is accepted.

## Risks

Ratings are judgment calls, High / Medium / Low for likelihood then impact (A24).

| Risk | Rating | Mitigation | Early warning | Owner |
| --- | --- | --- | --- | --- |
| Gate returns extend or stop; another tool wins the evaluation | M / H | Contingency in Waves; plan is tool-neutral apart from product settings | Evidence pack late at PW8 | Rollout lead |
| Security review still open at Wave 1 | M / H | Opened in the meeting; working session within a week; written conditions; Wave 1 limited to repos already cleared | Open findings at PW8 | Security reviewer |
| Quota or throttling during workshops | M / M | Early quota request (A18); stagger workshops; Anthropic warns live training needs higher allocations [CLM-685] | Throttling above 1% of requests | Platform and cloud lead |
| Provider access takes longer than planned | L / M | Start in PW1; Bedrock access is immediate after the form [CLM-686], Vertex approval can take 24 to 48 hours [CLM-661] | Access not granted by end of PW2 | Cloud platform engineer |
| Spend above plan | M / M | Alerts (A17); pinned models, since an unpinned primary model is billed at the Opus rate [CLM-688]; cost habits in workshops [CLM-696] | Cohort average above $20 per active day | Data and cost engineer |
| Ungoverned MCP servers or plugins before policy exists | M / H | Policy v1 before pilot start; allowlists on MCP and marketplaces [CLM-679, CLM-681] | Unknown servers in telemetry [CLM-680] | Platform and security engineer |
| Policy not enforced because server-managed settings are bypassed on Bedrock or Vertex | M / H | Deliver policy as endpoint-managed files [CLM-676]; verify `/status` on a sample every wave | Machines missing the `Enterprise managed settings` line | Platform and security engineer |
| Low or one-time use | M / H | Real-task workshops, champions, repeat-use metric, manager one-to-ones | Weekly active share below 60% | Enablement lead |
| Over-trust: unreviewed changes reach production | M / H | Plan mode, same review standard, tests as proof, branch protection, PR template line; track escaped defects in D5 | Review time collapsing; escaped defects rising | Engineering directors |
| Sensitive data in prompts, logs or notebooks | M / H | Deny rules for secret paths [CLM-677]; data-handling rules; synthetic or masked data in workshops; blocking hooks such as the card-number guard shown in D2 | Hook blocks, policy denials | CISO delegate |
| Champion fatigue or unprotected time | M / M | 1:10 ratio, 2-hour cap, rotation, managers protect time | Unanswered questions over 1 day | Enablement lead |
| Product changes faster than the plan | H / M | Version floor [CLM-689]; test policy on a canary group before the fleet; CoE reads release notes monthly; re-verify details before each wave [CLM-692] | Dropped entries in `claude doctor` | CoE lead |
| K slips into holidays | M / M | Shifting rule in Timeline; agree K at the meeting (A23) [CLM-665] | K not agreed 4 weeks before | Rollout lead |
| Support overload in onboarding weeks | M / M | Hypercare, cohort size capped by wave plan, FAQ updates | Ticket backlog above 2 days | CoE lead |

## RACI and assumptions

R does the work, A is accountable (one per row), C is consulted, I is informed. The rollout lead is a delegate of the Head of Digital Transformation who runs the program day to day (A25). The metrics owner named at the meeting owns outcome metrics in D5; this plan tracks adoption and cost signals only.

| Activity | CTO | Head of Digital Transformation | Engineering directors | Rollout lead | CoE lead | Security reviewer | Platform, cloud and data engineers | Champions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Gate decision: go, extend, stop | A | R | C | C | C | C | I | I |
| Wave entry and exit reviews | I | A | C | R | R | C | C | I |
| Bedrock and Vertex provisioning | I | I | I | I | C | C | A/R | I |
| Managed settings and changes | I | I | C | I | A | C | R | I |
| MCP server approvals | C | I | I | I | R | A | R | C |
| SSO and developer identity | I | I | I | I | C | A | R | I |
| Workshops, templates, skills | I | I | C | C | A | C | C | R |
| Champions network | I | C | R | A | R | I | I | R |
| Usage and cost monitoring | I | I | I | I | A | C | R | I |
| Support rota and escalation | I | I | I | I | A | C | R | R |
| Adoption health review | I | A | C | R | R | I | C | C |
| Launch communications and sponsor message | R | A | C | R | C | C | I | C |
| Code-review and working-agreement changes | I | I | A/R | C | C | I | I | C |
| Risk acceptance and policy exceptions | A | C | I | I | C | R | I | I |

### Assumptions register

Everything below is an assumption to be confirmed or replaced; none is a FinTechCo fact. FinTechCo facts used: 120 software engineers, 40 data scientists, 20 SREs (180 in total), AWS and GCP, no agentic coding tools today.

| Id | Assumption | How to change it |
| --- | --- | --- |
| A1 | K = Monday 2027-01-11, illustrative; PW1-2 readiness, PW3-8 pilot, PW9 gate, PW10-17 waves; all 180 by Friday 2027-05-07 | Shift every date by the same weeks |
| A2 | Pilot cohort of 30: SWE 18, DS 8, SRE 4, until the pilot charter names the cohort | Recompute Wave 1 net-new; end state stays 180 |
| A3 | Wave sizes: +30, +40, +45, +35, with the team splits in the Waves table | Directors adjust within a wave |
| A4 | Last-wave squads are those with the most restrictive change calendars or regulated code paths | Directors decide |
| A5 | One champion per 10 engineers, at least one per squad; about 18 in total | Adjust at each wave entry review |
| A6 | Champion time 1 to 2 hours a week; champions sync every 2 weeks for 30 minutes | Review after Wave 1 |
| A7 | Wave exit thresholds: 90% workshop completion, 80% real-task use in week 2, 90% of tickets inside first-response target, no open Sev-1 or Sev-2 | Set at the gate with the metrics owner |
| A8 | Workshop: half a day, up to 12 people; success is one real change through review within 5 working days | Tune after the pilot |
| A9 | Office hours: two 45-minute sessions a week; daily 30-minute drop-in in onboarding weeks | Tune by attendance |
| A10 | Showcases at the end of PW7, PW13 and PW17, 45 minutes each | Move with the timeline |
| A11 | Skill and plugin review inside 3 business days | Tune by queue length |
| A12 | CoE of 5 core roles and 3 part-time stack representatives; about 2.2 full-time equivalents in PW1-17, 0.9 after; weekly, fortnightly and monthly rhythm | Confirm staffing at the meeting |
| A13 | FinTechCo routes Claude Code through its own AWS and GCP accounts and delivers policy as endpoint-managed files; Claude for Enterprise seats are optional | Revisit when D7 fixes the deployment route |
| A14 | Policy change turnarounds in the change process; canary group is CoE laptops plus three champions | Tune after Wave 1 |
| A15 | MCP tiers, step turnarounds, end-to-end targets (10, 20, 30 business days), 6-month re-certification, 90-day unused rule | Security reviewer confirms |
| A16 | Monitoring cadence: daily alerts, weekly review, monthly report, quarterly review | Tune after PW5 |
| A17 | Alert thresholds in the cost and adoption table | Re-base on pilot data |
| A18 | Quota starting point of 180 users x 15,000 to 20,000 tokens per minute; stagger workshops | Replace with measured peaks |
| A19 | Support response targets, severities, hypercare hours | Replace with the service-desk and vendor-contract targets |
| A20 | Effort ranges in person-days, owner roles and needed-by weeks in the complexity assessment | Replace with team estimates in PW1 |
| A21 | Adoption health thresholds and survey timing | Re-base after the pilot |
| A22 | Extension options of 2 or 4 weeks; stop-path steps | Written into the gate decision |
| A23 | Any K between now and early January puts the pilot weeks across Thanksgiving and year-end | Pick K in a clear window |
| A24 | Risk likelihood and impact ratings | CoE reviews monthly |
| A25 | FinTechCo has, or can name, holders for these roles: engineering directors, SRE lead, security reviewer, CISO delegate, privacy lead, platform and cloud lead, cloud, network, identity and data engineers, a rollout lead, and a device inventory to check against | Confirm role holders at kickoff |
| A26 | Install and sign-in takes about 15 minutes per developer | Measure in the pilot |
| A27 | Managers protect the half-day workshop and champion hours; no change to sprint commitments for the first 8 weeks | Directors confirm |
| A28 | First provider ready by PW3, second by PW10 | Reorder if both are needed at PW3 |

**Sources resolved.** Starter use cases are the pilot starters in the use-case catalog (UC-SWE-01, UC-SWE-02, UC-DS-02, UC-SRE-01, UC-SRE-02); metric ids come from the metrics file; vendor response targets are agreed in FinTechCo's contract with Anthropic, not promised in public documentation [CLM-695].
