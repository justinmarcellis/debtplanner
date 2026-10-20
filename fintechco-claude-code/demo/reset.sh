#!/usr/bin/env bash
# Put every demo repo back to its `start` tag (under 10 seconds). Keeps nothing from the last run.
set -euo pipefail
DEST="${1:-$HOME/fintechco-demo}"
for a in payments-ledger macro-risk sre-ops; do
  git -C "$DEST/$a" checkout -q main
  git -C "$DEST/$a" reset -q --hard start
  git -C "$DEST/$a" clean -qfdx
  echo "reset $a -> $(git -C "$DEST/$a" log --oneline -1)"
done
