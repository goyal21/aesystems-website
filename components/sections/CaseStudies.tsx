"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import Link from "next/link";
import { AppImage as Image } from "@/components/ui/AppImage";
import { caseStudies } from "@/content/caseStudies";

const scrims = [
  "radial-gradient(circle at 30% 30%, rgba(0,229,195,0.18), transparent 60%), linear-gradient(135deg, #0A0F1E, #0D1B2A)",
  "radial-gradient(circle at 70% 40%, rgba(0,194,255,0.16), transparent 60%), linear-gradient(135deg, #0D1B2A, #0A0F1E)",
  "radial-gradient(circle at 40% 70%, rgba(0,229,195,0.14), transparent 60%), linear-gradient(135deg, #05070D, #0D1B2A)",
];

const AUTO_ADVANCE_MS = 6000;

export function CaseStudies() {
  const [perPage, setPerPage] = useState(1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => {
      setPerPage(mq.matches ? 2 : 1);
      setActive(0);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const pageCount = Math.ceil(caseStudies.length / perPage);
  const go = (index: number) => setActive((index + pageCount) % pageCount);

  const SWIPE_THRESHOLD = 50;
  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      go(active + 1);
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      go(active - 1);
    }
  };

  useEffect(() => {
    const id = setInterval(() => setActive((prev) => (prev + 1) % pageCount), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [active, pageCount]);

  const items = caseStudies.slice(active * perPage, active * perPage + perPage);

  return (
    <section id="case-studies" className="section-pad bg-white">
      <div className="mx-auto mb-10 flex max-w-[1100px] flex-col items-center gap-3 text-center">
        <span className="font-mono text-[1.36rem] font-semibold uppercase tracking-[0.14em] text-teal-light">
          Case Studies
        </span>
        <h2 className="text-[clamp(2rem,3.8vw,3.5rem)] text-ink">
          Real Deployments. <span className="gradient-text">Real Results.</span>
        </h2>
      </div>

      <div className="relative mx-auto max-w-[1100px] px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ touchAction: "pan-y" }}
            className="grid cursor-grab grid-cols-1 gap-5 active:cursor-grabbing sm:grid-cols-2"
          >
            {items.map((study, i) => {
              const globalIndex = active * perPage + i;
              return (
                <Link
                  key={study.client}
                  href={`/case-studies/${study.slug}`}
                  className={`flex min-h-[410px] flex-col overflow-hidden rounded-[var(--radius-card)] p-7 transition-transform hover:scale-[1.01] sm:min-h-[690px] ${
                    items.length === 1 ? "sm:col-span-2" : ""
                  }`}
                  style={{ background: scrims[globalIndex % scrims.length] }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/50">
                      {study.category}
                    </span>
                    <span className="shrink-0 rounded-[3px] border border-teal/30 bg-teal/10 px-2 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-teal">
                      {study.status}
                    </span>
                  </div>

                  <div className="mt-3 flex h-14 justify-end">
                    {study.logo && (
                      <div className="flex items-center rounded-[var(--radius-control)] bg-white/95 px-3.5 shadow-sm">
                        <Image
                          src={study.logo}
                          alt={`${study.client} logo`}
                          width={160}
                          height={56}
                          className="h-9 w-auto object-contain"
                        />
                      </div>
                    )}
                  </div>

                  <h3 className="mt-3 font-display text-[1.05rem] font-bold leading-tight text-white">
                    {study.client}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="font-display text-[2.8rem] font-bold leading-none text-teal-light">
                      {study.statValue}
                    </span>
                    <span className="font-display text-[1.3rem] font-bold text-teal-light">{study.statUnit}</span>
                  </div>
                  <p className="mt-1 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-white/60">
                    {study.statCaption}
                  </p>

                  <div className="mt-4 hidden flex-col gap-3 border-t border-white/10 pt-4 sm:flex">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-cyan">
                        Challenge
                      </span>
                      <p className="text-[0.85rem] leading-relaxed text-white/80">{study.challenge}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-cyan">
                        Solution
                      </span>
                      <p className="text-[0.85rem] leading-relaxed text-white/80">{study.solution}</p>
                    </div>
                    <div className="flex flex-col gap-1 rounded-r border-l-2 border-teal-light bg-teal/[0.07] px-3.5 py-2.5">
                      <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-teal-light">
                        Outcome
                      </span>
                      <p className="text-[0.85rem] leading-relaxed text-white">{study.outcome}</p>
                    </div>
                  </div>

                  <div className="mt-auto hidden flex-wrap gap-1.5 pt-4 sm:flex">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[3px] border border-white/12 bg-white/[0.04] px-2 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.06em] text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-teal-light">
                      View full case study
                    </span>
                    <span aria-hidden className="text-teal-light">→</span>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label="Previous case studies"
          onClick={() => go(active - 1)}
          className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-white text-ink shadow-md transition-colors hover:border-teal-light hover:text-teal-light"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next case studies"
          onClick={() => go(active + 1)}
          className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-white text-ink shadow-md transition-colors hover:border-teal-light hover:text-teal-light"
        >
          →
        </button>
      </div>

      <div className="mx-auto mt-6 flex max-w-[1100px] justify-center gap-2">
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show case studies page ${index + 1}`}
            aria-current={active === index}
            onClick={() => go(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              active === index ? "bg-teal-light" : "bg-ink/15"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
