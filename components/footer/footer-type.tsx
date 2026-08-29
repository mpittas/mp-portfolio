import { site } from "@/lib/content";
import { ContactLink, SocialLinks } from "@/components/footer/footer-socials";

export function FooterType() {
  return (
    <footer className="overflow-hidden bg-board">
      <p className="display-title mb-[-0.2em] px-4 text-[clamp(6.5rem,28vw,22rem)] leading-[0.72] text-ink md:px-7">
        {site.shortName}
        <span
          className="ml-[0.05em] inline-block size-[0.12em] translate-y-[-0.2em] bg-mark align-middle"
          aria-hidden
        />
      </p>

      <div className="relative z-10 flex flex-col gap-5 border-t border-rule/40 bg-board px-4 py-5 md:flex-row md:items-center md:justify-between md:px-7">
        <p className="text-ink">{site.role}</p>
        <div className="flex flex-wrap items-center gap-5">
          <SocialLinks
            className="flex flex-wrap gap-5"
            itemClassName="spec text-mute no-underline hover:text-ink"
          />
          <ContactLink className="spec bg-ink px-5 py-3 text-board no-underline hover:bg-mute" />
        </div>
      </div>
    </footer>
  );
}
