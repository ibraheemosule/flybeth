import { useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Download,
  Building2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  joinedDate: string;
  lastBookingDate: string;
  totalBookings: number;
  totalSpent: number;
  favoriteService: "flight" | "hotel" | "car" | "package" | "attraction";
  status: "active" | "inactive";
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    department: "Sales",
    joinedDate: "2023-03-15T00:00:00",
    lastBookingDate: "2024-01-05T10:30:00",
    totalBookings: 24,
    totalSpent: 18540,
    favoriteService: "flight",
    status: "active",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 234-5678",
    department: "Engineering",
    joinedDate: "2023-05-20T00:00:00",
    lastBookingDate: "2024-01-04T15:45:00",
    totalBookings: 18,
    totalSpent: 14230,
    favoriteService: "hotel",
    status: "active",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 345-6789",
    department: "Marketing",
    joinedDate: "2023-01-10T00:00:00",
    lastBookingDate: "2024-01-03T09:20:00",
    totalBookings: 31,
    totalSpent: 26780,
    favoriteService: "package",
    status: "active",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+1 (555) 456-7890",
    department: "Product",
    joinedDate: "2023-07-08T00:00:00",
    lastBookingDate: "2024-01-02T14:10:00",
    totalBookings: 12,
    totalSpent: 9640,
    favoriteService: "car",
    status: "active",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    phone: "+1 (555) 567-8901",
    department: "Engineering",
    joinedDate: "2023-02-14T00:00:00",
    lastBookingDate: "2023-12-28T11:30:00",
    totalBookings: 27,
    totalSpent: 21450,
    favoriteService: "flight",
    status: "active",
  },
  {
    id: "6",
    name: "Robert Taylor",
    email: "robert.taylor@example.com",
    phone: "+1 (555) 678-9012",
    department: "Sales",
    joinedDate: "2023-04-22T00:00:00",
    lastBookingDate: "2023-12-20T16:50:00",
    totalBookings: 15,
    totalSpent: 12340,
    favoriteService: "flight",
    status: "active",
  },
  {
    id: "7",
    name: "Jennifer Martinez",
    email: "jennifer.martinez@example.com",
    phone: "+1 (555) 789-0123",
    department: "Marketing",
    joinedDate: "2022-11-30T00:00:00",
    lastBookingDate: "2023-10-15T13:20:00",
    totalBookings: 8,
    totalSpent: 5420,
    favoriteService: "hotel",
    status: "inactive",
  },
];

export function CustomersSection() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterService, setFilterService] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      filterDepartment === "all" || customer.department === filterDepartment;
    const matchesService =
      filterService === "all" || customer.favoriteService === filterService;
    const matchesStatus =
      filterStatus === "all" || customer.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesService && matchesStatus;
  });

  const departments = [
    "all",
    ...Array.from(new Set(customers.map((c) => c.department))),
  ];

  const totalCustomers = filteredCustomers.length;
  const activeCustomers = filteredCustomers.filter(
    (c) => c.status === "active"
  ).length;
  const totalRevenue = filteredCustomers.reduce(
    (sum, c) => sum + c.totalSpent,
    0
  );
  const avgSpendPerCustomer =
    totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

  const getServiceIcon = (service: string) => {
    switch (service) {
      case "flight":
        return "✈️";
      case "hotel":
        return "🏨";
      case "car":
        return "🚗";
      case "package":
        return "📦";
      case "attraction":
        return "🎫";
      default:
        return "📍";
    }
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case "flight":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "hotel":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "car":
        return "bg-green-100 text-green-700 border-green-200";
      case "package":
        return "bg-pink-100 text-pink-700 border-pink-200";
      case "attraction":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-gray-100 text-gray-700 border-gray-200";
  };

  const handleExportData = () => {
    toast.success("Customer data exported successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Customers</h2>
          <p className="text-muted-foreground">
            Employees who have used Flybeth services
          </p>
        </div>
        <Button
          onClick={handleExportData}
          variant="outline"
          className="border-primary text-primary hover:bg-primary/5"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Customers
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-50">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-sm text-muted-foreground">Total Customers</p>
          </div>
          <p className="text-2xl font-bold">{totalCustomers}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {activeCustomers} active
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-50">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground">Active Customers</p>
          </div>
          <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {((activeCustomers / totalCustomers) * 100).toFixed(1)}% of total
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-50">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            ${totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            From {filteredCustomers.reduce((sum, c) => sum + c.totalBookings, 0)}{" "}
            bookings
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-orange-50">
              <DollarSign className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-sm text-muted-foreground">Avg per Customer</p>
          </div>
          <p className="text-2xl font-bold text-orange-600">
            ${avgSpendPerCustomer.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Average lifetime value</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Filters</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, Name, Email, or Phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Search filters: Customer ID, Name, Email, Phone Number
            </p>
          </div>

          {/* Department Filter */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Department
            </Label>
            <Select
              value={filterDepartment}
              onValueChange={setFilterDepartment}
            >
              <SelectTrigger>
                <SelectValue>
                  {filterDepartment === "all"
                    ? "All Departments"
                    : filterDepartment}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept === "all" ? "All Departments" : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Favorite Service Filter */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Favorite Service
            </Label>
            <Select value={filterService} onValueChange={setFilterService}>
              <SelectTrigger>
                <SelectValue>
                  {filterService === "all" ? "All Services" : filterService}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="flight">Flights</SelectItem>
                <SelectItem value="hotel">Hotels</SelectItem>
                <SelectItem value="car">Cars</SelectItem>
                <SelectItem value="package">Packages</SelectItem>
                <SelectItem value="attraction">Attractions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Status
            </Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue>
                  {filterStatus === "all" ? "All Statuses" : filterStatus}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setFilterDepartment("all");
                setFilterService("all");
                setFilterStatus("all");
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Customers List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            layout
          >
            <Card className="p-5 hover:shadow-lg transition-all h-full">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">
                        {customer.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{customer.name}</h3>
                      <p className="text-xs text-muted-foreground">{customer.department}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(customer.status)}>
                    {customer.status}
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate text-xs">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="text-xs">{customer.phone}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total Spent</p>
                    <p className="font-semibold text-primary">
                      ${customer.totalSpent.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Bookings</p>
                    <p className="font-semibold">{customer.totalBookings}</p>
                  </div>
                </div>

                {/* Favorite Service */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-muted-foreground">Favorite:</span>
                  <Badge
                    variant="outline"
                    className={`${getServiceColor(customer.favoriteService)} capitalize`}
                  >
                    {getServiceIcon(customer.favoriteService)} {customer.favoriteService}
                  </Badge>
                </div>

                {/* Dates */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Joined {new Date(customer.joinedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Last booking: {new Date(customer.lastBookingDate).toLocaleDateString()}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {filteredCustomers.length === 0 && (
          <div className="col-span-full">
            <Card className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-muted-foreground">
                No customers found matching your filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setFilterDepartment("all");
                  setFilterService("all");
                  setFilterStatus("all");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
