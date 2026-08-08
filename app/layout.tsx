import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { organizationJsonLd, localBusinessJsonLd, softwareApplicationJsonLd } from "@/lib/structuredData";
import { site } from "@/content/site";
import "./globals.css";

// Single brand typeface per the official AE Systems Brand Kit (OneDrive/AE
// Systems/Brand kit) - Poppins across every role (display, body, labels),
// distinguished by weight rather than by swapping typefaces.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "AI-Powered HVAC Optimization | Cut Energy Costs up to 30% | AE Systems",
    template: "%s | AE Systems",
  },
  description:
    "AE Systems is an AI-powered HVAC optimization platform for commercial buildings. Reduce HVAC energy costs by up to 30% without replacing equipment. IIT Jammu validated. Pan-India.",
  authors: [{ name: "AE Systems — Avenix Engineering Systems Pvt Ltd" }],
  robots: "index, follow",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "AE Systems",
    locale: "en_IN",
    title: "AE Systems | AI-Powered HVAC Optimization",
    description: "Reduce HVAC energy costs by up to 30% using AI — without replacing your existing equipment.",
    url: site.domain,
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — AI-powered HVAC optimisation" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AE Systems | AI-Powered HVAC Optimization",
    description: "AI that continuously optimizes your building's HVAC. Up to 30% energy savings. IIT Jammu validated.",
    images: ["/assets/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon.png", type: "image/png" },
    ],
    apple: "/assets/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0F1E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DPT283QL6C" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-DPT283QL6C');",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd()) }}
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
