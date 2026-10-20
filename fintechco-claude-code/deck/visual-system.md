# Deck visual system and slide-kind templates

**Executive summary**
1. One look for the whole deck: night opens, divides and closes; paper carries every content slide; teal is the only accent; amber appears only as a chip, pill or panel with ink text; three typefaces; five type sizes; every size at 24px or more.
2. Ten one-slide templates live in `deck/templates/` (eight kinds plus two named diagrams). Sprint 2 copies one to `deck/project/slides/<id>.html` and replaces the slots listed in its leading comment; the kind names are the contract with S1-NAR-01.
3. Every template stays inside the closed Slides subset (`format.md`) and was checked three ways: the ticket's grep commands, a throwaway lint, and a text-fit measurement with the real font files. Results are in section 12. No slide builder was available, so the real build has not run (section 13).

Ticket S1-NAR-02 · owner ic-narrative-slide-designer · serves REQ-12 (layered explanations for mixed technical levels) and REQ-25 (an original deck, not a copy of the old one) · look from ADR-001, enterprise pack from ADR-004, claims rules from ADR-006 · format rules from the Slides references (`format.md`, `layout.md`, `styles.md`, `craft.md`, `fonts.md`, `diagrams.md`, `diagram-recipes.md`) · date 2026-10-20.

## 1. Palette

Eight colours, nothing else. A hex that is not in this table is a defect, and `rgba()` is allowed only as one of these colours with an alpha.

| Token | Hex | Role | As text | As fill or stroke |
| --- | --- | --- | --- | --- |
| Ink | `#1B1F24` | Headings and primary text on paper; the only text colour on amber and on hairline fills | yes, on paper, amber, hairline | gate outline only |
| Paper | `#F6F4EF` | Background of every content slide; node fill in diagrams | yes, on night (secondary lines at 80% alpha) and on teal fills | yes |
| Night | `#13202B` | Background of cover, section and closing; dark node fill (Claude Code box, source and destination boxes) | no | yes |
| Slate | `#4A5560` | Secondary text on paper: sentences under a heading, subtitles, footers; tool-box strokes and dashed control lines | yes, on paper and hairline | strokes only |
| Hairline | `#E2DED5` | Rules, card borders, table header band, stack-tag chips, annotation fills, the diagram region tint (40% alpha) | never | yes |
| Teal | `#1F6F6B` | Accent on paper only: eyebrows, big numbers, lead-ins, request-path arrows, box strokes | yes, on paper only | yes |
| Teal light | `#4FB3A9` | Accent on night only: numerals, eyebrows, short rules, column labels | yes, on night only | yes |
| Amber | `#D9952B` | One job: a chip, pill or panel with ink text inside it | never | yes, always with ink text on it |

Alpha uses that exist today: paper at 0.8 for secondary lines on night; paper at 0.2 for hairlines on night; hairline at 0.4 for the diagram region tint (written as `fill` plus `fill-opacity` in the svg).

### Contrast pairs (WCAG 2.x relative luminance, recomputed for this ticket)

Allowed combinations. Body text needs 4.5:1; display text 3:1.

| Foreground on background | Ratio | Where it is used | ADR-001 states |
| --- | --- | --- | --- |
| Ink on paper | 15.07 | headings, body | not stated |
| Slate on paper | 6.92 | secondary text, footers | 6.9 |
| Teal on paper | 5.39 | eyebrows, numbers, lead-ins | 5.4 |
| Paper on night | 15.05 | titles and text on night | 15 |
| Teal light on night | 6.58 | numerals, eyebrows on night | not stated |
| Paper at 80% on night | 10.06 | subtitles and notes on night | not stated |
| Ink on amber | 6.53 | chips, pill, amber statement panel | 6.7 |
| Ink on hairline | 12.34 | stack tags, annotation boxes | not stated |
| Slate on hairline | 5.67 | subtitles inside the Policy, Audit and Identity boxes | not stated |
| Paper on teal | 5.39 | filled teal chip (not used today; allowed) | not stated |
| Teal on the 40% hairline tint over paper | 4.98 | diagram region label | not stated |

Forbidden combinations (never ship):

| Combination | Ratio | Why |
| --- | --- | --- |
| Slate on night | 2.17 | unreadable; forbidden by this ticket's palette rule |
| Teal `#1F6F6B` on night | 2.79 | unreadable; forbidden by this ticket's palette rule; use teal light on night |
| Teal light on paper | 2.29 | unreadable; use teal on paper |
| Teal on a hairline fill | 4.41 | below 4.5 for body text |
| Paper on amber | 2.31 | amber always carries ink |
| Slate on amber | 3.00 | amber always carries ink |
| Teal on amber | 2.34 | amber always carries ink |
| Ink on night | 1.00 | invisible |
| Hairline, in any text role | 1.22 on paper | hairline is a line and a quiet fill, never a letter |

Amber as a text colour is not used by rule (ADR-001: "always with ink text on it"), and amber never fills a whole slide. Colour is never the only signal: every path, status or choice also has words (the deployment diagram carries a one-line legend, the gate says "5 Ask permission").

ADR-001 gives ink on amber as 6.7:1. Recomputing with the WCAG formula gives 6.53:1. Both clear 4.5:1, the ADR is not edited here, and the 6.53 figure is what this document relies on.

## 2. Typography

