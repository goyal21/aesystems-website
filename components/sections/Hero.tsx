"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { StatRow } from "@/components/ui/StatRow";
import { heroCredentials, heroStats } from "@/content/stats";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!reduced) {
      videoRef.current?.play().catch(() => {});
    }
  }, [reduced]);

  return (
    <section id="hero" className="bg-ink pt-16">
      <div className="relative h-[calc(100vh-64px)] min-h-[560px] w-full overflow-hidden">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          poster="/assets/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/assets/hero.webm" type="video/webm" />
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>

        {/* top & bottom scrims — middle 60% of the frame stays clear */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[28%] bg-gradient-to-b from-ink/85 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-ink/90 to-transparent" />

        {/* top band — credential chips */}
        <div className="absolute inset-x-0 top-0 flex justify-center px-4 pt-6">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: -12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-nowrap items-center gap-3 overflow-x-auto"
          >
            {heroCredentials.map((label) => (
              <Pill key={label} className="border border-white/25 bg-white/10 text-white/90 backdrop-blur-sm">
                {label}
              </Pill>
            ))}
          </motion.div>
        </div>

        {/* bottom band — headline, sub, CTAs */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-5 px-6 pb-12 text-center">
          <motion.h1
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[clamp(2.3rem,4.5vw,4rem)] font-bold text-white"
          >
            Stop Wasting <span className="gradient-text">HVAC Energy.</span>
          </motion.h1>
          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="max-w-[560px] text-[1rem] leading-relaxed text-offwhite/90"
          >
            AI that continuously learns how your building behaves and optimises your HVAC in
            real time — cutting energy costs by 20–30% without replacing a single chiller, AHU
            or pump.
          </motion.p>
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button href="/#contact" variant="filled" tone="dark">
              Request a Pilot →
            </Button>
            <Button href="/#platform" variant="outline" tone="dark">
              See the Platform
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="section-pad">
        <StatRow stats={heroStats} tone="dark" />
      </div>
    </section>
  );
}
