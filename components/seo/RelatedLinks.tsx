import Link from "next/link";

export interface RelatedLink {
  name: string;
  path: string;
}

type RelatedLinksProps = {
  title?: string;
  links: RelatedLink[];
  tone?: "dark" | "light";
};

/** Internal-linking block for hub/detail pages — 3-5 related routes, not a generic footer nav. */
export function RelatedLinks({ title = "Related", links, tone = "light" }: RelatedLinksProps) {
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const linkStyles =
    tone === "dark"
      ? "border-white/15 text-white/85 hover:border-teal hover:text-teal"
      : "border-ink/12 text-body-light hover:border-teal-light hover:text-teal-light";

  return (
    <div className="mx-auto flex max-w-[720px] flex-col gap-4">
      <h2 className={`font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] ${titleColor}`}>{title}</h2>
      <div className="flex flex-wrap gap-2.5">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`rounded-[var(--radius-pill)] border px-4 py-2 text-sm transition-colors ${linkStyles}`}
          >
            {link.name} →
          </Link>
        ))}
      </div>
    </div>
  );
}
