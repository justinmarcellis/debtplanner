# ADR-006: Claims and evidence policy

Status: accepted · Owner: dir-research (A), eng-lead · Date: 2026-10-20

## Why
The CTO is skeptical without proven enterprise adoption. A single unsupported number undermines everything else. The candidate must be able to say where each fact came from.

## The register
`research/claims.json` is an array of claims (contract: `org/contracts/claims.schema.json`). Only Research changes `status`. Other teams cite by id: `[CLM-012]`. While drafting, write `[CLM-?: what needs sourcing]`; Research resolves these into ids or the sentence is cut.

## Source hierarchy (best first)
1. Anthropic official documentation (code.claude.com/docs, docs.claude.com, platform.claude.com), Trust Center, pricing pages.
2. Anthropic official announcements, engineering blog, customer stories on anthropic.com/claude.com.
3. Cloud provider official docs (AWS Bedrock, Google Cloud Vertex AI) for deployment facts.
4. Peer-reviewed or preregistered studies, major industry reports (e.g., DORA), reputable press quoting named sources.
5. Competitors' own official docs for statements about competitors (never blogs or forum posts about them).
Not acceptable: unattributed blog posts, forums, social media screenshots, model recall without a source.

## Status values
- `verified`: the source states the claim as written, accessed in October 2026.
- `partial`: the source supports a narrower version; use the `safeWording` field verbatim.
- `unverified`: not found; may not appear in customer-facing material.
- `refuted`: source contradicts it; record what is true instead.

## Rules for wording
- Product facts are "as of October 2026".
- No superlatives ("best", "most secure", "only") unless a named, dated source says so, and then attribute it ("on SWE-bench Verified, as of …").
- Productivity evidence is presented as mixed where it is mixed (e.g., results that found slowdowns for some developers alongside results that found speedups), followed by "which is why we measure on your work".
- Customer names and quotes only exactly as published by the customer or Anthropic.
- Competitor statements are factual, dated, and fair; no disparagement.
- Prices are list prices with a date and a link; FinTechCo's actual pricing is "to be quoted".

## Addendum (Sprint 0): shards
Parallel tickets cannot share one file, so the register is sharded: each ticket that sources facts writes `research/claims/<shard>.json` inside its reserved id range (`org/contracts/README.md`). `node org/claims.mjs` merges shards into `research/claims.json` and `research/claims.md`; `node org/contracts/validate.mjs` validates shards and checks every `[CLM-###]` cited anywhere in customer-facing folders resolves to a `verified` or `partial` claim.