| Role | Face | `font-family` value to copy exactly |
| --- | --- | --- |
| Display | Source Serif 4 | `'Source Serif 4', Georgia, serif` |
| Text | IBM Plex Sans | `'IBM Plex Sans', Arial, sans-serif` |
| Code | JetBrains Mono | `'JetBrains Mono', 'Courier New', monospace` |

Three families, each with a basic face and a generic, as `fonts.md` requires. The deck head (not a slide file) carries one stylesheet link, which Sprint 2 adds once: `https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600&family=IBM+Plex+Sans:wght@400;600;700&family=JetBrains+Mono:wght@400&display=swap` (IBM Plex Sans 700 is what `<b>` renders; headings and lead-ins use 600).

### Type scale: five sizes, no others

| Size | Role | Face | Weight | Line height | Used for |
| --- | --- | --- | --- | --- | --- |
| 160px | Display numeral | Source Serif 4 | 600 | 1 | section numeral; statement number |
| 96px | Display | Source Serif 4 | 600 | 1.1 (1 for numbers) | cover, section and closing titles; statement sentence; card number |
| 64px | Heading | Source Serif 4 | 600 | 1.15 | the `h2` title on every content kind |
| 28px | Body | IBM Plex Sans | 400; 600 for lead-ins and labels | 1.3 to 1.4 | sentences, compare and table cells, card text, closing rows, cover subtitle |
| 24px | Label | IBM Plex Sans 600 (eyebrow, uppercase, 3px tracking) or 400 (footer, diagram labels); chips 600; JetBrains Mono 400 for stack tags | see left | 1.2 (eyebrow, footer, chips, tags) to 1.4 (diagram labels) | eyebrow, footer, diagram labels, chips, mono tags |

Rules: nothing under 24px, ever (format.md does not check it; the lint does). Headings set `font-size` and `font-weight` themselves because `h1` to `h3` never inherit them. Letter-spacing is in px, never em. Typographic apostrophes and quotes (’ “ ”) in anything people read; straight quotes only in code. Uppercase and tracking belong to the eyebrow and to column labels only.

## 3. Layout grid

Canvas 1920 by 1080. Margins 128px on every side, so the content width is 1664px.

| Family | Section padding | Flow area | Pinned elements |
| --- | --- | --- | --- |
| Night kinds: cover, section, closing | `128px` | y 128 to 952 | none |
| Content kinds: statement, compare, table, diagram, cards, diagram-how-it-works, diagram-deployment | `128px 128px 160px` | y 128 to 920 (792px) | exactly one footer |

**Footer rule.** One pinned `p`, 24px slate, `left:128px; bottom:64px; width:1664px`, text `Source: [CLM-?: source]` until Research supplies ids. It ends at y 1016. Nothing else is pinned to the slide, and nothing pinned ends below y 920 or past left + width 1792.

**Header block, identical on the seven content files.** Eyebrow at top 128 (24px, line height 1.2, so 28.8px), a 12px gap, then the `h2` at top 168.8 (64px, line height 1.15, so 73.6px). The block ends at y 242.4; a 32px gap puts the body at y 274.4, which leaves 645.6px above the 920 line. Titles are one line (44 characters or fewer). The section style, the header `div`, the eyebrow and the `h2` are the same strings in all seven files, so the heading does not move when the viewer flips from slide to slide.

**Body budgets inside the 645.6px:** compare grid 632 (56 header + 4 rows of 112 + 4 gaps of 32); table 523 for header plus 5 single-line rows at 28px with 24px cell padding (3 wrapped cells at most: 641); cards row 520; diagram host 640; statement fills the space and centres its sentence.

**Measure.** Body prose is 800 to 1000px wide (cover subtitle 960, number caption 960, closing action 960). Display lines run wider (cover title 1400, statement sentence 1500) because they are 96px. Cell and card text follows the column.

**Spacing tokens.** 12px (header gap, card inner gap), 32px (between blocks, between cards, grid gap), 40px card padding. Radii: 16px boxes, cards and panels; 12px small tool boxes; 8px stack tags; pill for chips and the gate. Repeated elements are equal in size and gap: three cards of one style string, three closing rows of 120px, five tool boxes of 64px.

**Rhythm.** Night for cover, section and closing; paper for everything else; at most one amber statement panel in the deck. `data-transition="fade"` on every slide.

**Deliberately unused:** images, icons, shadows, gradients, `x-shape`, lists and `x-embed`. The look is typography, hairlines and flat colour, which exports cleanly to .pptx, PDF and Google Slides.

### Style strings to copy (so Sprint 2 never retypes them)

```
content section : background:#F6F4EF; padding:128px 128px 160px; display:flex; flex-direction:column; gap:32px; font-family:'IBM Plex Sans', Arial, sans-serif; font-size:28px; color:#1B1F24
night section   : background:#13202B; padding:128px; ... color:#F6F4EF   (closing: flex column, gap:32px)
eyebrow (paper) : font-family:'IBM Plex Sans', Arial, sans-serif; font-size:24px; font-weight:600; line-height:1.2; letter-spacing:3px; text-transform:uppercase; color:#1F6F6B
eyebrow (night) : same, color:#4FB3A9
h2              : font-family:'Source Serif 4', Georgia, serif; font-size:64px; font-weight:600; line-height:1.15; color:#1B1F24
footer          : position:absolute; left:128px; bottom:64px; width:1664px; font-family:'IBM Plex Sans', Arial, sans-serif; font-size:24px; line-height:1.2; color:#4A5560
amber chip      : background:#D9952B; color:#1B1F24; font-size:24px; font-weight:600; border-radius:32px; text-align:center
stack tag       : font-family:'JetBrains Mono', 'Courier New', monospace; font-size:24px; line-height:1.2; padding:8px 16px; border-radius:8px; background:#E2DED5; color:#1B1F24
request arrow   : x-connector, style="color:#1F6F6B; border-width:3px"
control line    : x-connector head="none", style="color:#4A5560; border-width:3px; border-style:dashed"
```

