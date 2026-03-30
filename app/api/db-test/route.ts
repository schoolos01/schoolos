import { getDB } from "@/lib/db";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    // @ts-ignore - DB binding is injected by Cloudflare
    const { env } = (request as any).context || {};
    const db = await getDB();

    // Test a simple query
    const data = await db.prepare("SELECT 1 as result").first();

    return Response.json({ 
      success: true, 
      message: "Database connection successful",
      data: data 
    });
  } catch (error: any) {
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
