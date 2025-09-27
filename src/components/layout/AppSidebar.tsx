import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Calendar, 
  TrendingUp, 
  Bell, 
  CreditCard, 
  MessageSquare, 
  HelpCircle, 
  User, 
  LogOut,
  Stethoscope,
  BarChart3
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const patientMenuItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Appointment", url: "/appointment", icon: Calendar },
  { title: "Therapy Progress", url: "/therapy-progress", icon: TrendingUp },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Billing", url: "/billing", icon: CreditCard },
  { title: "Feedback", url: "/feedback", icon: MessageSquare },
  { title: "Help/Support", url: "/support", icon: HelpCircle },
  { title: "Profile", url: "/profile", icon: User },
];

const doctorMenuItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Therapy Progress", url: "/therapy-progress", icon: Stethoscope },
  { title: "Billing", url: "/billing", icon: CreditCard },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Help/Support", url: "/support", icon: HelpCircle },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user, logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = user?.role === 'patient' ? patientMenuItems : doctorMenuItems;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        <div className="p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary-glow flex items-center justify-center">
                🕉️
              </div>
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">Panchkarma</h2>
                <p className="text-xs text-sidebar-foreground/70">Management System</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-primary-glow flex items-center justify-center">
                🕉️
              </div>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!collapsed && (user?.role === 'patient' ? 'Patient Menu' : 'Doctor Menu')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}