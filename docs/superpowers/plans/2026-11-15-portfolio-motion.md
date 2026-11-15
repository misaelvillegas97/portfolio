# Portfolio motion redesign

User-selected direction: technological editorial, ivory, ink and cobalt, wide typography and precise motion. Preserve all bilingual facts, products, dates, contact channels, CV, section anchors and the prerendered delivery.

## Scope and flow

Recruiters and engineering leads assess senior experience; consulting clients assess product ownership. Both enter at identity, inspect real products, review experience and method, then email, open LinkedIn or download the CV. Product links open their actual homepages without losing portfolio context. Language changes retain the current section. Native disclosures expose secondary detail without navigating away.

Intention -> surface -> primary action -> continuation:
- Assess work -> #projects and product anchors -> inspect scope / visit product -> return to the portfolio or contact.
- Assess experience -> #experience -> read responsibilities and dates -> download CV / contact.
- Assess working method -> #principles / #capabilities -> expand capabilities -> contact.
- Make contact -> #contact -> email / copy address -> email client; clipboard failure retains a selectable address and LinkedIn.

## Implementation

- [x] Rebuild the seven existing section components and global tokens as one visual system. Reuse existing content, assets, i18n and native disclosures.
- [x] Add a self-hosted Outfit variable font with its OFL licence. No remote font runtime dependency.
- [x] Add GSAP and the official React integration for a scoped entrance and native-scroll fallback. Prefer CSS scroll timelines when fully supported. Motion never hides essential content, captures scrolling, or changes layout height. Reduced motion, print and no-JS remain complete.
- [x] Retain semantic SSR, canonical / hreflang, sitemap, robots and llms.txt. Enrich the existing ProfilePage / Person and CreativeWork objects from the same locale data. Refresh social preview artwork.
- [x] Verify existing tests, lint, production build, real-browser interaction, keyboard, clipboard failure, language continuity, deep links, 320/390/768/820/1024/1440 widths, reduced motion and no-JS. Record actual results and outstanding limitations.

No environment variables or .env files. Work locally on main. No publication requested. This public static portfolio has no authenticated API or tenant resources; the redesign does not add persistence, RBAC or operational backend features.

The client's real portfolio facts outrank commercial template assumptions: no invented clients, outcome metrics, testimonials, photographs, product UI or contact placeholders. Layout grows when factual content needs space. The three supplied taste skills conflict on hero layout, cards, scroll reveals and fonts; the chosen editorial direction, consistent system and accessible content take precedence over random component selection. Generated raster art and unrelated stock photography are unnecessary for this typographic, real-product portfolio.

Final evidence: docs/qa/2026-11-15-portfolio-motion/README.md. All 47 tests, lint and production build pass; 20 browser checks have no runtime/CSP errors. The independent visual review found no material UI gap and its documentation fix was resolved. The taste gate exhausted three rounds with GATE: OPEN 54; its full unwaived composition/kit findings remain reported. No production publication occurred.
