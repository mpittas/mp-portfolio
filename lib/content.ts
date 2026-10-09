import siteJson from "@/content/site.json";
import type { SiteContent } from "@/lib/types";

export const site = siteJson as SiteContent;

export { projects, getProject, getNeighbors } from "@/content/projects";

export function isVideo(src: string) {
  return /\.(mp4|webm|mov)$/i.test(src);
}
