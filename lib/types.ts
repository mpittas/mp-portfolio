export type MockId =
  | "clearing-flow"
  | "clearing-cover"
  | "radar-dashboard"
  | "radar-states"
  | "radar-system"
  | "radar-cover";

export type Media = {
  src: string;
  alt: string;
  /** Width / height. Used to reserve space and avoid layout shift. */
  ratio: number;
  /** Still frame for a video. Presence marks the media as video. */
  poster?: string;
};

export type Decision = {
  title: string;
  why: string;
  tradeoff?: string;
};

export type Block =
  | {
      type: "text";
      eyebrow: string;
      heading: string;
      body: string[];
    }
  | {
      type: "points";
      eyebrow: string;
      heading: string;
      intro?: string;
      items: { title: string; body: string }[];
    }
  | {
      type: "decisions";
      eyebrow: string;
      heading: string;
      intro?: string;
      items: Decision[];
    }
  | {
      type: "copy";
      eyebrow: string;
      heading: string;
      intro?: string;
      pairs: { before: string; after: string; note: string }[];
    }
  | {
      type: "steps";
      eyebrow: string;
      heading: string;
      intro?: string;
      items: { title: string; body: string }[];
    }
  | {
      type: "table";
      eyebrow: string;
      heading: string;
      intro?: string;
      columns: string[];
      rows: string[][];
    }
  | {
      type: "snippet";
      eyebrow: string;
      heading: string;
      intro?: string;
      language: string;
      code: string;
      caption: string;
    }
  | { type: "figure"; media: Media; caption: string }
  | { type: "mock"; id: MockId; caption: string; label: string }
  | {
      type: "next";
      eyebrow: string;
      heading: string;
      items: string[];
    };

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  /** shipped: a real, live product. concept: self-initiated design exercise. */
  kind: "shipped" | "concept";
  year: string;
  /** One line shown on cards and at the top of the case study. */
  tagline: string;
  /** Two sentences for the work list. */
  summary: string;
  role: string;
  scope: string[];
  platform: string;
  /** Tools and tech, honestly labelled. */
  tools: string[];
  links: ProjectLink[];
  /** Background colour behind the cover on cards. */
  tone: string;
  cover:
    | { type: "media"; media: Media; fit: "cover" | "contain" }
    | { type: "mock"; id: MockId }
    | { type: "type"; mark: string };
  /** Optional looping clip for the case study header. Cards use the still. */
  video?: { src: string; poster: string };
  seoDescription: string;
  blocks: Block[];
};

export type Role = {
  role: string;
  org: string;
  dates: string;
  summary: string;
  points: string[];
};

export type OtherWork = {
  title: string;
  kind: string;
  year: string;
  note: string;
  href: string;
  linkLabel: string;
};

export type SiteContent = {
  name: string;
  shortName: string;
  role: string;
  headline: string;
  intro: string;
  availability: string;
  location: string;
  email: string;
  cvUrl: string;
  socials: { label: string; href: string }[];
  stats: { value: string; label: string }[];
  capabilities: { title: string; body: string; tags: string[] }[];
  process: { title: string; body: string }[];
  toolbox: { group: string; items: string[] }[];
  aboutSub: string;
  aboutParagraphs: string[];
  lookingFor: string[];
  experience: Role[];
  education: { title: string; detail: string }[];
  languages: { name: string; level: string }[];
  interests: string;
  otherWork: OtherWork[];
  contactBody: string;
  portrait: string;
};
