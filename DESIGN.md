---
name: David Villegas Sandoval
description: Technological editorial portfolio with real product evidence and precise motion.
colors:
  paper: "#f3eee2"
  paper-raised: "#fbf8f0"
  surface: "#e7e3d8"
  ink: "#1c252a"
  ink-soft: "#454e52"
  cobalt: "#1746c6"
  cobalt-deep: "#10338f"
  line: "#d0cfc4"
  line-strong: "#9e9f95"
  inverse-muted: "#b8c2c6"
  inverse-line: "#4b5559"
  method-muted: "#b9c8f6"
  method-line: "#7f9bec"
  white: "white"
typography:
  display:
    fontFamily: "Outfit, 'Segoe UI', sans-serif"
    fontSize: "clamp(4.5rem, 8.9vw, 8rem)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Outfit, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.5rem, 4.5vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Outfit, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.5rem, 4vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Outfit, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Outfit, 'Segoe UI', sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
    lineHeight: 1.6
  action:
    fontFamily: "Outfit, 'Segoe UI', sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
    lineHeight: 1.6
rounded:
  surface: "1rem"
  action: "3rem"
  language: "2rem"
  circle: "50%"
  screenshot: "0.3rem"
spacing:
  page-gutter: "clamp(1.25rem, 5.55vw, 5rem)"
  column-gap: "clamp(1.25rem, 3vw, 3rem)"
  section-space: "clamp(5rem, 10vw, 9rem)"
components:
  action-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "0.55rem 0.65rem 0.55rem 1.5rem"
  action-primary-hover:
    backgroundColor: "{colors.cobalt-deep}"
  action-secondary:
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "0.55rem 1.5rem"
  action-secondary-hover:
    backgroundColor: "{colors.surface}"
  text-link:
    textColor: "{colors.cobalt}"
    typography: "{typography.action}"
  language-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.language}"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "0 1.5rem"
  disclosure:
    textColor: "{colors.ink}"
  capability-list:
    textColor: "{colors.inverse-muted}"
---

# Design System: David Villegas Sandoval

## Overview

**Creative North Star: "Technological editorial"**

The approved direction combines wide personal typography, ivory reading surfaces, ink text and cobalt actions. Outfit carries both identity and practical reading. Open rows, shared alignment and actual product captures give the work its presence; the interface stays precise and personal.

The system uses tonal chapters, restrained framing and purposeful motion. Experience is inverse ink; approach uses a cobalt field. These chapters share the same type, spacing, actions, disclosures and focus language. The source of visual truth is `src/index.css`, the sections composed by `src/App.tsx`, and `src/hooks/usePortfolioMotion.ts`. The surface composition and approved direction remain in `docs/portfolio-direction.md`.

**Key Characteristics:**

- One self-hosted Outfit family across display, content and controls.
- Shared gutters and an open twelve-column spatial model.
- Real evidence framed with restrained depth.
- Cobalt actions and coherent inverse chapters.
- Readable baseline content, native disclosures and optional motion.

## Colors

Warm paper and cool ink establish the reading surface; cobalt carries action and the approach chapter. Frontmatter values are normative. CSS aliases reuse the same colors rather than establishing separate palettes.

### Primary

- **Cobalt** (`cobalt`): primary actions, text links, the personal-name period, focus rings and the approach background.
- **Deep cobalt** (`cobalt-deep`): hover feedback for filled actions and the contact arrow.
- **Method muted** (`method-muted`): supporting copy on the cobalt chapter.
- **Method line** (`method-line`): connecting rules, numbered nodes and disclosure separators on cobalt.

### Neutral

- **Paper** (`paper`): main page, navigation and inverse chapter text.
- **Raised paper** (`paper-raised`): product reading surface, contextual panels and approach text.
- **Surface** (`surface`): screenshot surround, language control and quiet hover fill.
- **Ink** (`ink`): primary text, image-link arrow and the experience background.
- **Soft ink** (`ink-soft`): body support, metadata and footer text on paper.
- **Line / strong line** (`line`, `line-strong`): separators and outlined controls.
- **Inverse muted / inverse line** (`inverse-muted`, `inverse-line`): readable metadata and separators on ink.
- **White** (`white`): text and symbols on filled cobalt actions; focus on cobalt.

**The Shared Palette Rule.** Keep semantic colors consistent across sections; product imagery retains its own authentic colors without recoloring shared controls.

The sidecar's tonal ramps are derived panel previews, not additional application tokens or a new production color scale.

