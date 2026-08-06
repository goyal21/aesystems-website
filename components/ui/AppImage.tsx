import NextImage, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/basePath";

/**
 * next/image with images.unoptimized:true renders the raw `src` untouched —
 * it does NOT apply basePath the way the optimization proxy does. Every
 * local image needs it applied manually, so this wraps next/image and does
 * it once instead of at every call site.
 */
export function AppImage({ src, ...props }: ImageProps) {
  const resolvedSrc = typeof src === "string" ? withBasePath(src) : src;
  return <NextImage src={resolvedSrc} {...props} />;
}
