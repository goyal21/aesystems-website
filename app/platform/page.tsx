import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { Platform } from "@/components/sections/Platform";
import { SeeItInAction } from "@/components/sections/SeeItInAction";
import { breadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "SAAR AI-BMS Platform | HVAC Intelligence",
  description:
    "One AI platform for HVAC optimisation, smart BMS, VFD control, digital twin and energy analytics. Retrofits onto your existing equipment.",
  alternates: { canonical: "/platform" },
  openGraph: {
    title: "SAAR AI-BMS Platform | HVAC Intelligence | AE Systems",
    description:
      "One AI platform for HVAC optimisation, smart BMS, VFD control, digital twin and energy analytics. Retrofits onto your existing equipment.",
    url: "/platform",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — SAAR AI-BMS Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAAR AI-BMS Platform | HVAC Intelligence",
    description: "One AI platform for HVAC optimisation, smart BMS, VFD control, digital twin and energy analytics.",
    images: ["/assets/og-image.png"],
  },
};

export default function PlatformPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Platform", path: "/platform" }]} />

      <div className="section-pad pb-0">
        <div className="mx-auto flex max-w-[820px] flex-col items-center gap-5 px-6 text-center">
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            The <span className="gradient-text">SAAR AI-BMS</span> Platform
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            SAAR AI-BMS is the single platform behind every AE Systems deployment — AI-based HVAC
            optimisation, smart BMS monitoring, direct VFD-level control, a live 3D digital twin
            and equipment-level energy analytics, all connected to your chillers, AHUs, pumps and
            VFDs without replacing any of them. It plugs into what you already have — most major
            brands including Danfoss, Schneider, ABB, Voltas, ECI and Servotech — and keeps
            learning how your building behaves, so the optimisation logic gets sharper the longer
            it runs.
          </p>
        </div>
      </div>

      <Platform />
      <SeeItInAction />
      <ContactCta tone="dark" />
    </main>
  );
}
