import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  Users, 
  Home, 
  BarChart3, 
  Settings, 
  Menu,
  Bell,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Дашборд", icon: BarChart3 },
  { id: "bookings", label: "Бронирования", icon: Calendar },
  { id: "clients", label: "Клиенты", icon: Users },
  { id: "properties", label: "Объекты", icon: Home },
  { id: "settings", label: "Настройки", icon: Settings },
];

export function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-ocean flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
              CrimeanStay CRM
            </h1>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Поиск клиентов, бронирований..." 
                className="pl-10"
              />
            </div>
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-gradient-sunset" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transition-transform duration-300 mt-16",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-6">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start transition-smooth",
                      currentPage === item.id && "bg-gradient-ocean text-white shadow-glow"
                    )}
                    onClick={() => onPageChange(item.id)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300 mt-16",
          sidebarOpen ? "ml-64" : "ml-0"
        )}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}