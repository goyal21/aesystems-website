import Link from "next/link";

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail. Pair with `breadcrumbJsonLd(items)` for the matching schema. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="px-[6vw] pt-24">
      <ol className="mx-auto flex max-w-[1100px] flex-wrap items-center gap-1.5 text-[0.8rem] text-muted-dark">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span aria-current="page" className="text-white">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-teal">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
