---
name: Marios
description: Warm, editorial portfolio for Marios Pittas, Product Designer
colors:
  bg: "#F4F2EC"
  surface: "#FBFAF7"
  sunken: "#EBE8DF"
  ink: "#151513"
  mute: "#66655E"
  line: "#DAD7CD"
  accent: "#FF5A36"
  accent-ink: "#151513"
  bg-dark: "#0E0E0D"
  surface-dark: "#171715"
  ink-dark: "#F3F1EA"
  mute-dark: "#A09E94"
  line-dark: "#2B2B27"
  accent-dark: "#FF6B4A"
typography:
  display:
    fontFamily: "Valley Sans, Helvetica, sans-serif"
    fontSize: "clamp(2.75rem, 6.4vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  heading:
    fontFamily: "Valley Sans, Helvetica, sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Valley Sans, Helvetica, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  eyebrow:
    fontFamily: "Valley Sans, Helvetica, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.1em"
rounded:
  card: "20px"
  pill: "999px"
---

## Overview

A calm, editorial page that gets out of the way of the work. Warm paper in light mode, near-black in dark mode, one vermilion accent used for the brand dot, the Concept badge, link underlines and hover states. Product screens (real screenshots and the screens built in code) carry all the colour.

## Colors

- `bg` is the page. `surface` lifts cards. `sunken` holds trade-off notes and active nav.
- `ink` is body and headings. `mute` is secondary copy (AA on `bg`).
- `accent` is never used for body text. Text on accent is `accent-ink`.
- Case study visuals own their palettes. The concept screens (`components/mocks/mocks.css`) define theirs and do not follow the site theme.

## Typography

Valley Sans throughout, variable weight. Display and headings at 500 with tight tracking. Body at 400. Eyebrows are small caps-style labels at 600 with wide tracking. Utilities: `display-xl`, `display-lg`, `display-md`, `lede`, `copy`, `eyebrow`.

## Layout

`.wrap` is a 1280px container with 20px (mobile) and 40px (desktop) gutters. Home sections are separated by a full-bleed hairline. Case studies use a 12-column grid: a sticky 4-column heading beside an 8-column body. Figures and screens run full width.

## Components

- **Project card:** 16:10 cover with a 20px radius, kind badge, year, title, tagline, scope chips. Lifts 4px on hover.
- **Kind badge:** `Shipped product` (outlined) or `Concept` (accent fill). Always shown.
- **Case study blocks:** `text`, `points`, `decisions` (with trade-off notes), `copy` (before and after), `steps`, `table`, `snippet`, `figure`, `mock`, `next`. Defined in `lib/types.ts`, authored in `content/projects.ts`.
- **Mocks:** authored in plain pixels at a fixed design size and scaled by `FitFrame`.
- **Buttons:** pills. Primary is ink and turns accent on hover. Secondary is outlined.

## Motion

Scroll reveals (`Reveal`) fade content up once. Hover lifts on cards and the hero deck. Everything is disabled under `prefers-reduced-motion`, and hero videos stay paused.

## Do's and Don'ts

- Do label every project as shipped or concept.
- Do show decisions and trade-offs, not only finished screens.
- Do use first person and plain language.
- Don't write em dashes or en dashes in copy.
- Don't invent clients, metrics, quotes or research findings.
- Don't use the accent for body text or large fills outside the Concept badge and CTA buttons.
