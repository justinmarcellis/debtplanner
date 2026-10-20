"""Tests run on the committed FRED cache only (no network)."""
import numpy as np
import pytest

import fred
from analysis import fed_policy_vol, phillips
from analysis.common import ols


def test_cache_values_parse_as_numbers():
    # Regression: values were index-aligned to a DatetimeIndex and silently became NaN.
    s = fred.load_cache("UNRATE")["value"]
    assert s.iloc[0] == pytest.approx(3.4)
    # The only gap is October 2025: BLS did not collect data during the federal government shutdown.
    assert [d.strftime("%Y-%m") for d in s[s.isna()].index] == ["2025-10"]


def test_ols_recovers_a_known_line():
    x = np.arange(50, dtype=float)
    fit = ols(x, 2.0 - 0.5 * x)
    assert fit.slope == pytest.approx(-0.5) and fit.intercept == pytest.approx(2.0) and fit.r2 == pytest.approx(1.0)


def test_phillips_dataset_and_decades():
    df = phillips.dataset()
    assert len(df) > 700 and df.notna().all().all()
    decades = {r["decade"]: r for r in phillips.by_decade(df)}
    assert {"1960s", "2010s", "2020s"} <= decades.keys()
    assert decades["1960s"]["slope"] < -0.5          # steep, textbook curve
    assert abs(decades["2010s"]["slope"]) < 0.1      # flat
    assert decades["2010s"]["r2"] < 0.1


def test_rolling_window_has_intervals():
    rows = phillips.rolling(phillips.dataset())
    assert len(rows) > 100 and all(r["ci_low"] <= r["slope"] <= r["ci_high"] for r in rows)


def test_fed_events_and_summary():
    vix = fred.load_cache("VIXCLS")["value"]
    events = fed_policy_vol.target_changes()
    study = fed_policy_vol.event_study(events[events.index >= vix.dropna().index.min()], vix)
    summary = {r["direction"]: r for r in fed_policy_vol.summarize(study)}
    assert summary["cut"]["events"] > 30 and summary["hike"]["events"] > 30
    assert summary["cut"]["avg_vix_before"] > summary["hike"]["avg_vix_before"]
