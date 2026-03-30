import { D1Database } from "@cloudflare/workers-types";

/**
 * Access the D1 Database binding.
 * Works across production (Cloudflare Pages) and local dev (setupDevPlatform).
 *
 * IMPORTANT: Do NOT import 'wrangler' here — it contains native binaries
 * that cannot be bundled by Turbopack/webpack. Use setupDevPlatform() in
 * next.config.ts instead, which runs outside the bundle.
 */
export async function getDB(): Promise<D1Database> {
  // Helper to check if an object is a valid D1 database
  const isValidDB = (obj: any): obj is D1Database => {
    return obj && typeof obj === "object" && typeof obj.prepare === "function";
  };

  // 1. Check globalThis (production Cloudflare Pages or injected by setupDevPlatform)
  if (isValidDB((globalThis as any).__CF_PAGES_D1_DB)) {
    return (globalThis as any).__CF_PAGES_D1_DB as D1Database;
  }

  // 2. Try @cloudflare/next-on-pages getRequestContext
  //    This works both in production AND in local dev when setupDevPlatform()
  //    has been called in next.config.ts
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    if (typeof getRequestContext === "function") {
      const context = getRequestContext();
      if (isValidDB(context?.env?.DB)) {
        return context.env.DB as D1Database;
      }
    }
  } catch {
    // Not available — may be outside a request context
  }

  // 3. Check process.env.DB (only if it's a real DB object, not a string)
  if (typeof process !== "undefined" && isValidDB((process.env as any).DB)) {
    return (process.env as any).DB as D1Database;
  }

  // 4. Check globalThis.DB
  if (isValidDB((globalThis as any).DB)) {
    return (globalThis as any).DB as D1Database;
  }

  throw new Error(
    "D1 Database binding 'DB' not found. Please run with 'npm run dev:cf'"
  );
}
