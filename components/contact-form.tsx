"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";

type FormStatus = "idle" | "sending" | "sent" | "error";

function FormNotice({
  variant,
  title,
  children,
}: {
  variant: "success" | "error";
  title: string;
  children: React.ReactNode;
}) {
  const isSuccess = variant === "success";

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      aria-live="polite"
      className={
        isSuccess
          ? "mt-8 border border-rule/40 bg-paper px-5 py-5 md:px-6"
          : "mt-8 border border-ink bg-ink px-5 py-5 text-board md:px-6"
      }
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className={
            isSuccess
              ? "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center border border-rule/40 bg-board text-ink"
              : "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center border border-board/20 bg-board/10 text-board"
          }
        >
          {isSuccess ? (
            <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden="true">
              <path
                d="M3.5 8.25 6.5 11.25 12.5 4.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden="true">
              <path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              <circle cx="8" cy="11.25" r="0.75" fill="currentColor" />
            </svg>
          )}
        </span>
        <div className="min-w-0">
          <p className={isSuccess ? "spec text-mute" : "spec text-board/70"}>
            {isSuccess ? "Sent" : "Not sent"}
          </p>
          <p className="mt-2 text-lg leading-snug">{title}</p>
          <p
            className={
              isSuccess
                ? "mt-2 text-base leading-relaxed text-mute"
                : "mt-2 text-base leading-relaxed text-board/80"
            }
          >
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const noticeRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (status !== "sent" && status !== "error") return;
    noticeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [status]);

  const successBody = site.googleForm
    ? "Your note is in my inbox, and the project form opened in a new tab. I will get back to you as soon as I can."
    : "Your note is in my inbox. I will get back to you as soon as I can.";

  return (
    <form
      onSubmit={onSubmit}
      className="mt-12 max-w-xl"
      aria-busy={status === "sending"}
    >
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
      <div ref={noticeRef}>
        {status === "sent" ? (
          <FormNotice variant="success" title="Thanks, message received.">
            {successBody}
          </FormNotice>
        ) : null}
        {status === "error" ? (
          <FormNotice variant="error" title="Something went wrong.">
            <>
              {errorMessage}
              <span className="mt-3 block">
                Try again in a moment, or reach out through one of the links below.
              </span>
            </>
          </FormNotice>
        ) : null}
      </div>
    </form>
  );
}