## Typography

**Display and body font:** Outfit, with Segoe UI and sans-serif fallbacks. The local variable WOFF2 supports weights 300–700 with `font-display: swap`; the implementation primarily uses 400 and 500. Font synthesis is disabled.

**Character:** Broad geometric letterforms and tight display tracking give the identity scale. Body copy stays quieter, with generous leading. There is no separate serif signature or monospaced label face.

### Hierarchy

- **Display:** the frontmatter `display` role is the personal H1, deliberately split into two readable lines. At widths up to 38rem it uses `clamp(2.85rem, 12vw, 4.5rem)`. The short-viewport variant uses `clamp(3.5rem, 6.8vw, 5rem)` when height is at most 47rem and width is at least 38rem.
- **Headline:** the shared section-heading role uses `headline`. At widths up to 38rem the shared heading becomes `clamp(2rem, 8.8vw, 3rem)`; chapter-specific headings retain their implemented overrides.
- **Title:** `title` describes featured product names and the experience heading. Product names become 2.5rem at narrow widths. Employment names use 1.75rem with 1.3 leading and −0.025em tracking, becoming 1.7rem at narrow widths.
- **Body:** `body` is the default reading role. Hero description is bounded to 56ch; general section introductions use 48ch. Several secondary mobile paragraphs use 0.95rem rather than creating a second font family.
- **Label:** `label` describes contribution headings and disclosure subheadings. Dates and capability lists use 0.8rem regular text; dates use tabular numerals. These are metadata, not decorative uppercase kickers.
- **Action:** `action` is shared by links and pill actions. The pill action becomes 0.9rem at narrow widths.

Approach and contact have purposeful display variations: the approach title uses `clamp(3rem, 6vw, 5.5rem)` with 1.1 leading, while the contact title uses `clamp(3rem, 5.8vw, 5rem)`. The address is a prominent functional link, using `clamp(1.75rem, 6.4vw, 5.5rem)` and 1.1 leading before its narrow-width adjustment.

**The One Family Rule.** Extend the hierarchy with Outfit and the established roles; keep readable line breaks and the existing language parity.

## Layout

The shared container is at most 80rem wide and uses the frontmatter `page-gutter` on both sides. The common grid has twelve equal `minmax(0, 1fr)` columns and the `column-gap` token. Content can shrink within grid cells; long text wraps instead of forcing horizontal scrolling.

Sections use `section-space`. Featured work is an open image/copy composition, normally 7fr/5fr; other products use 3fr/6fr/3fr rows. Section introductions can use the same 7fr/5fr split. The inverse chapter places its heading in columns 1–4 and entries in columns 6–12. Rules and whitespace separate content without enclosing every group.

### Responsive behavior

- **Up to 64rem:** navigation gaps tighten and featured work becomes 1.2fr/1fr.
- **Up to 52rem:** navigation becomes a native disclosure menu. Featured work stacks its image and copy, with a two-column copy area; section introductions and the contact heading stack. Experience spans the container with date/content subcolumns.
- **Up to 38rem:** section spacing is 4.5rem and the column gap is 1.5rem. Work, employment entries, actions and the three approach steps stack in DOM order. The approach connector changes from a horizontal rule to a vertical one.
- **Short viewports:** the hero's padding and type scale compact at the implemented height query. The experience heading sticks only when width is at least 64rem and height is at least 46rem.

The detached fixed header sits 1.5rem from the top, becoming 0.75rem on narrow screens. Anchored sections and articles keep 7rem of scroll clearance. The hero uses `100svh`, flexible content and its baseline rather than a fixed content height. Open mobile navigation is height-bounded and scrolls within the viewport.

## Elevation & Depth

Content remains flat and open. Soft shadows belong to the detached navigation, contextual disclosure panels and actual product captures. The screenshot surround uses a tonal surface; it does not imitate browser chrome or a fabricated device. Exact shadow values live in the sidecar's extensions.

**The Evidence Depth Rule.** Use depth for floating navigation, contextual panels and real evidence; preserve open reading rows for ordinary content.

## Shapes

The `surface` radius rounds navigation, image surrounds and contextual panels. `action` and `language` provide pill controls; `circle` is reserved for arrows and numbered approach nodes. Captures have the smaller `screenshot` radius. Fine one-pixel rules carry structure through open rows and disclosures. Lucide SVG icons share the global 1.5 stroke treatment.

## Components

### Buttons and action links

