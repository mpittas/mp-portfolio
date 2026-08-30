export type Skill = {
  name: string;
  detail: string;
};

export type SkillGroup = {
  name: string;
  note: string;
  tools: Skill[];
};

export const SKILL_GROUPS = [
  {
    name: "Interface",
    note: "Product surfaces, design systems, and the component work under them.",
    tools: [
      {
        name: "React",
        detail:
          "Component trees, shared state, and the glue that keeps a product feeling like one surface.",
      },
      {
        name: "Next.js",
        detail:
          "App Router, server components, and routing that lets a case study play as a sequence.",
      },
      {
        name: "TypeScript",
        detail:
          "Types as guardrails. Contracts that catch the silly bugs before a review does.",
      },
      {
        name: "Tailwind CSS",
        detail:
          "Utility-first layout with tokens in one place, so the UI stays fast to change.",
      },
    ],
  },
  {
    name: "Motion",
    note: "Choreography for scroll, cursor, and every state in between.",
    tools: [
      {
        name: "GSAP",
        detail:
          "Timelines, scroll, and cursor work that feels directed, not bolted on.",
      },
      {
        name: "Lenis",
        detail:
          "Smooth scrolling with a tuned feel, so the page moves the way the motion on it does.",
      },
      {
        name: "CSS Animation",
        detail:
          "Keyframes for the small states: hover, focus, and the bits GSAP would be too much for.",
      },
      {
        name: "Micro-interactions",
        detail:
          "Buttons that answer, lists that land, and the little confirms that make a UI feel finished.",
      },
    ],
  },
  {
    name: "Design",
    note: "From first wireframe to a system a team can actually hold.",
    tools: [
      {
        name: "Figma",
        detail:
          "Files that survive a handoff. Auto-layout, components, and specs I can actually build from.",
      },
      {
        name: "UI/UX",
        detail:
          "Wireframes, flows, and the messy middle: empty states, errors, and the path from first tap to done.",
      },
      {
        name: "Design Systems",
        detail:
          "Tokens, components, and the rules that keep a product looking like itself at every size.",
      },
      {
        name: "Prototyping",
        detail:
          "Clickable truth before production. Motion, empty states, and the awkward screens in between.",
      },
    ],
  },
  {
    name: "Platforms",
    note: "Composable stacks that editors enjoy and servers survive.",
    tools: [
      {
        name: "Webflow",
        detail:
          "Marketing sites an editor can live in, with the structure still clean when I leave.",
      },
      {
        name: "WordPress",
        detail:
          "Themes and blocks for teams that already live there, without fighting the CMS.",
      },
      {
        name: "Strapi",
        detail:
          "A headless backend editors can actually use. Content modeled once, served anywhere.",
      },
      {
        name: "Headless CMS",
        detail:
          "Content decoupled from the page. One source, many surfaces, no theme lock-in.",
      },
    ],
  },
  {
    name: "Craft",
    note: "The unglamorous layer: fast loads, clean audits, honest markup.",
    tools: [
      {
        name: "Accessibility",
        detail:
          "Keyboard paths, contrast, names, and motion that does not fight the person using it.",
      },
      {
        name: "Performance",
        detail:
          "Less JavaScript, faster paint, images that know their size. The site feels as quick as it looks.",
      },
      {
        name: "SEO",
        detail:
          "Markup search can read. Titles, structure, and pages written for humans first.",
      },
      {
        name: "Testing",
        detail:
          "The paths that matter get a check. Not coverage theater, just fewer surprises after ship.",
      },
    ],
  },
] as const satisfies readonly SkillGroup[];

export const SKILL_INTRO =
  "Ten years between design files and the browser. I reach for tools that keep ideas moving: fast to prototype, clean to ship, simple to maintain.";
