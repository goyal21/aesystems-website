import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

const p0Routes = ["/platform", "/industries", "/case-studies", "/about", "/contact", "/faq"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: site.domain,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...p0Routes.map((route) => ({
      url: `${site.domain}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${site.domain}/case-studies/iit-jammu`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${site.domain}/partners`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
