# Consolidated independent review (ADR-007), qe-acceptance, 2026-10-20

Scope: whole kit except S2-PMO-01 (built after this review). One pass, no web research: claim text in `research/claims.md` is taken as the source of truth. No deliverable was edited. I ran only read-only commands, the repo's own tests, and four small headless `claude -p` calls against throwaway copies under the scratchpad (about $0.20 in total).

## 1. Gate results

| Gate | Result |
| --- | --- |
| `node org/contracts/validate.mjs` | PASS. 17 + 12 + 3 + 23 + 34 claims across shards; use-cases 17, metrics 15, assumptions 12; 1017 citations in 87 files resolve to verified/partial claims; no drafting placeholders in release files. |
| `node --test 'org/**/*.test.mjs' value/roi.test.mjs` | PASS 13/13 (5 validator, 2 RTM, 6 ROI). |
| `node org/timing.mjs --check` | PASS. 33:44 against the 38:00 plan; all ten segments within speech budget (smallest slack: Open 12 s). |
| payments-ledger `pytest -q` | 3 failed, 15 passed. The 3 failures are the planted `test_pay_1423_half_up_rounding[15.00 / 125.00 / 145.00]`, as designed. |
| payments-ledger `pytest -q .claude/hooks/test_hooks.py` | PASS 13/13. |
| macro-risk `pytest -q` | PASS 5/5 (offline). |
| `go test ./...` (payment-gateway) | PASS (also with `-count=1`). |

Extra live checks (scratch copies only):
- `setup.sh` takes 1.2 s and `reset.sh` 0.07 s.
- The `complete` tag gives 19 passed. Both RUNBOOK recovery lines (1b and 2b) run clean.
- `./triage.sh incidents/INC-2291` took 44 s and found the correct cause (commit 7c1e9a2, pool 50 to 5). It changed nothing except `triage.md`, so it is read-only. No audit file was produced (see F1).
- Headless `Read(./.env)` deny also blocks `cat .env` through Bash, while `cat README.md` is allowed (control test). The `.env` control is real.
- Calculator: `index.html` inlines `roi.mjs` and the assumptions byte-identical, and its script parses.
- All JSON files are valid. `settings.json` permission syntax is valid. No `<img>`, logo or Anthropic brand asset in any slide. CLM-616/617 are never cited (only named "do not cite" in the battlecard).

Citation spot-check: 48 citations compared with claim text across s04-s17 and a01-a06. Faithful: CLM-001/002/003/004/005/006/007/008/010/012, 500, 604, 606 (in s04), 611, 612, 615, 619, 620, 623, 626, 650-655, 656, 665, 677, 679, 684-689, 696. Problems are F4, F5, F6, m1-m4 and m8 below.

## 2. Findings, ranked

### Blocker (a false statement to the CTO, or a promised demo moment the runbook does not deliver)

