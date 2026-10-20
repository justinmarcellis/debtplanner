# Use-case catalog (D4, D6)

Seventeen ways FinTechCo's three teams would use Claude Code, in their own stacks. Two per team are recommended pilot starters: low complexity, measurable in six weeks, outside cardholder-data environments. Generated from `strategy/use-cases.json`; metric ids refer to `value/metrics.json`. Product capabilities: [CLM-001] [CLM-003] [CLM-004] [CLM-005] [CLM-007] [CLM-008].

| ID | Use case | Value driver | Complexity | Pilot starter | Demo | Metrics |
| --- | --- | --- | --- | --- | --- | --- |
| UC-SWE-01 | Onboard to an unfamiliar service | onboarding | low | yes | Act 1 | MET-15, MET-11 |
| UC-SWE-02 | Fix a defect test-first | quality | low | yes | Act 1 | MET-05, MET-09 |
| UC-SWE-03 | Ship a cross-stack feature | time-to-market | medium |  |  | MET-05, MET-06, MET-12 |
| UC-SWE-04 | Raise test coverage on legacy banking code | quality | low |  |  | MET-09, MET-08 |
| UC-SWE-05 | Framework and dependency upgrades | throughput | medium |  |  | MET-05, MET-12 |
| UC-DS-01 | Data acquisition and exploratory analysis | throughput | low | yes | Act 2 | MET-15, MET-04 |
| UC-DS-02 | Notebook to production package | time-to-market | medium | yes |  | MET-15, MET-06 |
| UC-DS-03 | Fraud feature experiments | throughput | medium |  |  | MET-15 |
| UC-DS-04 | Model documentation for validation | risk-reduction | low |  |  | MET-15 |
| UC-DS-05 | Client-ready dashboards | time-to-market | low |  | Act 2 | MET-04 |
| UC-SRE-01 | Incident triage from logs and metrics | reliability | low | yes | Act 3 | MET-15 |
| UC-SRE-02 | Toil automation with tests | reliability | low | yes |  | MET-15 |
| UC-SRE-03 | Postmortem drafts | reliability | low |  |  | MET-15 |
| UC-SRE-04 | Reliability fixes in Go services | reliability | medium |  |  | MET-08, MET-05 |
| UC-SRE-05 | Config and infrastructure guardrails | risk-reduction | low |  |  | MET-08 |
| UC-X-01 | PR review assistant in CI | quality | low |  |  | MET-05, MET-09 |
| UC-X-02 | Security hygiene sweeps | risk-reduction | medium |  |  | MET-09, MET-10 |

**Pilot starters:** UC-SWE-01 Onboard to an unfamiliar service; UC-SWE-02 Fix a defect test-first; UC-DS-01 Data acquisition and exploratory analysis; UC-DS-02 Notebook to production package; UC-SRE-01 Incident triage from logs and metrics; UC-SRE-02 Toil automation with tests.

## Details

### UC-SWE-01 · Onboard to an unfamiliar service
- **Problem:** Engineers moving between payments, mobile and core-banking services lose days learning code they did not write.
- **Workflow:** Ask for a tour of the service and its risks; Claude Code reads the code and CLAUDE.md and explains flows, conventions and hotspots.
- **Uses:** codebase reading, CLAUDE.md · **Stack:** Python, Java, TypeScript
- **Measure:** MET-15 (time to first merged PR), MET-11 · **Risk and guardrail:** Explanations can be wrong; engineers verify against code and tests.

### UC-SWE-02 · Fix a defect test-first
- **Problem:** Bugs like rounding errors in fee calculation take hours to reproduce and fix safely.
- **Workflow:** Paste the ticket; Claude Code plans, writes a failing test, fixes the code, runs the suite; engineer reviews the diff.
- **Uses:** plan mode, test execution, git · **Stack:** Python, Java
- **Measure:** MET-05, MET-09 · **Risk and guardrail:** Fix passes tests but misses intent; mandatory human review.

### UC-SWE-03 · Ship a cross-stack feature
- **Problem:** A product change touches a Java API, a TypeScript web client and a mobile app, so it waits on three queues.
- **Workflow:** Describe the feature; Claude Code plans changes across services, writes code and tests in each, and opens PRs for review.
- **Uses:** plan mode, subagents, git · **Stack:** Java, TypeScript
- **Measure:** MET-05, MET-06, MET-12 · **Risk and guardrail:** Large diffs are hard to review; split into small PRs per service.

### UC-SWE-04 · Raise test coverage on legacy banking code
- **Problem:** Older modules have thin tests, so every change is risky.
- **Workflow:** Ask for characterization tests for a module; Claude Code reads the code, writes tests that pin current behaviour, and runs them.
- **Uses:** test execution, codebase reading · **Stack:** Java, Python
- **Measure:** MET-09, MET-08 · **Risk and guardrail:** Tests that pin bugs as behaviour; reviewers check intent.

### UC-SWE-05 · Framework and dependency upgrades
- **Problem:** Version upgrades sit in the backlog because they touch hundreds of files.
- **Workflow:** Ask for an upgrade plan, then let Claude Code apply it module by module with the build and tests as the check.
- **Uses:** plan mode, subagents, headless · **Stack:** Java, TypeScript, Python
- **Measure:** MET-05, MET-12 · **Risk and guardrail:** Behaviour changes hidden in upgrades; run full suites and canary deploys.

