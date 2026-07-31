import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "filled" | "outline";
  tone?: "dark" | "light";
};

/** Pill CTA. `tone` picks which surface it sits on so contrast stays correct. */
export function Button({
  href,
  variant = "filled",
  tone = "dark",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[999px] px-6 py-3 text-sm font-medium font-body transition-colors duration-200";

  const styles =
    variant === "filled"
      ? tone === "dark"
        ? "bg-teal text-ink hover:bg-white"
        : "bg-ink text-white hover:bg-teal-light hover:text-ink"
      : tone === "dark"
        ? "border border-white/25 text-white hover:border-teal hover:text-teal"
        : "border border-ink/20 text-ink hover:border-teal-light hover:text-teal-light";

  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (isExternal) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </Link>
  );
}
