import { site } from "@/lib/content";

export function HomeLead() {
  return (
    <section className="px-4 pt-8 pb-6 md:px-7 md:pt-10 md:pb-8">
      <h1 className="max-w-2xl text-xl leading-relaxed font-normal md:text-2xl">
        {site.intro}
      </h1>
    </section>
  );
}
