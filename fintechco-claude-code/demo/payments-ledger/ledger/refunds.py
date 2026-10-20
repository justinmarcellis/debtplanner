"""Refunds against captured transactions."""
from __future__ import annotations

from decimal import Decimal

from .models import Transaction, TxnStatus


class RefundError(ValueError):
    pass


def refund(txn: Transaction, amount: Decimal) -> Transaction:
    """Refund part or all of a captured transaction. Mutates and returns the transaction."""
    if txn.status not in (TxnStatus.CAPTURED, TxnStatus.PARTIALLY_REFUNDED):
        raise RefundError(f"cannot refund a {txn.status.value} transaction")
    if amount <= 0:
        raise RefundError("refund amount must be positive")
    if amount > txn.refundable:
        raise RefundError(f"refund {amount} exceeds refundable {txn.refundable}")
    txn.refunded += amount
    txn.status = TxnStatus.REFUNDED if txn.refundable == 0 else TxnStatus.PARTIALLY_REFUNDED
    return txn
