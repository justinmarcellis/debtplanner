from decimal import Decimal

import pytest

from ledger.fees import format_money, processing_fee
from ledger.models import PricingPlan

STANDARD = PricingPlan(name="standard", percent_bps=290, fixed_cents=30)


@pytest.mark.parametrize(
    "amount, expected",
    [
        ("10.00", "0.59"),
        ("1.00", "0.33"),
        ("249.99", "7.55"),
    ],
)
def test_standard_plan_fee(amount, expected):
    assert processing_fee(Decimal(amount), STANDARD) == Decimal(expected)


def test_cross_border_surcharge():
    # 3.9% of 100.00 + 0.30
    assert processing_fee(Decimal("100.00"), STANDARD, cross_border=True) == Decimal("4.20")


def test_fee_is_decimal():
    assert isinstance(processing_fee(Decimal("42.00"), STANDARD), Decimal)


def test_money_format():
    assert format_money(Decimal("0.59")) == "$0.59"


# PAY-1423: revenue assurance found statement fees $0.01 low on round-dollar amounts.
# Contract: 2.9% + $0.30, rounded half-up to the cent.
@pytest.mark.parametrize(
    "amount, expected",
    [
        ("15.00", "0.74"),   # 0.435 + 0.30 = 0.735 -> 0.74
        ("125.00", "3.93"),  # 3.625 + 0.30 = 3.925 -> 3.93
        ("145.00", "4.51"),  # 4.205 + 0.30 = 4.505 -> 4.51
    ],
)
def test_pay_1423_half_up_rounding(amount, expected):
    assert processing_fee(Decimal(amount), STANDARD) == Decimal(expected)