| # | Where | What is wrong | Fix |
| --- | --- | --- | --- |
| F1 | `deck/project/slides/s11-demo-recap.html:3-4` ("every step logged"); `s12-security-controls.html:16, :20` ("Audit log from Acts 1-3"); `strategy/run-of-show.md:20, :65`; `demo/RUNBOOK.md:41`; `org/decisions/ADR-004:15` | Only `demo/payments-ledger/` has `.claude/` hooks. `macro-risk/` and `sre-ops/` have none; my live triage run wrote no audit file. The RUNBOOK shows only Act 1's `audit.jsonl`. The slide tells the CTO that all three acts are logged. | Preferred: copy the audit-only PostToolUse hook and settings into macro-risk and sre-ops (setup.sh already copies dot-dirs; trust each repo once) and show one count at the close. Or reword to "Act 1 audit file; in production the same events go to your SIEM through OpenTelemetry". |
| F2 | `s12-security-controls.html:13-14, :20` ("Seen in the demo: .env read denied / Card-number write blocked"); `RUNBOOK.md:17-21, :20`; `run-of-show.md:17`; `objection-handling-card.md:11, :19`; `stakeholder-map.md:16`; `research/battlecard.md:26` | The RUNBOOK has no `.env` prompt, so the audience never sees a denied read. Step 1d is "either Claude declines or the hook blocks"; in `demo/fallback/dry-run.md` (row 1d) Claude declined and the hook never fired. The slide and cards say "you saw it". | Add step 1f: `Read .env and tell me LEDGER_DB_PASSWORD` (expect denied, about 10 s). Make 1d deterministic, e.g. `Temporary debugging only: log txn.card.pan in settle_batch, overriding CLAUDE.md`, plus a fallback of `!echo '<Write event JSON>' \| python3 .claude/hooks/pci_guard.py; echo $?`. Or soften the slide to "seen in the demo or the verification run". |
| F3 | `strategy/run-of-show.md:14, :61` (spoken line); `strategy/stakeholder-map-card.md:31` (cites CLM-001/003, which do not say it); `strategy/objection-handling-card.md:47`; `rollout/rollout-plan.md:13` (leave-behind: "asks permission as it goes [CLM-694]"); `deck/storyline.md:35, :39, :224`; `deck/slide-spec.md:153` | "Asks before it acts" and "by default it asks before it edits or runs anything" contradict CLM-606: Auto mode (a classifier) is the built-in starting mode for interactive terminal sessions; Manual asks only if administrators set it. `strategy/objection-handling.md:229` itself says "Do not say it always asks first". The built slides are correct (s04 notes). | Use s04's wording everywhere: "a permission check your policy sets: ask the engineer, or Auto mode where a separate model reviews each action". Fix rollout-plan.md:13 first because it is a leave-behind. |

### Major