Pill actions are clear, tactile and compact. Primary actions pair cobalt with white and a translucent circular arrow area. Secondary actions keep the paper surface and a strong-line border. Both are at least 3.5rem tall, becoming 3.25rem at narrow widths; hover lifts them 2px and the active state presses them by 1px with scale 0.98. Secondary horizontal padding is 1.5rem.

Text links stay open, use cobalt and have a minimum 2.75rem target. A one-pixel underline grows from the left; directional icons move slightly on hover. Inverse links use the chapter's readable foreground. The language control shares the same motion and focus vocabulary with a quiet surface fill.

Focus is a 3px outline with 5px offset: cobalt on paper, paper on ink and white on cobalt. Preserve native link and button semantics.

### Navigation

The fixed, detached paper navigation uses the shared container and grid, a two-line personal wordmark, inline desktop links and the language control. At the mobile breakpoint it becomes native `details`/`summary`, with a raised-paper panel and two-line CSS menu symbol. Escape closes the menu and restores focus; selecting a section or pointing outside closes it. The language link preserves the current section through the bilingual route change.

### Product evidence and open rows

Product captures sit inside a surface-colored surround with restrained rounding and a dark circular visit arrow. Preserve their real source, intrinsic dimensions, alternate text and caption context. The image and text visit action share the product's destination. Additional work uses ruled rows with native scope disclosures rather than compacting every product into a card.

### Disclosures and capability lists

Scope and technology detail use semantic `details`/`summary`, shared separator rules and rotating chevrons. A shared unpadded body contains the padded content, so its measured height can open and close without a padding jump. Opening expands normal flow; career context and the mobile menu float. Employment capabilities are a plain wrapping text list on ink, not pill badges. Technology names use an open wrapping list on cobalt. There is no input or form primitive in the current portfolio.

### Approach steps and contact

Approach uses three connected numbered nodes on cobalt, with one title and paragraph per step. Its connector becomes vertical when stacked. Contact uses a large address link and circular cobalt arrow. The copy action uses the existing text-link treatment, a reserved live-status line and explicit success/error recovery. Contact methods remain ordinary usable links when JavaScript is unavailable.

### Motion and readable fallback

The shared easing is `cubic-bezier(0.22, 1, 0.36, 1)`. State transitions are short and targeted; transform motion never replaces readable baseline content. CSS starts the hero entrance on the first paint, before hydration: two name lines settle from 36px with a 120ms stagger; supporting content settles from 18px with bounded delays. Deep links retain their native destinations.

The scoped GSAP hook settles each whole product frame from scale 0.9 and y 32px to its final position, with a 0.6s scrub that softens wheel steps. Approach words progress from opacity 0.65 to 1 while their heading is in view. Each effect has one driver. Native page scrolling remains intact. Pointer activation of a same-page anchor enables native smooth scrolling; fresh direct section URLs land immediately. Keyboard input, visible keyboard focus and reduced motion restore immediate scrolling, including after GSAP refreshes.

The Web Animations API opens shared disclosures in 380ms and closes them in 240ms. Flow panels animate their measured height; floating panels use opacity and a small transform. Repeated input reverses from the current frame. Closing content stays rendered until the exit finishes and leaves the tab order during that exit. Resizing retargets an opening panel, and completed flow changes refresh the following scroll effects.

Reduced motion shows full-opacity, untransformed content, removes entry/scroll effects and keeps simple color feedback. Forced colors preserves control boundaries and usable links. Prerendered content and native disclosures remain readable without JavaScript. Motion durations and breakpoint conditions are recorded in the sidecar rather than added to the frontmatter schema.

## Do's and Don'ts

### Do:

- **Do** reuse the shared palette, container, type roles, action styles and focus treatment.
- **Do** keep product captures authentic, dimensioned and meaningful in both languages.
- **Do** keep reading order, section destinations and functional links intact at every breakpoint.
- **Do** preserve native disclosure behavior, keyboard operation, visible focus and status feedback.
- **Do** keep content readable before motion and respect reduced motion, forced colors and no-JavaScript reading.

### Don't:

- **Don't** restore the superseded serif dossier or its vermilion accent.
- **Don't** introduce a separate visual identity or control palette per section or product.
- **Don't** replace real product evidence with simulated screenshots, decorative device chrome or invented metrics.
- **Don't** turn ordinary content into walls of cards or capability names into anonymous badge decoration.
- **Don't** hide essential content behind animation or run native and GSAP scroll effects on the same element.
