import type { Metadata } from "next";
import { AppImage as Image } from "@/components/ui/AppImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import { caseStudies } from "@/content/caseStudies";

const study = caseStudies.find((item) => item.client === "Berger Paints")!;

export const metadata: Metadata = {
  title: "Berger Paints: 15–20% Plant Energy Savings",
  description:
    "Full automation of 2 plant chillers and remote scheduling of 6 paint ovens at Berger Paints delivered 15–20% energy savings with real-time analytics and alerts on the dashboard.",
  alternates: { canonical: "/case-studies/berger-paints" },
  openGraph: {
    title: "Berger Paints: 15–20% Plant Energy Savings | AE Systems",
    description:
      "Full automation of 2 plant chillers and remote scheduling of 6 paint ovens at Berger Paints delivered 15–20% energy savings with real-time analytics.",
    url: "/case-studies/berger-paints",
    type: "article",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — Berger Paints case study" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Berger Paints: 15–20% Plant Energy Savings",
    description: "15–20% energy savings at Berger Paints via chiller automation and paint-oven scheduling.",
    images: ["/assets/og-image.png"],
  },
};

export default function BergerPaintsCaseStudyPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "Berger Paints", path: "/case-studies/berger-paints" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "Berger Paints", path: "/case-studies/berger-paints" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          {study.logo && (
            <Image
              src={study.logo}
              alt="Berger Paints"
              width={150}
              height={52}
              className="h-11 w-auto object-contain grayscale"
            />
          )}
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            Manufacturing — Live Deployment
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            15–20% Plant Energy Savings{" "}
            <span className="gradient-text">at Berger Paints</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            Complete automation and monitoring of 2 plant chillers plus remote scheduling of
            6 paint ovens — extending energy intelligence beyond comfort cooling into the
            production process itself.
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
