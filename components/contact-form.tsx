"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/content";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (site.googleForm) {
      window.open(site.googleForm, "_blank", "noopener,noreferrer");
    }
    setStatus("sent");
  }

  return (
    <form onSubmit={onSubmit} className="mt-12 max-w-xl">
      <div className="grid gap-8">
        <label className="block">
          <span className="spec text-mute">Name</span>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className="mt-2 w-full border-0 border-b border-rule bg-transparent py-3 text-lg text-ink outline-hidden placeholder:text-mute"
          />
        </label>
        <label className="block">
          <span className="spec text-mute">Email address</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@studio.com"
            className="mt-2 w-full border-0 border-b border-rule bg-transparent py-3 text-lg text-ink outline-hidden placeholder:text-mute"
          />
        </label>
        <label className="block">
          <span className="spec text-mute">Message</span>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="The idea, the timeline, the constraints."
            className="mt-2 w-full resize-y border-0 border-b border-rule bg-transparent py-3 text-lg text-ink outline-hidden placeholder:text-mute"
          />
        </label>
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className="spec bg-ink px-7 py-4 text-board transition-colors hover:bg-mute"
        >
          Send message
        </button>
        {site.googleForm ? (
          <a
            href={site.googleForm}
            className="spec text-mute no-underline hover:text-ink"
            target="_blank"
            rel="noreferrer"
          >
            Google Form
          </a>
        ) : null}
      </div>
      {status === "sent" ? (
        <p className="mt-6 text-mute" role="status">
          {site.googleForm
            ? "The project form opened in a new tab. I will get back to you as soon as possible."
            : "Thanks — I will get back to you as soon as I can."}
        </p>
      ) : null}
    </form>
  );
}
