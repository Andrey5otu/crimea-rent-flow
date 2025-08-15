import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "bookings":
        return <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Управление бронированиями</h2>
          <p className="text-muted-foreground">Страница в разработке</p>
        </div>;
      case "clients": 
        return <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">База клиентов</h2>
          <p className="text-muted-foreground">Страница в разработке</p>
        </div>;
      case "properties":
        return <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Управление объектами</h2>
          <p className="text-muted-foreground">Страница в разработке</p>
        </div>;
      case "settings":
        return <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Настройки</h2>
          <p className="text-muted-foreground">Страница в разработке</p>
        </div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default Index;
