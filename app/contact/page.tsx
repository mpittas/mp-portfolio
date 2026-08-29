import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: site.contactBody,
};

export default function ContactPage() {
  return (
    <main className="bg-paper">
      <section className="px-4 py-16 md:px-7 md:py-24">
        <p className="spec text-mute">{site.contactHeading}</p>
        <h1 className="display-title mt-4 max-w-5xl text-[clamp(3.5rem,12vw,8rem)]">
          Drop me a line
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-snug">{site.contactBody}</p>
        <ContactForm />
        {site.socials.length > 0 ? (
          <div className="mt-16 flex flex-wrap gap-6 border-t border-rule/40 pt-8">
            {site.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                className="spec text-mute no-underline hover:text-ink"
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
