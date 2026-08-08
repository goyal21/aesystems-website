import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { SavingsCalculator } from "@/components/sections/SavingsCalculator";
import { breadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "HVAC Energy Savings Calculator",
  description:
    "Estimate your building's potential HVAC energy savings based on tonnage, run hours, climate and current VFD status. Free, no sign-up required.",
  alternates: { canonical: "/tools/hvac-savings-calculator" },
  openGraph: {
    title: "HVAC Energy Savings Calculator | AE Systems",
    description:
      "Estimate your building's potential HVAC energy savings based on tonnage, run hours, climate and current VFD status.",
    url: "/tools/hvac-savings-calculator",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — HVAC Savings Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Energy Savings Calculator",
    description: "Estimate your building's potential HVAC energy savings in under a minute.",
    images: ["/assets/og-image.png"],
  },
};

export default function HvacSavingsCalculatorPage() {
  return (
    <main className="bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "HVAC Savings Calculator", path: "/tools/hvac-savings-calculator" },
        ])}
      />
      <div className="bg-ink">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "HVAC Savings Calculator", path: "/tools/hvac-savings-calculator" }]} />

        <div className="section-pad pb-14">
          <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
            <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
              Free Tool
            </span>
            <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
              HVAC Energy <span className="gradient-text">Savings Calculator</span>
            </h1>
            <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
              Enter your plant's basics — tonnage, run hours, climate, current VFD status — for an
              indicative estimate of what an AI-BMS retrofit could save. Takes under a minute, no
              sign-up required.
            </p>
          </Reveal>
        </div>
      </div>

      <section className="section-pad bg-surface">
        <SavingsCalculator />
      </section>
    </main>
  );
}
