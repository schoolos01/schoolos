"use server";

import { getDB } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function registerUser(prevState: any, formData: FormData) {
  try {
    const db = await getDB();
    console.log(`[registerUser] Using DB object. Type: ${typeof db}, Has prepare: ${typeof (db as any)?.prepare === 'function'}`);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const roleInput = formData.get("role") as string;
    const role = roleInput?.toUpperCase();

    if (!email || !password || !name || !role) {
      return { error: "Missing fields" };
    }

    // Check if user already exists
    const existingUser = await db.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    if (existingUser) {
      return { error: "User already exists" };
    }

    const id = uuidv4();

    await db.prepare(
      "INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)"
    ).bind(id, name, email, password, role).run();

    return { success: true };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { error: error.message || "Failed to register" };
  }
}
