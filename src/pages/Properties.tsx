import { PropertyManagement } from "@/components/PropertyManagement";

const Properties = () => {
  // В реальном приложении роль будет получена из контекста аутентификации
  const userRole = "owner"; // или "admin"
  
  return <PropertyManagement userRole={userRole} />;
};

export default Properties;