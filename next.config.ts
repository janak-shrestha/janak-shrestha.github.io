import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root (a stray lockfile in a parent folder would otherwise be picked up).
  outputFileTracingRoot: process.cwd(),

  // Old static-site URLs (about.html, de/about.html, ...) keep working.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/de/index.html", destination: "/de", permanent: true },
      { source: "/:page(about|experience|stack|blog|contact).html", destination: "/:page", permanent: true },
      { source: "/de/:page(about|experience|stack|blog|contact).html", destination: "/de/:page", permanent: true },
    ];
  },
};

export default nextConfig;
