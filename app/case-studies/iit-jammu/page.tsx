import type { Metadata } from "next";
import { AppImage as Image } from "@/components/ui/AppImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import { caseStudies } from "@/content/caseStudies";

const study = caseStudies.find((item) => item.client === "IIT Jammu")!;

export const metadata: Metadata = {
  title: "IIT Jammu: 25% Campus HVAC Energy Savings",
  description:
    "How 7 AHUs and 2 chillers under AI control delivered 25% campus HVAC energy savings, with 35 energy meters under continuous monitoring.",
  alternates: { canonical: "/case-studies/iit-jammu" },
  openGraph: {
    title: "IIT Jammu: 25% Campus HVAC Energy Savings | AE Systems",
    description:
      "How 7 AHUs and 2 chillers under AI control delivered 25% campus HVAC energy savings, with 35 energy meters under continuous monitoring.",
    url: "/case-studies/iit-jammu",
    type: "article",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — IIT Jammu case study" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IIT Jammu: 25% Campus HVAC Energy Savings",
    description: "7 AHUs and 2 chillers under AI control, 25% campus HVAC energy savings.",
    images: ["/assets/og-image.png"],
  },
};

const monitoredPoints = [
  { value: "7", label: "AHUs under active AI control" },
  { value: "2", label: "Chillers under active AI control" },
  { value: "35", label: "Energy meters, continuous monitoring" },
  { value: "4", label: "BTU meters" },
  { value: "4", label: "Noise sensors" },
  { value: "4", label: "Vibration sensors" },
  { value: "5", label: "Temperature / humidity sensors" },
];

export default function IitJammuCaseStudyPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "IIT Jammu", path: "/case-studies/iit-jammu" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "IIT Jammu", path: "/case-studies/iit-jammu" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <Image
            src="/assets/iit-jammu-logo.png"
            alt="IIT Jammu"
            width={150}
            height={52}
            className="h-11 w-auto object-contain grayscale"
          />
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            Campus / Institutional — Live Deployment
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            25% Campus HVAC Energy Savings <span className="gradient-text">at IIT Jammu</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            A full controlling and monitoring deployment brought IIT Jammu&apos;s chiller plant,
            air handling units and lab spaces under one AI control layer — delivering verified,
            campus-wide HVAC energy savings with every reading visible on a single dashboard.
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

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {monitoredPoints.map((point) => (
              <div
                key={point.label}
                className="flex flex-col gap-1 rounded-[var(--radius-control)] border border-ink/10 px-4 py-3.5 text-center"
              >
                <span className="font-display text-2xl font-bold text-teal-light">{point.value}</span>
                <span className="text-[0.75rem] leading-snug text-body-light">{point.label}</span>
              </div>
            ))}
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
