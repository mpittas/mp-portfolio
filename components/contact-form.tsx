"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { LuCheck, LuTriangleAlert } from "react-icons/lu";

type FormStatus = "idle" | "sending" | "sent" | "error";

const field =
  "mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-base text-ink outline-hidden transition-colors placeholder:text-mute/70 focus:border-ink disabled:opacity-60";

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

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

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

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="mt-8" aria-busy={sending}>
      <div className="grid gap-6">
        <label className="block">
          <span className="text-sm font-semibold">Name</span>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            disabled={sending}
            className={field}
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Email address</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            disabled={sending}
            className={field}
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Message</span>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="The role, the product, the timeline."
            disabled={sending}
            className={`${field} resize-y`}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="btn btn-primary mt-8 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Sending..." : "Send message"}
      </button>

      <div ref={noticeRef} aria-live="polite">
        {status === "sent" ? (
          <div
            role="status"
            className="mt-6 flex gap-3 rounded-xl border border-line bg-sunken p-4"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
              <LuCheck aria-hidden className="size-4" />
            </span>
            <p className="text-[0.9375rem]">
              <span className="font-semibold">Thanks, message received.</span>{" "}
              Your note is in my inbox and I will get back to you as soon as I
              can.
            </p>
          </div>
        ) : null}
        {status === "error" ? (
          <div
            role="alert"
            className="mt-6 flex gap-3 rounded-xl border border-ink bg-sunken p-4"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-bg">
              <LuTriangleAlert aria-hidden className="size-4" />
            </span>
            <p className="text-[0.9375rem]">
              <span className="font-semibold">Not sent.</span> {errorMessage}{" "}
              You can also email me directly.
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
