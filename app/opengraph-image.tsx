import { site } from "@/lib/content";
import { ogContentType, ogSize, siteOgImage } from "@/lib/og";

export const alt = `${site.name} - ${site.role}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return siteOgImage();
}
