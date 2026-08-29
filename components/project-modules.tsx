"use client";

import Image from "next/image";
import { isVideoSrc, videoEmbed } from "@/lib/content";
import type { MediaModule } from "@/lib/types";

export function ProjectModules({
  modules,
  title,
}: {
  modules: MediaModule[];
  title: string;
}) {
  const blocks: MediaModule[][] = [];

  for (let i = 0; i < modules.length; i += 1) {
    const current = modules[i];
    const next = modules[i + 1];
    if (current.type === "links" && next?.type === "text") {
      blocks.push([current, next]);
      i += 1;
      continue;
    }
    blocks.push([current]);
  }

  return (
    <div className="flex flex-col">
      {blocks.map((group, i) => {
        if (group.length === 2 && group[0].type === "links" && group[1].type === "text") {
          return (
            <section
              key={i}
              className="bg-paper px-4 pt-12 pb-16 text-ink md:px-7 md:pt-16 md:pb-20"
            >
              <div className="mx-auto flex max-w-3xl flex-col gap-10">
                <LinkRow items={group[0].items} />
                <TextBody module={group[1]} />
              </div>
            </section>
          );
        }

        const module = group[0];

        if (module.type === "text") {
          return (
            <section
              key={i}
              className="bg-paper px-4 py-16 text-ink md:px-7 md:py-24"
            >
              <div className="mx-auto max-w-3xl">
                <TextBody module={module} />
              </div>
            </section>
          );
        }

        if (module.type === "video") {
          const local = isVideoSrc(module.src);
          const ratio = module.ratio && module.ratio > 0.1 ? module.ratio : 0.5625;
          return (
            <figure key={i} data-film className="relative z-0 isolate overflow-clip bg-plate [clip-path:inset(0)]">
              <div
                className="relative w-full overflow-clip [clip-path:inset(0)]"
                style={{ paddingBottom: `${ratio * 100}%` }}
              >
                <div data-film-media className="absolute inset-0">
                  {local ? (
                    <>
                      <video
                        src={module.src}
                        poster={module.poster ?? undefined}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="auto"
                        aria-label={`${title} video`}
                        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
                      />
                      {module.poster ? (
                        <Image
                          src={module.poster}
                          alt={i === 0 ? title : ""}
                          fill
                          priority={i === 0}
                          className="hidden object-cover motion-reduce:block"
                          sizes="100vw"
                        />
                      ) : null}
                    </>
                  ) : (
                    <iframe
                      src={videoEmbed(module)}
                      title={`${title} video`}
                      className="absolute inset-0 h-full w-full border-0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            </figure>
          );
        }

        if (module.type === "links") {
          return (
            <section
              key={i}
              className="bg-paper px-4 py-12 text-ink md:px-7 md:py-16"
            >
              <div className="mx-auto max-w-3xl">
                <LinkRow items={module.items} />
              </div>
            </section>
          );
        }

        const gif = module.src.endsWith(".gif");
        const ratio = module.ratio && module.ratio > 0.1 ? module.ratio : 0.667;

        return (
          <figure key={i} data-film className="relative z-0 isolate overflow-clip bg-plate [clip-path:inset(0)]">
            <div
              className="relative w-full overflow-clip [clip-path:inset(0)]"
              style={{ paddingBottom: `${ratio * 100}%` }}
            >
              <div data-film-media className="absolute inset-0">
                <Image
                  src={module.src}
                  alt={i === 0 ? title : ""}
                  fill
                  priority={i === 0}
                  unoptimized={gif}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
          </figure>
        );
      })}
    </div>
  );
}

function LinkRow({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="spec group relative inline-flex cursor-pointer items-center gap-4 overflow-hidden bg-ink px-7 py-4 text-board no-underline"
          target="_blank"
          rel="noreferrer"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-board transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full motion-reduce:hidden"
          />
          <span className="relative z-10 transition-colors duration-300 group-hover:text-ink motion-reduce:group-hover:text-board">
            {item.label}
          </span>
          <span
            aria-hidden
            className="relative z-10 transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-ink motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:text-board"
          >
            ↗
          </span>
        </a>
      ))}
    </div>
  );
}

function TextBody({
  module,
  className,
}: {
  module: Extract<MediaModule, { type: "text" }>;
  className?: string;
}) {
  const isCredits = /^credits:/i.test(module.text);

  return (
    <div data-film-text className={className}>
      {isCredits ? <p className="spec mb-6 text-mute">Credits</p> : null}
      <div className="space-y-5 text-lg leading-relaxed whitespace-pre-line">
        {isCredits ? module.text.replace(/^credits:\s*/i, "") : module.text}
      </div>
    </div>
  );
}
