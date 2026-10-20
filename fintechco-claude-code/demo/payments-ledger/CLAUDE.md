# payments-ledger

Settlement and fee calculation for card payments. Python 3.10+, standard library only, tests with pytest.

## Commands
- Run tests: `python3 -m pytest -q`
- Run one file: `python3 -m pytest tests/test_fees.py -q`

## Rules (non-negotiable)
- **Money is `Decimal`, never `float`.** Quantize to cents with `ROUND_HALF_UP` (contract rounding). Never call `float()` on an amount.
- **Never log or persist a PAN.** Log the card token or `last4` only. Full card numbers may appear only in `tests/fixtures/` (public test ranges). A pre-write hook enforces this.
- Every behaviour change ships with a test; run the full suite before saying a change is done.
- Do not read `.env` or `secrets/`; credentials come from the vault at runtime.
- Do not push. Open changes for review; a human approves every merge (SOX change management).

## Glossary
- **Capture:** the authorized amount actually charged.
- **Processing fee:** plan percent (basis points) of the captured amount + fixed fee + cross-border surcharge when the card's country differs from the merchant's.
- **Statement:** per-merchant daily lines of gross, fee and net.
- **PAN:** primary account number (the full card number). Regulated by PCI DSS.

## Layout
- `ledger/models.py` domain types · `ledger/fees.py` fee calculation · `ledger/fx.py` currency conversion · `ledger/settlement.py` daily statements · `ledger/refunds.py` refunds
- `tickets/` open work items
