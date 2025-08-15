import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/components/Dashboard";
import { BookingManagement } from "@/components/BookingManagement";
import { ClientManagement } from "@/components/ClientManagement";
import { PropertyManagement } from "@/components/PropertyManagement";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { Home, Search, Bell, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const Index = () => {
  // Симуляция роли пользователя - в реальном приложении будет из аутентификации
  const [userRole, setUserRole] = useState<"owner" | "admin">("owner");
  
  const location = useLocation();
  const currentPath = location.pathname;

  const renderPage = () => {
    switch (currentPath) {
      case "/":
        return <Dashboard />;
      case "/bookings":
        return <BookingManagement userRole={userRole} />;
      case "/clients": 
        return <ClientManagement userRole={userRole} />;
      case "/properties":
        return <PropertyManagement userRole={userRole} />;
      case "/finances":
        return <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Финансовая отчётность</h2>
          <p className="text-muted-foreground">Доступно только владельцу</p>
        </div>;
      case "/reports":
        return <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Отчёты и аналитика</h2>
          <p className="text-muted-foreground">Доступно только владельцу</p>
        </div>;
      case "/users":
        return <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Управление пользователями</h2>
          <p className="text-muted-foreground">Доступно только владельцу</p>
        </div>;
      case "/settings":
        return <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Настройки системы</h2>
          <p className="text-muted-foreground">Страница в разработке</p>
        </div>;
      case "/notifications":
        return <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Уведомления</h2>
          <p className="text-muted-foreground">Доступно администратору</p>
        </div>;
      case "/tasks":
        return <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Рабочие задачи</h2>
          <p className="text-muted-foreground">Доступно администратору</p>
        </div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card/95 backdrop-blur border-b">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-ocean flex items-center justify-center">
                  <Home className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
                  CrimeanStay CRM
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
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

              {/* Role Switcher - для демонстрации */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setUserRole(userRole === "owner" ? "admin" : "owner")}
                className="text-xs"
              >
                {userRole === "owner" ? "Владелец" : "Админ"}
              </Button>

              <div className="h-8 w-8 rounded-full bg-gradient-sunset flex items-center justify-center">
                <UserCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <AppSidebar userRole={userRole} />

        {/* Main Content */}
        <main className="flex-1 pt-16">
          <div className="p-6">
            {renderPage()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
