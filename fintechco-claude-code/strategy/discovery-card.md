# Discovery guide (D4)

> Quick card: the in-room version. The full prep document is the file of the same name without `-card`.

Use in the first three minutes (one question to each attendee) and whenever the conversation opens up. Listen for the answer that changes the plan.

## Opening (0:00–0:03)
- **To the CTO:** "Before I start: what would have to be true for you to approve production use of an agentic tool?"
- **To the Head of Digital Transformation:** "Six months from now, what would make this a success you could point to?"
- **Confirm what we heard:** productivity and new products shipped, one tool company-wide within months, safely, with measurable impact.

## How answers change the 40 minutes

| If they say… | Then… |
| --- | --- |
| "Data residency / where our code goes" | Move the deployment slide (Bedrock/Vertex) right after "How it works"; in the demo, name where inference runs |
| "Change management / audit" | In Act 1, dwell on plan mode, the diff, denied push and the audit log; in security, lead with SOX |
| "We need proof it works for teams like ours" | Spend the demo time on Act 1 and Act 2; in ROI lead with the measurement plan, not the dollar figure |
| "Cost" | Show break-even (~1 hour/week) and cost controls; avoid list-price debates |
| "Our data scientists are the priority" | Swap demo order: Act 2 first; mention notebook-to-production (UC-DS-02) |
| "Incidents are killing us" | Keep Act 3 live even if short on time; mention postmortem drafts (UC-SRE-03) |
| "We're piloting Copilot already" | Offer the tool-agnostic evaluation protocol; ask what they measure today |

## Follow-up questions (if time allows, or for the next meeting)
1. Which repositories would you trust for a first pilot? Any cardholder-data environments to keep out?
2. AWS, GCP, or both for inference? Is there an existing Bedrock or Vertex approval?
3. What do you measure today about delivery (DORA metrics, PR cycle time, incident MTTR)?
4. Who signs off on third-party AI risk: CISO, vendor risk, model risk?
5. Which product launches in the next two quarters matter most?
6. How do code review and change approval work today (CODEOWNERS, CAB)?
7. What would make engineers resist this? What happened with the last tool rollout?
8. Who would own the pilot day to day, and who owns the metrics?
