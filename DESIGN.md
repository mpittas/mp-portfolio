---
name: Marios
description: Neutral black portfolio for Marios Pittas
colors:
  board: "#0A0A0A"
  ink: "#F2F2F0"
  paper: "#111111"
  rule: "#2C2C2C"
  mute: "#8C8C8C"
  plate: "#000000"
  mark: "#CFCFCB"
typography:
  display:
    fontFamily: "Valley Sans, Helvetica, sans-serif"
    fontSize: "clamp(3.5rem, 12vw, 9rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Valley Sans, Helvetica, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.01em"
  spec:
    fontFamily: "Valley Sans, Helvetica, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
  specSm:
    fontFamily: "Valley Sans, Helvetica, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  sm: "2px"
spacing:
  spec: "14px"
  gutter: "28px"
  plate: "8vh"
components:
  stamp:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.spec}"
    rounded: "{rounded.none}"
    padding: "0"
  link-nav:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.spec}"
    rounded: "{rounded.none}"
    padding: "8px 0"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.board}"
    typography: "{typography.spec}"
    rounded: "{rounded.none}"
    padding: "16px 28px"
  button-primary-hover:
    backgroundColor: "{colors.mute}"
    textColor: "{colors.board}"
    rounded: "{rounded.none}"
---

## Overview

The site is a **black field**: near-black board, light ink, Valley Sans, and the work presented as plates. Chrome is spec labels, not cards. Color lives in the case studies; the interface stays board, ink, and rule.

Visitor mode is Experience. Two routes share one catalog: an express sequence of current plates, then a full index.

## Colors

- `board` is the page ground — near black, not warm grayboard.
- `paper` is a barely lifted surface for About, Contact, and type blocks.
- `ink` is the only text color on board. Mute and rule are ink at lower density.
- Photography and motion keep authored color. Never a neon accent. No yellow marks.

## Typography

Valley Sans for the name, project titles, reading text, nav, plate marks, and credits. Regular (400) for display and body, SemiBold and tracked for spec labels. No serif display. Tracking on display stays at or above -0.03em.

## Layout

A 12-column manual grid. The Work home is facing-page **spreads**: a 16:10 still (seven columns) with title and discipline in the remaining five, alternating sides. Images stay at reading distance, not full-viewport posters. Alternate layouts live at `/v/` for comparison. Case studies are a single column of plates and captions.

## Elevation & Depth

No card shadows. Separation is crop, overlap of type onto the plate, and hairline rules. Images sit flush; captions sit in the spec size below, more space above a heading than below it.

## Shapes

Square corners. Buttons are ink slabs, not pills. Focus is a 2px ink offset ring. No decorative SVG banner.

## Components

- **Stamp:** "Marios" in condensed caps, always top-left, links home.
- **Nav:** Work / About / Contact as spec labels.
- **Plate:** 16:10 still in a spread, title in the side column — not a full-viewport poster.
- **Index cell:** image cropped to the still; title after, never as a badge on a colored card.
- **Form:** labels above fields, ink underline inputs, slab submit.

## Do's and Don'ts

- Do let the first spread show the current work at a scale you can take in without scrolling past a poster.
- Do keep supplied copy only.
- Don't wrap work in equal icon-cards or numbered marketing sections.
- Don't add cream/serif/terracotta or black/neon costumes.
- Don't invent clients, years, or an email address.
- Don't restore the yellow Memphis banner.
