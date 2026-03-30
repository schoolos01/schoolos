import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ShieldCheck, Users, BarChart3, Clock, Layout } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-12 max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 py-12 md:py-24">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-black dark:text-white">
          School<span className="text-zinc-500">OS</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
          The modern operating system for forward-thinking educational institutions. 
          Manage students, teachers, and analytics with precision.
        </p>
        <div className="flex gap-4">
          <Link href="/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">Login</Button>
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<GraduationCap className="h-6 w-6" />}
          title="Student 360"
          description="Complete identity profiles for every student, linking academics, guardians, and subjects."
        />
        <FeatureCard 
          icon={<Users className="h-6 w-6" />}
          title="Teacher Management"
          description="Onboard teachers and map them to classes and subjects with intelligent allocation."
        />
        <FeatureCard 
          icon={<BarChart3 className="h-6 w-6" />}
          title="Admin Analytics"
          description="Real-time dashboards for enrollment ratios, class capacities, and academic performance."
        />
        <FeatureCard 
          icon={<ShieldCheck className="h-6 w-6" />}
          title="Role-Based Security"
          description="Dedicated portals for Admins, Teachers, Students, and Guardians with secure access."
        />
        <FeatureCard 
          icon={<Clock className="h-6 w-6" />}
          title="Routine Manager"
          description="Automated scheduling for exams and classes across the entire institution."
        />
        <FeatureCard 
          icon={<Layout className="h-6 w-6" />}
          title="Polished UI"
          description="A professional, responsive interface designed for clarity and efficiency."
        />
      </section>

      {/* Roles Section */}
      <section className="py-12 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-3xl font-bold mb-8 text-center">One Platform, Every Role</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <RoleLink role="Admin" href="/dashboard/admin" />
          <RoleLink role="Teacher" href="/dashboard/teacher" />
          <RoleLink role="Student" href="/dashboard/student" />
          <RoleLink role="Guardian" href="/dashboard/guardian" />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="hover:border-zinc-400 transition-colors">
      <CardHeader>
        <div className="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-2">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function RoleLink({ role, href }: { role: string, href: string }) {
  return (
    <Link href={href} className="flex flex-col items-center p-6 border border-zinc-200 rounded-xl hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 transition-colors group">
      <span className="font-semibold text-zinc-500 group-hover:text-black dark:group-hover:text-white">{role}</span>
    </Link>
  );
}
