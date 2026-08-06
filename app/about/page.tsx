import type { Metadata } from "next";
import { AppImage as Image } from "@/components/ui/AppImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us | Avenix Engineering Systems",
  description:
    "AE Systems is the authorised global partner for SAAR AI-BMS — IIT Jammu-validated, 12 patents, 100% indigenous hardware and software.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About AE Systems | Avenix Engineering Systems",
    description:
      "AE Systems is the authorised global partner for SAAR AI-BMS — IIT Jammu-validated, 12 patents, 100% indigenous hardware and software.",
    url: "/about",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "About AE Systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About AE Systems | Avenix Engineering Systems",
    description: "Authorised global partner for SAAR AI-BMS — IIT Jammu-validated, 12 patents, 100% indigenous.",
    images: ["/assets/og-image.png"],
  },
};

const differentiators = [
  "No equipment replacement — retrofit only",
  "Motor-level control, not panel replacement",
  "12 patents · IIT Jammu validated",
  "100% indigenous hardware & software",
  "Pan-India field engineering & support",
];

export default function AboutPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-5 px-6 text-center">
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            About <span className="gradient-text">AE Systems</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            AE Systems — {site.legalName} — is the authorised global partner bringing SAAR AI-BMS
            to commercial buildings across India. We sit between the big automation giants, who
            are too expensive and too rigid for most Indian buildings, and local integrators, who
            lack the AI and product depth: IIT-validated technology, Indian pricing, and an AI
            platform purpose-built for HVAC.
          </p>
        </Reveal>
      </div>

      <section id="saar-partnership" className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-4 text-center">
          <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Built With SAAR, Validated at IIT Jammu</h2>
          <p className="text-[0.98rem] leading-[1.8] text-body-light">
            SAAR is the AI platform behind every deployment, developed with IIT Jammu researchers.
            AE Systems is the authorised global partner bringing it to buildings across India —
            from a live campus deployment on the IIT Jammu campus itself to hospitality,
            manufacturing, cold storage and metro rail sites nationwide.
          </p>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <RevealGroup className="mx-auto flex max-w-[820px] flex-col">
          {differentiators.map((item, index) => (
            <RevealItem
              key={item}
              className={`flex items-center justify-between gap-6 py-5 text-[0.95rem] text-white ${
                index !== differentiators.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <span>{item}</span>
              <span className="text-teal-light">✓</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="section-pad bg-white">
        <Reveal className="mx-auto flex max-w-[640px] flex-col items-center gap-3 text-center">
          <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Registered Office</h2>
          <address className="not-italic text-[0.98rem] leading-[1.8] text-body-light">
            {site.legalName}
            <br />
            {site.address.line1}
            <br />
            {site.address.locality}, {site.address.region} {site.address.postalCode}, India
          </address>
          <Image src="/assets/logo.svg" alt="AE Systems" width={140} height={33} className="mt-2 opacity-80" />
        </Reveal>
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
