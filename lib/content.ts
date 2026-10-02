import siteJson from "@/content/site.json";
import projectsJson from "@/content/projects.json";
import type { Project, SiteContent } from "@/lib/types";

export const site = siteJson as SiteContent;
export const EXPRESS_COUNT = 1;

/** Current catalog slugs, in published order. Replace when new projects are imported. */
const CATALOG_SLUGS = [
  "klndr",
  "digio",
  "realster",
  "photofolio",
  "know-your-geo",
  "songrates",
  "vscs-strapi",
  "mikrofond",
  "collection-of-landing-pages",
  "dokr",
  "umedio",
] as const;

const catalogIndex = new Map<string, number>(
  CATALOG_SLUGS.map((slug, index) => [slug, index]),
);

function discipline(project: Project): string {
  if (project.tags?.length) return project.tags.join(" · ");
  const keys = project.keywords ?? [];
  return keys.slice(0, 3).join(" · ");
}

export function projectShortName(project: Project): string {
  const head = project.title.split(" - ")[0]?.trim();
  return head || project.title;
}

const CREDIT_LINE = /^(credits?|agency|client|year|creative director)\s*:/i;

export function projectLead(project: Project): string | undefined {
  for (const entry of project.modules) {
    if (entry.type !== "text") continue;
    if (/^(context|thank you)\b/i.test(entry.text.trim())) continue;
    for (const chunk of entry.text.split(/\n\n+/)) {
      const text = chunk.replace(/\s+/g, " ").trim();
      if (text.length < 24 || CREDIT_LINE.test(text)) continue;
      if (/https?:\/\//i.test(text)) continue;
      if (/^[A-Z][A-Za-z ]{0,28}$/.test(text)) continue;
      return clipLead(text);
    }
  }
}

function clipLead(text: string): string {
  const max = 150;
  if (text.length <= max) return text;
  const first = text.match(/^[^.!?]+[.!?]/);
  if (first && first[0].trim().length >= 28) return first[0].trim();
  return `${text.slice(0, max).replace(/\s+\S*$/, "").trim()}…`;
}

function yearOf(project: Project): string | undefined {
  const fromTitle = project.title.match(/(20\d{2})(?:\s*[–-]\s*(20\d{2}))?/);
  if (fromTitle) return fromTitle[2] ?? fromTitle[1];
  if (/'19/.test(project.title)) return "2019";
  if (/'18/.test(project.title)) return "2018";
  return project.year;
}

export const projects: Project[] = (projectsJson as Project[])
  .filter((project) => catalogIndex.has(project.slug))
  .map((project) => ({
    ...project,
    year: yearOf(project),
    tags: project.tags?.length ? project.tags : (project.keywords ?? []).slice(0, 2),
  }))
  .sort(
    (a, b) => (catalogIndex.get(a.slug) ?? 0) - (catalogIndex.get(b.slug) ?? 0),
  );

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNeighbors(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next: index < projects.length - 1 ? projects[index + 1] : projects[0],
    index,
  };
}

export function expressProjects() {
  return projects.slice(0, EXPRESS_COUNT);
}

export function isVideoSrc(src: string | null | undefined) {
  return Boolean(src && /\.(mp4|webm|mov)$/i.test(src));
}

export function videoEmbed(module: Extract<Project["modules"][number], { type: "video" }>) {
  if (module.original?.includes("adobe.io")) return module.original;
  const id = module.src.match(/ccvproxy\/([^?]+)/)?.[1];
  if (id) {
    return `https://www-ccv.adobe.io/v1/player/ccv/${id}/embed?bgcolor=%230e0d0b&lazyLoading=true&api_key=BehancePro2View`;
  }
  return module.src;
}

export { discipline };
