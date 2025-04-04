
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Mail, MapPin, Phone } from "lucide-react";

type FacultyCardProps = {
  personalInfo: {
    name: string;
    employeeId: string;
    department: string;
    designation: string;
    joiningDate: string;
    email: string;
    phone: string;
    officeLocation: string;
    imageUrl: string;
  };
};

export const FacultyCard = ({ personalInfo }: FacultyCardProps) => {
  const initials = personalInfo.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="border-b bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={personalInfo.imageUrl} alt={personalInfo.name} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <CardTitle className="mt-4 text-center text-xl">{personalInfo.name}</CardTitle>
        <div className="mt-1 flex flex-col items-center">
          <Badge variant="outline" className="mb-2">
            {personalInfo.employeeId}
          </Badge>
          <div className="text-center text-sm text-gray-500">
            <span className="flex items-center justify-center gap-1">
              <Briefcase className="h-3 w-3" />
              {personalInfo.designation}
            </span>
            <span className="flex items-center justify-center gap-1 mt-1">
              <GraduationCap className="h-3 w-3" />
              {personalInfo.department}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-3">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{personalInfo.officeLocation}</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm text-gray-500">Joined:</span>
            <span className="text-sm">{personalInfo.joiningDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
