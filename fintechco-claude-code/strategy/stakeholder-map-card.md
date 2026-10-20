# Stakeholder map and meeting plan (D4)

> Quick card: the in-room version. The full prep document is the file of the same name without `-card`.

**The ask (ADR-005):** the CTO opens a security review with us; the Head of Digital Transformation names a pilot cohort across all three teams and a metrics owner; together we set a kickoff date. Success in the room: both agree, and the CTO's top concern has an owner.

## The two people in the room

| | Chief Technology Officer | Head of Digital Transformation |
| --- | --- | --- |
| What they want | Productivity without new risk; a decision they can defend to the board, audit and regulators | Proof that modern tools lift productivity, and a rollout they can lead |
| What they fear | Data leaving the bank, an unreviewable change process, a vendor fad that does not hold up | A pilot that stalls in security review; adoption that fizzles; no numbers to show |
| Must hear | Runs in our own AWS/GCP accounts; central policy developers can't override; audit trail into the SIEM; humans approve every merge | A measured path from pilot to all 180 people in about four months, with owners |
| Proof they need | Controls shown live (demo), Trust Center reports, named enterprise users, a threat model | A metrics framework with baselines, a modest ROI with break-even, a pilot charter |
| How to engage | Ask for their top concern up front and answer it by name; invite challenge; don't oversell | Give them the artifacts to carry: charter, scorecard, calculator; credit their advocacy |
| Signals to watch | Questions about data flow, retention, change management → go to the security section early | Questions about timing and cohorts → spend more time on the evaluation plan |

**Dynamics:** the champion is a dotted-line leader of engineering, so the CTO holds the decision. Never let the champion's enthusiasm answer the CTO's questions; answer them ourselves with evidence.

## People not in the room who will shape the decision

| Stakeholder | Their question | How the champion carries the answer |
| --- | --- | --- |
| CISO / security architecture | Where does data go, what can the agent touch, how do we audit it? | `security/security-brief.md`, `security/threat-model.md`, the governance pack in the demo kit |
| Risk and compliance, Internal Audit | Does this fit PCI DSS, SOX change management, GLBA, NYDFS? | The obligations table in the security brief; humans approve merges; attribution on commits |
| Model risk (SR 11-7) | Does AI-written code change model validation? | No: Claude Code is a development tool; validation is unchanged; measure time to validated model |
| Engineering managers | Will this slow reviews or deskill juniors? | Metrics guardrails (review depth, MET-11 skills); pilot cohort design |
| Procurement and Finance | What does it cost, and how is it controlled? | ROI calculator, cost per active user (MET-14), cloud budgets on Bedrock/Vertex [CLM-620] |

## Three win themes
1. **Finished, tested work, not autocomplete.** An agent that plans, uses FinTechCo's tools and verifies with tests [CLM-001] [CLM-003], behind a permission check FinTechCo's policy sets [CLM-606].
2. **Under FinTechCo's control.** Their cloud accounts, their policy, their audit trail [CLM-614] [CLM-675] [CLM-612].
3. **Proven on FinTechCo's own work.** Measure every tool the same way; decide on evidence in eight weeks.

## Risks to the meeting
| Risk | Mitigation |
| --- | --- |
| Demo fails live | Fallback for every step; checkpoints; never debug live (`demo/RUNBOOK.md`) |
| CTO derails into security early | Welcome it: move the security section forward; the demo already showed controls |
| Productivity claims challenged | Present mixed evidence first, then the measurement plan [CLM-650] [CLM-623] |
| "We already have Copilot" | Agree to measure both the same way; note Claude is available inside Copilot too [CLM-628] |
| Running long | Cut list at each checkpoint; wrap starts by 0:37 whatever remains |
