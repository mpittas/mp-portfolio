"use client";

import Image from "next/image";
import { isVideoSrc, videoEmbed } from "@/lib/content";
import type { MediaModule } from "@/lib/types";

type ImageModule = Extract<MediaModule, { type: "image" }>;
type VideoModule = Extract<MediaModule, { type: "video" }>;
type TextModule = Extract<MediaModule, { type: "text" }>;
type LinkItem = { label: string; href: string };

/**
 * Same order on every case page: project links, description, then the media below.
 */
export function ProjectModules({
  modules,
  title,
}: {
  modules: MediaModule[];
  title: string;
}) {
  const links: LinkItem[] = [];
  const texts: TextModule[] = [];
  const media: (ImageModule | VideoModule)[] = [];

  for (const module of modules) {
    if (module.type === "links") links.push(...module.items);
    else if (module.type === "text") texts.push(module);
    else media.push(module);
  }

  return (
    <div className="flex flex-col">
      {links.length || texts.length ? (
        <section className="bg-paper px-4 pb-12 text-ink md:px-7 md:pb-16">
          <div className="mx-auto flex max-w-3xl flex-col gap-10">
            {links.length ? <LinkRow items={links} /> : null}
            {texts.map((text, i) => (
              <TextBody key={i} module={text} />
            ))}
          </div>
        </section>
      ) : null}

      {media.length ? (
        <section className="bg-paper px-4 pb-16 md:px-7 md:pb-24">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 md:gap-8">
            {media.map((item, i) =>
              item.type === "video" ? (
                <VideoFigure key={`${item.src}-${i}`} module={item} title={title} />
              ) : (
                <ImageFigure
                  key={`${item.src}-${i}`}
                  module={item}
                  alt={`${title} screenshot ${i + 1}`}
                />
              ),
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}

const FIGURE =
  "relative z-0 isolate overflow-hidden rounded-xl border border-rule/40 bg-plate";

function ImageFigure({ module, alt }: { module: ImageModule; alt: string }) {
  const gif = module.src.endsWith(".gif");
  const ratio = module.ratio && module.ratio > 0.1 ? module.ratio : 0.667;

  return (
    <figure data-film className={FIGURE}>
      <div
        className="relative w-full overflow-hidden"
        style={{ paddingBottom: `${ratio * 100}%` }}
      >
        <div data-film-media className="absolute inset-0">
          <Image
            src={module.src}
            alt={alt}
            fill
            unoptimized={gif}
            className="object-cover object-top"
            sizes="(min-width: 1024px) 64rem, 100vw"
          />
        </div>
      </div>
    </figure>
  );
}

function VideoFigure({ module, title }: { module: VideoModule; title: string }) {
  const local = isVideoSrc(module.src);
  const ratio = module.ratio && module.ratio > 0.1 ? module.ratio : 0.5625;

  return (
    <figure data-film className={FIGURE}>
      <div
        className="relative w-full overflow-hidden"
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
                preload="metadata"
                aria-label={`${title} video`}
                className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
              />
              {module.poster ? (
                <Image
                  src={module.poster}
                  alt=""
                  fill
                  className="hidden object-cover motion-reduce:block"
                  sizes="(min-width: 1024px) 64rem, 100vw"
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

function linkKind(label: string, href: string): "github" | "figma" | "demo" {
  const hay = `${label} ${href}`.toLowerCase();
  if (hay.includes("github") || /\bcode\b/.test(hay)) return "github";
  if (hay.includes("figma")) return "figma";
  return "demo";
}

function LinkIcon({ kind }: { kind: "github" | "figma" | "demo" }) {
  const common = {
    "aria-hidden": true as const,
    className: "size-4 shrink-0",
    viewBox: "0 0 24 24",
    fill: "currentColor",
  };

  if (kind === "github") {
    return (
      <svg {...common}>
        <path d="M12 2C6.477 2 2 6.586 2 12.253c0 4.53 2.865 8.37 6.839 9.723.5.094.682-.222.682-.493 0-.243-.009-.886-.014-1.739-2.782.618-3.369-1.38-3.369-1.38-.455-1.183-1.11-1.499-1.11-1.499-.908-.638.069-.625.069-.625 1.004.072 1.532 1.057 1.532 1.057.892 1.567 2.341 1.115 2.91.853.091-.663.35-1.115.636-1.372-2.22-.259-4.555-1.142-4.555-5.084 0-1.123.39-2.041 1.029-2.76-.103-.26-.446-1.302.098-2.714 0 0 .84-.276 2.75 1.054A9.35 9.35 0 0 1 12 6.844a9.35 9.35 0 0 1 2.504.346c1.909-1.33 2.748-1.054 2.748-1.054.546 1.412.203 2.454.1 2.714.64.719 1.028 1.637 1.028 2.76 0 3.952-2.338 4.822-4.566 5.076.359.317.679.943.679 1.901 0 1.372-.012 2.478-.012 2.815 0 .274.18.593.688.492C19.138 20.62 22 16.78 22 12.253 22 6.586 17.523 2 12 2Z" />
      </svg>
    );
  }

  if (kind === "figma") {
    return (
      <svg {...common}>
        <path d="M8.5 2A3.5 3.5 0 0 0 5 5.5 3.5 3.5 0 0 0 8.5 9H12V2H8.5Z" />
        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2Z" />
        <path d="M12 9H8.5A3.5 3.5 0 0 0 5 12.5 3.5 3.5 0 0 0 8.5 16H12V9Z" />
        <path d="M12 16H8.5A3.5 3.5 0 1 0 12 19.5V16Z" />
        <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9Z" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.75">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 4h6v6M20 4l-8 8"
      />
    </svg>
  );
}

function LinkRow({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => {
        const kind = linkKind(item.label, item.href);

        return (
          <a
            key={item.href}
            href={item.href}
            className="spec group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden bg-ink px-7 py-4 text-board no-underline motion-reduce:hover:bg-mute"
            target="_blank"
            rel="noreferrer"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-mute/25 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full motion-reduce:hidden"
            />
            <span aria-hidden className="relative z-10">
              <LinkIcon kind={kind} />
            </span>
            <span className="relative z-10">{item.label}</span>
          </a>
        );
      })}
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
      {isCredits ? (
        <div className="text-lg leading-relaxed whitespace-pre-line">
          {module.text.replace(/^credits:\s*/i, "")}
        </div>
      ) : (
        <div className="space-y-8 text-lg leading-relaxed">
          {module.text.split(/\n\n+/).map((block, i) => (
            <TextBlock key={i} text={block} />
          ))}
        </div>
      )}
    </div>
  );
}

const HEADINGS = /^(Key features|Highlights|Tech stack|Tools):\s*(.*)$/;

/** One paragraph of a description: an optional labelled heading, then prose or bullets. */
function TextBlock({ text }: { text: string }) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const match = lines[0]?.match(HEADINGS);

  if (!match) return <TextLines lines={lines} />;

  const [, heading, inline] = match;
  const body = [inline, ...lines.slice(1)].filter(Boolean);

  return (
    <div>
      <p className="spec mb-3 text-mute">{heading}</p>
      <TextLines lines={body} />
    </div>
  );
}

function TextLines({ lines }: { lines: string[] }) {
  if (lines.length && lines.every((line) => line.startsWith("•"))) {
    return (
      <ul className="space-y-3">
        {lines.map((line) => (
          <li key={line} className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-[0.3em] flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500"
            >
              <svg
                viewBox="0 0 16 16"
                className="size-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
            </span>
            <span>{line.replace(/^•\s*/, "")}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </>
  );
}
