import Link from "next/link";
import { site } from "@/lib/content";

export const contactLabel = "Drop me a line";

export function SocialLinks({
  className,
  itemClassName,
}: {
  className?: string;
  itemClassName: string;
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
