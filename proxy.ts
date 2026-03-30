import { auth } from "@/auth"

export function proxy(req: any) {
  return auth(req)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
