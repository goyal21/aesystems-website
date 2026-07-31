"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { caseStudies } from "@/content/caseStudies";

const scrims = [
  "radial-gradient(circle at 30% 30%, rgba(0,229,195,0.18), transparent 60%), linear-gradient(135deg, #0A0F1E, #0D1B2A)",
  "radial-gradient(circle at 70% 40%, rgba(0,194,255,0.16), transparent 60%), linear-gradient(135deg, #0D1B2A, #0A0F1E)",
  "radial-gradient(circle at 40% 70%, rgba(0,229,195,0.14), transparent 60%), linear-gradient(135deg, #05070D, #0D1B2A)",
];

export function CaseStudies() {
  const [active, setActive] = useState(0);
  const study = caseStudies[active];

  const go = (index: number) => setActive((index + caseStudies.length) % caseStudies.length);

  return (
    <section id="case-studies" className="section-pad bg-white">
      <div className="mx-auto mb-10 flex max-w-[1100px] flex-col items-center gap-3 text-center">
        <span className="font-mono text-[1.36rem] font-semibold uppercase tracking-[0.14em] text-teal-light">
          Case Studies
        </span>
        <h2 className="text-[clamp(2.2rem,5vw,4rem)] text-ink">
          Real Deployments. <span className="gradient-text">Real Results.</span>
        </h2>
      </div>

      <div className="relative mx-auto h-[460px] max-w-[1100px] overflow-hidden rounded-[var(--radius-card)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={study.client}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-end p-9"
            style={{ background: scrims[active % scrims.length] }}
          >
            <span className="absolute right-5 top-5 font-mono text-[0.6rem] uppercase tracking-wider text-white/30">
              Photo pending
            </span>
            <div className="flex max-w-[560px] flex-col gap-3">
              <span className="eyebrow text-teal">
                {study.status === "Verified" ? "✓ Verified" : "⟳ Ongoing"} — {study.client}
              </span>
              <h3 className="font-display text-[1.9rem] font-bold leading-tight text-white">
                {study.headline}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-white/85">{study.copy}</p>
              <Button href="/#contact" variant="outline" tone="dark" className="mt-2 w-fit">
                {study.cta}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mx-auto mt-5 flex max-w-[1100px] items-center justify-between">
        <div className="flex gap-2">
          {caseStudies.map((cs, index) => (
            <button
              key={cs.client}
              type="button"
              aria-label={`Show case study: ${cs.client}`}
              aria-current={active === index}
              onClick={() => setActive(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                active === index ? "bg-teal-light" : "bg-ink/15"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous case study"
            onClick={() => go(active - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-teal-light hover:text-teal-light"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next case study"
            onClick={() => go(active + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-teal-light hover:text-teal-light"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
