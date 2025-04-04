
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

type ClassCardProps = {
  classData: {
    id: string;
    code: string;
    name: string;
    semester: string;
    batch: string;
    students: number;
    schedule: string;
    room: string;
  };
};

export const ClassCard = ({ classData }: ClassCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <Badge variant="outline">{classData.code}</Badge>
          <Badge variant="secondary">{classData.semester} Semester</Badge>
        </div>
        <CardTitle className="mt-2">{classData.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-0">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span>
              {classData.students} Students • {classData.batch} Batch
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{classData.schedule}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{classData.room}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-6">
        <div className="flex gap-2 justify-between w-full">
          <Button asChild variant="outline" size="sm">
            <Link to={`/attendance?course=${classData.code}`}>
              Take Attendance
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link to={`/classes/${classData.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
