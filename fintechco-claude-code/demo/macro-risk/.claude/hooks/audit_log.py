#!/usr/bin/env python3
"""PostToolUse hook: append one JSON line per tool call to .claude/audit/audit.jsonl.

Records who/what/where, never file contents or command output, so the audit log
itself cannot leak secrets or card data. In production the same events go to the
SIEM through Claude Code's OpenTelemetry export (see the enterprise/ folder of the demo kit).
"""
from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

SUMMARY_FIELDS = ("file_path", "notebook_path", "pattern", "path", "url", "description")


def summarize(tool_input: dict) -> dict:
    out = {k: tool_input[k] for k in SUMMARY_FIELDS if isinstance(tool_input.get(k), str)}
    if isinstance(tool_input.get("command"), str):
        out["command"] = tool_input["command"][:200]
    return out


def record(event: dict, now: datetime | None = None) -> dict:
    return {
        "ts": (now or datetime.now(timezone.utc)).isoformat(timespec="seconds"),
        "session": event.get("session_id"),
        "event": event.get("hook_event_name"),
        "tool": event.get("tool_name"),
        "input": summarize(event.get("tool_input") or {}),
        "cwd": event.get("cwd"),
        "user": os.environ.get("USER") or os.environ.get("USERNAME"),
    }


def main() -> int:
    event = json.load(sys.stdin)
    root = Path(os.environ.get("CLAUDE_PROJECT_DIR") or event.get("cwd") or ".")
    log = root / ".claude" / "audit" / "audit.jsonl"
    log.parent.mkdir(parents=True, exist_ok=True)
    with log.open("a", encoding="utf-8") as f:
        f.write(json.dumps(record(event)) + "\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
