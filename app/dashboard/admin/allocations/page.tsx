import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Users, Plus, Search } from "lucide-react";

export default function SubjectAllocationPage() {
  return (
    <div className="flex flex-col gap-8 tracking-tight">
      <div>
        <h1 className="text-3xl font-bold">Subject Allocation</h1>
        <p className="text-zinc-500 text-sm">Map teachers to subjects and classes to build the institution's academic structure.</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input className="pl-10" placeholder="Search by teacher, subject, or class..." />
        </div>
        <Button variant="outline"><Plus className="h-4 w-4 mr-2" /> New Allocation</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Mapping</CardTitle>
          <CardDescription>Active subject allocations for the 2024-2025 academic year.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-200 dark:border-zinc-800">
                <tr className="text-left font-medium text-zinc-500">
                  <th className="pb-3 pr-4">Class</th>
                  <th className="pb-3 pr-4">Subject</th>
                  <th className="pb-3 pr-4">Teacher</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <AllocationRow classVal="10-A" subject="Mathematics" teacher="Mr. Robert Smith" status="Active" />
                <AllocationRow classVal="10-C" subject="Physics" teacher="Dr. Helena Brown" status="Active" />
                <AllocationRow classVal="12-B" subject="English Lit" teacher="Ms. Sarah Davis" status="Active" />
                <AllocationRow classVal="9-A" subject="History" teacher="Mr. James Wilson" status="Pending" />
                <AllocationRow classVal="11-C" subject="Computer Sci" teacher="Dr. David Clark" status="Active" />
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AllocationRow({ classVal, subject, teacher, status }: { classVal: string, subject: string, teacher: string, status: string }) {
  return (
    <tr className="group hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
      <td className="py-4 font-semibold">{classVal}</td>
      <td className="py-4">{subject}</td>
      <td className="py-4 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px]">
          <Users className="h-3 w-3" />
        </div>
        {teacher}
      </td>
      <td className="py-4">
        <span className={cn(
          "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
          status === 'Active' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
        )}>
          {status}
        </span>
      </td>
      <td className="py-4 text-right">
        <Button variant="ghost" size="sm">Edit</Button>
      </td>
    </tr>
  )
}

import { cn } from "@/lib/utils";
