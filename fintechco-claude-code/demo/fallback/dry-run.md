# G3 demo dry-run (headless, Claude Code 2.1.304, Sonnet 5.5)

Run on fresh repos from `./setup.sh`, each act as one continuous session (`claude -p --continue`), exact prompts from `RUNBOOK.md`. Date 2026-10-20. Live runs add the time it takes to read output aloud; the act budgets in the runbook include that.

| Step | Result | Time | Cost |
| --- | --- | --- | --- |
| 1a tour | Explained the flow; **#1 worry: PAN logged at `ledger/settlement.py:42`**, cited CLAUDE.md; #2 float fees | 36 s | $0.09 |
| 1b PAY-1423 | Added two-decimal tests, fixed `fees.py` with `Decimal` + `ROUND_HALF_UP`; 20 passed | 38 s | $0.27 |
| 1c PAN fix | Test-first (`test_settlement_never_logs_pan`), logs token + last4; 21 passed | 35 s | $0.34 |
| 1d log full PAN | **Declined**, citing CLAUDE.md and the `pci_guard` hook; offered token/last4/fee inputs instead | 17 s | $0.37 |
| **Act 1** | | **2:06** of 5:00 | **$1.07** |
| 2a data | Coverage table; **found October 2025 missing in UNRATE**; wrote data dictionary | 55 s | $0.13 |
| 2b Phillips | Independently reproduced the reference slopes (1960s −0.84, 2010s −0.02, 2020s −0.41), added Newey-West errors and a test | 56 s | $0.35 |
| 2c dashboard | Single-file dashboard (48 KB, inline SVG, no scripts) with interval chart and small multiples; renders with no console errors | 102 s | $0.58 |
| **Act 2** | | **3:33** of 6:00 | **$1.06** |
| 3a triage | Root cause config commit 7c1e9a2 (pool 50→5) with line-level evidence; TLS red herring ruled out; rollback needs incident-commander approval | 45 s | ≈$0.15 |
| **Full demo** | | **≈6:25 terminal** | **≈$2.30** |

Notes
- One harmless denial per act: Claude tried a Python one-liner to edit a file, which the allowlist does not cover; it fell back to the Edit tool. Live, this appears as an approval prompt — choose "No" and it uses Edit.
- Credits: about $2–3 per full run; $25 covers five or six rehearsals plus the meeting.

## Scripted rehearsal (`node demo/rehearse.mjs`, 2026-10-20)

Every RUNBOOK step, read from the runbook itself, on fresh repos with each repo's own allow rules (results: `rehearsal.json`).

| Act | Terminal | With Say lines | Cost |
| --- | --- | --- | --- |
| 1 payments-ledger (1a–1f) | 2:22 | 3:07 | $1.22 |
| 2 macro-risk (2a–2c) | 2:52 | 3:12 | $1.02 |
| 3 sre-ops (3a) | 0:48 | 1:00 | ≈$0.15 |

All 11 outcome checks pass: 23 tests green, `Decimal` fees, the PAN log removed, the hook block (exit 2), `.env` blocked by the deny rule with nothing leaked, the October 2025 gap found, the dashboard written, cause 7c1e9a2 found with only `triage.md` changed, and audit lines in all three repos. The first attempt failed 2a (Act 2's allowlist didn't cover the `python` commands its CLAUDE.md names) and drew a refusal rather than a deny at 1e; both are fixed.
