import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { breadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "HVAC Energy Saving Case Studies India",
  description:
    "Real deployments, verified savings. See how AI HVAC optimisation cut campus energy use by 25% at IIT Jammu.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "HVAC Energy Saving Case Studies India | AE Systems",
    description:
      "Real deployments, verified savings. See how AI HVAC optimisation cut campus energy use by 25% at IIT Jammu.",
    url: "/case-studies",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — HVAC case studies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Energy Saving Case Studies India",
    description: "Real deployments, verified savings across campuses, hotels, manufacturing and more.",
    images: ["/assets/og-image.png"],
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }]} />

      <div className="section-pad pb-0">
        <div className="mx-auto flex max-w-[820px] flex-col items-center gap-5 px-6 text-center">
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            Verified Results, <span className="gradient-text">Not Projections.</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            From a live campus deployment at IIT Jammu to dual-metered proof-of-concept trials in
            hospitality, manufacturing, cold storage and metro rail, every result below is either
            a live deployment or an independently validated on-site POC — no modelled or
            projected numbers.
          </p>
        </div>
      </div>

      <CaseStudies />
      <ContactCta tone="light" />
    </main>
  );
}
