# Live demo runbook (14 minutes, three acts)

Decided in ADR-004. Clock: demo starts by **0:12**, Act 2 starts by **0:20**, demo ends by **0:26** (ADR-005). Model: **Sonnet 5.5** (`/model sonnet`); Opus 5.5 is the step-up if asked. Every step has a recovery line; never debug live.

## Before the meeting (T−30 min)
1. `./setup.sh` → repos in `~/fintechco-demo/` (≈2 s). Then run `claude` once in each repo and accept the trust prompt; `/model sonnet`; exit.
2. Terminal: light theme, 18pt+ font, ~110 columns, three tabs named **1 payments**, **2 macro**, **3 sre**. Close everything else; notifications off.
3. Browser tab 1: the deck. Tab 2: `~/fintechco-demo/macro-risk` dashboard from the `complete` tag (pre-built fallback, see Act 2).
4. Warm-up (not shown): in each repo ask `say ready` so the first live response is fast.
5. Credits: a full dry run costs about $1–3 on Sonnet (measured in `fallback/dry-run.md`); $25 covers rehearsals plus the meeting.

## Act 1 · Software engineers · payments-ledger (5:00, starts 0:12)
Say: *"A payments service none of us wrote. Real-shaped code, synthetic data. Watch the controls as much as the code."*

| # | Type into Claude Code (tab 1) | Expect (time) | Say | Recovery |
| --- | --- | --- | --- | --- |
| 1a | `Give me a 60-second tour of this service for a new engineer: what it does, how money flows through it, and anything that worries you.` | Explains models → fees → fx → settlement; flags `float` in `fees.py` and the PAN in the `settlement.py` debug log as against `CLAUDE.md` (≈40 s) | "Onboarding in a minute, and it read our team rules in CLAUDE.md." | If it misses the PAN line, ask: `Anything in settlement.py that breaks our CLAUDE.md rules?` |
| 1b | Shift+Tab to **plan mode**, then: `Fix PAY-1423 in tickets/PAY-1423.md. Write a failing test first, then fix it, then run the full test suite.` | Plan shown; you approve; it adds/uses the regression test, switches fees to `Decimal` half-up, suite green: 19+ passed (≈90–120 s) | "It proposes, I approve. Test first, then the fix, then proof." | `git checkout complete -- ledger tests && python -m pytest -q` (19 passed) |
| 1c | `Also fix the PAN logging problem you found.` | Replaces `card.pan` with the token in the log line (≈20 s) | "A real PCI finding, fixed in seconds." | Skip; mention it |
| 1d | `For debugging, add a log line in settle_batch that prints the full card number.` | Either Claude declines citing CLAUDE.md, or the **PCI guard hook blocks** the edit with its message (≈20 s) | "Two layers: instructions it follows, and a hook it cannot get around. The hook is our policy, in code." | Show `fallback/governance/verification.md` |
| 1e | `!git diff --stat` | Small, reviewable diff | "Nothing is pushed: push is denied by policy. A human reviews this PR like any other." | — |

## Act 2 · Data scientists · macro-risk (6:00, starts by 0:20)
Say: *"Your credit-risk team needs macro context for a client deck by tomorrow. Public Fed data, nothing proprietary."*

| # | Type into Claude Code (tab 2) | Expect (time) | Say | Recovery |
| --- | --- | --- | --- | --- |
| 2a | `Using fred.py, load UNRATE, NROU, PCEPILFE, DFEDTARU and VIXCLS from the local cache. Check coverage and any gaps, then write data/README.md as a short data dictionary with units, frequency and source.` | Table of coverage; **finds October 2025 missing for UNRATE** (the shutdown month); writes the dictionary (≈60 s) | "It found the real gap in the data without being told where to look." | `git checkout complete -- data/README.md` |
| 2b | `Has the Phillips curve flattened? Regress year-over-year core PCE inflation on the unemployment gap (UNRATE minus NROU) by decade, numpy only. Put it in analysis/, add a test, run it, and give me three bullets with caveats.` | Writes analysis + test, runs it; 2010s slope ≈ −0.02 (flat), 2020s ≈ −0.40 (steeper again), caveats on causality (≈120–150 s) | "Quants focus on the question; the boilerplate is gone." | `git checkout complete -- . && python -m analysis.report && cat outputs/findings.md` |
| 2c | `Turn the results into a client-ready, single-file HTML dashboard in dashboard/index.html. No external libraries; it opens on locked-down machines.` | Builds and opens a dashboard (≈120 s) | "Front-end work without a front-end team." | Switch to browser tab 2 (pre-built `complete` dashboard) — **use this if the clock is past 0:20 when 2c would start** |

## Act 3 · SREs · sre-ops (2:00)
Say: *"3 a.m. page. Same agent, no chat window: it runs from a script or an alert."*

| # | Run (tab 3) | Expect (time) | Say | Recovery |
| --- | --- | --- | --- | --- |
| 3a | `./triage.sh incidents/INC-2291` then `less incidents/INC-2291/triage.md` | ≈45 s; summary, timeline, cause (config commit 7c1e9a2 cut the DB pool 50→5), red herring ruled out, rollback that the incident commander approves | "Read-only tools, evidence on every line, a human approves the fix." | Show `fallback/act3/INC-2291-triage.md` (narrate, 30 s) — **default if the clock is past 0:24** |
| 3b | Show `ci/claude-triage.yml` | — | "The same command runs from your alerting, through Bedrock with no long-lived keys." | — |

## Governance close (1:00)
Tab 1: `cat .claude/settings.json` (deny `.env`, deny push, hooks) → `tail -3 .claude/audit/audit.jsonl` (every tool call recorded) → `../../fintechco-claude-code/demo/enterprise/managed-settings.json` (or the copy you keep open) → `bedrock.env.example`.
Say: *"Central policy developers can't override, an audit trail into your SIEM, and inference inside your own AWS or GCP account."*

## After
`./reset.sh` before every rehearsal and right before the meeting.
