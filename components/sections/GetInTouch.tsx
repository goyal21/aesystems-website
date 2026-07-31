"use client";

import { useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { buildingTypeOptions, interestOptions } from "@/content/contact";

type Status = "idle" | "submitting" | "sent" | "error";

const fieldClass =
  "rounded-[var(--radius-control)] border border-white/15 bg-ink px-3.5 py-2.5 text-sm text-white outline-none focus-visible:border-teal";
const labelClass = "eyebrow text-muted-dark/70";

export function GetInTouch() {
  const [status, setStatus] = useState<Status>("idle");

  function whatsappFallback(form: HTMLFormElement) {
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const interest = data.get("interest") as string;

    if (!name || !email || !phone || !interest) {
      setStatus("error");
      return;
    }

    const text = encodeURIComponent(
      "AE Systems Enquiry\n\n" +
        `Name: ${name}\n` +
        `Company: ${data.get("company") || "N/A"}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Interested In: ${interest}\n` +
        `Building Type: ${data.get("building_type") || "N/A"}\n\n` +
        `Message:\n${data.get("message") || "No message."}\n\nSent from aesystems.in`,
    );
    window.open(`${site.whatsappHref}?text=${text}`, "_blank");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("_subject", `AE Systems Enquiry: ${data.get("name")}`);

    try {
      const res = await fetch("https://formspree.io/f/xqedogwg", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-pad bg-ink">
      <SectionHeading
        center
        tone="dark"
        eyebrow="Get In Touch"
        title="Ready to Make Your Building Smarter?"
        sub="Whether you want to request a pilot, book a live dashboard demo, or get a site-specific proposal — reach out. One of our engineers will respond within 24 hours."
        className="mx-auto mb-14"
      />

      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-14 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-8 text-left">
          <div className="flex flex-col gap-4">
            <div>
              <div className={labelClass}>Email</div>
              <a href={`mailto:${site.email}`} className="text-[0.95rem] text-white hover:text-teal">
                {site.email}
              </a>
            </div>
            <div>
              <div className={labelClass}>Phone</div>
              <a href={`tel:${site.phoneHref}`} className="text-[0.95rem] text-white hover:text-teal">
                {site.phone}
              </a>
            </div>
            <div>
              <div className={labelClass}>Office</div>
              <p className="text-[0.95rem] text-white">
                {site.legalName}
                <br />
                {site.address.line1}, {site.address.locality}, {site.address.region} —{" "}
                {site.address.postalCode}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-[var(--radius-card)] border border-white/12 bg-panel p-7">
          {status === "sent" ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-2 text-center">
              <p className="font-display text-lg font-semibold text-teal">Enquiry sent.</p>
              <p className="text-sm text-muted-dark">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="gt-name" className={labelClass}>Your Name *</label>
                  <input id="gt-name" name="name" type="text" placeholder="Full Name" required className={fieldClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="gt-company" className={labelClass}>Company *</label>
                  <input id="gt-company" name="company" type="text" placeholder="Company Name" required className={fieldClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="gt-email" className={labelClass}>Email *</label>
                  <input id="gt-email" name="email" type="email" placeholder="you@company.com" required className={fieldClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="gt-phone" className={labelClass}>Phone *</label>
                  <input id="gt-phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" required className={fieldClass} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="gt-interest" className={labelClass}>I&apos;m Interested In *</label>
                <select id="gt-interest" name="interest" required className={fieldClass}>
                  <option value="">Select enquiry type…</option>
                  {interestOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="gt-type" className={labelClass}>Building / Facility Type</label>
                <select id="gt-type" name="building_type" className={fieldClass}>
                  <option value="">Select building type…</option>
                  {buildingTypeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="gt-message" className={labelClass}>Message</label>
                <textarea
                  id="gt-message"
                  name="message"
                  rows={3}
                  placeholder="Tell us about your building, current challenges, number of AHUs/chillers, or anything else that helps us prepare…"
                  className={`resize-none ${fieldClass}`}
                />
              </div>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex-1 rounded-[999px] bg-teal px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-white disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send Enquiry"}
                </button>
                <button
                  type="button"
                  onClick={(event) => whatsappFallback(event.currentTarget.form!)}
                  className="flex-1 rounded-[999px] border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-teal hover:text-teal"
                >
                  WhatsApp Instead
                </button>
              </div>

              {status === "error" && (
                <p className="text-center text-sm text-red-400">
                  Please fill Name, Email, Phone and Interest — or email {site.email} directly.
                </p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
