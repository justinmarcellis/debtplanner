from datetime import date, datetime
from decimal import Decimal

import pytest

from ledger.fx import RateTable
from ledger.models import Card, Currency, Merchant, PricingPlan, Transaction

STANDARD = PricingPlan(name="standard", percent_bps=290, fixed_cents=30)


@pytest.fixture
def merchant():
    return Merchant(id="m_harbor", name="Harbor Coffee Co.", plan=STANDARD)


@pytest.fixture
def card():
    # Tokenized card: no PAN outside tests/fixtures.
    return Card(token="tok_visa_01", last4="4242", brand="visa")


@pytest.fixture
def rates():
    table = RateTable()
    table.add(date(2026, 10, 19), Currency.EUR, Currency.USD, Decimal("1.0850"))
    return table


def make_txn(txn_id, amount, card, merchant_id="m_harbor", currency=Currency.USD, minute=0):
    return Transaction(
        id=txn_id,
        merchant_id=merchant_id,
        amount=Decimal(amount),
        currency=currency,
        card=card,
        captured_at=datetime(2026, 10, 19, 12, minute),
    )
