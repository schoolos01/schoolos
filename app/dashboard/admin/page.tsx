import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Admin Analytics</h1>
        <div className="flex gap-2">
           <Link href="/dashboard/admin/students/new">
             <Button>Add Student</Button>
           </Link>
           <Link href="/dashboard/admin/teachers/new">
             <Button variant="outline">Add Teacher</Button>
           </Link>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value="1,280" icon={<GraduationCap className="h-4 w-4" />} change="+12% from last year" />
        <StatCard title="Total Teachers" value="84" icon={<Users className="h-4 w-4" />} change="4 new this month" />
        <StatCard title="Subject Distribution" value="24" icon={<BookOpen className="h-4 w-4" />} change="Across 12 grades" />
        <StatCard title="Overall Attendance" value="94.2%" icon={<TrendingUp className="h-4 w-4" />} change="+2.1% from last month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Student Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">Student Name {i}</p>
                    <p className="text-xs text-zinc-500">Grade {10 - i} • Section A</p>
                  </div>
                  <Link href={`/dashboard/student/${i}`}>
                    <Button variant="ghost" size="sm">View</Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teacher Assignments */}
        <Card>
          <CardHeader>
            <CardTitle>Teacher Subject Mapping</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Math', 'Science', 'English', 'History', 'Physics'].map((subject, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{subject}</p>
                    <p className="text-xs text-zinc-500">Assigned to: Teacher Alpha {i}</p>
                  </div>
                  <Button variant="ghost" size="sm">Reassign</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, change }: { title: string, value: string, icon: React.ReactNode, change: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-zinc-500">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-zinc-500 mt-1">{change}</p>
      </CardContent>
    </Card>
  );
}
