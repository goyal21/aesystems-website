import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

/** Mirrors cms/server/src/mdx.ts's BlogPostFrontmatter - keep in sync by hand. */
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

export interface BlogPost extends BlogPostFrontmatter {
  body: string;
  readingTimeText: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as Partial<BlogPostFrontmatter>;
    const post: BlogPost = {
      title: frontmatter.title ?? "Untitled",
      slug: frontmatter.slug || file.replace(/\.mdx$/, ""),
      excerpt: frontmatter.excerpt ?? "",
      date: frontmatter.date ?? new Date(0).toISOString(),
      updated: frontmatter.updated ?? frontmatter.date ?? new Date(0).toISOString(),
      author: frontmatter.author ?? "AE Systems Team",
      categories: frontmatter.categories ?? [],
      tags: frontmatter.tags ?? [],
      coverImage: frontmatter.coverImage ?? "",
      body: content,
      readingTimeText: readingTime(content).text,
    };
    return post;
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
