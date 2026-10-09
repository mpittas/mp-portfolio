import type { Project } from "@/lib/types";

const COPY: Record<Project["kind"], string> = {
  shipped: "Shipped product",
  concept: "Concept",
};

/** Says plainly whether a project is a live product or a self-initiated exercise. */
export function KindBadge({ kind }: { kind: Project["kind"] }) {
  const concept = kind === "concept";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-none ${
        concept
          ? "bg-accent text-accent-ink"
          : "border border-line bg-surface text-ink"
      }`}
    >
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${
          concept ? "bg-accent-ink" : "bg-accent"
        }`}
      />
      {COPY[kind]}
    </span>
  );
}
