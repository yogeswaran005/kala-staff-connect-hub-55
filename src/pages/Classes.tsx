
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Layout/Header";
import { SidebarNav } from "@/components/Layout/Sidebar";
import { Footer } from "@/components/Layout/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassCard } from "@/components/ui/ClassCard";
import { facultyClasses } from "@/utils/mockData";
import { BadgePlus, BookOpen, Search } from "lucide-react";
import { useState } from "react";

const semesterMap: Record<string, string> = {
  "3rd": "3",
  "4th": "4",
  "5th": "5",
  "6th": "6",
  "7th": "7",
  "8th": "8",
};

const Classes = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique semesters
  const semesters = Array.from(new Set(facultyClasses.map(cls => cls.semester))).sort();

  // Filter classes based on search term
  const filteredClasses = facultyClasses.filter(
    cls =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <div className="flex flex-1">
          <SidebarNav />
          <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
            <div className="container py-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">My Classes</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Manage your courses, assignments, and student progress
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search classes..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button className="w-full sm:w-auto gap-1">
                  <BadgePlus className="h-4 w-4" />
                  Add New Class
                </Button>
              </div>

              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Class Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                        <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Classes</p>
                        <h3 className="font-medium">{facultyClasses.length}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                        <BookOpen className="h-5 w-5 text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Students</p>
                        <h3 className="font-medium">
                          {facultyClasses.reduce((sum, cls) => sum + cls.students, 0)}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900">
                        <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Avg. Class Size</p>
                        <h3 className="font-medium">
                          {Math.round(facultyClasses.reduce((sum, cls) => sum + cls.students, 0) / facultyClasses.length)}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                        <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Semesters</p>
                        <h3 className="font-medium">{semesters.length}</h3>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Classes</TabsTrigger>
                  {semesters.map(sem => (
                    <TabsTrigger key={sem} value={semesterMap[sem] || sem}>
                      {sem} Semester
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredClasses.map((classData) => (
                      <ClassCard key={classData.id} classData={classData} />
                    ))}
                  </div>
                </TabsContent>

                {semesters.map(sem => (
                  <TabsContent key={sem} value={semesterMap[sem] || sem} className="mt-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredClasses
                        .filter(cls => cls.semester === sem)
                        .map((classData) => (
                          <ClassCard key={classData.id} classData={classData} />
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Classes;
