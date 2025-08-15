import { ClientManagement } from "@/components/ClientManagement";

const Clients = () => {
  // В реальном приложении роль будет получена из контекста аутентификации
  const userRole = "owner"; // или "admin"
  
  return <ClientManagement userRole={userRole} />;
};

export default Clients;