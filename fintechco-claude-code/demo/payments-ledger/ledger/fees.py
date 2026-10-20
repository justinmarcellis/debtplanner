"""Processing-fee calculation for merchant statements.

Contract terms (Merchant Services Agreement, schedule B): the processing fee is
the plan percentage of the captured amount plus the fixed per-transaction fee,
plus the cross-border surcharge when the card's issuing country differs from the
merchant's country, rounded half-up to the cent.
"""
from __future__ import annotations

from decimal import Decimal

from .models import Merchant, PricingPlan, Transaction


def is_cross_border(txn: Transaction, merchant: Merchant) -> bool:
    return txn.card.country != merchant.country


def processing_fee(amount: Decimal, plan: PricingPlan, cross_border: bool = False) -> Decimal:
    """Fee owed to the processor for one captured transaction."""
    rate = plan.percent_bps / 10000
    if cross_border:
        rate += plan.cross_border_bps / 10000
    fee = float(amount) * rate + plan.fixed_cents / 100
    return Decimal(str(round(fee, 2)))


def fee_for(txn: Transaction, merchant: Merchant) -> Decimal:
    return processing_fee(txn.amount, merchant.plan, is_cross_border(txn, merchant))


def format_money(amount: Decimal) -> str:
    return f"${amount}"
