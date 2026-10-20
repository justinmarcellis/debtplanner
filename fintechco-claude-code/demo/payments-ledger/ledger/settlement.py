"""Daily settlement: turns captured transactions into merchant statements."""
from __future__ import annotations

import logging
from collections import defaultdict
from datetime import date
from decimal import Decimal

from .fees import fee_for
from .fx import RateTable, convert
from .models import Merchant, MerchantStatement, StatementLine, Transaction, TxnStatus

log = logging.getLogger("ledger.settlement")

SETTLEABLE = {TxnStatus.CAPTURED, TxnStatus.PARTIALLY_REFUNDED}


class UnknownMerchantError(KeyError):
    pass


def settle_batch(
    txns: list[Transaction],
    merchants: dict[str, Merchant],
    day: date,
    rates: RateTable,
) -> dict[str, MerchantStatement]:
    """Build one statement per merchant for the day's captured transactions."""
    by_merchant: dict[str, list[Transaction]] = defaultdict(list)
    for txn in txns:
        if txn.status in SETTLEABLE:
            by_merchant[txn.merchant_id].append(txn)

    statements: dict[str, MerchantStatement] = {}
    for merchant_id, merchant_txns in sorted(by_merchant.items()):
        merchant = merchants.get(merchant_id)
        if merchant is None:
            raise UnknownMerchantError(merchant_id)
        statement = MerchantStatement(merchant_id=merchant_id, currency=merchant.settlement_currency)
        for txn in sorted(merchant_txns, key=lambda t: t.captured_at):
            gross = txn.amount - txn.refunded
            fee = fee_for(txn, merchant)
            net = convert(gross - fee, day, txn.currency, merchant.settlement_currency, rates)
            log.debug("settled txn=%s pan=%s gross=%s fee=%s", txn.id, txn.card.pan, gross, fee)
            statement.lines.append(
                StatementLine(txn_id=txn.id, card_last4=txn.card.last4, gross=gross, fee=fee, net=net)
            )
        log.info("statement merchant=%s lines=%d net=%s", merchant_id, len(statement.lines), statement.net)
        statements[merchant_id] = statement
    return statements


def statement_total(statements: dict[str, MerchantStatement]) -> Decimal:
    return sum((s.net for s in statements.values()), Decimal("0.00"))
