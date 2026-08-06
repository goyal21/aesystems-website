// Mirrors next.config.ts's basePath. next/image and next/link pick up
// basePath automatically; raw <video>/<source>/poster attributes don't, so
// they need this applied explicitly.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${basePath}${path}`;
}
