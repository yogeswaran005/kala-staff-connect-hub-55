
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Layout/Header";
import { SidebarNav } from "@/components/Layout/Sidebar";
import { Footer } from "@/components/Layout/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { facultyBioData } from "@/utils/mockData";
import { Award, BookOpen, Edit, FileType, FileText, GraduationCap, Pencil, User } from "lucide-react";
import { FacultyCard } from "@/components/ui/FacultyCard";
import { useState } from "react";
import { EditProfileForm } from "@/components/ui/EditProfileForm";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <div className="flex flex-1">
          <SidebarNav />
          <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
            <div className="container py-6">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Faculty Profile</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  View and manage your personal and professional information
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-4">
                <div className="md:col-span-1 space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage src={facultyBioData.personalInfo.imageUrl} alt={user?.name} />
                          <AvatarFallback>
                            {user?.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-bold">{user?.name}</h2>
                        <p className="text-sm text-gray-500">{user?.role}</p>
                        <p className="text-sm text-gray-500">{user?.department}</p>
                        <div className="mt-4 w-full">
                          <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Award className="h-5 w-5" />
                        Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {facultyBioData.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-3">
                  {isEditing ? (
                    <Card>
                      <CardContent className="pt-6">
                        <EditProfileForm onCancel={() => setIsEditing(false)} />
                      </CardContent>
                    </Card>
                  ) : (
                    <Tabs defaultValue="personal">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="personal" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span className="hidden sm:inline">Personal Info</span>
                        </TabsTrigger>
                        <TabsTrigger value="education" className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          <span className="hidden sm:inline">Education</span>
                        </TabsTrigger>
                        <TabsTrigger value="research" className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span className="hidden sm:inline">Research</span>
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="personal" className="mt-6 space-y-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">Personal Information</CardTitle>
                              <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Full Name</Label>
                              <Input value={user?.name || ""} readOnly />
                            </div>
                            <div className="space-y-2">
                              <Label>Employee ID</Label>
                              <Input value={user?.id || ""} readOnly />
                            </div>
                            <div className="space-y-2">
                              <Label>Department</Label>
                              <Input value={user?.department || ""} readOnly />
                            </div>
                            <div className="space-y-2">
                              <Label>Designation</Label>
                              <Input value={user?.role || ""} readOnly />
                            </div>
                            <div className="space-y-2">
                              <Label>Email</Label>
                              <Input value={user?.email || ""} readOnly />
                            </div>
                            <div className="space-y-2">
                              <Label>Phone</Label>
                              <Input value={user?.phone || "Not provided"} readOnly />
                            </div>
                            <div className="space-y-2">
                              <Label>Office Location</Label>
                              <Input value={user?.officeLocation || "Not provided"} readOnly />
                            </div>
                            <div className="space-y-2">
                              <Label>Joining Date</Label>
                              <Input value={user?.joinDate || "Not provided"} readOnly />
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="education" className="mt-6 space-y-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">Education Details</CardTitle>
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-6">
                              {facultyBioData.education.map((edu, index) => (
                                <div key={index} className="space-y-2 rounded-lg border p-4">
                                  <div className="flex justify-between">
                                    <h3 className="font-medium">{edu.degree}</h3>
                                    <Badge>{edu.year}</Badge>
                                  </div>
                                  <p className="text-sm text-gray-500">{edu.institution}</p>
                                </div>
                              ))}
                              <Button variant="outline" className="w-full gap-1">
                                <FileText className="h-4 w-4" />
                                Add Education
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="research" className="mt-6 space-y-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">Research Interests</CardTitle>
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {facultyBioData.research.interests.map((interest, index) => (
                                <Badge key={index} variant="outline">{interest}</Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">Research Metrics</CardTitle>
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-6 sm:grid-cols-3">
                              <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                                <h3 className="text-sm font-medium text-gray-500">Publications</h3>
                                <div className="mt-2 text-3xl font-bold">{facultyBioData.research.publications}</div>
                              </div>
                              <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                                <h3 className="text-sm font-medium text-gray-500">Projects</h3>
                                <div className="mt-2 text-3xl font-bold">{facultyBioData.research.projects}</div>
                              </div>
                              <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                                <h3 className="text-sm font-medium text-gray-500">Patents</h3>
                                <div className="mt-2 text-3xl font-bold">{facultyBioData.research.patents}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Button className="w-full gap-1">
                          <FileType className="h-4 w-4" />
                          Add Research Publication
                        </Button>
                      </TabsContent>
                    </Tabs>
                  )}
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

export default Profile;
