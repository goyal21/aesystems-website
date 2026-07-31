"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const slides = [
  { label: "Energy Dashboard", image: "/assets/products/analytics.png" },
  { label: "Digital Twin", image: "/assets/products/digital-twin.png" },
  { label: "BMS Control", image: "/assets/products/bms.png" },
  { label: "Gateway & Connectivity", image: "/assets/products/gateway.png" },
  { label: "SAAR Comparison", image: "/assets/products/saar-compare.png" },
];

const CELLS = 4;
const INTERVAL_MS = 3500;

export function SeeItInAction() {
  const [tick, setTick] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setTick((prev) => (prev + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section id="see-it-in-action" className="section-pad bg-ink">
      <SectionHeading
        center
        tone="dark"
        eyebrow="See It In Action"
        title="Every Watt, Visible. Every Building, Modelled."
        sub="Your actual dashboard is configured to your building during the pilot — illustrative preview below."
        className="mx-auto mb-12"
      />

      <RevealGroup className="mx-auto grid w-full max-w-[832px] grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: CELLS }).map((_, cellIndex) => {
          const slide = slides[(tick + cellIndex) % slides.length];
          return (
            <RevealItem
              key={cellIndex}
              className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] border border-white/10 bg-panel"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.image}
                    alt={`${slide.label} preview`}
                    fill
                    sizes="(max-width: 640px) 100vw, 520px"
                    className="object-cover"
                    priority={cellIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-4 pb-3 pt-8">
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-white/85">
                  {slide.label}
                </span>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
