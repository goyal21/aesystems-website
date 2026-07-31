"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Platform", href: "/#platform" },
  { label: "Industries", href: "/#industries" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Why Us", href: "/#why" },
  { label: "Partners", href: "/partners" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="flex h-16 items-center justify-between px-[6vw]">
        <Link href="/" className="flex items-center" aria-label="AE Systems home">
          <Image src="/assets/logo.svg" alt="AE Systems" width={110} height={26} priority />
        </Link>

        <ul className="hidden items-center gap-8 min-[1000px]:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-sm text-offwhite/85 transition-colors hover:text-teal"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-[999px] bg-teal px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-white"
            >
              Get Started
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="flex flex-col gap-1.5 min-[1000px]:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`block h-0.5 w-6 bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-white/10 bg-ink px-[6vw] pb-6 pt-2 min-[1000px]:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/5 py-3.5 font-body text-sm text-offwhite/85"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center justify-center rounded-[999px] bg-teal px-5 py-2.5 text-sm font-medium text-ink"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
