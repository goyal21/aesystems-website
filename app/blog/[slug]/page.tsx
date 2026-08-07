import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { AppImage as Image } from "@/components/ui/AppImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { breadcrumbJsonLd, blogPostingJsonLd } from "@/lib/structuredData";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const ogImage = post.coverImage || "/assets/og-image.png";
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | AE Systems`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({ source: post.body });

  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd data={blogPostingJsonLd(post)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[780px] flex-col items-center gap-5 px-6 text-center">
          {post.categories[0] && (
            <Pill className="border border-teal/30 text-teal-light">{post.categories[0]}</Pill>
          )}
          <h1 className="text-[clamp(1.8rem,3.4vw,3rem)] text-white">{post.title}</h1>
          <div className="flex items-center gap-2 text-[0.82rem] text-muted-dark">
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTimeText}</span>
          </div>
        </Reveal>
      </div>

      {post.coverImage && (
        <div className="mx-auto mt-10 max-w-[900px] px-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)]">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="900px" />
          </div>
        </div>
      )}

      <section className="section-pad bg-white">
        <article className="blog-body mx-auto max-w-[720px] text-[0.98rem] leading-[1.8] text-body-light">
          {content}
        </article>
        {post.tags.length > 0 && (
          <div className="mx-auto mt-10 flex max-w-[720px] flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Pill key={tag} className="border border-ink/10 text-body-light">
                {tag}
              </Pill>
            ))}
          </div>
        )}
      </section>

      <ContactCta tone="light" />
    </main>
  );
}
