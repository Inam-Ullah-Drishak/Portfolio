"use client";
import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { services } from "@/lib/services";

// Set NEXT_PUBLIC_FORM_ENDPOINT (e.g. a Formspree URL) in .env.local to receive messages.
// shortcut: without it the form falls back to opening the visitor's email app; set the endpoint before launch.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

const field =
  "w-full rounded-2xl bg-[#e9ebed] px-4 py-3 text-sm text-[#0b0808] outline-none placeholder:text-[#0b0808]/40 focus:ring-2 focus:ring-[#0b0808]/20";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Project enquiry from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\nService: ${data.service}\nFrom: ${data.name} (${data.email})`);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-3xl bg-[#e9ebed] p-6 text-sm text-[#0b0808]">
        Thanks! Your message has been sent. I will reply within 24 hours.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block">
        <span className="sr-only">Your name</span>
        <input name="name" required placeholder="Your name" autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className="sr-only">Your email</span>
        <input name="email" type="email" required placeholder="Your email" autoComplete="email" className={field} />
      </label>
      <label className="block">
        <span className="sr-only">Service you are interested in</span>
        <select name="service" defaultValue="Not sure yet" className={field}>
          <option>Not sure yet</option>
          {services.map((s) => (
            <option key={s.id}>{s.pill}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="sr-only">Tell me about your project</span>
        <textarea name="message" required rows={6} placeholder="Tell me about your project" className={`${field} resize-none`} />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-[#0b0808] px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition hover:bg-[#5d4d45] disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-xs text-red-600">
          Something went wrong. Please try again, or email me at {siteConfig.email}.
        </p>
      )}
    </form>
  );
}
