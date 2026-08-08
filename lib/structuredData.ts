import { site } from "@/content/site";
import { faq } from "@/content/faq";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brandName,
    legalName: site.legalName,
    description:
      "AI-powered HVAC optimization platform for commercial buildings. Reduce HVAC energy costs by up to 30% without replacing equipment. IIT Jammu validated.",
    url: site.domain,
    logo: `${site.domain}/assets/logo.svg`,
    telephone: site.phone,
    email: site.email,
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.brandName,
    legalName: site.legalName,
    description:
      "AI-powered HVAC optimization platform for commercial buildings. Reduce HVAC energy costs by up to 30% without replacing equipment. IIT Jammu validated.",
    url: site.domain,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHours: "Mo-Fr 09:00-18:00",
    areaServed: "India",
    priceRange: "Rs.Rs.",
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SAAR AI-BMS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Cloud",
    description:
      "AI building management system that optimises chillers, AHUs, pumps and VFDs in existing commercial buildings, delivering 20–30% HVAC energy savings without equipment replacement.",
    provider: {
      "@type": "Organization",
      name: site.brandName,
      url: site.domain,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.domain}${item.path}`,
    })),
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  updated: string;
  author: string;
  coverImage: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.brandName,
      logo: {
        "@type": "ImageObject",
        url: `${site.domain}/assets/logo.svg`,
      },
    },
    image: post.coverImage ? `${site.domain}${post.coverImage}` : `${site.domain}/assets/og-image.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.domain}/blog/${post.slug}`,
    },
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[] = faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
