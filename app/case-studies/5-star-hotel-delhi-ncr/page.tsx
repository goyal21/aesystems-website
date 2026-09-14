import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import { caseStudies } from "@/content/caseStudies";

const study = caseStudies.find((item) => item.client === "5-Star International Hotel, Delhi NCR")!;

export const metadata: Metadata = {
  title: "5-Star Hotel HVAC POC: ~40% AHU Savings",
  description:
    "On-site AHU proof-of-concept at a 5-star Delhi NCR hotel demonstrated ~40% AHU energy savings with VFD-inclusive scope and full BMS functionality — zero impact on guest comfort.",
  alternates: { canonical: "/case-studies/5-star-hotel-delhi-ncr" },
  openGraph: {
    title: "5-Star Hotel HVAC POC: ~40% AHU Savings | AE Systems",
    description:
      "On-site AHU proof-of-concept at a 5-star Delhi NCR hotel demonstrated ~40% AHU energy savings with VFD-inclusive scope — zero impact on guest comfort.",
    url: "/case-studies/5-star-hotel-delhi-ncr",
    type: "article",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — 5-Star Hotel case study" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "5-Star Hotel HVAC POC: ~40% AHU Savings",
    description: "~40% AHU energy savings at a 5-star Delhi NCR hotel, guest comfort held throughout.",
    images: ["/assets/og-image.png"],
  },
};

export default function HotelCaseStudyPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "5-Star Hotel, Delhi NCR", path: "/case-studies/5-star-hotel-delhi-ncr" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "5-Star Hotel, Delhi NCR", path: "/case-studies/5-star-hotel-delhi-ncr" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            Hospitality — Validated POC
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            ~40% AHU Energy Savings{" "}
            <span className="gradient-text">at a 5-Star Delhi NCR Hotel</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            An on-site proof-of-concept with VFD-inclusive scope and full BMS functionality
            mapping demonstrated ~40% AHU energy savings — without any compromise on guest
            comfort during the POC period.
          </p>
        </Reveal>
      </div>

      <section className="section-pad">
        <Reveal className="mx-auto flex max-w-[420px] flex-col items-center gap-2 rounded-[var(--radius-card)] border border-teal/25 bg-panel px-10 py-8 text-center">
          <span className="font-display text-[3.2rem] font-bold leading-none text-teal-light">
            {study.statValue}
            <span className="text-[1.6rem]">{study.statUnit}</span>
          </span>
          <span className="font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-white/70">
            {study.statCaption}
          </span>
        </Reveal>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">The Challenge</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">{study.challenge}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">The Deployment</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">{study.solution}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">The Result</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">{study.outcome}</p>
          </div>
        </div>
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