## 4. Catalog of kinds

The eight kind names plus the two diagram variants are the contract with S1-NAR-01. In `deck/slide-spec.md` a diagram slide names its variant: `diagram (diagram-how-it-works)`, `diagram (diagram-deployment)` or `diagram (generic: ...)`. A ninth kind is a request to the narrative hub, not a local invention.

| Kind | File | Use | Content limits | Background |
| --- | --- | --- | --- | --- |
| cover | `deck/templates/cover.html` | Slide 1: title, subtitle, "Prepared by [Your Name], independent preparation", own-work line | Title 40 characters or fewer on 2 lines at most; subtitle 90 characters or fewer; no logo or image | night |
| section | `deck/templates/section.html` | Opens a numbered part; the one-sentence description lives in `data-section` | 2-digit numeral; title 28 characters or fewer on one line; description 140 characters or fewer; nothing else on the slide | night |
| statement | `deck/templates/statement.html` | One idea or one number the room must remember | Sentence 18 words or fewer and 4 lines or fewer at 96px; or a number of 6 characters or fewer with a caption of 90 characters or fewer | paper (one amber panel variant per deck) |
| compare | `deck/templates/compare.html` | Two options on the same 3 or 4 questions | 3 or 4 rows; each cell is a lead-in of 24 characters or fewer plus one line of 60 characters or fewer; same lead-ins in both columns | paper |
| table | `deck/templates/table.html` | A small grid read across | 4 columns, header plus 5 rows, 28px; one line per cell; at most 3 cells wrap; `width:N%` on every first-row cell, summing to 100 | paper |
| diagram | `deck/templates/diagram.html` | Any generic pinned diagram (flow, fan-out, timeline, request path) | Host 1664 by 640; 8 boxes or fewer; 24px labels; 24 pinned children or fewer in the host | paper |
| cards | `deck/templates/cards.html` | Three parallel items (four allowed) with number, label, two lines and a mono stack tag | Label 26 characters or fewer (19 at four cards); body exactly 2 lines; tag 28 characters or fewer (20 at four) | paper |
| closing | `deck/templates/closing.html` | The ask: three owner / action / date rows, a top-concern strip and a follow-up line | Exactly 3 rows of 120px; action 2 lines or fewer; dates as `[date]` until agreed in the room | night |
| diagram-how-it-works | `deck/templates/diagram-how-it-works.html` | The agent loop inside the developer's environment, with the permission gate | Labels and loop order fixed; subtitles one line; 19 pinned children | paper |
| diagram-deployment | `deck/templates/diagram-deployment.html` | Laptop and CI, Claude Code, Amazon Bedrock and Google Cloud Vertex AI, with Policy, Audit and Identity | Nouns only on data-boundary labels; 21 pinned children | paper |

Per-kind notes that do not fit a cell:
- **statement, number form.** Replace the sentence block with a 160px serif number (teal, line height 1) and a 28px slate caption of 960px width, in a centred column with an 8px gap. The exact markup is in the comment of `statement.html`.
- **compare with 3 rows.** Change `grid-template-rows` to `56px repeat(3, 112px)`. Never mix 3 rows in one column and 4 in the other.
- **table.** Padding is set once, on the first header cell (format.md allows one value per table); a metric id placeholder `[MET-?: ...]` goes in a cell until `value/metrics.json` exists. For a longer table, split the slide; do not drop below 28px (24px is the floor).
- **cards with four.** Copy the last card, keep `gap:32px` and `flex:1`; each card is 392px wide, so shorten the text to the limits in the catalog. Five or more cards: split the slide.
- **diagram, generic.** The sample shows a fan-out and a join. A timeline or request path reuses the same host, svg underlay, pinned labels and node-list comment (section 6); the evaluation-timeline slide draws bars and a gate in the svg and writes every word as a `p`.
- **closing.** The top-concern strip is filled in live; a row that needs a second date writes it into the action text as `[date]`.

## 5. The amber statement variant

Amber is for the one sentence the CTO must leave with (the storyline decides which slide). The slide stays on paper and keeps the teal eyebrow and ink `h2`; only the sentence sits on an amber panel, in ink. Replace the sentence block in `statement.html` with:

```html
<div style="flex:1; display:flex; flex-direction:column; justify-content:center">
  <div style="width:1664px; padding:64px; border-radius:16px; background:#D9952B; color:#1B1F24">
    <p style="font-family:'Source Serif 4', Georgia, serif; font-size:96px; font-weight:600; line-height:1.1; color:#1B1F24">One sentence of 18 words or fewer.</p>
  </div>
</div>
```

Rules: once per deck at most; the panel text is ink and nothing else (ink on amber is 6.53:1); sentence limit and line limit as in the catalog (3 lines at 96px in the 1536px inner width is 445px of panel, 4 lines is 550px, both inside the 645.6px budget); never an amber slide background; the panel belongs to the statement kind only (the other amber uses are chips and the gate pill, each with ink text, for example the `[date]` chips on the night closing slide). A scratch copy of `statement.html` with this panel (and one with the number form) passed the same grep, palette, amber-ink and fit checks as the template (section 12).

