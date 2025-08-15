import { BookingManagement } from "@/components/BookingManagement";

const Bookings = () => {
  // В реальном приложении роль будет получена из контекста аутентификации
  const userRole = "owner"; // или "admin"
  
  return <BookingManagement userRole={userRole} />;
};

export default Bookings;