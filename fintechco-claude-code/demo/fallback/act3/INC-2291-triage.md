## Summary
Since 14:03 UTC, about 40% of card authorizations in us-east-1 have failed with 503s, and the rest ran at about 1.8 s p50 and about 2.0 s p99 (SEV-2, `alert.json:5-8`). The most likely cause is config commit `7c1e9a2` ("Tune DB pool for cost (copy staging values)"), which cut `DB_MAX_CONNS` from 50 to 5 and exhausted the DB connection pool on all 6 replicas.

## Timeline (UTC)
- **13:12:09**: Deploy `2026.10.14-1`, image only, no config change (`deploy.log:1`).
- **13:30–14:02**: Baseline is healthy. p99 is 105–140 ms, errors are 0.05–0.19%, and `db_pool_in_use` is 14–24 of 50 (`metrics.csv:2-34`).
- **13:54:41–13:55:16**: 5 WARN lines "card network TLS handshake retry", each with `attempt: 2, ok: true`. Latency and errors did not change (`app.log:145-149`).
- **14:02:05**: Deploy `2026.10.14-2` with config commit `7c1e9a2`, status success (`deploy.log:2`). The diff changes `DB_MAX_CONNS=50` to `5` (`config.diff:6-7`).
- **14:02:31**: Rollout complete on 6/6 replicas (`deploy.log:3`). A replica logs `starting db_max_conns=5 acquire_timeout_ms=2000 version 2026.10.14-2` (`app.log:194`).
- **14:02:40**: First "acquire conn timeout" with `wait_ms 2000, in_use 5, max 5` (`app.log:195`). Timeouts continue about every 5–15 s through the end of the log at 14:20:05 (`app.log:309`).
- **14:03**: First bad metrics row: p50 1784 ms, p99 2067 ms, errors 40.1%, `db_pool_in_use 5/5`, `db_pool_waiting 145` (`metrics.csv:35`).
- **14:07**: Alert fires, 3 minutes after the first bad row, on "p99 > 1000 ms AND 5xx > 5%" (`alert.json:4-6`).
- **14:03–14:20**: No recovery. Errors stay at 37–44%, p99 at 2015–2087 ms, waiting at 120–169 (`metrics.csv:35-52`).

## Probable cause
The config change shrank the DB pool by 10x, below what normal traffic needs.

- **Change:** `DB_MAX_CONNS` went from 50 to 5, with `DB_ACQUIRE_TIMEOUT_MS` unchanged at 2000 (`config.diff:6-8`). The commit message says the values were copied from staging, and the deploy log records the change (`deploy.log:2`).
- **The service uses the value directly.** `LoadConfig` reads `DB_MAX_CONNS` (`config.go:30`) and `main.go:69` builds the pool with that size. A request that can't get a slot in 2 s returns a 503 and logs "acquire conn timeout" (`main.go:48-52`).
- **Timing matches.** Pool in-use jumps from 14–24 of 50 to 5 of 5 at the first row after rollout. Waiting goes from 0 to 120–169, p99 from about 120 ms to about 2,050 ms, and errors from about 0.1% to about 40% (`metrics.csv:34-35`).
- **Pool size is below demand.** Baseline in-use peaked at 24 (`metrics.csv:19,23,30`), so a cap of 5 can't carry normal load. The p99 of about 2,000 ms is the acquire timeout (`main.go:48`), and the 40% error rate is requests that timed out.
- **The runbook matches.** It lists "p99 ≈ DB acquire timeout (2 s) with 503s" and pool exhaustion confirmed by `in_use == max` with `waiting > 0` (`runbooks/payment-gateway.md:8,13`). Step 2 says to roll back if a change lowered `DB_MAX_CONNS` (`runbooks/payment-gateway.md:14`).
- **The repo is still at the bad value.** `deploy/config/payment-gateway.env:1` is `DB_MAX_CONNS=5`.

**Confidence: high (about 95%).** The timing, the code path, the runbook and the pool metrics all agree. The remaining uncertainty is that I haven't seen DB-side metrics. I also can't tell from `metrics.csv` whether the pool columns are per replica or aggregate.

## Ruled out
- **Card network:** `card_network_p99_ms` is 189–240 ms in the baseline and 189–229 ms during the incident, so it is unchanged (`metrics.csv`). The runbook sends "latency up, no 503s" to the card network, but here there are 503s with a saturated pool.
- **TLS handshake retries (13:54–13:55):** All 5 succeeded on attempt 2, and p99 stayed about 118 ms (`app.log:145-149`, `metrics.csv:27`). They predate the incident by about 8 minutes and had no effect.
- **Deploy `2026.10.14-1` (13:12):** It was image only with no config change (`deploy.log:1`), and 50 minutes of healthy metrics follow it.
- **Traffic surge:** Requests per second are flat at about 405–435 before and after (`metrics.csv`).
- **Slow queries or DB failover:** Nothing in the evidence shows this. Normal request time is about 40 ms in the simulated code path (`main.go:55`). The failures appear exactly at rollout and match pool size. I can't fully exclude it without DB dashboards.
- **Bad application code in the release:** The service logs 503 acquire timeouts rather than fast 5xx errors, and the only changed input is the config diff.

## Remediation
- **Immediate step (proposed, not executed):** Roll back commit `7c1e9a2` so that `DB_MAX_CONNS=50` is restored (`runbooks/payment-gateway.md:14`) and redeploy.
- **Capacity check:** 6 replicas × 50 = 300 connections, within the ledger DB limit of 400 (`runbooks/payment-gateway.md:15`). Do not scale replicas.
- **Approval:** The runbook requires a change ticket, and the **incident commander** approves the rollback. I haven't changed or restarted anything, per the incident rules.
- **Verify recovery:**
  - `db_pool_in_use` falls back below `db_pool_max`, with `db_pool_waiting` at 0.
  - p99 is under 300 ms and 5xx under 0.5% for 10 minutes (`runbooks/payment-gateway.md:16`).
  - "acquire conn timeout" lines stop and `starting` shows `db_max_conns: 50`.
- **Communications:** Checkout errors have lasted over 10 minutes, so notify merchant support and post updates every 15 minutes (`runbooks/payment-gateway.md:20`).

## Follow-ups
1. Add the CI guard from the runbook that rejects `DB_MAX_CONNS` below the production floor of 20 (`runbooks/payment-gateway.md:17`). `ci/` already has example automation.
2. Stop copying staging values into production config. Require a reviewed, environment-specific diff for pool and timeout settings, and make `LoadConfig` log or reject implausibly low values.
3. Roll out config changes to a canary first, with automatic rollback on pool saturation or 5xx. The rollout reached 6/6 replicas in 26 s (`deploy.log:2-3`) and nothing stopped it.
