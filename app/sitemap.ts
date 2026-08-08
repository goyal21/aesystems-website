import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllPosts } from "@/lib/blog";
import { industries } from "@/content/industries";
import { capabilities } from "@/content/capabilities";
import { caseStudies } from "@/content/caseStudies";

export const dynamic = "force-static";

const p0Routes = ["/platform", "/industries", "/case-studies", "/about", "/contact", "/faq"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();

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
    ...caseStudies.map((study) => ({
      url: `${site.domain}/case-studies/${study.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.domain}/partners`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...industries.map((industry) => ({
      url: `${site.domain}/industries/${industry.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...capabilities.map((cap) => ({
      url: `${site.domain}/platform/${cap.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.domain}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${site.domain}/blog/${post.slug}`,
      lastModified: new Date(post.updated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${site.domain}/tools/hvac-savings-calculator`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];
}