## 6. Diagram construction rules

These apply to `diagram.html`, `diagram-how-it-works.html` and `diagram-deployment.html`, and to every diagram Sprint 2 draws from them.

1. **Host.** One `div` with `position:relative; width:1664px; height:640px` as the body of a content slide. It is 640, not the 700 in `diagrams.md`: the 700px host in that reference assumes a bare title, and this deck puts an eyebrow above every title (header block ends at y 242.4, body budget 645.6px).
2. **Artwork is one inline svg, listed first.** `width` and `height` equal the `viewBox` (`0 0 1664 640`), at most 52 KB (the three files are 0.7, 1.6 and 1.1 KB), no `<text>`, no comments inside, no `xmlns`, no URLs, palette hexes only, shapes only (`rect`). A box that touches the host edge is drawn inset by half its stroke so the outer edge equals the listed box. Give the svg an `aria-label` saying what it shows.
3. **Every word is a pinned `p` over the artwork.** Fonts do not load inside an svg. Each node label has the same `left`, `top`, `width`, `height` as its box, 24px text, line height 1.4, a bold label line, `<br>`, and one subtitle line. With two lines (67.2px) the vertical padding is (box height − 67.2) / 2. Subtitle colour: slate on paper, paper at 80% on night, ink on amber.
4. **Write the node list first.** A comment above the host lists `id left top width height label`, then the edge midpoints used and any bus points (`BUS name x y`). Connectors are written after, copying numbers from that list; none is "about there".
5. **Connectors.** `x-connector` elements, straight. Endpoints are edge midpoints (`left + width/2, top`; `left + width, top + height/2`; and so on) or listed bus points. The one `hv` is the join recipe (two sources into one target). No `elbow`. Heads only on the arriving end. 3px strokes; solid teal is the request path, dashed slate (`border-style:dashed`, `head="none"`) is a control or governance link. Endpoints sit at least 8px inside the host's top and left edges (2.2 x stroke + 1).
6. **Order inside the host:** svg, connectors, then labels, so words paint on top and a screen reader hears the boxes in reading order. Number sequential steps in their label text.
7. **Spacing.** Boxes are 200px wide or more at 24px text (smallest in the set: 300px), at least 32px apart (smallest gap: 46px), at least 32px inside a region frame, the same size for the same kind of node, and the lowest row ends below y 600 (all three end at 608). A label that is not a box label (legend, caption, region title) keeps 8px or more from every line and box.
8. **Recipes in use** (`diagram-recipes.md`): fan-out and join buses with the bar at the midpoint between the columns; a bus under a parent with the bar at (children top − 24) and stubs into each child; a four-node loop with a straight return arrow.
9. **The gate.** The permission step is an amber pill on the arrow from Plan to Act, numbered 5, with ink text and its own subtitle. The arrow runs into the pill and out of it, 60px from each neighbour, and the pill is shaped and coloured unlike the four rectangular loop steps. The loop has four numbered steps (1 Understand, 2 Plan, 3 Act with tools, 4 Verify); the straight return arrow on the left goes from 4 to 1 and never touches the gate, so the gate is a control on the step into Act, not a fifth step.
10. **Budget.** At most 24 pinned children in the host, counting the svg, every connector and every `p`. The three files use 14, 19 and 21. If a diagram needs more, pin everything to the section instead (`diagram-recipes.md`, "More than 24 pinned elements") or split the slide; do not shrink text.
11. **Claim-bearing labels.** Data boundary, residency, certification and availability wording is a neutral noun phrase ("FinTechCo AWS account", "managed settings"), never a verb phrase ("stays in", "never leaves"). Each such label has an HTML comment of the form `[CLM-?: ...] Trust review required before use`. Product behaviour in subtitles (search, plan, edit, run, permission prompt) carries a placeholder in the comment and a source line in the footer until Research supplies ids.
12. **Deployment annotations match ADR-004's enterprise pack.** Policy is `demo/enterprise/managed-settings.json`; Audit is the hook audit log plus `demo/enterprise/otel.env.example`; the two cloud routes are `demo/enterprise/bedrock.env.example` and `demo/enterprise/vertex.env.example`; Identity is cloud IAM and SSO from the pack README. When `demo/enterprise/` lands, re-check the names; the labels themselves stay nouns.

## 7. Geometry audit

Generated from the files by a script that reads each node-list comment, connector and label. Every connector endpoint below is matched to a listed box edge midpoint or a listed bus point, and none is unmatched.

#### diagram.html

| Node | left | top | width | height | right | bottom | label |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| SRC | 0 | 244 | 360 | 160 | 360 | 404 | Pilot cohort |
| T1 | 640 | 40 | 384 | 120 | 1024 | 160 | Software engineers |
| T2 | 640 | 264 | 384 | 120 | 1024 | 384 | Data scientists |
| T3 | 640 | 488 | 384 | 120 | 1024 | 608 | Site reliability engineers |
| DST | 1304 | 244 | 360 | 160 | 1664 | 404 | One scorecard |

