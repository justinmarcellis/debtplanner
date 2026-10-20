"""Core domain types for the payments ledger.

Amounts are Decimal in major units (dollars), never float. Card data is
tokenized: the vault token and last4 are safe to store and log; the PAN is
only present on card-present reconciliation records and must never be logged.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from decimal import Decimal
from enum import Enum


class Currency(str, Enum):
    USD = "USD"
    EUR = "EUR"
    GBP = "GBP"
    CAD = "CAD"


class TxnStatus(str, Enum):
    AUTHORIZED = "authorized"
    CAPTURED = "captured"
    PARTIALLY_REFUNDED = "partially_refunded"
    REFUNDED = "refunded"
    VOIDED = "voided"


@dataclass(frozen=True)
class Card:
    """A tokenized card reference."""

    token: str
    last4: str
    brand: str
    country: str = "US"
    # Populated only for card-present reconciliation files. Never log or persist.
    pan: str | None = field(default=None, repr=False)


@dataclass(frozen=True)
class PricingPlan:
    """Contracted processing price: percent in basis points plus a fixed fee in cents."""

    name: str
    percent_bps: int
    fixed_cents: int
    cross_border_bps: int = 100


@dataclass(frozen=True)
class Merchant:
    id: str
    name: str
    plan: PricingPlan
    country: str = "US"
    settlement_currency: Currency = Currency.USD


@dataclass
class Transaction:
    id: str
    merchant_id: str
    amount: Decimal
    currency: Currency
    card: Card
    captured_at: datetime
    status: TxnStatus = TxnStatus.CAPTURED
    refunded: Decimal = Decimal("0.00")

    @property
    def refundable(self) -> Decimal:
        return self.amount - self.refunded


@dataclass(frozen=True)
class StatementLine:
    txn_id: str
    card_last4: str
    gross: Decimal
    fee: Decimal
    net: Decimal


@dataclass
class MerchantStatement:
    merchant_id: str
    currency: Currency
    lines: list[StatementLine] = field(default_factory=list)

    @property
    def gross(self) -> Decimal:
        return sum((line.gross for line in self.lines), Decimal("0.00"))

    @property
    def fees(self) -> Decimal:
        return sum((line.fee for line in self.lines), Decimal("0.00"))

    @property
    def net(self) -> Decimal:
        return sum((line.net for line in self.lines), Decimal("0.00"))
