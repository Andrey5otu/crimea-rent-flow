import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Home,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export function Dashboard() {
  // Симуляция данных
  const stats = [
    {
      title: "Доход за месяц",
      value: "₽245,000",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Активных бронирований",
      value: "28",
      change: "+3",
      trend: "up", 
      icon: Calendar,
      color: "text-primary"
    },
    {
      title: "Новых клиентов",
      value: "15",
      change: "+8",
      trend: "up",
      icon: Users,
      color: "text-accent"
    },
    {
      title: "Загруженность",
      value: "85%",
      change: "+5%",
      trend: "up",
      icon: Home,
      color: "text-primary-glow"
    }
  ];

  const recentBookings = [
    {
      id: 1,
      guest: "Анна Петрова",
      property: "Вилла Море",
      dates: "15-20 сент",
      status: "confirmed",
      amount: "₽15,000"
    },
    {
      id: 2,
      guest: "Игорь Смирнов", 
      property: "Дом в горах",
      dates: "22-25 сент",
      status: "pending",
      amount: "₽8,500"
    },
    {
      id: 3,
      guest: "Мария Иванова",
      property: "Квартира у моря",
      dates: "28 сент - 2 окт", 
      status: "confirmed",
      amount: "₽12,000"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-success text-success-foreground">Подтверждено</Badge>;
      case "pending":
        return <Badge className="bg-accent text-accent-foreground">Ожидает</Badge>;
      default:
        return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Добро пожаловать!</h1>
          <p className="text-muted-foreground">Обзор вашего бизнеса в Крыму</p>
        </div>
        <Button className="bg-gradient-ocean shadow-glow">
          <Calendar className="mr-2 h-4 w-4" />
          Новое бронирование
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-gradient-card shadow-soft border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">{stat.change}</span>
                  <span className="text-xs text-muted-foreground">с прошлого месяца</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <Card className="lg:col-span-2 bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              Последние бронирования
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-smooth">
                  <div className="space-y-1">
                    <p className="font-medium">{booking.guest}</p>
                    <p className="text-sm text-muted-foreground">{booking.property}</p>
                    <p className="text-xs text-muted-foreground">{booking.dates}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-semibold">{booking.amount}</p>
                    {getStatusBadge(booking.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-success" />
              Быстрые действия
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Календарь бронирований
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Добавить клиента
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Управление объектами
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <DollarSign className="mr-2 h-4 w-4" />
              Финансовый отчёт
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Today's Overview */}
      <Card className="bg-gradient-card shadow-soft border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-accent" />
            Сегодня требует внимания
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <h4 className="font-medium">Заезды</h4>
              <p className="text-sm text-muted-foreground">3 гостя заезжают сегодня</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-medium">Выезды</h4>
              <p className="text-sm text-muted-foreground">2 гостя выезжают сегодня</p>
            </div>
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <h4 className="font-medium">Уборка</h4>
              <p className="text-sm text-muted-foreground">5 объектов готовы к заезду</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}