### UC-DS-01 · Data acquisition and exploratory analysis
- **Problem:** Analysts spend most of a day finding, cleaning and documenting data before analysis starts.
- **Workflow:** Ask Claude Code to load sources, check coverage and gaps, and write a data dictionary; then explore and summarize with caveats.
- **Uses:** code execution, file editing · **Stack:** Python, pandas, Jupyter
- **Measure:** MET-15, MET-04 · **Risk and guardrail:** Silent data issues; require coverage checks and a data dictionary.

### UC-DS-02 · Notebook to production package
- **Problem:** Fraud and credit models stall between a notebook and a tested, reviewable package.
- **Workflow:** Point Claude Code at a notebook; it refactors into a package with tests and a CLI, keeping outputs identical, and opens a PR.
- **Uses:** test execution, git · **Stack:** Python, Jupyter, scikit-learn
- **Measure:** MET-15, MET-06 · **Risk and guardrail:** Numeric drift during refactor; compare outputs on a fixed dataset before merge.

### UC-DS-03 · Fraud feature experiments
- **Problem:** Each new fraud signal needs boilerplate for features, splits and evaluation.
- **Workflow:** Describe the hypothesis; Claude Code writes feature code and a reproducible evaluation, runs it, and reports metrics with caveats.
- **Uses:** code execution, subagents · **Stack:** Python, pandas, scikit-learn, TensorFlow
- **Measure:** MET-15 · **Risk and guardrail:** Leakage or overfitting; validation stays with model risk (SR 11-7).

### UC-DS-04 · Model documentation for validation
- **Problem:** Validation packs for credit models take weeks to write from code and results.
- **Workflow:** Ask Claude Code to draft documentation sections from the code, data dictionary and results; the modeler edits and owns it.
- **Uses:** codebase reading, file editing · **Stack:** Python, Jupyter
- **Measure:** MET-15 · **Risk and guardrail:** Plausible but wrong descriptions; modeler signs off every section.

### UC-DS-05 · Client-ready dashboards
- **Problem:** Analysts need front-end help to turn results into something a client can use.
- **Workflow:** Ask for a single-file interactive dashboard from the analysis outputs; review it in the browser.
- **Uses:** file editing, code execution · **Stack:** Python, HTML
- **Measure:** MET-04 · **Risk and guardrail:** Numbers typed by hand drift from the analysis; generate from outputs only.

### UC-SRE-01 · Incident triage from logs and metrics
- **Problem:** At 3 a.m. the on-call engineer correlates alerts, logs, deploys and config by hand.
- **Workflow:** Run a read-only headless triage script or CI job; Claude Code returns timeline, probable cause with evidence, red herrings and a rollback for a human to approve.
- **Uses:** headless, read-only tools, CI · **Stack:** Python, shell, Go
- **Measure:** MET-15 · **Risk and guardrail:** Wrong root cause; triage is advice, the incident commander decides.

### UC-SRE-02 · Toil automation with tests
- **Problem:** Repeated manual operational tasks consume on-call time.
- **Workflow:** Describe the manual procedure; Claude Code writes a script with tests and dry-run mode, and a runbook entry.
- **Uses:** test execution, file editing · **Stack:** Python, shell
- **Measure:** MET-15 · **Risk and guardrail:** Scripts with destructive steps; dry-run by default and review before use.

### UC-SRE-03 · Postmortem drafts
- **Problem:** Postmortems are written days later from memory.
- **Workflow:** Feed the incident bundle; Claude Code drafts the timeline, contributing factors and follow-ups for the team to edit.
- **Uses:** headless, codebase reading · **Stack:** Markdown
- **Measure:** MET-15 · **Risk and guardrail:** Blame or speculation in drafts; the team edits and approves.

### UC-SRE-04 · Reliability fixes in Go services
- **Problem:** Timeouts, retries and pool settings are tuned by trial and error.
- **Workflow:** Ask for a fix with tests (e.g., bounded retries, config floors); Claude Code changes code and adds tests.
- **Uses:** test execution, plan mode · **Stack:** Go
- **Measure:** MET-08, MET-05 · **Risk and guardrail:** Behaviour change under load; canary and load test before rollout.

### UC-SRE-05 · Config and infrastructure guardrails
- **Problem:** Bad config values reach production, as in the demo incident.
- **Workflow:** Ask Claude Code to write CI checks that reject unsafe values and to add them to the pipeline.
- **Uses:** file editing, CI · **Stack:** Python, shell, YAML
- **Measure:** MET-08 · **Risk and guardrail:** False positives blocking deploys; start in warn mode.

### UC-X-01 · PR review assistant in CI
- **Problem:** Reviewers are the bottleneck and miss repetitive issues.
- **Workflow:** Run Claude Code in GitHub Actions on each PR to flag issues against CLAUDE.md rules; humans still approve.
- **Uses:** CI, headless, CLAUDE.md · **Stack:** all
- **Measure:** MET-05, MET-09 · **Risk and guardrail:** Noise; tune rules and keep human approval.

### UC-X-02 · Security hygiene sweeps
- **Problem:** Secrets, PAN handling and float money math hide in old code.
- **Workflow:** Ask Claude Code to find and fix a class of issue across repositories, one PR per repo, with tests.
- **Uses:** subagents, hooks, git · **Stack:** all
- **Measure:** MET-09, MET-10 · **Risk and guardrail:** Over-broad changes; one issue class per PR.
