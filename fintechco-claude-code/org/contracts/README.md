# Cross-team data contracts

Four JSON files carry the facts, use cases and numbers that more than one team uses. The owner writes them; everyone else cites ids. Ids are stable once published: retire an entry by setting `"retired": true`, never by reusing its id.

| File | Owner | Id format | Consumed by |
| --- | --- | --- | --- |
| `research/claims.json` | research | `CLM-001` | everyone (ADR-006) |
| `strategy/use-cases.json` | strategy | `UC-SWE-01`, `UC-DS-01`, `UC-SRE-01`, `UC-X-01` (cross-team) | narrative, adoption, value, demo |
| `value/metrics.json` | value | `MET-01` | narrative, adoption |
| `value/roi-assumptions.json` | value | `ASM-01` | narrative (ROI slide), calculator |

Schemas: `claims.schema.json`, `use-cases.schema.json`, `metrics.schema.json`, `roi-assumptions.schema.json` in this folder. Validate with `node org/contracts/validate.mjs`.

## Claim shards and id ranges
Tickets that source facts write their own shard, `research/claims/<shard>.json` (an array in the claims schema), using only their id range. `node org/claims.mjs` merges shards into `research/claims.json` and `research/claims.md`; never edit the merged files by hand. Writing your own shard is allowed for any team's ticket that lists it in `paths`; only Research changes the `status` of another shard's claim (Sprint 3 fact-check).

| Range | Shard (suggested name) | Topic |
| --- | --- | --- |
| CLM-001–099 | `product.json` | Claude Code capabilities, surfaces, models |
| CLM-100–199 | `competitive.json` | Competitors (from their official docs) |
| CLM-200–299 | `proof-points.json` | Customer stories, adoption, productivity evidence |
| CLM-300–399 | `pricing-deployment.json` | Pricing, packaging, Bedrock/Vertex/Foundry deployment |
| CLM-400–449 | `trust-brief.json` | Data handling, certifications, controls, regulation |
| CLM-450–499 | `trust-threats.json` | Threat model sources |
| CLM-500–529 | `demo-fred.json` | FRED series and data facts |
| CLM-530–559 | `demo-claude-code.json` | Settings, hooks, permissions, env vars used in the demo |
| CLM-560–599 | `value.json` | Metrics and ROI evidence (salaries, studies) |
| CLM-600–649 | `strategy.json` | Strategy and objection-handling sources |
| CLM-650–699 | `adoption.json` | Evaluation and rollout sources |
| CLM-700–799 | `factcheck.json` | Sprint 3 fact-check additions |

Until a contract file exists, consumers write placeholders (`[CLM-?: …]`, `[UC-?: …]`, `[MET-?: …]`) and post a `request` to the owner's hub. Placeholders are resolved in Sprint 2 integration and must be gone by release.
