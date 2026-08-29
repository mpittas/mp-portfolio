import { site } from "@/lib/content";

export function HomeLead() {
  return (
    <section className="px-4 pt-8 pb-6 md:px-7 md:pt-10 md:pb-8">
      <h1 className="display-title max-w-4xl text-[clamp(2.25rem,5vw,3.75rem)]">
        {site.introHeading.replace("!", "")}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-snug md:text-xl">{site.intro}</p>
    </section>
  );
}
