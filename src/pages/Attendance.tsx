
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Layout/Header";
import { SidebarNav } from "@/components/Layout/Sidebar";
import { Footer } from "@/components/Layout/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Download, Search } from "lucide-react";
import { AttendanceTable } from "@/components/ui/AttendanceTable";
import { courseAttendance, facultyClasses, todaysAttendance } from "@/utils/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Attendance = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [selectedCourse, setSelectedCourse] = useState<string>(
    searchParams.get("course") || "CS301"
  );
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mode, setMode] = useState<"view" | "take">("view");
  
  const navigate = useNavigate();

  const handleCourseChange = (courseCode: string) => {
    setSelectedCourse(courseCode);
    navigate(`/attendance?course=${courseCode}`);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <div className="flex flex-1">
          <SidebarNav />
          <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
            <div className="container py-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Student Attendance</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Track and manage your student attendance records
                </p>
              </div>

              <Card className="mb-6">
                <CardHeader className="pb-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <CardTitle className="text-lg">Attendance Management</CardTitle>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="justify-start text-left font-normal w-full sm:w-auto"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <Select value={selectedCourse} onValueChange={handleCourseChange}>
                          <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            {facultyClasses.map((cls) => (
                              <SelectItem key={cls.code} value={cls.code}>
                                {cls.code}: {cls.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Tabs value={mode} onValueChange={(value) => setMode(value as "view" | "take")} className="w-full sm:w-auto">
                        <TabsList>
                          <TabsTrigger value="view">View Records</TabsTrigger>
                          <TabsTrigger value="take">Take Attendance</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {mode === "view" && selectedCourse in courseAttendance && (
                    <AttendanceTable
                      courseCode={selectedCourse}
                      courseName={courseAttendance[selectedCourse as keyof typeof courseAttendance].courseName}
                      totalClasses={courseAttendance[selectedCourse as keyof typeof courseAttendance].totalClasses}
                      students={courseAttendance[selectedCourse as keyof typeof courseAttendance].students}
                      dates={courseAttendance[selectedCourse as keyof typeof courseAttendance].dates}
                      mode="view"
                    />
                  )}
                  
                  {mode === "take" && selectedCourse === "CS301" && (
                    <AttendanceTable
                      courseCode={selectedCourse}
                      courseName={todaysAttendance.CS301.courseName}
                      students={todaysAttendance.CS301.students}
                      date={todaysAttendance.CS301.date}
                      mode="take"
                    />
                  )}
                  
                  {mode === "take" && selectedCourse !== "CS301" && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No attendance session available for this course today.</p>
                      <Button className="mt-4" onClick={() => setSelectedCourse("CS301")}>
                        Take CS301 Attendance
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Object.values(courseAttendance).reduce((acc, course) => {
                        const avgPercentage = course.students.reduce((sum, student) => sum + student.percentage!, 0) / course.students.length;
                        return acc + avgPercentage;
                      }, 0) / Object.keys(courseAttendance).length}%
                    </div>
                    <p className="text-xs text-gray-500">
                      Across all courses
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Students Below 75%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Object.values(courseAttendance).reduce((acc, course) => {
                        return acc + course.students.filter(student => student.percentage! < 75).length;
                      }, 0)}
                    </div>
                    <p className="text-xs text-gray-500">
                      Need attention
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Perfect Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Object.values(courseAttendance).reduce((acc, course) => {
                        return acc + course.students.filter(student => student.percentage === 100).length;
                      }, 0)}
                    </div>
                    <p className="text-xs text-gray-500">
                      100% attendance students
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Attendance;
