import Link from "next/link";
import { site } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">
            {site.name}
          </p>
          <p className="mt-1 text-sm text-mute">
            {site.role} · {site.location} · &copy; {year}
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <li>
            <a href={`mailto:${site.email}`} className="link-u">
              Email
            </a>
          </li>
          {site.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="link-u"
              >
                {social.label}
              </a>
            </li>
          ))}
          <li>
            <a href={site.cvUrl} className="link-u" download>
              CV
            </a>
          </li>
          <li>
            <Link href="/contact" className="link-u">
              Contact form
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
