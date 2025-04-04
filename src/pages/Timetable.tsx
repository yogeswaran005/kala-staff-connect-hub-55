
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Layout/Header";
import { SidebarNav } from "@/components/Layout/Sidebar";
import { Footer } from "@/components/Layout/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimetableView } from "@/components/ui/TimetableView";
import { facultyTimetable } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { toast } from "sonner";

const Timetable = () => {
  const { user } = useAuth();
  
  const handleDownload = () => {
    toast.success("Timetable downloaded successfully!");
  };
  
  const handlePrint = () => {
    window.print();
    toast.success("Print dialog opened!");
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
                <h1 className="text-3xl font-bold tracking-tight">My Timetable</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  View and manage your weekly schedule
                </p>
              </div>

              <Card className="mb-6">
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Weekly Schedule</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1">
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1">
                        <Printer className="h-4 w-4" />
                        Print
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <TimetableView timetable={facultyTimetable} />
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Teaching Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(facultyTimetable).map(([day, activities]) => {
                        const classActivities = activities.filter(
                          a => a.activity.includes("CS") || a.activity.toLowerCase().includes("lab")
                        );
                        const hours = classActivities.reduce((acc, cls) => {
                          const times = cls.time.split("-");
                          if (times.length !== 2) return acc;
                          
                          const startParts = times[0].split(":");
                          const endParts = times[1].split(":");
                          
                          if (startParts.length !== 2 || endParts.length !== 2) return acc;
                          
                          const startHour = parseInt(startParts[0], 10);
                          const startMin = parseInt(startParts[1], 10);
                          const endHour = parseInt(endParts[0], 10);
                          const endMin = parseInt(endParts[1], 10);
                          
                          return acc + ((endHour + endMin / 60) - (startHour + startMin / 60));
                        }, 0);

                        return (
                          <div key={day} className="flex items-center justify-between">
                            <span>{day}</span>
                            <span className="font-medium">{hours.toFixed(1)} hours</span>
                          </div>
                        );
                      })}
                      <div className="border-t pt-2 flex items-center justify-between font-medium">
                        <span>Total</span>
                        <span>
                          {Object.values(facultyTimetable)
                            .flat()
                            .filter(a => a.activity.includes("CS") || a.activity.toLowerCase().includes("lab"))
                            .reduce((acc, cls) => {
                              const times = cls.time.split("-");
                              if (times.length !== 2) return acc;
                              
                              const startParts = times[0].split(":");
                              const endParts = times[1].split(":");
                              
                              if (startParts.length !== 2 || endParts.length !== 2) return acc;
                              
                              const startHour = parseInt(startParts[0], 10);
                              const startMin = parseInt(startParts[1], 10);
                              const endHour = parseInt(endParts[0], 10);
                              const endMin = parseInt(endParts[1], 10);
                              
                              return acc + ((endHour + endMin / 60) - (startHour + startMin / 60));
                            }, 0).toFixed(1)} hours
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Course Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(
                        Object.values(facultyTimetable)
                          .flat()
                          .filter(a => a.activity.includes("CS") || a.activity.toLowerCase().includes("lab"))
                          .reduce((acc, activity) => {
                            const courseCode = activity.activity.split(":")[0].trim();
                            acc[courseCode] = (acc[courseCode] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                      ).map(([course, count]) => (
                        <div key={course} className="flex items-center justify-between">
                          <span>{course}</span>
                          <span className="font-medium">{count} sessions</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Room Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(
                        Object.values(facultyTimetable)
                          .flat()
                          .filter(a => a.location && a.location !== "")
                          .reduce((acc, activity) => {
                            acc[activity.location] = (acc[activity.location] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                      )
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5)
                        .map(([room, count]) => (
                          <div key={room} className="flex items-center justify-between">
                            <span>{room}</span>
                            <span className="font-medium">{count} sessions</span>
                          </div>
                        ))}
                    </div>
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

export default Timetable;
