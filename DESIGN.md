---
name: David Villegas Sandoval
description: Personal engineering dossier with visible product evidence.
colors:
  paper: "#f3eee2"
  paper-raised: "#fbf7ee"
  ink: "#1c252a"
  ink-soft: "#4e575b"
  line: "#bcb6aa"
  cobalt: "#1746c6"
  cobalt-deep: "#10338f"
  vermilion: "#b93722"
typography:
  display:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(3rem, 5.8vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Segoe UI, Avenir Next, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.6
spacing:
  small: "12px"
  medium: "24px"
  large: "48px"
---

## Overview

The existing ivory, graphite, cobalt and vermilion dossier remains the identity. A serif personal signature contrasts with practical sans-serif content. Product imagery replaces decorative background circles. Grid width is bounded; meaningful sections receive breathing room without forcing viewport-sized blocks.

## Colors

Paper is the page, raised paper marks quiet secondary surfaces, cobalt marks primary actions, vermilion is a small editorial accent. Ink-soft remains readable body text. Do not create per-project button or field palettes.

## Typography

Keep the name dominant and readable without colliding glyphs. Headlines are short; body text is at least 1rem. Labels can be smaller but must retain contrast. No remote font dependency. System sans fallback starts with Segoe UI to avoid platform-specific geometric substitutions.

## Elevation

Prefer rules and spacing over shadows or card stacks. Screenshots use a single framed figure. Navigation uses the shared paper surface; no backdrop blur is required.

## Components

- Header: personal wordmark, work, experience, approach and contact links, language switch.
- Hero: identity, concise scope, visible project/CV actions, compact sector context.
- Featured product: homepage screenshot, original product-wide description, contribution and broad capabilities. Both the image and the visit link open the product homepage.
- Other work: compact rows with original taglines and native disclosure for scope, contribution and capabilities; unfinished work remains visibly distinct.
- Experience: dated entries with English job titles and concrete responsibilities; no invented metrics. Blaze ended July 2026; Polodev ended August 2026.
- Approach: three short principles with optional technology detail.
- Contact: senior employment and consulting, david@dvillegas.cl, copy recovery, LinkedIn, CV and GitHub.
- Focus: vermilion outline with offset. Interactive targets at least 44px. Existing anchors have sticky-header clearance. At narrow widths, layouts stack in DOM order with wrapping text.

## Do's and Don'ts

Do preserve real evidence, captions, image dimensions and bilingual parity. Do keep content visible without animation or JavaScript. Do respect reduced motion and forced colors. Do not substitute generated UI for real screenshots, claim unverified adoption, or add a new aesthetic per section.
