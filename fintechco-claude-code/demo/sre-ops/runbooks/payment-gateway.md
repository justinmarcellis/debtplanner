# Runbook: payment-gateway

Owner: Payments SRE · Pager: payments-sre · Dashboards: "payment-gateway / golden signals"

## Symptoms → first checks
| Symptom | Check first | Likely causes |
| --- | --- | --- |
| p99 latency ≈ DB acquire timeout (2 s) with 503s | `db_pool_in_use` vs `db_pool_max`, `db_pool_waiting`; recent deploys and config changes | DB pool exhausted: pool too small, slow queries holding connections, DB failover |
| Latency up, no 503s | `card_network_p99_ms` | Card network or upstream slowness |
| 5xx with fast responses | app errors in logs | Bad release, dependency outage |

## DB pool exhaustion
1. Confirm: `db_pool_in_use == db_pool_max` and `db_pool_waiting > 0` for 2+ minutes.
2. Check the last deploy/config change (`deploy.log`, `git log deploy/config/`). If a change lowered `DB_MAX_CONNS`, **roll back the config** (change ticket required; incident commander approves).
3. If no config change: look for slow queries holding connections (DB dashboard), then scale replicas only after the DB has headroom (max total connections = replicas × `DB_MAX_CONNS`; the ledger DB allows 400).
4. Verify recovery: p99 < 300 ms and 5xx < 0.5% for 10 minutes.
5. Follow-up: add a CI guard that rejects `DB_MAX_CONNS` below the production floor (20).

## Communications
SEV-2: update the incident channel every 15 minutes; notify merchant support if checkout errors exceed 10 minutes.
