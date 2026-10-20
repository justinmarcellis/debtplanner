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
