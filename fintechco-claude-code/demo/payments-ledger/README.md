# payments-ledger (demo)

A small, realistic slice of a card-payments back office: fee calculation, currency conversion, daily merchant statements and refunds. All data is synthetic. Used in Act 1 of the FinTechCo demo (`../RUNBOOK.md`).

```bash
python -m pytest -q      # 3 failures are expected: PAY-1423 (tickets/PAY-1423.md)
```

What the demo shows:
1. **Understand an unfamiliar codebase:** Claude Code explains the service and flags risks, including a PAN written to a debug log in `ledger/settlement.py`, which breaks the rules in `CLAUDE.md`.
2. **Fix a bug test-first:** PAY-1423, fees computed with `float` and `round()`.
3. **Guardrails enforced in code:** `.claude/settings.json` denies reading `.env` and pushing, and the `pci_guard` hook blocks any edit that would log a full card number. `audit_log` records every tool call.
