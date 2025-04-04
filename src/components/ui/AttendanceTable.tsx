
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Clock, Download, Search, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";

type StudentAttendance = {
  id: string;
  name: string;
  attended?: number;
  percentage?: number;
  present?: boolean;
};

type AttendanceTableProps = {
  courseCode: string;
  courseName: string;
  totalClasses?: number;
  students: StudentAttendance[];
  dates?: string[];
  mode?: "view" | "take";
  date?: string;
};

export const AttendanceTable = ({
  courseCode,
  courseName,
  totalClasses,
  students,
  dates,
  mode = "view",
  date = new Date().toISOString().split("T")[0],
}: AttendanceTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [localStudents, setLocalStudents] = useState(students);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = localStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttendanceChange = (studentId: string, present: boolean) => {
    setLocalStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, present } : student
      )
    );
  };

  const submitAttendance = () => {
    // In a real app, you would save this to your API
    console.log("Submitting attendance for", courseCode, "on", date, localStudents);
    toast.success("Attendance recorded successfully!");
  };

  const downloadAttendance = () => {
    // In a real app, you would generate a CSV file
    toast.success("Attendance report downloaded!");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">{courseName}</h3>
          <p className="text-sm text-gray-500">{courseCode}</p>
        </div>
        <div className="flex items-center gap-2">
          {mode === "view" ? (
            <Button size="sm" onClick={downloadAttendance} className="gap-1">
              <Download className="h-4 w-4" />
              Download
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                <Clock className="mr-1 inline h-4 w-4" />
                Date: {date}
              </span>
              <Button size="sm" onClick={submitAttendance}>Submit Attendance</Button>
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search students..."
          className="pl-9"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              {mode === "view" ? (
                <>
                  <TableHead className="text-right w-[100px]">Attended</TableHead>
                  <TableHead className="text-right w-[100px]">Percentage</TableHead>
                </>
              ) : (
                <TableHead className="text-right">Attendance</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  {mode === "view" ? (
                    <>
                      <TableCell className="text-right">{student.attended}/{totalClasses}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            student.percentage && student.percentage >= 85
                              ? "text-green-500"
                              : student.percentage && student.percentage >= 75
                              ? "text-amber-500"
                              : "text-red-500"
                          }
                        >
                          {student.percentage}%
                        </span>
                      </TableCell>
                    </>
                  ) : (
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant={student.present ? "default" : "outline"}
                          className={student.present ? "bg-green-500 hover:bg-green-600" : ""}
                          onClick={() => handleAttendanceChange(student.id, true)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={student.present === false ? "default" : "outline"}
                          className={student.present === false ? "bg-red-500 hover:bg-red-600" : ""}
                          onClick={() => handleAttendanceChange(student.id, false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
