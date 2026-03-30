import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Bell, Calendar, ClipboardCheck } from "lucide-react";

export default function GuardianDashboard() {
  const linkedStudents = [
    { name: "Alex Johnson", class: "10-C", attendance: "98%", status: "In Class" },
    { name: "Maya Johnson", class: "7-A", attendance: "95%", status: "At Home" }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guardian Portal</h1>
          <p className="text-zinc-500 text-sm">Monitor your children's progress and stay updated with school notifications.</p>
        </div>
        <Button variant="outline"><Bell className="h-4 w-4 mr-2" /> Notifications</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {linkedStudents.map((child, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <CardTitle>{child.name}</CardTitle>
                <CardDescription>Grade {child.class}</CardDescription>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  {child.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs text-zinc-500 uppercase">Attendance</p>
                    <p className="text-xl font-bold">{child.attendance}</p>
                  </div>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs text-zinc-500 uppercase">Next Exam</p>
                    <p className="text-xl font-bold">Apr 15</p>
                  </div>
               </div>
               <div className="flex gap-2">
                 <Button className="flex-1" size="sm">View Detailed Profile</Button>
                 <Button variant="outline" size="sm" className="flex-1">Messages</Button>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
           <CardTitle>Upcoming School Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <EventItem date="Apr 05" title="Parent-Teacher Meeting" time="10:00 AM" />
          <EventItem date="Apr 12" title="Annual Sports Day" time="08:30 AM" />
          <EventItem date="Apr 20" title="Spring Break Starts" time="All Day" />
        </CardContent>
      </Card>
    </div>
  );
}

function EventItem({ date, title, time }: { date: string, title: string, time: string }) {
  return (
    <div className="flex items-center gap-4 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800">
       <div className="h-12 w-12 rounded bg-black text-white flex flex-col items-center justify-center text-xs font-bold dark:bg-zinc-200 dark:text-black">
         <span>{date.split(' ')[0]}</span>
         <span className="text-lg -mt-1">{date.split(' ')[1]}</span>
       </div>
       <div className="flex-1">
         <p className="font-semibold">{title}</p>
         <p className="text-xs text-zinc-500">{time}</p>
       </div>
       <Button variant="ghost" size="sm">RSVP</Button>
    </div>
  )
}
