"""How does equity-market volatility behave around Federal Reserve rate changes?

Events: days the federal funds target changes (DFEDTAR through 2008-12-15, the upper
bound of the target range DFEDTARU afterwards), from 1990 when VIX (VIXCLS) begins.
For each event, the change in VIX from the trading day before to k trading days after.
Caveat: cuts cluster in crises (2001, 2008, 2020), so volatility often drives the cut,
not the reverse. This describes co-movement; it does not identify a policy effect.
"""
from __future__ import annotations

import pandas as pd

import fred
from analysis.common import write_json

HORIZONS = (1, 5, 20)


def target_changes() -> pd.DataFrame:
    target = pd.concat([fred.load_cache("DFEDTAR")["value"], fred.load_cache("DFEDTARU")["value"]]).dropna()
    target = target[~target.index.duplicated(keep="last")].sort_index()
    change = target.diff()
    events = change[change.fillna(0) != 0]
    return pd.DataFrame({"change_pp": events.round(4), "target": target.loc[events.index]})


def event_study(events: pd.DataFrame, vix: pd.Series, horizons=HORIZONS) -> pd.DataFrame:
    vix = vix.dropna()
    rows = []
    for day, ev in events.iterrows():
        pos = vix.index.searchsorted(day)  # first trading day on or after the event
        if pos == 0 or pos + max(horizons) >= len(vix):
            continue
        before = vix.iloc[pos - 1]
        row = {"date": day, "change_pp": ev.change_pp, "direction": "hike" if ev.change_pp > 0 else "cut", "vix_before": before}
        for k in horizons:
            row[f"dvix_{k}d"] = vix.iloc[pos + k - 1] - before
        rows.append(row)
    return pd.DataFrame(rows)


def summarize(study: pd.DataFrame) -> list[dict]:
    out = []
    for direction, part in study.groupby("direction"):
        row = {"direction": direction, "events": len(part), "avg_vix_before": round(part.vix_before.mean(), 2)}
        for k in HORIZONS:
            col = part[f"dvix_{k}d"]
            row[f"mean_dvix_{k}d"] = round(col.mean(), 2)
            row[f"median_dvix_{k}d"] = round(col.median(), 2)
            row[f"share_up_{k}d"] = round((col > 0).mean(), 2)
        out.append(row)
    return out


def run() -> dict:
    vix = fred.load_cache("VIXCLS")["value"]
    events = target_changes()
    events = events[events.index >= vix.dropna().index.min()]
    study = event_study(events, vix)
    result = {
        "events_from": study.date.min(),
        "events_to": study.date.max(),
        "summary": summarize(study),
        "events": study.round({c: 3 for c in study.columns if c.startswith(("dvix", "vix", "change"))}).to_dict(orient="records"),
        "vix_monthly": [{"month": m, "vix": round(v, 2)} for m, v in vix.dropna().resample("MS").mean().items()],
        "target_monthly": [{"month": m, "target": v} for m, v in pd.concat([fred.load_cache("DFEDTAR")["value"], fred.load_cache("DFEDTARU")["value"]]).dropna().resample("MS").last().items()],
    }
    write_json("fed_policy_vol.json", result)
    return result


if __name__ == "__main__":
    for row in run()["summary"]:
        print(row)
