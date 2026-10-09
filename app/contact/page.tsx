import type { Metadata } from "next";
import { LuArrowUpRight, LuMail } from "react-icons/lu";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: site.contactBody,
};

export default function ContactPage() {
  return (
    <main className="wrap pb-20 pt-12 md:pb-28 md:pt-20">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
          <p className="eyebrow">Contact</p>
          <h1 className="display-xl mt-4 max-w-[10ch]">Say hello.</h1>
          <p className="lede copy mt-7 text-mute">{site.contactBody}</p>

          <ul className="mt-10 space-y-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="card flex items-center justify-between gap-4 p-5 no-underline transition-colors hover:border-ink"
              >
                <span className="flex items-center gap-3">
                  <LuMail aria-hidden className="size-5" />
                  <span>
                    <span className="eyebrow block">Email</span>
                    <span className="font-medium">{site.email}</span>
                  </span>
                </span>
                <LuArrowUpRight aria-hidden className="size-5 text-mute" />
              </a>
            </li>
            {site.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="card flex items-center justify-between gap-4 p-5 no-underline transition-colors hover:border-ink"
                >
                  <span>
                    <span className="eyebrow block">Elsewhere</span>
                    <span className="font-medium">{social.label}</span>
                  </span>
                  <LuArrowUpRight aria-hidden className="size-5 text-mute" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-6">
          <div className="card p-6 md:p-9">
            <h2 className="display-md">Or send a message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
