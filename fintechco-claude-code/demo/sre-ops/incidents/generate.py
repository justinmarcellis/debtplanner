"""Regenerate the synthetic INC-2291 bundle (deterministic). python incidents/generate.py"""
import json
import random
from datetime import datetime, timedelta, timezone
from pathlib import Path

OUT = Path(__file__).parent / "INC-2291"
T0 = datetime(2026, 10, 14, 13, 30, tzinfo=timezone.utc)
DEPLOY = datetime(2026, 10, 14, 14, 2, 31, tzinfo=timezone.utc)
rng = random.Random(2291)


def iso(t):
    return t.strftime("%Y-%m-%dT%H:%M:%SZ")


def metrics():
    rows = ["minute,requests_per_s,p50_ms,p99_ms,error_rate_pct,db_pool_in_use,db_pool_max,db_pool_waiting,card_network_p99_ms"]
    for m in range(51):
        t = T0 + timedelta(minutes=m)
        after = t >= DEPLOY.replace(second=0) + timedelta(minutes=1)
        rps = 420 + rng.randint(-15, 15)
        if after:
            rows.append(f"{iso(t)},{rps},{rng.randint(1650, 1900)},{rng.randint(2010, 2090)},{rng.uniform(37, 45):.1f},5,5,{rng.randint(120, 170)},{rng.randint(180, 230)}")
        else:
            rows.append(f"{iso(t)},{rps},{rng.randint(55, 70)},{rng.randint(105, 140)},{rng.uniform(0.05, 0.2):.2f},{rng.randint(14, 24)},50,0,{rng.randint(180, 240)}")
    (OUT / "metrics.csv").write_text("\n".join(rows) + "\n")


def logs():
    lines = []
    t = T0
    while t < T0 + timedelta(minutes=50):
        t += timedelta(seconds=rng.randint(4, 15))
        if abs((t - (T0 + timedelta(minutes=25))).total_seconds()) < 20:
            lines.append({"time": iso(t), "level": "WARN", "msg": "card network TLS handshake retry", "attempt": 2, "ok": True})
        elif t >= DEPLOY:
            lines.append({"time": iso(t), "level": "WARN", "msg": "acquire conn timeout", "wait_ms": 2000, "in_use": 5, "max": 5})
        else:
            lines.append({"time": iso(t), "level": "INFO", "msg": "authorized", "latency_ms": rng.randint(45, 130), "card": f"tok_{rng.randint(10**5, 10**6 - 1)}"})
    lines.append({"time": iso(DEPLOY), "level": "INFO", "msg": "starting", "db_max_conns": 5, "acquire_timeout_ms": 2000, "version": "2026.10.14-2"})
    lines.sort(key=lambda r: r["time"])
    (OUT / "app.log").write_text("\n".join(json.dumps(r) for r in lines) + "\n")


def static():
    (OUT / "alert.json").write_text(json.dumps({
        "id": "INC-2291", "service": "payment-gateway", "severity": "SEV-2", "triggered": "2026-10-14T14:07:00Z",
        "condition": "p99 latency > 1000 ms AND 5xx rate > 5% for 3 minutes", "region": "us-east-1",
        "impact": "Card authorizations failing or slow for online checkout",
    }, indent=2) + "\n")
    (OUT / "deploy.log").write_text(
        "2026-10-14T13:12:09Z deploy payment-gateway 2026.10.14-1 image only (no config change) by platform-ci  status=success\n"
        "2026-10-14T14:02:05Z deploy payment-gateway 2026.10.14-2 config commit 7c1e9a2 'Tune DB pool for cost (copy staging values)' by platform-ci  status=success\n"
        "2026-10-14T14:02:31Z payment-gateway rollout complete 6/6 replicas\n")
    (OUT / "config.diff").write_text(
        "diff --git a/deploy/config/payment-gateway.env b/deploy/config/payment-gateway.env\n"
        "index 3b1f2c0..7c1e9a2 100644\n--- a/deploy/config/payment-gateway.env\n+++ b/deploy/config/payment-gateway.env\n"
        "@@ -1,3 +1,3 @@\n-DB_MAX_CONNS=50\n+DB_MAX_CONNS=5\n DB_ACQUIRE_TIMEOUT_MS=2000\n LOG_LEVEL=info\n")


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    metrics(), logs(), static()
    print("wrote", sorted(p.name for p in OUT.iterdir()))
