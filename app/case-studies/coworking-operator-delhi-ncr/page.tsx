import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import { caseStudies } from "@/content/caseStudies";

const study = caseStudies.find((item) => item.client === "Leading Co-working Operator, Delhi NCR")!;

export const metadata: Metadata = {
  title: "Co-working HVAC POC: 57.8% AHU Savings",
  description:
    "An 8-week dual-metered AHU proof-of-concept at a Delhi NCR co-working space delivered 57.8% AHU energy reduction — independently validated with zero operational risk to the client.",
  alternates: { canonical: "/case-studies/coworking-operator-delhi-ncr" },
  openGraph: {
    title: "Co-working HVAC POC: 57.8% AHU Savings | AE Systems",
    description:
      "An 8-week dual-metered AHU proof-of-concept at a Delhi NCR co-working space delivered 57.8% AHU energy reduction — independently validated.",
    url: "/case-studies/coworking-operator-delhi-ncr",
    type: "article",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — Co-working case study" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Co-working HVAC POC: 57.8% AHU Savings",
    description: "57.8% AHU energy reduction in an 8-week dual-metered POC at a Delhi NCR co-working space.",
    images: ["/assets/og-image.png"],
  },
};

export default function CoworkingCaseStudyPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "Co-working Operator, Delhi NCR", path: "/case-studies/coworking-operator-delhi-ncr" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "Co-working Operator, Delhi NCR", path: "/case-studies/coworking-operator-delhi-ncr" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            Commercial Real Estate — Validated POC
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            57.8% AHU Energy Reduction{" "}
            <span className="gradient-text">at a Delhi NCR Co-working Space</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            A parallel 8-week proof-of-concept run alongside the existing BMS — dual-metered
            throughout — independently validated 57.8% AHU energy reduction with zero
            operational risk and zero capital commitment from the client.
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
