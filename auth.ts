import NextAuth from "next-auth";
import { D1Adapter } from "@auth/d1-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDB } from "@/lib/db";

// @ts-ignore
export const { handlers, auth, signIn, signOut } = NextAuth(async (req) => {
  // In Next.js on Cloudflare, the env is available on the request
  // @ts-ignore
  const { env } = req?.context || {};
  
  return {
    adapter: {
      createUser: async (user: any) => D1Adapter(await getDB()).createUser!(user),
      getUser: async (id: string) => D1Adapter(await getDB()).getUser!(id),
      getUserByEmail: async (email: string) => D1Adapter(await getDB()).getUserByEmail!(email),
      getUserByAccount: async (providerAccount: any) => D1Adapter(await getDB()).getUserByAccount!(providerAccount),
      updateUser: async (user: any) => D1Adapter(await getDB()).updateUser!(user),
      deleteUser: async (id: string) => D1Adapter(await getDB()).deleteUser!(id),
      linkAccount: async (account: any) => D1Adapter(await getDB()).linkAccount!(account),
      unlinkAccount: async (providerAccount: any) => D1Adapter(await getDB()).unlinkAccount!(providerAccount),
      createSession: async (session: any) => D1Adapter(await getDB()).createSession!(session),
      getSessionAndUser: async (sessionToken: string) => D1Adapter(await getDB()).getSessionAndUser!(sessionToken),
      updateSession: async (session: any) => D1Adapter(await getDB()).updateSession!(session),
      deleteSession: async (sessionToken: string) => D1Adapter(await getDB()).deleteSession!(sessionToken),
      createVerificationToken: async (verificationToken: any) => D1Adapter(await getDB()).createVerificationToken!(verificationToken),
      useVerificationToken: async (params: any) => D1Adapter(await getDB()).useVerificationToken!(params),
    },
    providers: [
      CredentialsProvider({
        name: "SchoolOS Account",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) return null;
          
          let db;
          try {
            db = await getDB();
          } catch (e) {
            console.error("Failed to get DB", e);
            return null;
          }
          
          const user: any = await db
            .prepare("SELECT * FROM users WHERE email = ? AND password = ?")
            .bind(credentials.email, credentials.password)
            .first();

          if (user) {
            return {
              id: user.id as string,
              name: user.name as string,
              email: user.email as string,
              role: user.role as string,
            };
          }
          return null;
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }: any) {
        if (user) {
          token.role = user.role;
        }
        return token;
      },
      async session({ session, token }: any) {
        if (token?.role) {
          session.user.role = token.role;
        }
        return session;
      },
      authorized({ auth, request: { nextUrl } }: any) {
        const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false; // Redirect to login
        } else if (isLoggedIn && nextUrl.pathname === "/login") {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
    session: {
      strategy: "jwt",
    },
  };
});
