import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "AI HVAC Optimisation", href: "/#platform" },
      { label: "See It In Action", href: "/#see-it-in-action" },
      { label: "3D Digital Twin", href: "/#platform" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Hotels & Hospitality", href: "/#industries" },
      { label: "Hospitals & Healthcare", href: "/#industries" },
      { label: "Data Centers", href: "/#industries" },
      { label: "All Industries", href: "/#industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Built With SAAR", href: "/#built-with" },
      { label: "Why AE Systems", href: "/#why" },
      { label: "Partner Programme", href: "/partners" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "/#case-studies" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-panel px-[6vw] pb-8 pt-20 text-white">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Image src="/assets/logo.svg" alt="AE Systems" width={130} height={34} />
          <p className="max-w-[280px] text-sm leading-relaxed text-muted-dark">
            AI-powered HVAC optimisation for buildings that never stop running — 20–30% energy
            savings, no equipment replacement.
          </p>
          <address className="not-italic text-sm leading-relaxed text-muted-dark">
            {site.legalName}
            <br />
            {site.address.line1}
            <br />
            {site.address.locality}, {site.address.region} {site.address.postalCode}
            <br />
            <a href={`tel:${site.phoneHref}`} className="hover:text-teal">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="hover:text-teal">
              {site.email}
            </a>
          </address>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h4 className="eyebrow text-muted-dark/70">{col.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-dark hover:text-teal">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 flex max-w-[1300px] flex-col gap-2 border-t border-white/10 pt-6 text-xs text-muted-dark md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved. Authorised
          Global Partner of SAAR System Solutions.
        </p>
      </div>
    </footer>
  );
}