| Connector | from | to | route | head | line | endpoints on |
| --- | --- | --- | --- | --- | --- | --- |
| c1 | (360,324) | (640,324) | straight | end | solid teal 3px | SRC right; T2 left |
| c2 | (500,100) | (500,548) | straight | none | solid teal 3px | bus fanTop; bus fanBottom |
| c3 | (500,100) | (640,100) | straight | end | solid teal 3px | bus fanTop; T1 left |
| c4 | (500,548) | (640,548) | straight | end | solid teal 3px | bus fanBottom; T3 left |
| c5 | (1024,100) | (1164,100) | straight | none | solid teal 3px | T1 right; bus joinTop |
| c6 | (1024,548) | (1164,548) | straight | none | solid teal 3px | T3 right; bus joinBottom |
| c7 | (1164,100) | (1164,548) | straight | none | solid teal 3px | bus joinTop; bus joinBottom |
| c8 | (1024,324) | (1304,324) | straight | end | solid teal 3px | T2 right; DST left |

Summary: host 1664x640; pinned children 14 (svg 1 + connectors 8 + labels 5) of 24 allowed; svg 682 bytes (limit 53248), width and height equal viewBox 0 0 1664 640, 0 text elements; widest-to-narrowest box 384 to 360 px (minimum 200); smallest gap between boxes 104 px (T1 to T2); lowest box bottom 608 px.

#### diagram-how-it-works.html

| Node | left | top | width | height | right | bottom | label |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| REGION | 0 | 0 | 1664 | 640 | 1664 | 640 | Developer's environment (dashed frame, label text "Developer’s environment") |
| U | 48 | 104 | 420 | 144 | 468 | 248 | 1 Understand / Search code, read files |
| P | 668 | 104 | 420 | 144 | 1088 | 248 | 2 Plan / Steps drafted before edits |
| A | 668 | 464 | 420 | 144 | 1088 | 608 | 3 Act with tools / Edit files, run commands |
| V | 48 | 464 | 420 | 144 | 468 | 608 | 4 Verify / Run tests, review the diff |
| G | 728 | 308 | 300 | 96 | 1028 | 404 | 5 Ask permission / Approve or deny (gate pill on the P to A step; not a loop step) |
| T1 | 1208 | 104 | 408 | 64 | 1616 | 168 | Repo |
| T2 | 1208 | 214 | 408 | 64 | 1616 | 278 | Terminal |
| T3 | 1208 | 324 | 408 | 64 | 1616 | 388 | Tests |
| T4 | 1208 | 434 | 408 | 64 | 1616 | 498 | Git |
| T5 | 1208 | 544 | 408 | 64 | 1616 | 608 | Cloud CLIs |

| Connector | from | to | route | head | line | endpoints on |
| --- | --- | --- | --- | --- | --- | --- |
| c1 | (468,176) | (668,176) | straight | end | solid teal 3px | U right; P left |
| c2 | (878,248) | (878,308) | straight | none | solid teal 3px | P bottom; G top |
| c3 | (878,404) | (878,464) | straight | end | solid teal 3px | G bottom; A top |
| c4 | (668,536) | (468,536) | straight | end | solid teal 3px | A left; V right |
| c5 | (258,464) | (258,248) | straight | end | solid teal 3px | V top; U bottom |

Summary: host 1664x640; pinned children 19 (svg 1 + connectors 5 + labels 13) of 24 allowed; svg 1556 bytes (limit 53248), width and height equal viewBox 0 0 1664 640, 0 text elements; widest-to-narrowest box 420 to 300 px (minimum 200); smallest gap between boxes 46 px (T1 to T2); lowest box bottom 608 px.

#### diagram-deployment.html

| Node | left | top | width | height | right | bottom | label |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| L | 0 | 0 | 400 | 136 | 400 | 136 | Laptop / Developer terminal or IDE |
| CI | 0 | 232 | 400 | 136 | 400 | 368 | CI / Automated pipeline job |
| CC | 624 | 100 | 416 | 168 | 1040 | 268 | Claude Code / Agent in your environment |
| BR | 1264 | 0 | 400 | 136 | 1664 | 136 | Amazon Bedrock / FinTechCo AWS account (demo/enterprise/bedrock.env.example) |
| VX | 1264 | 232 | 400 | 136 | 1664 | 368 | Google Cloud Vertex AI / FinTechCo GCP project (demo/enterprise/vertex.env.example) |
| POL | 0 | 496 | 512 | 112 | 512 | 608 | Policy / managed settings (demo/enterprise/managed-settings.json) |
| AUD | 576 | 496 | 512 | 112 | 1088 | 608 | Audit / logs, OpenTelemetry (hook audit log, demo/enterprise/otel.env.example) |
| IDN | 1152 | 496 | 512 | 112 | 1664 | 608 | Identity / cloud IAM, SSO |

| Connector | from | to | route | head | line | endpoints on |
| --- | --- | --- | --- | --- | --- | --- |
| c1 | (400,68) | (512,300) | hv | none | solid teal 3px | L right; bus joinBottom |
| c2 | (400,300) | (512,300) | straight | none | solid teal 3px | CI right; bus joinBottom |
| c3 | (512,184) | (624,184) | straight | end | solid teal 3px | bus joinMid; CC left |
| c4 | (1040,184) | (1152,184) | straight | none | solid teal 3px | CC right; bus fanMid |
| c5 | (1152,68) | (1152,300) | straight | none | solid teal 3px | bus fanTop; bus fanBottom |
| c6 | (1152,68) | (1264,68) | straight | end | solid teal 3px | bus fanTop; BR left |
| c7 | (1152,300) | (1264,300) | straight | end | solid teal 3px | bus fanBottom; VX left |
| c8 | (832,268) | (832,496) | straight | none | dashed slate 3px | CC bottom; AUD top |
| c9 | (256,472) | (1408,472) | straight | none | dashed slate 3px | bus annoLeft; bus annoRight |
| c10 | (256,472) | (256,496) | straight | none | dashed slate 3px | bus annoLeft; POL top |
| c11 | (1408,472) | (1408,496) | straight | none | dashed slate 3px | bus annoRight; IDN top |

