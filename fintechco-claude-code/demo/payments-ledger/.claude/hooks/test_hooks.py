"""Unit tests for the demo hooks: python -m pytest .claude/hooks -q"""
import io
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent))
import audit_log  # noqa: E402
import pci_guard  # noqa: E402


def run_guard(monkeypatch, capsys, tool_name, tool_input):
    monkeypatch.setattr(sys, "stdin", io.StringIO(json.dumps({"tool_name": tool_name, "tool_input": tool_input})))
    code = pci_guard.main()
    return code, capsys.readouterr().err


def test_luhn():
    assert pci_guard.luhn_ok("4242424242424242")
    assert not pci_guard.luhn_ok("4242424242424241")


def test_blocks_literal_pan_outside_fixtures(monkeypatch, capsys):
    code, err = run_guard(monkeypatch, capsys, "Write", {"file_path": "ledger/debug.py", "content": "PAN = '4242 4242 4242 4242'\n"})
    assert code == 2 and "ending 4242" in err and "PCI" in err


def test_allows_test_pans_in_fixtures(monkeypatch, capsys):
    code, _ = run_guard(monkeypatch, capsys, "Write", {"file_path": "tests/fixtures/more.py", "content": "X = '5555555555554444'\n"})
    assert code == 0


def test_blocks_logging_a_pan_field(monkeypatch, capsys):
    edit = {"file_path": "ledger/settlement.py", "old_string": "x", "new_string": '    log.debug("card %s", txn.card.pan)\n'}
    code, err = run_guard(monkeypatch, capsys, "Edit", edit)
    assert code == 2 and "log/print of a card number field" in err


def test_blocks_multiedit(monkeypatch, capsys):
    edits = {"file_path": "a.py", "edits": [{"old_string": "a", "new_string": "print(card_number)"}]}
    assert run_guard(monkeypatch, capsys, "MultiEdit", edits)[0] == 2


@pytest.mark.parametrize("content", ["fee = Decimal('0.74')\n", "order_id = 1234567890\n", "log.debug('card=%s', txn.card.token)\n"])
def test_allows_ordinary_code(monkeypatch, capsys, content):
    assert run_guard(monkeypatch, capsys, "Write", {"file_path": "ledger/x.py", "content": content})[0] == 0


def test_blocks_pan_written_through_bash(monkeypatch, capsys):
    # Found in the headless verification: a shell redirect bypassed the file-edit matcher.
    code, err = run_guard(monkeypatch, capsys, "Bash", {"command": "printf \"PAN = '4242424242424242'\" > notes/debug.py"})
    assert code == 2 and "ending 4242" in err


def test_allows_ordinary_bash(monkeypatch, capsys):
    assert run_guard(monkeypatch, capsys, "Bash", {"command": "python3 -m pytest -q"})[0] == 0


def test_ignores_read_only_tools(monkeypatch, capsys):
    assert run_guard(monkeypatch, capsys, "Read", {"file_path": "tests/fixtures/cards.py"})[0] == 0


def test_audit_record_never_contains_content():
    event = {"session_id": "s1", "hook_event_name": "PostToolUse", "tool_name": "Write",
             "tool_input": {"file_path": "a.py", "content": "secret 4242424242424242"}, "cwd": "/repo"}
    rec = audit_log.record(event, now=datetime(2026, 10, 20, tzinfo=timezone.utc))
    assert rec["input"] == {"file_path": "a.py"} and "secret" not in json.dumps(rec)
    assert rec["ts"] == "2026-10-20T00:00:00+00:00"


def test_audit_appends_jsonl(monkeypatch, tmp_path):
    monkeypatch.setenv("CLAUDE_PROJECT_DIR", str(tmp_path))
    for _ in range(2):
        monkeypatch.setattr(sys, "stdin", io.StringIO(json.dumps({"tool_name": "Read", "tool_input": {"file_path": "x"}})))
        assert audit_log.main() == 0
    lines = (tmp_path / ".claude" / "audit" / "audit.jsonl").read_text().splitlines()
    assert len(lines) == 2 and json.loads(lines[0])["tool"] == "Read"
