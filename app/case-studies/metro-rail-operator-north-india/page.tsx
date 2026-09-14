import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import { caseStudies } from "@/content/caseStudies";

const study = caseStudies.find((item) => item.client === "Major Urban Metro Rail Operator, North India")!;

export const metadata: Metadata = {
  title: "Metro Rail HVAC POC: 40.2% Energy Saving",
  description:
    "AI control of station AHUs on two 30kW VFDs delivered 40.2% lower energy intensity — 129 kWh avoided per day — with passenger comfort and safety interlocks fully intact.",
  alternates: { canonical: "/case-studies/metro-rail-operator-north-india" },
  openGraph: {
    title: "Metro Rail HVAC POC: 40.2% Energy Saving | AE Systems",
    description:
      "AI control of station AHUs on two 30kW VFDs delivered 40.2% lower energy intensity — 129 kWh avoided per day — with passenger comfort and safety interlocks fully intact.",
    url: "/case-studies/metro-rail-operator-north-india",
    type: "article",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — Metro Rail case study" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metro Rail HVAC POC: 40.2% Energy Saving",
    description: "40.2% lower AHU energy intensity at a major metro station, safety interlocks intact.",
    images: ["/assets/og-image.png"],
  },
};

export default function MetroRailCaseStudyPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "Metro Rail Operator", path: "/case-studies/metro-rail-operator-north-india" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "Metro Rail Operator", path: "/case-studies/metro-rail-operator-north-india" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            Urban Rail / Metro — Validated POC
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            40.2% Lower AHU Energy Intensity{" "}
            <span className="gradient-text">at a Major Metro Station</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            Air-side AI control on station AHUs reduced energy intensity from 22.58 to 13.52 kWh
            per running hour — about 129 kWh avoided daily — while keeping the platform 0.86°C
            cooler and leaving every safety interlock untouched.
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
