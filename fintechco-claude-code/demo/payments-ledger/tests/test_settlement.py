from datetime import date
from decimal import Decimal

import pytest

from ledger.models import Currency, Merchant, PricingPlan, TxnStatus
from ledger.settlement import UnknownMerchantError, settle_batch, statement_total
from tests.conftest import make_txn

DAY = date(2026, 10, 19)


def test_statement_totals(merchant, card, rates):
    txns = [make_txn("t1", "10.00", card), make_txn("t2", "20.00", card, minute=1)]
    stmt = settle_batch(txns, {merchant.id: merchant}, DAY, rates)[merchant.id]
    assert stmt.gross == Decimal("30.00")
    assert stmt.fees == Decimal("0.59") + Decimal("0.88")
    assert stmt.net == stmt.gross - stmt.fees
    assert [line.card_last4 for line in stmt.lines] == ["4242", "4242"]


def test_voided_transactions_are_not_settled(merchant, card, rates):
    voided = make_txn("t1", "10.00", card)
    voided.status = TxnStatus.VOIDED
    assert settle_batch([voided], {merchant.id: merchant}, DAY, rates) == {}


def test_eur_transactions_convert_to_settlement_currency(merchant, card, rates):
    txn = make_txn("t1", "100.00", card, currency=Currency.EUR)
    stmt = settle_batch([txn], {merchant.id: merchant}, DAY, rates)[merchant.id]
    # (100.00 - 3.20 fee) * 1.0850 = 105.028 -> 105.03
    assert stmt.lines[0].net == Decimal("105.03")


def test_unknown_merchant_raises(card, rates):
    with pytest.raises(UnknownMerchantError):
        settle_batch([make_txn("t1", "5.00", card, merchant_id="m_missing")], {}, DAY, rates)


def test_statement_total_across_merchants(card, rates):
    plan = PricingPlan(name="standard", percent_bps=290, fixed_cents=30)
    a = Merchant(id="m_a", name="A", plan=plan)
    b = Merchant(id="m_b", name="B", plan=plan)
    txns = [make_txn("t1", "10.00", card, merchant_id="m_a"), make_txn("t2", "10.00", card, merchant_id="m_b")]
    statements = settle_batch(txns, {"m_a": a, "m_b": b}, DAY, rates)
    assert statement_total(statements) == Decimal("18.82")
