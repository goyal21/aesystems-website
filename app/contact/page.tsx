import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { GetInTouch } from "@/components/sections/GetInTouch";
import { breadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Contact AE Systems | Request a Pilot or Demo",
  description:
    "Request a 30-day pilot, book a live dashboard demo, or get a site-specific proposal. An engineer responds within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact AE Systems | Request a Pilot or Demo",
    description:
      "Request a 30-day pilot, book a live dashboard demo, or get a site-specific proposal. An engineer responds within 24 hours.",
    url: "/contact",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "Contact AE Systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact AE Systems | Request a Pilot or Demo",
    description: "An engineer responds within 24 hours.",
    images: ["/assets/og-image.png"],
  },
};

export default function ContactPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />

      <div className="px-[6vw] pb-0 pt-10">
        <Reveal className="mx-auto max-w-[1100px]">
          <h1 className="text-[clamp(1.6rem,3vw,2.4rem)] text-white">Contact AE Systems</h1>
        </Reveal>
      </div>

      <GetInTouch />
    </main>
  );
}
