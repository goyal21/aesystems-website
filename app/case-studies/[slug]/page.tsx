import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppImage as Image } from "@/components/ui/AppImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import { caseStudies } from "@/content/caseStudies";

// IIT Jammu has its own hand-built page (app/case-studies/iit-jammu/page.tsx)
// with more detail than this generic template — excluded here so the static
// route wins for that one slug instead of this dynamic route generating it.
const dynamicCaseStudies = caseStudies.filter((study) => study.slug !== "iit-jammu");

export function generateStaticParams() {
  return dynamicCaseStudies.map((study) => ({ slug: study.slug }));
}

function getStudy(slug: string) {
  return dynamicCaseStudies.find((study) => study.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) return {};

  const title = `${study.client}: ${study.statValue}${study.statUnit} ${study.statCaption}`;
  const description = study.challenge;

  return {
    title,
    description,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: `${title} | AE Systems`,
      description,
      url: `/case-studies/${study.slug}`,
      type: "article",
      images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: `AE Systems — ${study.client} case study` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/og-image.png"],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) notFound();

  const otherStudies = dynamicCaseStudies.filter((s) => s.slug !== study.slug).slice(0, 3);

  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: study.client, path: `/case-studies/${study.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: study.client, path: `/case-studies/${study.slug}` },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          {study.logo && (
            <Image
              src={study.logo}
              alt={study.client}
              width={150}
              height={52}
              className="h-11 w-auto object-contain grayscale"
            />
          )}
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            {study.category} — {study.status === "Live" ? "Live Deployment" : "Validated POC"}
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">{study.client}</h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">{study.challenge}</p>
        </Reveal>
      </div>

      <section className="section-pad">
        <Reveal className="mx-auto flex max-w-[420px] flex-col items-center gap-2 rounded-[var(--radius-card)] border border-teal/25 bg-panel px-10 py-8 text-center">
          <span className="font-display text-[3.2rem] font-bold leading-none text-teal-light">
            {study.statValue}
            <span className="text-[1.6rem]">{study.statUnit}</span>
          </span>
          <span className="font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-white/70">
            {study.statCaption}
          </span>
        </Reveal>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">The Challenge</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">{study.challenge}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">The Deployment</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">{study.solution}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">The Result</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">{study.outcome}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[3px] border border-ink/12 bg-surface px-2.5 py-1 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-body-light"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <RelatedLinks
          tone="light"
          links={[
            { name: "All Case Studies", path: "/case-studies" },
            { name: "The SAAR Platform", path: "/platform" },
            ...otherStudies.map((s) => ({ name: s.client, path: `/case-studies/${s.slug}` })),
          ]}
        />
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
