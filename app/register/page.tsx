"use client";

import { useState, useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { User, ShieldCheck, GraduationCap, Users, Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { registerUser } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

export const runtime = "edge";

export default function RegisterPage() {
  const [role, setRole] = useState<string>("Student");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(registerUser, null);

  useEffect(() => {
    if (state?.success) {
      router.push("/login?registered=true");
    }
  }, [state, router]);

  const roles = [
    { name: "Student", icon: <GraduationCap className="h-4 w-4" /> },
    { name: "Teacher", icon: <Users className="h-4 w-4" /> },
    { name: "Guardian", icon: <User className="h-4 w-4" /> },
    { name: "Admin", icon: <ShieldCheck className="h-4 w-4" /> },
  ];

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md shadow-xl border-zinc-200 dark:border-zinc-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription className="text-center">
            Identify your role to get started with SchoolOS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-3 pb-2">
            {roles.map((r) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setRole(r.name)}
                disabled={isPending}
                className={cn(
                  "flex items-center justify-start gap-3 p-3 rounded-xl border transition-all duration-200 text-sm font-medium",
                  role === r.name 
                    ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white ring-2 ring-black/5 dark:ring-white/10 scale-[1.02]" 
                    : "bg-white text-zinc-600 border-zinc-100 hover:border-zinc-300 dark:bg-zinc-950 dark:text-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-700",
                  isPending && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  role === r.name ? "bg-white/20 dark:bg-black/10" : "bg-zinc-50 dark:bg-zinc-900"
                )}>
                  {r.icon}
                </div>
                {r.name}
              </button>
            ))}
          </div>

          <form action={formAction} id="register-form" className="space-y-4">
            <input type="hidden" name="role" value={role} />
            
            {state?.error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium">
                {state.error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-tight uppercase text-zinc-500" htmlFor="name">
                Full Name
              </label>
              <Input id="name" name="name" placeholder="John Doe" required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-tight uppercase text-zinc-500" htmlFor="email">
                Email Address
              </label>
              <Input id="email" name="email" placeholder="m@example.com" type="email" required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-tight uppercase text-zinc-500" htmlFor="password">
                Password
              </label>
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
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            type="submit" 
            form="register-form"
            disabled={isPending}
            className="w-full h-12 rounded-xl text-md font-bold shadow-lg shadow-black/10 transition-transform active:scale-[0.98]"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Complete Registration"
            )}
          </Button>
          <p className="text-sm text-center text-zinc-500 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-black hover:underline dark:text-white font-bold">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
