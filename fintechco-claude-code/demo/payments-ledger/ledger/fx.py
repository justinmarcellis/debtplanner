"""Currency conversion for settlement.

Rates come from the treasury rate file (one rate per currency pair per business
day). Conversion happens once, on the net settlement amount, and rounds half-up
to the cent in the settlement currency.
"""
from __future__ import annotations

from datetime import date
from decimal import ROUND_HALF_UP, Decimal

from .models import Currency

CENT = Decimal("0.01")


class MissingRateError(LookupError):
    pass


class RateTable:
    def __init__(self, rates: dict[tuple[date, Currency, Currency], Decimal] | None = None):
        self._rates = dict(rates or {})

    def add(self, day: date, base: Currency, quote: Currency, rate: Decimal) -> None:
        if rate <= 0:
            raise ValueError("rate must be positive")
        self._rates[(day, base, quote)] = rate

    def rate(self, day: date, base: Currency, quote: Currency) -> Decimal:
        if base == quote:
            return Decimal("1")
        try:
            return self._rates[(day, base, quote)]
        except KeyError:
            inverse = self._rates.get((day, quote, base))
            if inverse is None:
                raise MissingRateError(f"no {base.value}/{quote.value} rate for {day}") from None
            return Decimal("1") / inverse


def convert(amount: Decimal, day: date, base: Currency, quote: Currency, table: RateTable) -> Decimal:
    return (amount * table.rate(day, base, quote)).quantize(CENT, rounding=ROUND_HALF_UP)
