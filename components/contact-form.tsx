"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/content";

type FormStatus = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (site.googleForm) {
      window.open(site.googleForm, "_blank", "noopener,noreferrer");
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(
          payload?.error ??
            "Something went wrong sending your message. Please try again.",
        );
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Could not reach the server. Check your connection and try again.",
      );
    }
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
            disabled={status === "sending"}
            className="mt-2 w-full border-0 border-b border-rule bg-transparent py-3 text-lg text-ink outline-hidden placeholder:text-mute disabled:opacity-60"
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
            disabled={status === "sending"}
            className="mt-2 w-full border-0 border-b border-rule bg-transparent py-3 text-lg text-ink outline-hidden placeholder:text-mute disabled:opacity-60"
          />
        </label>
        <label className="block">
          <span className="spec text-mute">Message</span>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="The idea, the timeline, the constraints."
            disabled={status === "sending"}
            className="mt-2 w-full resize-y border-0 border-b border-rule bg-transparent py-3 text-lg text-ink outline-hidden placeholder:text-mute disabled:opacity-60"
          />
        </label>
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="spec bg-ink px-7 py-4 text-board transition-colors hover:bg-mute disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send message"}
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
            ? "Your message was sent, and the project form opened in a new tab. I will get back to you as soon as possible."
            : "Thanks. Your message was sent. I will get back to you as soon as I can."}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-6 text-mute" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