Summary: host 1664x640; pinned children 21 (svg 1 + connectors 11 + labels 9) of 24 allowed; svg 1083 bytes (limit 53248), width and height equal viewBox 0 0 1664 640, 0 text elements; widest-to-narrowest box 512 to 400 px (minimum 200); smallest gap between boxes 64 px (POL to AUD); lowest box bottom 608 px.

Audit checks that passed on all three diagrams: every listed box has exactly one svg rect and one label `p` with identical geometry; every label line fits its box width at 24px with the real font metrics and every label block fits its box height; no connector leg crosses a box; non-box labels keep 8px from legs and boxes; the host holds at most 24 pinned children; no `<text>` and no `xmlns` in any svg.

## 8. Slide ids and how Sprint 2 uses a template

**Ids.** Main deck `s01-cover`, `s02-agenda`, `s03-...`: the letter `s`, a two-digit number in presentation order, a hyphen and a slug of one to four lowercase words joined by hyphens. Appendix `a01-deployment-architecture`: the letter `a`, a two-digit number, the slug. The id is the section `id`, the file name (`deck/project/slides/<id>.html`) and the key in the deck order. The authoritative list is the `### s01-<slug>` and `### a01-<slug>` headings in `deck/slide-spec.md`; do not invent ids here. Template files use `tpl-<kind>` ids so they can never collide with a real slide.

**Copy procedure for Sprint 2.**
1. Look up the slide's Kind in `deck/slide-spec.md` and pick the template (a diagram slide names its variant).
2. `cp deck/templates/<kind>.html deck/project/slides/<id>.html`
3. Set the section `id` to the slide id. For a section slide, replace the `data-section` sentence.
4. Replace every slot named in the leading comment. Keep the section's `style`, the header block strings and the footer position exactly; change text, not geometry. Keep `data-transition="fade"`.
5. Delete the leading template comment once the slots are filled. On diagrams keep the node-list comment; update it first if you move a box, then move connectors and labels to match.
6. Replace `Source: [CLM-?: source]` with `Source:` and the claim ids from `research/claims.json` (ADR-006). Replace each `[CLM-?: ...]` as Research resolves it. Facts about FinTechCo come from `brief/facts.json` (120, 40, 20, 180 total); anything else is labelled "Assumption:".
7. Replace the `NOTES STUB` text in the final `aside` with the spoken script (section 9).
8. Add the id to the deck order in `deck/project/deck.json` as the Slides artifact type's own instructions describe; this document does not define `deck.json`.
9. Release checks on `deck/project/slides/`: no `tpl-`, no `NOTES STUB`, no unresolved `[CLM-?`, no hex outside the palette, no font size under 24, and `node org/contracts/validate.mjs` passes.

## 9. Speaker-notes convention

One `aside` per slide, as the last child of the `section`. It takes no space on the slide and carries the spoken script.
- Plain sentences, written to be said aloud, about 140 words per minute (2.33 words a second); the target seconds and word count live in `deck/slide-spec.md`.
- The first sentence is the executive line, so a reader who stops there still has the point; depth follows.
- Define each term in plain English at its first use (agentic, MCP, hooks, subagent, headless); the glossary in `deck/storyline.md` says where.
- A claim id goes right after the fact it supports, in the form `[CLM-nnn]` with the three-digit id from the register; a placeholder `[CLM-?: what needs sourcing]` stays until Research resolves it.
- Stage cues are short and in square brackets, only where the speaker acts: `[switch to the terminal]`. No markup inside the `aside`.
- Typographic apostrophes and quotes. The template stubs begin `NOTES STUB (<kind>)` so they are easy to find and must not survive into the deck.

## 10. Google Slides fallback fonts and port values

If a face is missing in the Google Slides copy, use the fallback listed in every `font-family` value. Sizes convert at px = pt x 2 (as the .pptx export does), so the scale in points is 80, 48, 32, 14 and 12.

| Role | Face | Fallback | Size px | Size pt |
| --- | --- | --- | --- | --- |
| Display numeral | Source Serif 4 | Georgia | 160 | 80 |
| Display | Source Serif 4 | Georgia | 96 | 48 |
| Heading | Source Serif 4 | Georgia | 64 | 32 |
| Body | IBM Plex Sans | Arial | 28 | 14 |
| Label | IBM Plex Sans | Arial | 24 | 12 |
| Stack tag, code | JetBrains Mono | Courier New | 24 | 12 |

The fallback faces have different letter widths, so after switching check every title, cell and card for overflow, starting with the table and the diagram labels. Theme colours for the copy: the eight hexes in section 1, named as there. Assumption to confirm when the template is readable: the template page may be smaller than the 1920 px canvas (a 10 in by 5.625 in page is 720 pt wide, which is 0.75 of the 960 pt this deck exports at); if so, scale every size by the same factor and keep the 24px (12pt) floor relative to the new page.

## 11. Claims and brand hygiene in the templates

