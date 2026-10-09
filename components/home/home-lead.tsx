import Image from "next/image";
import { site } from "@/lib/content";

export function HomeLead() {
  return (
    <section className="flex items-start gap-6 px-4 pt-8 pb-12 md:gap-8 md:px-7 md:pt-10 md:pb-16">
      <Image
        src="/media/site/me-hero.webp"
        alt={site.name}
        width={200}
        height={200}
        sizes="(min-width: 768px) 200px, 120px"
        className="h-[120px] w-[120px] shrink-0 object-cover md:h-[200px] md:w-[200px]"
        priority
      />
      <h1 className="max-w-2xl text-xl leading-relaxed font-normal md:text-2xl">
        {site.intro}
      </h1>
    </section>
  );
}
