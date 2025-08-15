import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookingManagementProps {
  userRole: "owner" | "admin";
}

export function BookingManagement({ userRole }: BookingManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Симуляция данных бронирований
  const bookings = [
    {
      id: "BK001",
      guest: "Анна Петрова",
      property: "Вилла Море",
      checkIn: "2024-09-15",
      checkOut: "2024-09-20", 
      status: "confirmed",
      amount: 15000,
      guests: 4,
      phone: "+7 978 123 45 67",
      email: "anna.petrova@email.com",
      created: "2024-08-20",
      source: "Booking.com"
    },
    {
      id: "BK002", 
      guest: "Игорь Смирнов",
      property: "Дом в горах",
      checkIn: "2024-09-22",
      checkOut: "2024-09-25",
      status: "pending",
      amount: 8500,
      guests: 2,
      phone: "+7 978 987 65 43",
      email: "igor.smirnov@email.com", 
      created: "2024-09-01",
      source: "Прямое"
    },
    {
      id: "BK003",
      guest: "Мария Иванова", 
      property: "Квартира у моря",
      checkIn: "2024-09-28",
      checkOut: "2024-10-02",
      status: "confirmed",
      amount: 12000,
      guests: 3,
      phone: "+7 978 555 33 22",
      email: "maria.ivanova@email.com",
      created: "2024-08-25", 
      source: "Avito"
    },
    {
      id: "BK004",
      guest: "Алексей Волков",
      property: "Коттедж Лазурный",
      checkIn: "2024-09-10",
      checkOut: "2024-09-12",
      status: "cancelled",
      amount: 6000,
      guests: 2,
      phone: "+7 978 111 22 33",
      email: "alexey.volkov@email.com",
      created: "2024-08-15",
      source: "Airbnb"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle className="w-3 h-3 mr-1" />
            Подтверждено
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-accent text-accent-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Ожидает
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Отменено
          </Badge>
        );
      default:
        return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Calendar className="mr-3 h-8 w-8 text-primary" />
            Управление бронированиями
          </h1>
          <p className="text-muted-foreground">
            {userRole === "owner" ? "Полное управление всеми бронированиями" : "Обработка текущих бронирований"}
          </p>
        </div>
        <Button className="bg-gradient-ocean shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Новое бронирование
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Активных</p>
                <p className="text-2xl font-bold">28</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ожидают</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <Clock className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Сегодня заезд</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <MapPin className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        {userRole === "owner" && (
          <Card className="bg-gradient-card shadow-soft border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Доход месяц</p>
                  <p className="text-2xl font-bold">₽245K</p>
                </div>
                <DollarSign className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card shadow-soft border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Фильтры и поиск</CardTitle>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Найдено: {filteredBookings.length} из {bookings.length}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по гостю, объекту или номеру..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="confirmed">Подтверждено</SelectItem>
                <SelectItem value="pending">Ожидает</SelectItem>
                <SelectItem value="cancelled">Отменено</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="grid gap-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="bg-gradient-card shadow-soft border-0 hover:shadow-glow transition-smooth">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Guest Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{booking.guest}</h3>
                    <Badge variant="outline" className="text-xs">
                      {booking.id}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{booking.property}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {booking.guests} гостей
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {booking.checkIn} - {booking.checkOut}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                    {booking.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                    {booking.email}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {booking.source}
                  </Badge>
                </div>

                {/* Status & Amount */}
                <div className="space-y-2">
                  {getStatusBadge(booking.status)}
                  {userRole === "owner" && (
                    <div className="text-lg font-semibold text-success">
                      ₽{booking.amount.toLocaleString()}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Создано: {booking.created}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2">
                  <Button size="sm" variant="outline" className="w-full">
                    <Eye className="h-3 w-3 mr-2" />
                    Просмотр
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <Edit className="h-3 w-3 mr-2" />
                    Редактировать
                  </Button>
                  {userRole === "owner" && (
                    <Button size="sm" variant="destructive" className="w-full">
                      <Trash2 className="h-3 w-3 mr-2" />
                      Удалить
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardContent className="p-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Бронирования не найдены</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить фильтры или добавить новое бронирование
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}