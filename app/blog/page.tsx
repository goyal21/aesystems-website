import type { Metadata } from "next";
import Link from "next/link";
import { AppImage as Image } from "@/components/ui/AppImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "HVAC Energy Optimisation Blog",
  description:
    "Practical guidance on HVAC energy savings, AI building management systems, and chiller/AHU efficiency for commercial buildings in India.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "HVAC Energy Optimisation Blog | AE Systems",
    description:
      "Practical guidance on HVAC energy savings, AI building management systems, and chiller/AHU efficiency for commercial buildings in India.",
    url: "/blog",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Energy Optimisation Blog",
    description: "Practical guidance on HVAC energy savings and AI building management systems.",
    images: ["/assets/og-image.png"],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="bg-ink">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />

      <div className="section-pad pb-0">
        <div className="mx-auto flex max-w-[820px] flex-col items-center gap-5 px-6 text-center">
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            HVAC Energy <span className="gradient-text">Optimisation Blog</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            Practical guidance on reducing HVAC energy costs, AI building management, and
            chiller/AHU efficiency benchmarks — written for facility managers and building owners
            in India.
          </p>
        </div>
      </div>

      <section className="section-pad">
        {posts.length === 0 ? (
          <p className="mx-auto max-w-[600px] text-center text-[0.95rem] text-muted-dark">
            No posts published yet — check back soon.
          </p>
        ) : (
          <div className="mx-auto grid max-w-[1100px] gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex h-full flex-col gap-3 rounded-[var(--radius-card)] border border-white/10 bg-panel p-5 transition hover:border-teal/40"
                >
                  {post.coverImage && (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-media)]">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 350px, (min-width: 640px) 45vw, 90vw"
                      />
                    </div>
                  )}
                  {post.categories[0] && (
                    <Pill className="w-fit border border-teal/30 text-teal-light">{post.categories[0]}</Pill>
                  )}
                  <h2 className="text-[1.05rem] leading-snug text-white">{post.title}</h2>
                  <p className="line-clamp-2 text-[0.85rem] leading-[1.6] text-muted-dark">{post.excerpt}</p>
                  <div className="mt-auto flex items-center gap-2 pt-2 text-[0.75rem] text-muted-dark">
                    <span>{post.author}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTimeText}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
