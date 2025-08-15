import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Home,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Bed,
  Users,
  Wifi,
  Car,
  Waves,
  Mountain,
  Star,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Settings
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertyManagementProps {
  userRole: "owner" | "admin";
}

export function PropertyManagement({ userRole }: PropertyManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Симуляция данных объектов
  const properties = [
    {
      id: "PR001",
      name: "Вилла Море",
      type: "villa",
      location: "Ялта, набережная",
      bedrooms: 3,
      maxGuests: 6,
      status: "active",
      pricePerNight: 3000,
      rating: 4.8,
      totalBookings: 24,
      revenue: 180000,
      amenities: ["wifi", "parking", "sea_view", "kitchen", "balcony"],
      description: "Роскошная вилла с видом на море",
      image: "/api/placeholder/300/200"
    },
    {
      id: "PR002", 
      name: "Дом в горах",
      type: "house",
      location: "Алупка, горная дорога",
      bedrooms: 2,
      maxGuests: 4,
      status: "active",
      pricePerNight: 2200,
      rating: 4.9,
      totalBookings: 18,
      revenue: 145000,
      amenities: ["wifi", "parking", "mountain_view", "fireplace", "garden"],
      description: "Уютный дом с горным воздухом",
      image: "/api/placeholder/300/200"
    },
    {
      id: "PR003",
      name: "Квартира у моря", 
      type: "apartment",
      location: "Судак, центр",
      bedrooms: 1,
      maxGuests: 3,
      status: "active",
      pricePerNight: 1800,
      rating: 4.6,
      totalBookings: 32,
      revenue: 95000,
      amenities: ["wifi", "air_conditioning", "sea_view", "kitchen"],
      description: "Современная квартира рядом с пляжем",
      image: "/api/placeholder/300/200"
    },
    {
      id: "PR004",
      name: "Коттедж Лазурный",
      type: "cottage",
      location: "Коктебель, тихая улица",
      bedrooms: 2,
      maxGuests: 5,
      status: "maintenance",
      pricePerNight: 2500,
      rating: 4.7,
      totalBookings: 15,
      revenue: 78000,
      amenities: ["wifi", "parking", "garden", "bbq", "pool"],
      description: "Коттедж с бассейном и барбекю",
      image: "/api/placeholder/300/200"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle className="w-3 h-3 mr-1" />
            Активен
          </Badge>
        );
      case "maintenance":
        return (
          <Badge className="bg-accent text-accent-foreground">
            <Settings className="w-3 h-3 mr-1" />
            Обслуживание
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Неактивен
          </Badge>
        );
      default:
        return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

  const getTypeLabel = (type: string) => {
    const types = {
      villa: "Вилла",
      house: "Дом", 
      apartment: "Квартира",
      cottage: "Коттедж"
    };
    return types[type as keyof typeof types] || type;
  };

  const getAmenityIcon = (amenity: string) => {
    const icons = {
      wifi: <Wifi className="h-4 w-4" />,
      parking: <Car className="h-4 w-4" />,
      sea_view: <Waves className="h-4 w-4" />,
      mountain_view: <Mountain className="h-4 w-4" />,
      kitchen: <Home className="h-4 w-4" />,
      balcony: <Home className="h-4 w-4" />,
      fireplace: <Home className="h-4 w-4" />,
      garden: <Home className="h-4 w-4" />,
      air_conditioning: <Home className="h-4 w-4" />,
      bbq: <Home className="h-4 w-4" />,
      pool: <Waves className="h-4 w-4" />
    };
    return icons[amenity as keyof typeof icons] || <Home className="h-4 w-4" />;
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    const matchesType = typeFilter === "all" || property.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Home className="mr-3 h-8 w-8 text-primary" />
            Управление объектами
          </h1>
          <p className="text-muted-foreground">
            {userRole === "owner" ? "Полное управление недвижимостью и доходностью" : "Обслуживание объектов"}
          </p>
        </div>
        <Button className="bg-gradient-ocean shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Добавить объект
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего объектов</p>
                <p className="text-2xl font-bold">{properties.length}</p>
              </div>
              <Home className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Активных</p>
                <p className="text-2xl font-bold">
                  {properties.filter(p => p.status === "active").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Средний рейтинг</p>
                <p className="text-2xl font-bold">4.8</p>
              </div>
              <Star className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        {userRole === "owner" && (
          <Card className="bg-gradient-card shadow-soft border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Общий доход</p>
                  <p className="text-2xl font-bold">₽498K</p>
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
                Показано: {filteredProperties.length} из {properties.length}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию, локации или ID..."
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
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="maintenance">Обслуживание</SelectItem>
                <SelectItem value="inactive">Неактивные</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Тип объекта" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="villa">Виллы</SelectItem>
                <SelectItem value="house">Дома</SelectItem>
                <SelectItem value="apartment">Квартиры</SelectItem>
                <SelectItem value="cottage">Коттеджи</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="bg-gradient-card shadow-soft border-0 hover:shadow-glow transition-smooth">
            <CardHeader className="p-0">
              <div className="h-48 bg-gradient-ocean rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  {getStatusBadge(property.status)}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/90 text-black">
                    {property.id}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{property.name}</h3>
                  <p className="text-sm opacity-90">{getTypeLabel(property.type)}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 space-y-4">
              {/* Location & Basic Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {property.location}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Bed className="h-3 w-3 mr-1" />
                    {property.bedrooms} спальни
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    до {property.maxGuests} гостей
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{property.rating}</span>
                  </div>
                  {userRole === "owner" && (
                    <div className="text-lg font-bold text-success">
                      ₽{property.pricePerNight}/ночь
                    </div>
                  )}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <p className="text-sm font-medium mb-2">Удобства:</p>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.slice(0, 4).map((amenity) => (
                    <div key={amenity} className="flex items-center text-xs bg-secondary/50 rounded px-2 py-1">
                      {getAmenityIcon(amenity)}
                    </div>
                  ))}
                  {property.amenities.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{property.amenities.length - 4}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Stats for Owner */}
              {userRole === "owner" && (
                <div className="border-t pt-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Бронирований:</span>
                      <div className="font-semibold">{property.totalBookings}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Доход:</span>
                      <div className="font-semibold text-success">
                        ₽{property.revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-3 w-3 mr-1" />
                  Просмотр
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar className="h-3 w-3 mr-1" />
                  Календарь
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-3 w-3 mr-1" />
                  Редактировать
                </Button>
                {userRole === "owner" && (
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Удалить
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}