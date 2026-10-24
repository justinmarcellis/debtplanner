# How it fits together: additions

Four new sections for the live Workbench page at https://fintechco-workbench.web.app/architectures, written in that page's style. The existing sections and links stay as they are.

| Section | Anchor | What it shows |
| --- | --- | --- |
| Fraud claims | `#fraud-claims` | App reports arrive structured and emails free-form. Claude fills the service desk's case fields with a confidence score on each, looks the customer up read-only in the mainframe, and ranks likely CIDs, related ones included. A five-step feedback loop turns analyst corrections into test cases. Includes a clickable case desk. |
| Governed laptops | `#laptops` | One managed settings file on every engineer's laptop; calls go through our Google Cloud project. |
| Pull request review | `#reviews` | Claude reviews every pull request; a judge model scores each comment, and planted-bug tests and reviewer thumbs feed one release gate. |
| On-call assistant | `#incidents` | A read-only investigation on every alert, with a draft fix for the on-call engineer to accept or reject. |

## Files

- `index.html`: a self-contained preview of the four sections, with the case desk working. Open it in a browser; it has no dependencies, works at phone width and in dark mode.
- `howItFitsTogether.additions.json`: the same copy and demo data as structured content (`sections[]` with lanes, steps, worth, safeguards and notes; `demo` with the email, fields and matches), to load into the Workbench's page component.

The two files carry the same wording. If you change one, change the other.

## Porting into the Workbench

The Workbench app's source is not in this repository, so these files are the hand-off. In the Workbench repo, render each entry of `sections` with the page's existing section component, insert the `group` heading before `laptops` (`group_start: true`), add the `nav` labels to the header and the `card` entries to the intro grid, and build the case desk from `demo`. Then redeploy to Firebase Hosting and check the four anchors, the case desk, phone width and dark mode.

## Checks

`index.html` is a release file for both gates: `node org/reviews/recheck.mjs` (for example F3, no "asks before it acts") and `node org/contracts/validate.mjs` (no drafting placeholders). The cloud wording follows `security/security-brief.md`: calls go through our Google Cloud project under our IAM and logging. It does not claim inference runs inside our project, because CLM-616 is still unverified. "Not used for training" rests on CLM-600.

All customers, CIDs, emails and judge scores are fictional and labelled that way on the page.
