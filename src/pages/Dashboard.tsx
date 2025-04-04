
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Layout/Header";
import { SidebarNav } from "@/components/Layout/Sidebar";
import { Footer } from "@/components/Layout/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BookOpen, Calendar, Clock, FileText, Users } from "lucide-react";
import { ClassCard } from "@/components/ui/ClassCard";
import { TimetableView } from "@/components/ui/TimetableView";
import { facultyClasses, facultyTimetable } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeDay] = useState(() => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    return Object.keys(facultyTimetable).includes(today) ? today : Object.keys(facultyTimetable)[0];
  });

  // Classes taking place today
  const todaySchedule = facultyTimetable[activeDay] || [];
  const classesToday = todaySchedule.filter(
    (item) => item.activity.includes("CS") || item.activity.toLowerCase().includes("lab")
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <div className="flex flex-1">
          <SidebarNav />
          <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
            <div className="container py-6">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name?.split(" ")[0]}</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Here's what's happening with your classes today
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                    <BookOpen className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{facultyClasses.length}</div>
                    <p className="text-xs text-gray-500">
                      {facultyClasses.reduce((sum, cls) => sum + cls.students, 0)} Total Students
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
                    <Calendar className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{classesToday.length}</div>
                    <p className="text-xs text-gray-500">
                      {activeDay}, {new Date().toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Hours Today</CardTitle>
                    <Clock className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {classesToday.reduce((acc, cls) => {
                        const times = cls.time.split("-");
                        if (times.length !== 2) return acc;
                        
                        const startParts = times[0].split(":");
                        const endParts = times[1].split(":");
                        
                        if (startParts.length !== 2 || endParts.length !== 2) return acc;
                        
                        const startHour = parseInt(startParts[0], 10);
                        const startMin = parseInt(startParts[1], 10);
                        const endHour = parseInt(endParts[0], 10);
                        const endMin = parseInt(endParts[1], 10);
                        
                        const hours = (endHour + endMin / 60) - (startHour + startMin / 60);
                        return acc + hours;
                      }, 0).toFixed(1)}h
                    </div>
                    <p className="text-xs text-gray-500">
                      {classesToday.length} Teaching sessions
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Students Today</CardTitle>
                    <Users className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {classesToday.length ? 
                        facultyClasses
                          .filter(cls => classesToday.some(tc => tc.activity.includes(cls.code)))
                          .reduce((sum, cls) => sum + cls.students, 0) : 
                        0
                      }
                    </div>
                    <p className="text-xs text-gray-500">
                      From {classesToday.length} classes
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Today's Schedule</h2>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate("/timetable")}>
                    <FileText className="h-4 w-4" />
                    Full Schedule
                  </Button>
                </div>
                <div className="mt-4">
                  <TimetableView timetable={{ [activeDay]: todaySchedule }} />
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Your Classes</h2>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate("/classes")}>
                    <BookOpen className="h-4 w-4" />
                    All Classes
                  </Button>
                </div>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {facultyClasses.slice(0, 3).map((classData) => (
                    <ClassCard key={classData.id} classData={classData} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
