import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Plus } from "lucide-react";
import Link from "next/link";

export default function TeacherListPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teacher Management</h1>
          <p className="text-zinc-500 text-sm">View and manage faculty members and their subject allocations.</p>
        </div>
        <Link href="/dashboard/admin/teachers/new">
          <Button><Plus className="h-4 w-4 mr-2" /> Onboard Teacher</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="hover:border-zinc-400 transition-colors">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <Users className="h-6 w-6 text-zinc-500" />
              </div>
              <div>
                <CardTitle className="text-base text-lg font-bold">Faculty Name {i}</CardTitle>
                <CardDescription>Primary: Mathematics</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Employee Type</span>
                  <span>Full-Time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Assigned Classes</span>
                  <span className="font-medium">10-A, 10-C, 12-B</span>
                </div>
              </div>
            </CardContent>
            <div className="p-4 pt-0 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
              <Button variant="ghost" size="sm" className="flex-1">Allocations</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
