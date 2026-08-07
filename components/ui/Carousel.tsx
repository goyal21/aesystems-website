"use client";

import { useEffect, useRef, useState } from "react";

type CarouselProps = {
  children: React.ReactNode;
  autoAdvanceMs?: number;
  arrowTone?: "dark" | "light";
  className?: string;
};

/**
 * Horizontal carousel built on native scroll-snap, not JS drag — that's
 * what gives free, reliable touch-swipe on mobile. Auto-advances on a
 * timer, pauses on hover/focus, and exposes prev/next arrows that scroll
 * by exactly one item's width (measured from the first item, so it works
 * regardless of card size across the three teaser sections that use it).
 */
export function Carousel({ children, autoAdvanceMs = 3500, arrowTone = "dark", className = "" }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  function step(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>("[data-carousel-item]");
    const gap = 16;
    const amount = (item?.offsetWidth ?? 280) + gap;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        step(1);
      }
    }, autoAdvanceMs);
    return () => clearInterval(id);
  }, [isPaused, autoAdvanceMs]);

  const arrowStyle =
    arrowTone === "dark"
      ? "border-white/20 bg-ink/80 text-white hover:border-teal hover:text-teal"
      : "border-ink/15 bg-white text-ink shadow-md hover:border-teal-light hover:text-teal-light";

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Previous"
        onClick={() => step(-1)}
        className={`absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border p-2.5 transition-colors sm:flex ${arrowStyle}`}
      >
        <span aria-hidden>←</span>
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => step(1)}
        className={`absolute right-0 top-1/2 hidden translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border p-2.5 transition-colors sm:flex ${arrowStyle}`}
      >
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}
