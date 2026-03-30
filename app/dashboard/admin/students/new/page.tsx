import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewStudentPage() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Student Onboarding</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>Enter the student's primary information.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <Input placeholder="Jane" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input placeholder="Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Registration Number</label>
            <Input placeholder="ST-2024-001" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date of Birth</label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Gender</label>
            <select className="flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:border-zinc-800">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Blood Group</label>
            <Input placeholder="O+" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Academic & Guardian Link</CardTitle>
          <CardDescription>Assign the student to a class and section.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Class</label>
            <Input placeholder="10" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Section</label>
            <Input placeholder="A" />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium">Guardian Phone Number (to Link)</label>
            <Input placeholder="+1 234 567 890" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Link href="/dashboard/admin">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button>Register Student</Button>
      </div>
    </div>
  );
}

import Link from "next/link"
