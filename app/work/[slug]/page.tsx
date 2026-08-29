import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCase } from "@/components/project-case";
import { getNeighbors, getProject, projects } from "@/lib/content";

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
  return {
    title: project.title,
    description: project.seoDescription,
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

  const { prev, next, index } = getNeighbors(project.slug);

  return (
    <main>
      <ProjectCase
        key={project.slug}
        project={project}
        index={index}
        total={projects.length}
        prev={prev}
        next={next}
      />
    </main>
  );
}
