import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { Industries } from "@/components/sections/Industries";
import { breadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "AI HVAC Optimisation by Industry",
  description:
    "HVAC energy optimisation for hotels, hospitals, data centres, offices, campuses and airports. Sector-specific control logic, one platform.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "AI HVAC Optimisation by Industry | AE Systems",
    description:
      "HVAC energy optimisation for hotels, hospitals, data centres, offices, campuses and airports. Sector-specific control logic, one platform.",
    url: "/industries",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — AI HVAC optimisation by industry" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI HVAC Optimisation by Industry",
    description: "HVAC energy optimisation for hotels, hospitals, data centres, offices, campuses and airports.",
    images: ["/assets/og-image.png"],
  },
};

export default function IndustriesPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }]} />

      <div className="section-pad pb-0">
        <div className="mx-auto flex max-w-[820px] flex-col items-center gap-5 px-6 text-center">
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            HVAC Optimisation, <span className="gradient-text">By Sector.</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            Every sector runs HVAC differently — a hotel protects guest comfort in occupied rooms
            while cutting load in empty ones, a hospital ring-fences critical cooling zones while
            optimising everything around them, a data centre chases every fraction of a percent
            of PUE. SAAR&apos;s optimisation logic adapts to how each building type actually
            operates, on the same underlying platform.
          </p>
        </div>
      </div>

      <Industries />
      <ContactCta tone="dark" />
    </main>
  );
}
