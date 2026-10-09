import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/case-study";
import { getNeighbors, getProject, projects, site } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };

  const title = `${project.title}: ${project.tagline}`;
  return {
    title: project.title,
    description: project.seoDescription,
    openGraph: {
      title,
      description: project.seoDescription,
      type: "article",
      siteName: site.name,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getNeighbors(project.slug);

  return (
    <main>
      <CaseStudy project={project} prev={prev} next={next} />
    </main>
  );
}
