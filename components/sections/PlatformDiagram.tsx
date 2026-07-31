"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const stages = ["Building", "Live Sensors", "AI Model", "Equipment"];

export function PlatformDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className="relative flex h-[280px] w-full flex-col justify-center rounded-[var(--radius-card)] border border-ink/8 bg-surface px-8"
    >
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-ink/12" />
        {!reduced && (
          <motion.span
            aria-hidden="true"
            className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-teal-light shadow-[0_0_12px_2px_rgba(0,168,150,0.5)]"
            animate={inView ? { left: ["2%", "98%"] } : { left: "2%" }}
            transition={
              inView
                ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0 }
            }
          />
        )}
        {stages.map((stage) => (
          <div key={stage} className="relative z-10 flex flex-col items-center gap-2 bg-surface px-2">
            <span className="h-3 w-3 rounded-full border-2 border-teal-light bg-white" />
            <span className="eyebrow text-body-light">{stage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
