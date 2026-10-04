import { getProject, projects } from "@/lib/content";
import { ogContentType, ogSize, projectOgImage, siteOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return siteOgImage();
  return projectOgImage(project);
}
