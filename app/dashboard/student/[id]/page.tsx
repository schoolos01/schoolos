import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, User, Phone, Mail, MapPin, Calendar, Heart, Shield } from "lucide-react";

export default function StudentProfilePage() {
  const student = {
    name: "Alex Johnson",
    regNo: "ST-2024-452",
    class: "10-C",
    dob: "May 12, 2010",
    gender: "Male",
    blood: "B+",
    address: "123 School Lane, Education City",
    guardian: "Sarah Johnson",
    relation: "Mother",
    guardianPhone: "+1 555 0123",
    guardianEmail: "sarah.j@example.com"
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="h-20 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
            <User className="h-10 w-10 text-zinc-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{student.name}</h1>
            <p className="text-zinc-500">Student ID: {student.regNo}</p>
          </div>
        </div>
        <Button variant="outline">Edit Profile</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Academic Overview */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Academic Identity</CardTitle>
            <CardDescription>Current enrollment and subject mapping.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <InfoItem icon={<GraduationCap className="h-4 w-4" />} label="Current Class" value={student.class} />
            <InfoItem icon={<Calendar className="h-4 w-4" />} label="Academic Year" value="2024-2025" />
            <div className="col-span-2 space-y-3">
              <p className="text-sm font-semibold border-b pb-1">Assigned Subjects & Teachers</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between p-2 bg-zinc-50 dark:bg-zinc-900 rounded">
                  <span>Mathematics</span>
                  <span className="text-zinc-500">Mr. Smith</span>
                </div>
                <div className="flex justify-between p-2 bg-zinc-50 dark:bg-zinc-900 rounded">
                  <span>Physics</span>
                  <span className="text-zinc-500">Dr. Brown</span>
                </div>
                <div className="flex justify-between p-2 bg-zinc-50 dark:bg-zinc-900 rounded">
                  <span>English</span>
                  <span className="text-zinc-500">Ms. Davis</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guardian Info */}
        <Card>
          <CardHeader>
            <CardTitle>Guardian Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <InfoItem icon={<Shield className="h-4 w-4" />} label="Primary Contact" value={student.guardian} />
             <p className="text-xs text-zinc-500 -mt-3 ml-7">{student.relation}</p>
             <InfoItem icon={<Phone className="h-4 w-4" />} label="Phone" value={student.guardianPhone} />
             <InfoItem icon={<Mail className="h-4 w-4" />} label="Email" value={student.guardianEmail} />
          </CardContent>
        </Card>

        {/* Demographic Info */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Demographic & Health</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <InfoItem icon={<Calendar className="h-4 w-4" />} label="DOB" value={student.dob} />
            <InfoItem icon={<User className="h-4 w-4" />} label="Gender" value={student.gender} />
            <InfoItem icon={<Heart className="h-4 w-4" />} label="Blood Group" value={student.blood} />
            <InfoItem icon={<MapPin className="h-4 w-4" />} label="Address" value={student.address} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 text-zinc-400">{icon}</div>
      <div>
        <p className="text-xs text-zinc-500 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
