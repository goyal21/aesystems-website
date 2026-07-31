"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { revealChild, revealContainer } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  as?: "div";
  delay?: number;
};

/** Fades and rises a single block in on scroll entry. Skips motion under prefers-reduced-motion. */
export function Reveal({ children, delay = 0, ...props }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={revealChild}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Wraps a group of RevealItem children with an ~80ms stagger. */
export function RevealGroup({ children, ...props }: HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealContainer}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, ...props }: HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    );
  }

  return (
    <motion.div variants={revealChild} {...props}>
      {children}
    </motion.div>
  );
}
