# ADR-002: Program inputs and defaults

Status: accepted · Owner: eng-lead · Date: 2026-10-20

The sponsor's instruction was: create every artifact the interview requires, to the exact specification, as a principal applied AI architect, run like the earlier programs. Everything else was left open. Defaults chosen so work can start now; the sponsor can override any of them at a milestone.

| Input | Default | Why |
| --- | --- | --- |
| Budget | $175 total, by sprint in `org/config.json`; replan at 80%, stop at 100% | Sized from fnol-platform actuals (~$0.12 per point) for ~4 sprints of 9 small teams |
| Presenter name | `[Your Name]` placeholder everywhere | Not stated in the brief; one find-and-replace before the interview |
| Deck design system | None; own identity (ADR-001) | One design system exists in the account but none is marked default; nobody available to choose |
| Old slide deck from the brief | Not available (link not included in the PDF) | Deck is original; Release notes say how to port into the provided Google Slides template |
| FRED API key | Not required | Public CSV endpoint works without a key; the code also accepts `FRED_API_KEY` when set |
| Demo machine | Candidate's laptop with Claude Code installed via the brief's curl command, on the $25 API credits | Kit must run there with Python 3.10+, pandas, numpy, pytest |
| Model in the live demo | Claude Sonnet 5.5 by default (speed and cost); Opus 5.5 named as the step-up | Measured in the Sprint 3 dry-run |
| Fictional details | FinTechCo has no logo, no named staff beyond the two roles; service names in the demo are invented | Brief says nothing more; never invent facts presented as FinTechCo's |
| Date anchor | Content is current as of October 2026 | Today is 2026-10-20 |
