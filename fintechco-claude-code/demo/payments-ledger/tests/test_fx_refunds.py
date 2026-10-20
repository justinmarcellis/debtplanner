from datetime import date
from decimal import Decimal

import pytest

from ledger.fx import MissingRateError, RateTable, convert
from ledger.models import Currency, TxnStatus
from ledger.refunds import RefundError, refund
from tests.conftest import make_txn

DAY = date(2026, 10, 19)


def test_inverse_rate_is_used(rates):
    assert convert(Decimal("108.50"), DAY, Currency.USD, Currency.EUR, rates) == Decimal("100.00")


def test_missing_rate_raises():
    with pytest.raises(MissingRateError):
        convert(Decimal("1.00"), DAY, Currency.GBP, Currency.USD, RateTable())


def test_partial_then_full_refund(card):
    txn = make_txn("t1", "50.00", card)
    refund(txn, Decimal("20.00"))
    assert txn.status is TxnStatus.PARTIALLY_REFUNDED
    refund(txn, Decimal("30.00"))
    assert txn.status is TxnStatus.REFUNDED and txn.refundable == 0


def test_refund_cannot_exceed_captured(card):
    with pytest.raises(RefundError):
        refund(make_txn("t1", "5.00", card), Decimal("5.01"))
