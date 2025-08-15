import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  Clock,
  TrendingUp
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ClientManagementProps {
  userRole: "owner" | "admin";
}

export function ClientManagement({ userRole }: ClientManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Симуляция данных клиентов
  const clients = [
    {
      id: "CL001",
      name: "Анна Петрова", 
      email: "anna.petrova@email.com",
      phone: "+7 978 123 45 67",
      location: "Москва",
      totalBookings: 5,
      totalSpent: 75000,
      lastBooking: "2024-09-15",
      status: "vip",
      rating: 5,
      registrationDate: "2023-05-10",
      notes: "Предпочитает номера с видом на море"
    },
    {
      id: "CL002",
      name: "Игорь Смирнов",
      email: "igor.smirnov@email.com", 
      phone: "+7 978 987 65 43",
      location: "Санкт-Петербург",
      totalBookings: 2,
      totalSpent: 18500,
      lastBooking: "2024-09-22",
      status: "regular",
      rating: 4,
      registrationDate: "2024-01-15",
      notes: "Путешествует с собакой"
    },
    {
      id: "CL003", 
      name: "Мария Иванова",
      email: "maria.ivanova@email.com",
      phone: "+7 978 555 33 22",
      location: "Екатеринбург",
      totalBookings: 3,
      totalSpent: 42000,
      lastBooking: "2024-09-28",
      status: "regular",
      rating: 5,
      registrationDate: "2023-08-20",
      notes: "Часто бронирует на выходные"
    },
    {
      id: "CL004",
      name: "Алексей Волков",
      email: "alexey.volkov@email.com",
      phone: "+7 978 111 22 33", 
      location: "Казань",
      totalBookings: 1,
      totalSpent: 6000,
      lastBooking: "2024-09-10",
      status: "new",
      rating: 3,
      registrationDate: "2024-08-15",
      notes: "Первое бронирование отменил"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "vip":
        return (
          <Badge className="bg-gradient-sunset text-white">
            <Star className="w-3 h-3 mr-1" />
            VIP
          </Badge>
        );
      case "regular":
        return (
          <Badge className="bg-primary text-primary-foreground">
            Постоянный
          </Badge>
        );
      case "new":
        return (
          <Badge className="bg-accent text-accent-foreground">
            Новый
          </Badge>
        );
      default:
        return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">({rating})</span>
      </div>
    );
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm) ||
                         client.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="mr-3 h-8 w-8 text-primary" />
            База клиентов
          </h1>
          <p className="text-muted-foreground">
            {userRole === "owner" ? "Управление клиентской базой и аналитика" : "Работа с клиентами"}
          </p>
        </div>
        <Button className="bg-gradient-ocean shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Добавить клиента
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего клиентов</p>
                <p className="text-2xl font-bold">{clients.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">VIP клиентов</p>
                <p className="text-2xl font-bold">
                  {clients.filter(c => c.status === "vip").length}
                </p>
              </div>
              <Star className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Новых за месяц</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        {userRole === "owner" && (
          <Card className="bg-gradient-card shadow-soft border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Средний чек</p>
                  <p className="text-2xl font-bold">₽18K</p>
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
            <CardTitle>Поиск и фильтры</CardTitle>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Показано: {filteredClients.length} из {clients.length}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени, email, телефону или ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Статус клиента" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="regular">Постоянные</SelectItem>
                <SelectItem value="new">Новые</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Clients List */}
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="bg-gradient-card shadow-soft border-0 hover:shadow-glow transition-smooth">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* Client Info */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-ocean text-white font-semibold">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{client.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {client.id}
                      </Badge>
                    </div>
                    {getStatusBadge(client.status)}
                    {getRatingStars(client.rating)}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                    {client.email}
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                    {client.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-3 w-3 mr-2 text-muted-foreground" />
                    {client.location}
                  </div>
                </div>

                {/* Booking Stats */}
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Бронирований: </span>
                    <span className="font-semibold">{client.totalBookings}</span>
                  </div>
                  {userRole === "owner" && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Потрачено: </span>
                      <span className="font-semibold text-success">
                        ₽{client.totalSpent.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="text-sm">
                    <span className="text-muted-foreground">Последний визит: </span>
                    <span className="font-medium">{client.lastBooking}</span>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Регистрация: {client.registrationDate}
                  </p>
                  <p className="text-sm italic text-muted-foreground">
                    "{client.notes}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2">
                  <Button size="sm" variant="outline" className="w-full">
                    <Eye className="h-3 w-3 mr-2" />
                    Профиль
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <Calendar className="h-3 w-3 mr-2" />
                    История
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
    </div>
  );
}