- No template contains a claim id (`grep -c 'CLM-[0-9]'` is 0 for every file). Every footer says `Source: [CLM-?: source]`. Sample text is synthetic or taken from `brief/facts.json` and ADR-005 (the three FinTechCo teams and stacks, the ask).
- Claim-bearing diagram labels are neutral nouns with `[CLM-?: ...] Trust review required before use` comments (section 6, rule 11). Trust owns the wording; Narrative does not reword an approved statement without re-review (ADR-003).
- The cover says it is the candidate's own preparation and uses `[Your Name]`. No Anthropic logo, wordmark, imagery or palette appears; no image files exist under `deck/`; FinTechCo is fictional and has no logo.

## 12. Verification

Commands were run from `fintechco-claude-code/` on 2026-10-20. "Result" is what the command printed.

### 12.1 Acceptance commands from the ticket (each run verbatim)

```
$ ls deck/templates
cards.html
closing.html
compare.html
cover.html
diagram-deployment.html
diagram-how-it-works.html
diagram.html
section.html
statement.html
table.html
```
Result: exactly the ten files required.

```
$ find deck -type f | sort
deck/slide-spec.md
deck/storyline.md
deck/templates/cards.html
deck/templates/closing.html
deck/templates/compare.html
deck/templates/cover.html
deck/templates/diagram-deployment.html
deck/templates/diagram-how-it-works.html
deck/templates/diagram.html
deck/templates/section.html
deck/templates/statement.html
deck/templates/table.html
deck/visual-system.md
```
Result: nothing under `deck/project/` (the folder does not exist); `deck/slide-spec.md` and `deck/storyline.md` are S1-NAR-01's files, written in parallel; this ticket wrote only `deck/visual-system.md` and `deck/templates/`.

```
$ grep -c '<section' deck/templates/*.html
deck/templates/cards.html:1
deck/templates/closing.html:1
deck/templates/compare.html:1
deck/templates/cover.html:1
deck/templates/diagram-deployment.html:1
deck/templates/diagram-how-it-works.html:1
deck/templates/diagram.html:1
deck/templates/section.html:1
deck/templates/statement.html:1
deck/templates/table.html:1
```
Result: 1 for every file.

```
$ grep -nE '<style|class=|<script|margin:|z-index|var\(|<text|foreignObject|[[:space:]]on[a-z]+=|@import|http' deck/templates/*.html   # then: echo exit=$?
exit=1
```
Result: no matches (grep exit 1), so no style block, class, script, margin, z-index, var(), text element, foreignObject, event handler, import, xmlns or URL.

```
$ grep -ohE '<[a-zA-Z][a-zA-Z0-9-]*' deck/templates/*.html | sort -u | tr '\n' ' '
<aside <b <br <div <h1 <h2 <p <rect <section <span <svg <table <td <th <tr <x-connector 
```
Result: only `aside b br div h1 h2 p section span table td th tr x-connector` plus the svg drawing elements `svg` and `rect`; all are in `format.md`.

```
$ grep -ohE 'font-size:[[:space:]]*[0-9.]+' deck/templates/*.html | grep -oE '[0-9.]+' | sort -n | head -1
24
```
Result: 24. The distinct sizes used are 24, 28, 64, 96 and 160 (section 2).

```
$ grep -ohiE '#[0-9a-f]{3,8}' deck/templates/*.html | tr a-f A-F | sort -u | tr '\n' ' '
#13202B #1B1F24 #1F6F6B #4A5560 #4FB3A9 #D9952B #E2DED5 #F6F4EF 
```
Result: eight hexes, all in the palette; every `rgba()` is paper, hairline or night-family RGB from the palette with an alpha (checked by the lint).

```
$ grep -ohE "font-family:[^;\"]+" deck/templates/*.html | sort | uniq -c
     60 font-family:'IBM Plex Sans', Arial, sans-serif
      3 font-family:'JetBrains Mono', 'Courier New', monospace
     15 font-family:'Source Serif 4', Georgia, serif
```
Result: exactly the three stacks of section 2, each with a basic face and a generic.

```
$ grep -c 'CLM-[0-9]' deck/templates/*.html
deck/templates/cards.html:0
deck/templates/closing.html:0
deck/templates/compare.html:0
deck/templates/cover.html:0
deck/templates/diagram-deployment.html:0
deck/templates/diagram-how-it-works.html:0
deck/templates/diagram.html:0
deck/templates/section.html:0
deck/templates/statement.html:0
deck/templates/table.html:0
```
Result: 0 for every file.

```
$ grep -nE '[0-9.]+(em|rem|vw|vh)\b' deck/templates/*.html; echo "exit=$?"
exit=1
```
Result: no em, rem, vw or vh anywhere (exit 1 means no match).

```
$ find deck -type f | grep -Ei '\.(png|jpe?g|gif|webp|svg|woff2?|ttf|otf)$'; echo "exit=$?"
exit=1
```
Result: no image or font files under `deck/` (exit 1 means none).

```
$ grep -ci anthropic deck/templates/*.html
deck/templates/cards.html:0
deck/templates/closing.html:0
deck/templates/compare.html:0
deck/templates/cover.html:0
deck/templates/diagram-deployment.html:0
deck/templates/diagram-how-it-works.html:0
deck/templates/diagram.html:0
deck/templates/section.html:0
deck/templates/statement.html:0
deck/templates/table.html:0
```
Result: 0 in every template (no wordmark, logo or brand text).

