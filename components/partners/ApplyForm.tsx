"use client";

import { useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { applyPerks, partnerSectors, partnerTypes } from "@/content/partners";
import { site } from "@/content/site";

type Status = "idle" | "submitting" | "sent" | "error";

const inputClass =
  "rounded-[var(--radius-control)] border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus-visible:border-teal-light";

export function ApplyForm() {
  const [status, setStatus] = useState<Status>("idle");

  function whatsappFallback(form: HTMLFormElement) {
    const data = new FormData(form);
    const text = encodeURIComponent(
      `AE Systems — Partner Application\n\n` +
        `Name: ${data.get("first_name")} ${data.get("last_name")}\n` +
        `Company: ${data.get("company") || "N/A"}\n` +
        `City: ${data.get("city") || "N/A"}\n` +
        `Email: ${data.get("email")}\n` +
        `Phone: ${data.get("phone")}\n` +
        `Partner Type: ${data.get("partner_type") || "N/A"}\n` +
        `Sector: ${data.get("sector") || "N/A"}\n\n` +
        `About My Business:\n${data.get("message") || "No additional info."}\n\n` +
        `Sent from aesystems.in/partners`,
    );
    window.open(`${site.whatsappHref}?text=${text}`, "_blank");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    const data = new FormData(form);
    data.append("_subject", `AE Systems Partner Application: ${data.get("company") || data.get("first_name")}`);

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
    <section id="apply" className="section-pad bg-surface">
      <SectionHeading
        eyebrow="Partner Application"
        title={
          <>
            Let&apos;s Build
            <br />
            <span className="gradient-text">Together.</span>
          </>
        }
        className="mx-auto mb-12 max-w-[1100px]"
      />

      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-14 lg:grid-cols-[1fr_1.5fr]">
        <Reveal className="flex flex-col gap-6">
          <p className="text-[0.95rem] leading-relaxed text-body-light">
            Tell us about your business and we&apos;ll be in touch within 48 hours. No commitment
            required at this stage — just a conversation.
          </p>
          <ul className="flex flex-col gap-3">
            {applyPerks.map((perk) => (
              <li key={perk} className="flex gap-2.5 text-[0.85rem] leading-snug text-ink/80">
                <span className="mt-0.5 shrink-0 text-teal-light">✓</span>
                {perk}
              </li>
            ))}
          </ul>

          <div className="rounded-[var(--radius-media)] border border-ink/10 bg-white p-5">
            <div className="eyebrow mb-1.5 text-teal-light">Existing Partners</div>
            <p className="mb-4 text-[0.85rem] leading-relaxed text-body-light">
              Already onboarded? Log in to access your leads, resources, commission tracker, and
              support portal.
            </p>
            <a
              href={site.partnerLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-[999px] bg-ink px-5 py-2.5 text-center text-sm font-medium text-white"
            >
              Partner Login →
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-[var(--radius-card)] border border-ink/10 bg-white p-7">
          {status === "sent" ? (
            <div className="flex h-full min-h-[380px] flex-col items-center justify-center gap-2 text-center">
              <p className="font-display text-lg font-semibold text-teal-light">Application received.</p>
              <p className="text-sm text-body-light">We&apos;ll be in touch within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pf-first" className="eyebrow text-body-light/80">First Name *</label>
                  <input id="pf-first" name="first_name" type="text" required className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pf-last" className="eyebrow text-body-light/80">Last Name *</label>
                  <input id="pf-last" name="last_name" type="text" required className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pf-company" className="eyebrow text-body-light/80">Company *</label>
                  <input id="pf-company" name="company" type="text" required className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pf-city" className="eyebrow text-body-light/80">City / Region *</label>
                  <input id="pf-city" name="city" type="text" required className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pf-email" className="eyebrow text-body-light/80">Business Email *</label>
                  <input id="pf-email" name="email" type="email" required className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pf-phone" className="eyebrow text-body-light/80">Phone *</label>
                  <input id="pf-phone" name="phone" type="tel" required className={inputClass} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pf-type" className="eyebrow text-body-light/80">Partner Type *</label>
                <select id="pf-type" name="partner_type" required className={inputClass}>
                  <option value="">Select partner type…</option>
                  {partnerTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pf-sector" className="eyebrow text-body-light/80">Primary Sector</label>
                <select id="pf-sector" name="sector" className={inputClass}>
                  <option value="">Select primary sector…</option>
                  {partnerSectors.map((sector) => (
                    <option key={sector}>{sector}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pf-msg" className="eyebrow text-body-light/80">Tell Us About Your Business</label>
                <textarea id="pf-msg" name="message" rows={3} className={`resize-none ${inputClass}`} />
              </div>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex-1 rounded-[999px] bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-light disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Submit Application"}
                </button>
                <button
                  type="button"
                  onClick={(event) => whatsappFallback(event.currentTarget.form!)}
                  className="flex-1 rounded-[999px] border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-teal-light hover:text-teal-light"
                >
                  WhatsApp Instead
                </button>
              </div>

              {status === "error" && (
                <p className="text-center text-sm text-red-500">
                  Something went wrong. Please WhatsApp or email {site.email} directly.
                </p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
