import Link from "next/link";
import { site } from "@/lib/content";

export const contactLabel = "Drop me a line";

export const footerNav = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function ExternalArrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className="ml-1 inline-block size-[0.7em] -translate-y-px"
    >
      <path
        d="M3.2 8.8 8.8 3.2M4.6 3.2h4.2v4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function SocialLinks({
  className,
  itemClassName,
  withArrow = false,
}: {
  className?: string;
  itemClassName: string;
  withArrow?: boolean;
}) {
  if (site.socials.length === 0) return null;

  return (
    <nav aria-label="Social" className={className}>
      {site.socials.map((social) => (
        <a
          key={social.href}
          href={social.href}
          className={itemClassName}
          target="_blank"
          rel="noreferrer"
        >
          {social.label}
          {withArrow ? <ExternalArrow /> : null}
        </a>
      ))}
    </nav>
  );
}

export function ContactLink({ className }: { className: string }) {
  return (
    <Link href="/contact" className={className}>
      {contactLabel}
    </Link>
  );
}
