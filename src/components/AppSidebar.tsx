import { useState } from "react";
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Home, 
  Settings, 
  DollarSign,
  FileText,
  Bell,
  Shield,
  UserCog,
  Building,
  MapPin,
  Phone,
  Mail,
  ClipboardList,
  TrendingUp,
  Archive
} from "lucide-react";
import { useLocation, NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  userRole: "owner" | "admin";
}

export function AppSidebar({ userRole }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium shadow-glow" : "hover:bg-muted/50";

  // Меню для владельца - полный доступ
  const ownerMenuItems = [
    {
      group: "Управление",
      items: [
        { title: "Дашборд", url: "/", icon: BarChart3 },
        { title: "Бронирования", url: "/bookings", icon: Calendar },
        { title: "Клиенты", url: "/clients", icon: Users },
        { title: "Объекты", url: "/properties", icon: Home },
      ]
    },
    {
      group: "Финансы",
      items: [
        { title: "Финансы", url: "/finances", icon: DollarSign },
        { title: "Отчёты", url: "/reports", icon: FileText },
        { title: "Аналитика", url: "/analytics", icon: TrendingUp },
      ]
    },
    {
      group: "Администрирование", 
      items: [
        { title: "Пользователи", url: "/users", icon: UserCog },
        { title: "Настройки", url: "/settings", icon: Settings },
        { title: "Безопасность", url: "/security", icon: Shield },
      ]
    }
  ];

  // Меню для админа - ограниченный доступ
  const adminMenuItems = [
    {
      group: "Основное",
      items: [
        { title: "Дашборд", url: "/", icon: BarChart3 },
        { title: "Бронирования", url: "/bookings", icon: Calendar },
        { title: "Клиенты", url: "/clients", icon: Users },
        { title: "Объекты", url: "/properties", icon: Home },
      ]
    },
    {
      group: "Задачи",
      items: [
        { title: "Уведомления", url: "/notifications", icon: Bell },
        { title: "Задачи", url: "/tasks", icon: ClipboardList },
        { title: "Контакты", url: "/contacts", icon: Phone },
      ]
    }
  ];

  const menuItems = userRole === "owner" ? ownerMenuItems : adminMenuItems;

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"}>
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        {/* User Role Badge */}
        <div className="p-4 border-b">
          <div className={`flex items-center space-x-2 ${collapsed ? "justify-center" : ""}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
              userRole === "owner" ? "bg-gradient-sunset" : "bg-gradient-ocean"
            }`}>
              {userRole === "owner" ? 
                <Shield className="h-4 w-4 text-white" /> : 
                <UserCog className="h-4 w-4 text-white" />
              }
            </div>
            {!collapsed && (
              <div>
                <p className="font-semibold">
                  {userRole === "owner" ? "Владелец" : "Администратор"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {userRole === "owner" ? "Полный доступ" : "Рабочий доступ"}
                </p>
              </div>
            )}
          </div>
        </div>

        {menuItems.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink to={item.url} end className={getNavCls}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        
        {/* Quick Stats for collapsed view */}
        {collapsed && (
          <div className="mt-auto p-2 space-y-2">
            <div className="h-8 w-8 rounded bg-success/20 flex items-center justify-center mx-auto">
              <span className="text-xs font-bold text-success">28</span>
            </div>
            <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center mx-auto">
              <span className="text-xs font-bold text-primary">15</span>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}