# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hiring managers, design leads and recruiters evaluating Marios Pittas for product design, UI/UX and design systems roles. They arrive from LinkedIn or a forwarded link, usually on a laptop, and decide within a minute whether to read a case study.

## Product Purpose

A personal portfolio for Marios Pittas, Product Designer. It shows how he thinks (case studies with decisions and trade-offs), what he has shipped, and how to reach him.

Success is: a hiring visitor understands he is a product designer who can also build, opens a case study, and gets in touch.

## Positioning

Product design, from first sketch to shipped code. The differentiator is design plus engineering depth: designs that are specific about states, edge cases and handoff.

## Operating Context

- Career pivot from front-end development to product design. The site leads with design thinking, not stacks.
- Two kinds of projects, always labelled: **Shipped product** (real, live, designed and built by Marios) and **Concept** (self-initiated, no client, no users).
- Concept screens are built in code (`components/mocks`) so spacing and states are real.
- Four concepts are written case studies with no screens (typographic cover). They never claim research or results either.
- The CV PDF in `public/media/site/cv` is still the front-end CV and should be replaced with a design CV.

## Capabilities and Constraints

- Routes: Home (hero, selected work, capabilities, process, experience, more work), `/work/[slug]` case studies, About, Contact.
- Contact: on-site form posting to `/api/contact` (SMTP, see `.env.example`), plus mailto and LinkedIn.
- Motion: light scroll reveals only. Respect `prefers-reduced-motion`.
- Theme: light and dark, following the system until the visitor chooses.

## Brand Commitments

- Name: Marios Pittas. Role: Product Designer.
- Voice: direct, warm, plain. First person. Short sentences.
- Palette: warm paper, near-black ink, one vermilion accent. Case study visuals carry their own colour.
- No em dashes or en dashes in any site copy. Use commas, colons, periods, or a regular hyphen.

## Evidence Rules

- Only supplied facts: roles, dates, products and numbers come from Marios's CV, LinkedIn and `content/site.json`.
- Never invent clients, awards, user research results, usage numbers or outcomes.
- Concept case studies describe validation as a plan ("how I would test it"), never as findings.

## Product Principles

1. Show the thinking: problem, principles, decisions, trade-offs, what is next.
2. Say plainly what is real and what is a concept.
3. The work is shown at reading size, in context, with real states.
4. Reaching him is a first-class action, not a footer afterthought.

## Accessibility & Inclusion

Keyboard access to every link and form field. Visible focus. Body text at AA contrast in both themes. Status and labels never rely on colour alone. Reduced-motion fallbacks for reveals and video.
