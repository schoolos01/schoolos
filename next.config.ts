import type { NextConfig } from "next";

// setupDevPlatform() runs in Node.js (not bundled), so it can safely
// import wrangler internals. It makes getRequestContext() work locally.
if (process.env.NODE_ENV === "development") {
  const { setupDevPlatform } = require("@cloudflare/next-on-pages/next-dev");
  setupDevPlatform();
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