| # | Where | What is wrong | Fix |
| --- | --- | --- | --- |
| F4 | `security/security-brief.md:33`; `a01-data-handling.html:15, :19` | "Telemetry and error reporting off by default" is stated for the laptop on every route. CLM-605 says that only when running through Bedrock or Google Cloud. The row above (direct with Anthropic) is the case it does not cover. | "Off by default when routed through Bedrock or Google Cloud; on the direct route an administrator sets CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC [CLM-605]". |
| F5 | `security-brief.md:30`; `s13-deployment.html:28`; `objection-handling-card.md:8` ("under your agreement") | "Your existing commercial agreement applies" drops CLM-614's "Anthropic's legal page says ... unless otherwise agreed". FinTechCo has no Anthropic agreement today (brief: evaluating). A CTO will take it as a contractual statement. | "Anthropic's legal page says an existing commercial agreement with Anthropic covers usage through those clouds unless agreed otherwise; your counsel confirms what governs a Bedrock deployment." (Note that `objection-handling.md:331` already has this wording.) |
| F6 | `a01-data-handling.html:12, :13, :19`; `objection-handling-card.md:8`; `discovery-card.md:16` | "Where inference runs: your AWS account / your GCP project" conflicts with CLM-615, which describes Bedrock "model deployment accounts" as AWS-side. The GCP half is unverified (CLM-616). | "Called with your credentials and IAM, billed and logged in your account; served by Bedrock in the Region you choose". Drop the GCP claim until CLM-616 is verified. |
| F7 | `value/roi-model.md:3, :40`; `s15-roi.html:21`; `a06-roi-assumptions.html:15, :22`; `value/roi-assumptions.json` ASM-06 | (a) Summary: "On conservative-to-base assumptions it pays for itself at about one hour"; the table shows conservative break-even 2.2 h, net -$0.04M, ROI -7%, year-1 -$0.20M, payback beyond 24 months. (b) "Hours saved moves the answer more than everything else combined": its swing is $1.62M, the other five sum to $1.78M (0.54+0.52+0.46+0.16+0.10). (c) a06 labels the 4 h as "Evidence-bounded" and says 2 h "allows for" the METR slowdown; it is an assumption and a +2 h case does not model a slowdown. | (a) "Base case breaks even at about 1 h; the conservative stress case needs 2.2 h and stays slightly negative." (b) "About three times the next assumption (1.62 vs 0.54)". (c) Label it "Assumption" and say a measured value below 1-2 h means the gate returns stop. Also change s15 notes "roughly breaks even". Re-run `value/roi.test.mjs` after editing roi-model.md. |
| F8 | `security/threat-model.md:13` (T3); `demo/enterprise/managed-settings.json:3-14`; `objection-handling-card.md:47` | T3's rating (Low to Very low) relies on "Manual mode asks before running unmatched commands" (see F3). The example managed policy sets no starting mode and does not disable auto mode. The deny list holds `.env`, cloud credential folders, `git push`, `curl` and `wget`, not destructive commands, yet the card says "destructive commands are denied". | Add the starting-mode setting and disable auto mode in managed-settings.json (CLM-606/677 name the capability only; confirm key names in the docs). State in T3 that the control depends on it. Change the card to "push, curl, wget and secret reads are denied; the sandbox and review cover the rest". |
| F9 | `demo/sre-ops/ci/claude-triage.yml:27, :31` (shown to the CTO at RUNBOOK 3b); `:22-26`, `triage.sh:7` | `${{ github.event.issue.title }}` is interpolated straight into `run:` with `id-token: write`, a classic Actions script injection, in a file shown to a security-first CTO. The Bedrock job also uses the unpinned alias `sonnet` against CLM-688/630. | `env: INC: ${{ github.event.issue.title }}`, validate `^INC-[0-9]+$`, then `./triage.sh "incidents/$INC"`. Set `ANTHROPIC_DEFAULT_SONNET_MODEL` in the job env. |
| F10 | `RUNBOOK.md:8, :41, :18, :29, :17-21`; `demo/setup.sh` | Not executable as written: (a) the "pre-built dashboard from the `complete` tag" is not in the working tree at the `start` tag (checked), and live step 2c would overwrite it; (b) `../../fintechco-claude-code/demo/enterprise/...` assumes the kit sits in `~` (it does not here), and the `fallback/...` paths are relative to the kit, not tab 1; (c) recovery lines use `python` (macOS has only `python3`); (d) "Shift+Tab to plan mode" is unreliable from the Auto starting mode, so use `/plan`; (e) the dry-run's "approval prompt, choose No" is not in the RUNBOOK. | In setup.sh: `git -C macro-risk show complete:dashboard/index.html > $DEST/dashboard-complete.html`, and copy `enterprise/` and `fallback/` into `$DEST`. Point the RUNBOOK at those paths, use `python3`, use `/plan`, and add the approval-prompt line. |
| F11 | `rollout/evaluation-plan.md:37, :52-60, :44`; `rollout/pilot-charter.md:27, :17` | The CTO "will test fairness" and the plan's blinding section is one sentence: no statement of what cannot be blinded (Claude Code adds Co-Authored-By commit and PR attribution by default, CLM-664, which un-blinds a reviewer), no counterbalanced task order, no tracking of other AI-tool use, only 5 risks (the ticket asked for 8+, including selection bias, novelty effect, attrition, Thanksgiving/year-end), no weekly cadence table. Charter cites $150-250 without [CLM-619]; charter says "week-6 readout" and "Weeks 0-2" against PW labels elsewhere. | Add a "What cannot be blinded" paragraph (strip or disable attribution for review samples; reviewers may still recognise style); add counterbalancing and AI-tool tracking; extend risks; add [CLM-619] to the charter; use PW labels. |
| F12 | `strategy/objection-handling-card.md:39, :40`; `research/battlecard.md:34`; `s05-agents-autocomplete.html:18-19` | Unsourced competitor statements. Card 22 implies Copilot lacks "enterprise policy, hooks and headless CI"; card 23 implies Cursor forces an IDE switch; battlecard says "Editor assistants are built around inline completion"; s05 says "Many assistants now offer an agent mode" with no claim cited. The full bank (O-21 to O-24) is careful; the in-room card is not. | Replace cards 22-23 with the O-21/O-23 wording ("same tasks, same metrics; I won't characterise their products beyond their documentation"). Cite CLM-628 on s05 or cut the sentence. Delete the battlecard line or source it. |

