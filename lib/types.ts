export type MediaModule =
  | {
      type: "image";
      src: string;
      original?: string | null;
      ratio?: number | null;
      remote?: boolean;
    }
  | {
      type: "video";
      src: string;
      poster?: string | null;
      original?: string | null;
      ratio?: number | null;
      remote?: boolean;
    }
  | {
      type: "text";
      text: string;
    }
  | {
      type: "links";
      items: { label: string; href: string }[];
    };

export type Project = {
  slug: string;
  title: string;
  year?: string;
  tags: string[];
  url: string;
  seoDescription?: string;
  summary?: string;
  keywords?: string[];
  cover: string | null;
  coverPoster?: string | null;
  modules: MediaModule[];
};

export type SiteContent = {
  name: string;
  shortName: string;
  role: string;
  introHeading: string;
  intro: string;
  aboutHeading: string;
  aboutSub: string;
  aboutParagraphs?: string[];
  experience: { role: string; org: string; dates: string }[];
  education: string[];
  other: { text: string; href?: string }[];
  cvUrl: string;
  contactHeading: string;
  contactBody: string;
  googleForm: string;
  socials: { label: string; href: string }[];
  logo: string;
  portrait: string;
  aboutPhotos?: string[];
};
