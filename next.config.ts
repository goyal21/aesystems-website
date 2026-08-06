import type { NextConfig } from "next";

// GitHub Pages serves this repo from a /aesystems-website subpath, not the
// domain root — production (aesystems.in) is the root domain. Only prefix
// asset/route paths when explicitly building for the Pages preview.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/aesystems-website" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