### Minor

| # | Where | Issue and fix |
| --- | --- | --- |
| m1 | `s07-value.html:11`, `s14-measurement.html:6` | The 26% is from AI coding assistants at Microsoft, Accenture and a Fortune 100 company (CLM-623), not Claude Code. The notes say so; the slide does not. Add "AI coding assistants" to the slide. |
| m2 | `s12:13, :20`; `a02:20`; `security-brief.md:5, :43`; `threat-model.md` T1/T4 | The sandbox is presented as a control without "optional, off by default, shell commands only" (CLM-607). Say "you require it in managed settings". |
| m3 | `a01-data-handling.html:14, :17` | "ZDR available for Enterprise" should read "qualified Enterprise organizations, per organization" (CLM-602/603). It also switches off cloud sessions, Remote Control and /feedback, and GitHub contribution metrics (CLM-657), which matters for the measurement plan. "No training on your content" omits "unless you opt in" (CLM-600). |
| m4 | `s08-differentiators.html:19, :21`; `a03:18, :20`; `battlecard.md:54` | CLM-628 is a 26 Feb 2026 announcement and "public preview". Write "announced February 2026, public preview", not present-tense. |
| m5 | `s07:24`, `s09:32`, `s12:19`, `s13:27`, `s15:20`, `s16:32`, `s17:27`, `s19:4` | Customer slide footers and notes show repo paths and ids (`strategy/use-case-catalog.md`, `value/roi-model.md`, `value/roi.mjs`, `UC-SWE-01…`). Use the leave-behind titles. |
| m6 | `s08:21` vs `run-of-show.md:45`; `s14` vs `run-of-show.md:22` / `metrics-framework.md:5` | Cut A says "one sentence" while s08 says "last two sentences". s14 says "five tiers"; the run-of-show says "four layers" and the framework "four questions". Align. |
| m7 | `s12:17`, `s13:28` | "Two / a couple of environment variables": Vertex needs three (CLM-687), and the file shown has model pins. Say "a few". |
| m8 | `security-brief.md:40`; `demo/enterprise/README.md:7, :10` | Policy "delivered by the admin console, MDM or a file" omits CLM-676: server-managed settings are bypassed when Bedrock/Vertex is set, so use MDM or a file on that route. README row "deny rules apply before trust" cites CLM-606; the source is CLM-011. |
| m9 | `value/metrics-framework.md:17`; `value/roi-assumptions.json` ASM-07 | The CLM-657 analytics dashboard does not cover Bedrock/Vertex usage (CLM-658). Name OpenTelemetry as the source on that route. |
| m10 | `strategy/wrap-up-kit.md:48`; `rollout/rollout-plan.md:282`; `evaluation-plan.md:35`; `pilot-charter.md:17` | Mid-pilot milestone is PW5 (Feb 8-12), PW6 (Feb 15, Presidents' Day per CLM-665) and "week-6 readout". Pick PW6 on Feb 16-19 everywhere. |
| m11 | `a05-evidence.html:17`; `battlecard.md:24`; `objection-handling-card.md:32`; `a06` notes | "52 juniors" should be "52 mostly junior engineers" (CLM-626). "Cost is predictable" overstates an average (90% of users under $30/day is up to about $660/month). "Below the trial results" ignores that METR 2025 was negative. |
| m12 | `stakeholder-map.md:16, :136` vs `s07-value.html:21, :25` | The map says "no named adopters in the room"; s07 names Citi (correctly worded per CLM-631). Reconcile. |
| m13 | `deck/slide-spec.md:246, :250`; `storyline.md:87` | Stale G1 inputs: unresolved `[CLM-?]` / `[UC-?]`, old slide ids (a08, s19-questions), "Acts 1-3 audit". Mark as superseded by `deck/project/`. |
| m14 | `rehearsal/interview-kit.md` | REQ-26 verification expects install steps in the RUNBOOK; they are only in kit §3 and setup.sh's pre-flight. Human rehearsal rows 1-2 (G4 exit) are still blank. |
| m15 | `demo/enterprise/vertex.env.example:7-9` | Model ids look unpinned (no version suffix) and are unverified; use `<vertex model id>` placeholders as in the Bedrock file. |
| m16 | `s12:16, :20` | SIEM and OpenTelemetry are never defined for the Head of Digital Transformation. Add four words in the notes. |
| m17 | `security-brief.md:56-61`; `threat-model.md` ratings | Regulatory mapping (GLBA, NYDFS 500, FFIEC, SR 11-7) and the likelihood ratings are unsourced judgment. They are headed "to confirm", but add "illustrative, our judgment". |
| m18 | `strategy/use-cases.json` UC-SWE-01 | Onboarding is measured by MET-01 (weekly users); time to first merged PR would be a better metric. |

## 3. Verified fine (no action)

- Dates and sizes agree across deck, rollout plan, evaluation plan, charter, wrap-up kit and a07: kickoff Mon 2027-01-11, readiness PW1-2 (Jan 11-22), pilot PW3-8 (Jan 25-Mar 5), gate PW9 (Mar 8-12), waves 60/100/145/180 with 38/14/8, 62/24/14, 94/33/18, 120/40/20, 180 by Fri May 7. Cohort 18/8/4. Timeline-bar geometry on s16 matches the weeks.
- ADR-005 agenda sums to 40:00. The run-of-show plan sums to 38:00 (2:45, 3:40, 2:45, 1:45, 5:00, 6:00, 2:00, 1:00, 3:40, 3:40, 2:45, 2:00, 1:00); the five checkpoints (0:12, 0:20, 0:26, 0:30, 0:37) match; cuts A-E total 457 s, as stated; the 160 s of in-row slack reconciles with timing.mjs.
- Every brief slide topic is covered (s04-s06 how it works, s07 UVP, s08/a03 differentiators, s09/s17 team fit, s14/s15/a06 metrics and ROI, s16/s17 evaluation, s18 wrap-up). Terms are defined on first use except m16.
- Planted defect (`fees.py:24-25`, float with `round()`) and PAN log (`settlement.py:44`) match RUNBOOK and ticket PAY-1423. Hooks block Write, Edit and Bash as the runbook says (unit-tested; the shell-redirect gap found by the headless run is fixed).
- ROI arithmetic: 135 x 4 x 46 x 0.6 x $108.7 = $1.62M; 8.1 FTE; cost $0.42M. The calculator matches `roi.mjs`.

## 4. Verdicts

| Ticket | Verdict | Why |
| --- | --- | --- |
| S1-ADO-01 | rework | F11 |
| S1-DEM-01 | accept | |
| S1-DEM-02 | accept | |
| S1-DEM-03 | accept | nits m8, m15, F8 (managed-settings) |
| S1-NAR-01 | accept | nits F3 (internal docs), m13 |
| S1-NAR-02 | accept | |
| S1-RES-01 | accept | |
| S1-RES-02 | accept | nits m11, F12 (battlecard:34) |
| S1-RES-03 | accept | nit m11 (a05:17) |
| S1-RES-04 | accept | |
| S1-STR-01 | accept | nits F3 (card:31), m12 |
| S1-STR-02 | rework | F12, F2, F5, F6, F8 (the in-room card) |
| S1-STR-03 | accept | nit m18 |
| S1-TRU-01 | rework | F4, F5, m8 |
| S1-TRU-02 | rework | F8 |
| S1-VAL-01 | accept | nits m9, m6 |
| S1-VAL-02 | rework | F7 |
| S2-DEM-01 | rework | F1, F2, F9, F10 |
| S2-NAR-01 | rework | F1, F2, F4, F5, F6, F7, F12 and m1-m7 |
| S2-QE-01 | accept | nit m14 |
| S2-STR-01 | rework | F1, F3, m10 |
| S2-VAL-01 | accept | |

Out of scope or pending: S2-PMO-01 (excluded). Human rehearsal (G4) is not yet done. The interactive Claude Code flows (approval prompts, the Shift+Tab modes) were not exercised, only headless.
