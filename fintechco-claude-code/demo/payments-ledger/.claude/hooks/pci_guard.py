#!/usr/bin/env python3
"""PreToolUse hook: block writes that would log or embed a full card number (PAN).

Reads the hook event JSON on stdin. Blocks (exit code 2, reason on stderr, which
Claude Code shows to the model) when the new content of a Write/Edit/MultiEdit,
or the text of a Bash command (shell redirects can write files too):
  1. contains a 13-19 digit number that passes the Luhn check, outside tests/fixtures/, or
  2. passes a PAN-like field (pan, card_number, cardNumber) to a logging or print call.
Everything else exits 0 and the normal permission flow applies.
"""
from __future__ import annotations

import json
import re
import sys

FIXTURES = "tests/fixtures/"
DIGITS = re.compile(r"(?<!\d)(?:\d[ -]?){12,18}\d(?!\d)")
LOGGED_PAN = re.compile(
    r"\b(?:log(?:ger)?|logging|print|console)\.?\w*\s*\(.*\b(?:pan|card_number|cardNumber|card_no)\b",
    re.IGNORECASE,
)


def luhn_ok(number: str) -> bool:
    digits = [int(d) for d in number][::-1]
    total = 0
    for i, d in enumerate(digits):
        if i % 2:
            d *= 2
            if d > 9:
                d -= 9
        total += d
    return total % 10 == 0


def new_text(tool_input: dict) -> str:
    parts = [tool_input.get("content", ""), tool_input.get("new_string", ""), tool_input.get("new_source", "")]
    parts += [e.get("new_string", "") for e in tool_input.get("edits", []) if isinstance(e, dict)]
    return "\n".join(p for p in parts if isinstance(p, str))


def violations(path: str, text: str) -> list[str]:
    found = []
    if FIXTURES not in path.replace("\\", "/"):
        for match in DIGITS.finditer(text):
            number = re.sub(r"[ -]", "", match.group())
            if 13 <= len(number) <= 19 and luhn_ok(number):
                found.append(f"a full card number ending {number[-4:]}")
    for line in text.splitlines():
        if LOGGED_PAN.search(line):
            found.append(f"a log/print of a card number field: `{line.strip()[:80]}`")
    return found


def main() -> int:
    event = json.load(sys.stdin)
    tool = event.get("tool_name")
    tool_input = event.get("tool_input") or {}
    if tool == "Bash":
        path, text = "a shell command", tool_input.get("command", "")
    elif tool in {"Write", "Edit", "MultiEdit", "NotebookEdit"}:
        path = tool_input.get("file_path") or tool_input.get("notebook_path") or ""
        text = new_text(tool_input)
    else:
        return 0
    found = violations(path, text)
    if not found:
        return 0
    print(
        "PCI guard blocked this edit: it would write " + "; ".join(found) + f" in {path}. "
        "FinTechCo policy (PCI DSS): never log or store a PAN. Log the card token or last4 instead; "
        "full test card numbers belong only in tests/fixtures/.",
        file=sys.stderr,
    )
    return 2


if __name__ == "__main__":
    sys.exit(main())
