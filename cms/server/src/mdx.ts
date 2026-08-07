import matter from "gray-matter";

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  updated: string;
  author: string;
  categories: string[];
  tags: string[];
  coverImage: string;
}

/** Mirrors BlogPostFrontmatter in the Next.js app's lib/blog.ts (Phase 3) - keep in sync by hand. */
export function buildMdxFile(frontmatter: BlogPostFrontmatter, body: string): string {
  return matter.stringify(body, frontmatter);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseCommaList(input: string): string[] {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
