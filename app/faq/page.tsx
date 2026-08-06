import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/sections/Faq";
import { breadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "HVAC Optimisation FAQs",
  description:
    "Answers on retrofit compatibility, installation time, realistic savings, data ownership, AMC support and mixed-brand HVAC sites.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "HVAC Optimisation FAQs | AE Systems",
    description:
      "Answers on retrofit compatibility, installation time, realistic savings, data ownership, AMC support and mixed-brand HVAC sites.",
    url: "/faq",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — HVAC optimisation FAQs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Optimisation FAQs",
    description: "Retrofit compatibility, installation time, realistic savings, data ownership and more.",
    images: ["/assets/og-image.png"],
  },
};

export default function FaqPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />

      <div className="px-[6vw] pb-0 pt-10">
        <Reveal className="mx-auto max-w-[1100px] text-center">
          <h1 className="text-[clamp(1.8rem,3.4vw,2.8rem)] text-white">HVAC Optimisation FAQs</h1>
        </Reveal>
      </div>

      <Faq />
      <ContactCta tone="dark" />
    </main>
  );
}
