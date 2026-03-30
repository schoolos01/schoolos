import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Bell, Calendar, User, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function StudentDashboard() {
  const student = {
    name: "Alex Johnson",
    class: "10-C",
    attendance: "98%",
    status: "Present",
    grade: "A-"
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {student.name}!</h1>
          <p className="text-zinc-500 text-sm">Here's an overview of your academic activities today.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="icon"><Bell className="h-4 w-4" /></Button>
           <Button variant="outline" size="icon"><User className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatItem title="GPA" value="3.8" icon={<GraduationCap className="h-5 w-5" />} />
        <StatItem title="Attendance" value="98%" icon={<Calendar className="h-5 w-5" />} />
        <StatItem title="Active Subjects" value="8" icon={<BookOpen className="h-5 w-5 text-zinc-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Class Schedule</CardTitle>
              <CardDescription>Monday, March 29</CardDescription>
            </div>
            <Button variant="ghost" size="sm">Full Calendar</Button>
          </CardHeader>
          <CardContent className="space-y-4">
             <ScheduleItem time="09:00 AM" subject="Mathematics" teacher="Mr. Smith" room="Room 102" current={true} />
             <ScheduleItem time="10:30 AM" subject="Physics" teacher="Dr. Brown" room="Lab 2" />
             <ScheduleItem time="12:00 PM" subject="Lunch Break" teacher="-" room="Cafeteria" />
             <ScheduleItem time="01:30 PM" subject="English Literature" teacher="Ms. Davis" room="Room 205" />
          </CardContent>
        </Card>

        {/* Quick Links / Assignments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <UpdateItem title="Math Homework" desc="Due Tomorrow • Chapter 5" type="homework" />
             <UpdateItem title="Physics Quiz" desc="Graded: 18/20" type="grade" />
             <UpdateItem title="Sports Day" desc="Rescheduled to Apr 12" type="info" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatItem({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <Card className="bg-white dark:bg-black">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900">
          {icon}
        </div>
        <div>
          <p className="text-sm text-zinc-500 font-medium">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function ScheduleItem({ time, subject, teacher, room, current }: { time: string, subject: string, teacher: string, room: string, current?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-xl border transition-all",
      current 
        ? "border-black dark:border-white bg-black/5 dark:bg-white/5 ring-1 ring-black dark:ring-white" 
        : "border-zinc-100 dark:border-zinc-800"
    )}>
       <div className="w-20 text-sm font-semibold">{time}</div>
       <div className="flex-1">
         <p className="font-bold">{subject}</p>
         <p className="text-xs text-zinc-500">{teacher} • {room}</p>
       </div>
       {current && <span className="text-[10px] font-bold uppercase tracking-widest bg-black text-white px-2 py-0.5 rounded dark:bg-white dark:text-black">Now</span>}
    </div>
  )
}

function UpdateItem({ title, desc, type }: { title: string, desc: string, type: 'homework' | 'grade' | 'info' }) {
  return (
    <div className="flex gap-3 items-start group cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 p-2 rounded-lg transition-colors">
       <div className={cn(
         "h-2 w-2 rounded-full mt-2",
         type === 'homework' ? "bg-orange-500" : type === 'grade' ? "bg-green-500" : "bg-blue-500"
       )} />
       <div>
         <p className="text-sm font-semibold group-hover:underline">{title}</p>
         <p className="text-xs text-zinc-500">{desc}</p>
       </div>
    </div>
  )
}

import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
