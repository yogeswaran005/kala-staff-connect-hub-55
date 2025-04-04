
import { BarChart, BookOpen, CalendarDays, FileText, Home, LayoutDashboard, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/profile", icon: FileText },
  { name: "Classes", href: "/classes", icon: BookOpen },
  { name: "Timetable", href: "/timetable", icon: CalendarDays },
  { name: "Attendance", href: "/attendance", icon: Users },
  { name: "Reports", href: "/reports", icon: BarChart },
];

export const SidebarNav = () => {
  const location = useLocation();

  return (
    <Sidebar className="border-r bg-slate-50 dark:bg-slate-950">
      <SidebarHeader className="flex h-16 items-center px-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="rounded-full bg-kala-700 p-1">
            <Home className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold">Kalasalingam University</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                className={cn(
                  location.pathname === item.href
                    ? "bg-kala-50 text-kala-700 dark:bg-kala-950 dark:text-kala-400"
                    : "text-gray-700 hover:bg-kala-50 hover:text-kala-700 dark:text-gray-300 dark:hover:bg-kala-950 dark:hover:text-kala-400"
                )}
              >
                <Link to={item.href} className="flex items-center gap-3 px-3 py-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-center text-sm text-gray-500">
          Kalasalingam University<br />
          Faculty Portal v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