```
$ node org/contracts/validate.mjs; echo "exit=$?"
ok   research/claims/adoption-eval.json: 17 claims
ok   research/claims/adoption-rollout.json: 23 claims
ok   strategy/use-cases.json (not created yet)
ok   value/metrics.json (not created yet)
ok   value/roi-assumptions.json (not created yet)
exit=0
```
Result: passes (exit 0). No template cites a claim id, and this file cites none.

### 12.2 Throwaway lint scripts (kept in the session scratchpad, never in `deck/`)

| Script | What it checks | Result |
| --- | --- | --- |
| `lint.py` | the ticket's grep commands again; file list; one section per file; leading comment with kind, use, slots and limits; id, `data-transition="fade"`, explicit background (night for cover, section, closing; paper otherwise); last child is the only `aside`; no wrapper tags; font-family values; rgba is palette plus alpha; headings set size and weight; no slate or teal text on night; section padding; exactly one pinned footer at `left:128px; bottom:64px; width:1664px`, 24px, text `Source: [CLM-?: source]`; amber elements carry ink; comments hold no double hyphen | 158 checks passed, 0 failed |
| `lint2.py` | header block identical on the 7 content files; h2 and eyebrow on one line; body height budgets; statement 18 words and 4 lines; compare cells fit and lead-ins match; table is header plus 5 rows by 4 columns, `width:N%` on every first-row cell summing to 100, every cell one line, height estimate 523px of 645.6; cards: 3 identical cards, gap 32, label, body (2 lines) and tag fit, comment explains 4 cards; closing: 3 rows of 120px, `[date]` chips, stack ends above y 952; cover and section limits; the diagram geometry audit of section 7 (svg size and viewBox, zero text, order, boxes 200px or wider, 32px gaps, 32px inside region, lowest box below 600, svg rect and label p for every listed node, connector endpoints on edge midpoints or bus points, axis-aligned legs, no leg through a box, endpoints 8px inside host top and left, labels fit with real font metrics, 8px label clearance, at most 24 pinned children) | 370 checks passed, 0 failed |
| `lint_variant.py` | scratch copies of `statement.html` with the amber panel and with the number form: palette, ink on amber, sizes, one section, subset grep | both pass (see below) |

```
statement-amber.html hex subset True | amber ink ok True (1 amber) | sizes [24, 28, 64, 96] | one section True | grep subset True
statement-number.html hex subset True | amber ink ok True (0 amber) | sizes [24, 28, 64, 160] | one section True | grep subset True
```

### 12.3 Contrast and text-fit measurements

- **Contrast.** Computed with the WCAG 2.x relative-luminance formula for every pair of the eight tokens and for the alpha cases; the allowed and forbidden tables in section 1 are that output (ADR-001's four figures reproduce to the first decimal except ink on amber, 6.53 against 6.7).
- **Text fit.** Text widths were measured with the real font files: IBM Plex Sans 400, 600 and 700 and Source Serif 4 400 and 600 (downloaded from Google Fonts into the scratchpad for measuring only), and JetBrains Mono 400 (system copy). Every title, cell, card line, closing row and diagram label line was measured against its box; the results are the `lint2.py` fit checks above.
- **Visual sanity.** A rough layout preview (a throwaway PIL drawing of the files, not the Slides engine) was viewed for all ten templates and the two variants to catch overlaps and empty bands; it led to the 640px host, the 144px node height and the closing top-concern strip.
### 12.4 Files written

```
$ ls deck/visual-system.md deck/templates/*.html
deck/templates/cards.html
deck/templates/closing.html
deck/templates/compare.html
deck/templates/cover.html
deck/templates/diagram-deployment.html
deck/templates/diagram-how-it-works.html
deck/templates/diagram.html
deck/templates/section.html
deck/templates/statement.html
deck/templates/table.html
deck/visual-system.md
```
Result: eleven files, all inside this ticket's paths.



## 13. Assumptions and open items

1. **No slide builder was available.** Subset compliance was established by reading each file against `format.md`, the grep commands above and a throwaway lint kept in the session scratchpad (not in the repo). The real build may still print layout notes (`note: layout:`) or warnings; fix them in `deck/project/slides/` when Sprint 2 builds.
2. **Diagram host is 1664 by 640, not 1664 by 700.** The eyebrow and title above every diagram leave 645.6px. `deck/slide-spec.md` still says "1664x700 host" for the evaluation-timeline slide; read it as 1664 by 640 (posted to the narrative hub).
3. **ADR-001 ink-on-amber ratio** is stated as 6.7:1; recomputed 6.53:1 (section 1). Both pass; the ADR is unchanged.
4. **`demo/enterprise/` does not exist yet.** The deployment diagram names the files from ADR-004's governance pack; confirm the names when the demo ticket lands.
5. **Product behaviour in the how-it-works subtitles** (search and read, plan before edit, edit and run, tests, permission prompt) is sample wording written for layout. `deck/slide-spec.md` s04 has its own on-slide text with claim placeholders; replace the subtitles with that text; each must stay on one line (372px inside a loop box, about 30 characters; the s04 wording measures 242 to 300px, and the gate subtitle "per your policy" fits the 252px inside the pill).
6. **Fonts are loaded from Google Fonts at build time** by the deck head. Offline, text shows in Georgia, Arial and Courier New (section 10), which is also the Google Slides fallback.
7. **The Google Slides template** named in the brief could not be read (no link in the brief), so the page-size factor in section 10 is an assumption.
8. **Preview images** made for visual checking were rough layout approximations, not renders from the real engine, and are not kept in the repo.
