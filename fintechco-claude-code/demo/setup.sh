#!/usr/bin/env bash
# Build fresh demo repos for the three acts (idempotent).
#   ./setup.sh [DEST]      default DEST=~/fintechco-demo
# Each repo gets two tags: `start` (what the audience sees first) and `complete` (the reference result).
set -euo pipefail
SRC="$(cd "$(dirname "$0")" && pwd)"
DEST="${1:-$HOME/fintechco-demo}"
mkdir -p "$DEST"

fresh() {  # fresh <act-folder>: copy without caches/audit logs and init a repo
  rm -rf "${DEST:?}/$1"
  mkdir -p "$DEST/$1"
  (cd "$SRC/$1" && tar --exclude='__pycache__' --exclude='.pytest_cache' --exclude='.claude/audit' -cf - .) | (cd "$DEST/$1" && tar -xf -)
  git -C "$DEST/$1" init -q -b main
  git -C "$DEST/$1" -c user.name=demo -c user.email=demo@fintechco.example add -A
}
commit() { git -C "$DEST/$1" -c user.name=demo -c user.email=demo@fintechco.example commit -qm "$2"; }

# Act 1: start = shipped code (PAY-1423 bug + PAN log line); complete = reference patches applied.
fresh payments-ledger
commit payments-ledger "payments-ledger service"
git -C "$DEST/payments-ledger" tag start
git -C "$DEST/payments-ledger" checkout -qb reference
(cd "$DEST/payments-ledger" && patch -p1 -s < "$SRC/fallback/act1/PAY-1423.patch" && patch -p1 -s < "$SRC/fallback/act1/pan-logging.patch")
git -C "$DEST/payments-ledger" add -A; commit payments-ledger "PAY-1423: Decimal half-up fees; log card token, not PAN"
git -C "$DEST/payments-ledger" tag complete
git -C "$DEST/payments-ledger" checkout -q main

# Act 2: complete = shipped reference; start = data + fetch helper only.
fresh macro-risk
commit macro-risk "macro-risk: complete reference analysis and dashboard"
git -C "$DEST/macro-risk" tag complete
(cd "$DEST/macro-risk" && git rm -rq analysis/phillips.py analysis/fed_policy_vol.py analysis/report.py analysis/common.py outputs dashboard data/README.md tests/test_analysis.py)
commit macro-risk "start: cached FRED data and fetch helper"
git -C "$DEST/macro-risk" tag start

# Act 3: one state; the expected triage is in fallback/act3/.
fresh sre-ops
commit sre-ops "sre-ops: payment-gateway and INC-2291 bundle"
git -C "$DEST/sre-ops" tag start

# Presenter files next to the repos, so every RUNBOOK path works from any tab.
git -C "$DEST/macro-risk" show complete:dashboard/index.html > "$DEST/dashboard-complete.html"
rm -rf "${DEST:?}/enterprise" "${DEST:?}/fallback"
cp -R "$SRC/enterprise" "$SRC/fallback" "$DEST/"

echo "Demo repos ready in $DEST:"
for a in payments-ledger macro-risk sre-ops; do echo "  $DEST/$a  ($(git -C "$DEST/$a" log --oneline -1))"; done
echo "  $DEST/dashboard-complete.html  (Act 2 fallback; open it in browser tab 2)"
echo "  $DEST/enterprise/  $DEST/fallback/  (governance close and fallbacks)"
echo
echo "Pre-flight:"
command -v claude >/dev/null && echo "  claude: $(claude --version)" || echo "  claude: MISSING  (curl -fsSL https://claude.ai/install.sh | bash)"
python3 -c "import pandas, numpy, pytest; print('  python: pandas', pandas.__version__, '| numpy', numpy.__version__, '| pytest', pytest.__version__)" 2>/dev/null || echo "  python: install pandas numpy pytest  (python3 -m pip install pandas numpy pytest)"
command -v go >/dev/null && echo "  go: $(go version | cut -d' ' -f3) (optional)" || echo "  go: not installed (optional; Act 3 only reads Go code)"
echo "  NEXT: run 'claude' once in each repo and accept the trust prompt, so the repo's allow rules apply."
