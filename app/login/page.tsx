"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff, LogIn, CheckCircle2, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/admin";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
      } else {
        // Successful login — redirect
        window.location.href = callbackUrl;
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md shadow-xl border-zinc-200 dark:border-zinc-800">
        <CardHeader className="space-y-1">
          {isRegistered && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm rounded-xl font-medium animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle2 className="h-4 w-4" />
              Registration successful! Please sign in.
            </div>
          )}
          <CardTitle className="text-2xl text-center font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your SchoolOS portal to continue
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-tight uppercase text-zinc-500" htmlFor="email">
                Email Address
              </label>
              <Input id="email" name="email" placeholder="m@example.com" type="email" required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold tracking-tight uppercase text-zinc-500" htmlFor="password">
                  Password
                </label>
                <Link
                  className="text-xs font-bold text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  required
                  className="h-11 rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl text-md font-bold shadow-lg shadow-black/5 flex gap-2 items-center justify-center transition-transform active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
            <p className="text-sm text-center text-zinc-500 font-medium">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-black hover:underline dark:text-white font-bold">
                Join SchoolOS
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
