import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Filter,
  Download,
  Eye,
  Plane,
  Hotel,
  Car,
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  User,
  Search,
  ArrowRight,
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
import { CompanyBookingDetailsPage } from "./CompanyBookingDetailsPage";
import { useThemeStore } from "../../stores";

interface Booking {
  id: string;
  bookingReference: string;
  employeeName: string;
  employeeEmail: string;
  type: "flight" | "hotel" | "car" | "package";
  title: string;
  details: string;
  bookingDate: string;
  travelDate: string;
  amount: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  department: string;
}

// Extended booking details for the detail page
interface BookingDetails extends Booking {
  employeePhone: string;
  services: {
    type: "flight" | "hotel" | "car";
    title: string;
    details: string;
    amount: string;
    passengers?: Array<{
      name: string;
      type: string;
    }>;
    flightDetails?: {
      airline: string;
      flightNumber: string;
      departure: { city: string; airport: string; time: string };
      arrival: { city: string; airport: string; time: string };
      duration: string;
      class: string;
    };
    hotelDetails?: {
      name: string;
      address: string;
      checkIn: string;
      checkOut: string;
      nights: number;
      roomType: string;
      guests: number;
    };
    carDetails?: {
      company: string;
      model: string;
      pickupLocation: string;
      dropoffLocation: string;
      pickupDate: string;
      dropoffDate: string;
      days: number;
    };
  }[];
  transactions: {
    id: string;
    date: string;
    amount: string;
    status: "success" | "failed" | "pending" | "refunded";
    paymentMethod: string;
    transactionId: string;
    description: string;
    email: string;
    bookingReference: string;
    paymentServiceRef: string;
  }[];
}

const mockBookings: Booking[] = [
  {
    id: "1",
    bookingReference: "FLY-2024-001",
    employeeName: "Sarah Johnson",
    employeeEmail: "sarah.j@techinnovations.com",
    type: "flight",
    title: "New York (JFK) → London (LHR)",
    details: "British Airways BA178 • Economy Class • 1 Passenger",
    bookingDate: "2024-01-05",
    travelDate: "2024-01-20",
    amount: "$1,240",
    status: "confirmed",
    department: "Sales",
  },
  {
    id: "2",
    bookingReference: "HTL-2024-002",
    employeeName: "Michael Chen",
    employeeEmail: "michael.c@techinnovations.com",
    type: "hotel",
    title: "Hilton San Francisco",
    details: "Executive Suite • 3 Nights • Breakfast Included",
    bookingDate: "2024-01-04",
    travelDate: "2024-01-18",
    amount: "$890",
    status: "confirmed",
    department: "Engineering",
  },
  {
    id: "3",
    bookingReference: "FLY-2024-003",
    employeeName: "Emily Davis",
    employeeEmail: "emily.d@techinnovations.com",
    type: "flight",
    title: "Los Angeles (LAX) → Tokyo (NRT)",
    details: "Japan Airlines JL61 • Business Class • 1 Passenger",
    bookingDate: "2024-01-03",
    travelDate: "2024-02-01",
    amount: "$3,420",
    status: "confirmed",
    department: "Marketing",
  },
  {
    id: "4",
    bookingReference: "CAR-2024-004",
    employeeName: "James Wilson",
    employeeEmail: "james.w@techinnovations.com",
    type: "car",
    title: "BMW 5 Series",
    details: "Enterprise Rent-A-Car • 5 Days • Full Coverage",
    bookingDate: "2024-01-02",
    travelDate: "2024-01-15",
    amount: "$420",
    status: "completed",
    department: "Product",
  },
  {
    id: "5",
    bookingReference: "PKG-2024-005",
    employeeName: "Lisa Anderson",
    employeeEmail: "lisa.a@techinnovations.com",
    type: "package",
    title: "Miami Beach Vacation Package",
    details: "Flight + Hotel + Car • 7 Days • All Inclusive",
    bookingDate: "2023-12-28",
    travelDate: "2024-01-10",
    amount: "$2,890",
    status: "completed",
    department: "Engineering",
  },
  {
    id: "6",
    bookingReference: "FLY-2024-006",
    employeeName: "Robert Taylor",
    employeeEmail: "robert.t@techinnovations.com",
    type: "flight",
    title: "Chicago (ORD) → Boston (BOS)",
    details: "United Airlines UA1234 • Economy • 1 Passenger",
    bookingDate: "2023-12-20",
    travelDate: "2024-01-05",
    amount: "$320",
    status: "completed",
    department: "Sales",
  },
  {
    id: "7",
    bookingReference: "PKG-2024-EXEC-007-ALM",
    employeeName: "Alexandra Martinez",
    employeeEmail: "alex.m@techinnovations.com",
    type: "package",
    title: "Multi-City Business Trip Package",
    details: "5 Flights + Hotel + Car Rental • International Conference Tour",
    bookingDate: "2024-01-06",
    travelDate: "2024-02-15",
    amount: "$8,750",
    status: "confirmed",
    department: "Executive",
  },
];

export function BookingHistorySection() {
  const { getCurrentColors } = useThemeStore();
  const themeColors = getCurrentColors();

  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [viewState, setViewState] = useState<"list" | "details">("list");

  // Mock detailed data - in real app, this would be fetched when viewing details
  const getBookingDetails = (booking: Booking): BookingDetails => {
    // Special handling for the multi-city business trip (id: 7)
    if (booking.id === "7") {
      return {
        ...booking,
        employeePhone: "+1 555 234 8765",
        services: [
          // Flight 1: New York to London
          {
            type: "flight",
            title: "New York (JFK) → London (LHR)",
            details: "British Airways BA112 • Business Class • 1 Passenger",
            amount: "$2,450",
            passengers: [{ name: booking.employeeName, type: "Adult" }],
            flightDetails: {
              airline: "British Airways",
              flightNumber: "BA112",
              departure: { city: "New York", airport: "JFK", time: "8:00 PM" },
              arrival: { city: "London", airport: "LHR", time: "8:15 AM +1" },
              duration: "7h 15m",
              class: "Business",
            },
          },
          // Flight 2: London to Paris
          {
            type: "flight",
            title: "London (LHR) → Paris (CDG)",
            details: "Air France AF1280 • Business Class • 1 Passenger",
            amount: "$420",
            passengers: [{ name: booking.employeeName, type: "Adult" }],
            flightDetails: {
              airline: "Air France",
              flightNumber: "AF1280",
              departure: { city: "London", airport: "LHR", time: "2:30 PM" },
              arrival: { city: "Paris", airport: "CDG", time: "4:55 PM" },
              duration: "1h 25m",
              class: "Business",
            },
          },
          // Flight 3: Paris to Berlin
          {
            type: "flight",
            title: "Paris (CDG) → Berlin (BER)",
            details: "Lufthansa LH2227 • Business Class • 1 Passenger",
            amount: "$380",
            passengers: [{ name: booking.employeeName, type: "Adult" }],
            flightDetails: {
              airline: "Lufthansa",
              flightNumber: "LH2227",
              departure: { city: "Paris", airport: "CDG", time: "6:45 PM" },
              arrival: { city: "Berlin", airport: "BER", time: "8:30 PM" },
              duration: "1h 45m",
              class: "Business",
            },
          },
          // Flight 4: Berlin to Dubai
          {
            type: "flight",
            title: "Berlin (BER) → Dubai (DXB)",
            details: "Emirates EK044 • Business Class • 1 Passenger",
            amount: "$1,850",
            passengers: [{ name: booking.employeeName, type: "Adult" }],
            flightDetails: {
              airline: "Emirates",
              flightNumber: "EK044",
              departure: { city: "Berlin", airport: "BER", time: "10:05 PM" },
              arrival: { city: "Dubai", airport: "DXB", time: "6:30 AM +1" },
              duration: "5h 25m",
              class: "Business",
            },
          },
          // Flight 5: Dubai to New York (Return)
          {
            type: "flight",
            title: "Dubai (DXB) → New York (JFK)",
            details: "Emirates EK201 • Business Class • 1 Passenger",
            amount: "$2,980",
            passengers: [{ name: booking.employeeName, type: "Adult" }],
            flightDetails: {
              airline: "Emirates",
              flightNumber: "EK201",
              departure: { city: "Dubai", airport: "DXB", time: "8:25 AM" },
              arrival: { city: "New York", airport: "JFK", time: "2:40 PM" },
              duration: "14h 15m",
              class: "Business",
            },
          },
          // Hotel: Berlin stay
          {
            type: "hotel",
            title: "The Ritz-Carlton Berlin",
            details: "Executive Suite • 2 Nights • Conference Package",
            amount: "$680",
            hotelDetails: {
              name: "The Ritz-Carlton Berlin",
              address: "Potsdamer Platz 3, 10785 Berlin, Germany",
              checkIn: "2024-02-17",
              checkOut: "2024-02-19",
              nights: 2,
              roomType: "Executive Suite",
              guests: 1,
            },
          },
          // Car: Berlin rental
          {
            type: "car",
            title: "Mercedes-Benz E-Class",
            details: "Sixt Rent-A-Car • 3 Days • Premium Insurance",
            amount: "$290",
            carDetails: {
              company: "Sixt Rent-A-Car",
              model: "Mercedes-Benz E-Class",
              pickupLocation: "Berlin Brandenburg Airport (BER)",
              dropoffLocation: "Berlin Brandenburg Airport (BER)",
              pickupDate: "2024-02-17",
              dropoffDate: "2024-02-20",
              days: 3,
            },
          },
        ],
        transactions: [
          {
            id: "TXN-007-1",
            date: "2024-01-06T09:12:00",
            amount: "$2,450",
            status: "failed",
            paymentMethod: "Amex •••• 1009",
            transactionId: "ch_3Xyz789abc",
            description: "Initial booking attempt - Card declined",
            email: booking.employeeEmail,
            bookingReference: booking.bookingReference,
            paymentServiceRef: "PSK_REF_2024_0106_091200_XYZ",
          },
          {
            id: "TXN-007-2",
            date: "2024-01-06T09:18:00",
            amount: "$4,370",
            status: "failed",
            paymentMethod: "Visa •••• 6789",
            transactionId: "ch_3Mno456pqr",
            description: "Second attempt partial payment - Timeout error",
            email: booking.employeeEmail,
            bookingReference: booking.bookingReference,
            paymentServiceRef: "PSK_REF_2024_0106_091800_MNO",
          },
          {
            id: "TXN-007-3",
            date: "2024-01-06T09:25:00",
            amount: "$500",
            status: "pending",
            paymentMethod: "Mastercard •••• 8888",
            transactionId: "ch_3Stu123vwx",
            description: "Deposit hold - Processing",
            email: booking.employeeEmail,
            bookingReference: booking.bookingReference,
            paymentServiceRef: "PSK_REF_2024_0106_092500_STU",
          },
          {
            id: "TXN-007-4",
            date: "2024-01-06T09:45:00",
            amount: "$8,750",
            status: "success",
            paymentMethod: "Corporate Visa •••• 4242",
            transactionId: "ch_3Def901ghi",
            description: "Complete booking payment - All services confirmed",
            email: booking.employeeEmail,
            bookingReference: booking.bookingReference,
            paymentServiceRef: "PSK_REF_2024_0106_094500_DEF",
          },
          {
            id: "TXN-007-5",
            date: "2024-01-06T10:30:00",
            amount: "$500",
            status: "refunded",
            paymentMethod: "Mastercard •••• 8888",
            transactionId: "ch_3Stu123vwx_refund",
            description: "Deposit refund - Released after final payment",
            email: booking.employeeEmail,
            bookingReference: booking.bookingReference,
            paymentServiceRef: "PSK_REF_2024_0106_103000_REF",
          },
        ],
      };
    }

    // Generate detailed mock data based on booking type for other bookings
    const baseDetails: BookingDetails = {
      ...booking,
      employeePhone: "+1 555 987 6543",
      services: [],
      transactions: [],
    };

    if (booking.type === "flight") {
      baseDetails.services = [
        {
          type: "flight",
          title: booking.title,
          details: booking.details,
          amount: booking.amount,
          passengers: [{ name: booking.employeeName, type: "Adult" }],
          flightDetails: {
            airline: "British Airways",
            flightNumber: "BA178",
            departure: { city: "New York", airport: "JFK", time: "10:30 AM" },
            arrival: { city: "London", airport: "LHR", time: "10:45 PM" },
            duration: "7h 15m",
            class: "Economy",
          },
        },
      ];
      baseDetails.transactions = [
        {
          id: "TXN-001",
          date: booking.bookingDate + "T14:23:00",
          amount: booking.amount,
          status: "success",
          paymentMethod: "Visa •••• 4242",
          transactionId: "ch_3Abc123xyz",
          description: "Flight booking payment",
        },
      ];
    } else if (booking.type === "hotel") {
      baseDetails.services = [
        {
          type: "hotel",
          title: booking.title,
          details: booking.details,
          amount: booking.amount,
          hotelDetails: {
            name: "Hilton San Francisco",
            address: "333 O'Farrell St, San Francisco, CA 94102",
            checkIn: booking.travelDate,
            checkOut: new Date(
              new Date(booking.travelDate).getTime() + 3 * 24 * 60 * 60 * 1000
            )
              .toISOString()
              .split("T")[0],
            nights: 3,
            roomType: "Executive Suite",
            guests: 1,
          },
        },
      ];
      baseDetails.transactions = [
        {
          id: "TXN-002",
          date: booking.bookingDate + "T16:45:00",
          amount: booking.amount,
          status: "success",
          paymentMethod: "Mastercard •••• 5555",
          transactionId: "ch_3Def456uvw",
          description: "Hotel reservation payment",
        },
      ];
    } else if (booking.type === "car") {
      baseDetails.services = [
        {
          type: "car",
          title: booking.title,
          details: booking.details,
          amount: booking.amount,
          carDetails: {
            company: "Enterprise Rent-A-Car",
            model: "BMW 5 Series",
            pickupLocation: "San Francisco Airport (SFO)",
            dropoffLocation: "San Francisco Airport (SFO)",
            pickupDate: booking.travelDate,
            dropoffDate: new Date(
              new Date(booking.travelDate).getTime() + 5 * 24 * 60 * 60 * 1000
            )
              .toISOString()
              .split("T")[0],
            days: 5,
          },
        },
      ];
      baseDetails.transactions = [
        {
          id: "TXN-003",
          date: booking.bookingDate + "T11:30:00",
          amount: booking.amount,
          status: "success",
          paymentMethod: "Amex •••• 1005",
          transactionId: "ch_3Ghi789rst",
          description: "Car rental payment",
        },
      ];
    } else if (booking.type === "package") {
      baseDetails.services = [
        {
          type: "flight",
          title: "Miami (MIA) → Fort Lauderdale (FLL)",
          details: "American Airlines AA123 • Economy • 1 Passenger",
          amount: "$420",
          passengers: [{ name: booking.employeeName, type: "Adult" }],
          flightDetails: {
            airline: "American Airlines",
            flightNumber: "AA123",
            departure: { city: "Miami", airport: "MIA", time: "9:00 AM" },
            arrival: {
              city: "Fort Lauderdale",
              airport: "FLL",
              time: "9:45 AM",
            },
            duration: "45m",
            class: "Economy",
          },
        },
        {
          type: "hotel",
          title: "Fontainebleau Miami Beach",
          details: "Ocean View Suite • 7 Nights",
          amount: "$1,890",
          hotelDetails: {
            name: "Fontainebleau Miami Beach",
            address: "4441 Collins Ave, Miami Beach, FL 33140",
            checkIn: booking.travelDate,
            checkOut: new Date(
              new Date(booking.travelDate).getTime() + 7 * 24 * 60 * 60 * 1000
            )
              .toISOString()
              .split("T")[0],
            nights: 7,
            roomType: "Ocean View Suite",
            guests: 1,
          },
        },
        {
          type: "car",
          title: "Convertible Car Rental",
          details: "Hertz • Ford Mustang Convertible",
          amount: "$580",
          carDetails: {
            company: "Hertz",
            model: "Ford Mustang Convertible",
            pickupLocation: "Miami Beach",
            dropoffLocation: "Miami Beach",
            pickupDate: booking.travelDate,
            dropoffDate: new Date(
              new Date(booking.travelDate).getTime() + 7 * 24 * 60 * 60 * 1000
            )
              .toISOString()
              .split("T")[0],
            days: 7,
          },
        },
      ];
      baseDetails.transactions = [
        {
          id: "TXN-004-1",
          date: booking.bookingDate + "T10:15:00",
          amount: "$100",
          status: "failed",
          paymentMethod: "Visa •••• 1234",
          transactionId: "ch_3Jkl012mno",
          description: "Initial payment attempt - Insufficient funds",
        },
        {
          id: "TXN-004-2",
          date: booking.bookingDate + "T10:32:00",
          amount: booking.amount,
          status: "success",
          paymentMethod: "Visa •••• 4242",
          transactionId: "ch_3Pqr345stu",
          description: "Package booking payment - Full amount",
        },
      ];
    }

    return baseDetails;
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookingReference
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      booking.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEmployee =
      filterEmployee === "all" || booking.employeeName === filterEmployee;
    const matchesType = filterType === "all" || booking.type === filterType;
    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus;
    const matchesDepartment =
      filterDepartment === "all" || booking.department === filterDepartment;

    const matchesDateFrom =
      !dateFrom || new Date(booking.bookingDate) >= new Date(dateFrom);
    const matchesDateTo =
      !dateTo || new Date(booking.bookingDate) <= new Date(dateTo);

    return (
      matchesSearch &&
      matchesEmployee &&
      matchesType &&
      matchesStatus &&
      matchesDepartment &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  const employees = [
    "all",
    ...Array.from(new Set(bookings.map(b => b.employeeName))),
  ];
  const departments = [
    "all",
    ...Array.from(new Set(bookings.map(b => b.department))),
  ];

  const totalSpent = filteredBookings.reduce((sum, booking) => {
    return sum + parseFloat(booking.amount.replace("$", "").replace(",", ""));
  }, 0);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flight":
        return Plane;
      case "hotel":
        return Hotel;
      case "car":
        return Car;
      case "package":
        return MapPin;
      default:
        return Calendar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBookingId(booking.id);
    setViewState("details");
  };

  const handleExportData = () => {
    toast.success("Booking data exported successfully!");
    // In real app, this would generate and download a CSV/Excel file
  };

  const handleBackToList = () => {
    setViewState("list");
    setSelectedBookingId(null);
  };

  // If viewing details, show the details page
  if (viewState === "details" && selectedBookingId) {
    const booking = bookings.find(b => b.id === selectedBookingId);
    if (booking) {
      const bookingDetails = getBookingDetails(booking);
      return (
        <CompanyBookingDetailsPage
          booking={bookingDetails}
          onBack={handleBackToList}
        />
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Booking History</h2>
          <p className="text-muted-foreground">
            View and manage all company bookings and orders
          </p>
        </div>
        <Button
          onClick={handleExportData}
          variant="outline"
          className="border hover:bg-opacity-5"
          style={{
            borderColor: themeColors.primary,
            color: themeColors.primary,
          }}
        >
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
          <p className="text-2xl font-bold">{filteredBookings.length}</p>
          <p className="text-xs text-muted-foreground mt-1">
            of {bookings.length} total
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
          <p
            className="text-2xl font-bold"
            style={{ color: themeColors.primary }}
          >
            ${totalSpent.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            in filtered period
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">
            Avg. Booking Value
          </p>
          <p className="text-2xl font-bold">
            $
            {filteredBookings.length > 0
              ? Math.round(
                  totalSpent / filteredBookings.length
                ).toLocaleString()
              : 0}
          </p>
          <p className="text-xs text-muted-foreground mt-1">per booking</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4" style={{ color: themeColors.primary }} />
          <h3 className="font-semibold">Filters</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by employee, reference, or booking..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Employee Filter */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Employee
            </Label>
            <Select
              value={filterEmployee}
              onValueChange={e => setFilterEmployee(e)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <SelectTrigger className="w-full h-10 px-3 rounded-md border border-input bg-background">
                <SelectValue>
                  {filterEmployee === "all" ? "All Employees" : filterEmployee}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {employees.map(emp => (
                  <SelectItem key={emp} value={emp}>
                    {emp === "all" ? "All Employees" : emp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type Filter */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Booking Type
            </Label>
            <Select
              value={filterType}
              onValueChange={e => setFilterType(e)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <SelectTrigger className="w-full h-10 px-3 rounded-md border border-input bg-background">
                <SelectValue>
                  {filterType === "all" ? "All Types" : filterType}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="flight">Flights</SelectItem>
                <SelectItem value="hotel">Hotels</SelectItem>
                <SelectItem value="car">Cars</SelectItem>
                <SelectItem value="package">Packages</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Status
            </Label>
            <Select
              value={filterStatus}
              onValueChange={e => setFilterStatus(e)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <SelectTrigger className="w-full h-10 px-3 rounded-md border border-input bg-background">
                <SelectValue>
                  {filterStatus === "all" ? "All Statuses" : filterStatus}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Department Filter */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Department
            </Label>
            <Select
              value={filterDepartment}
              onValueChange={e => setFilterDepartment(e)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <SelectTrigger className="w-full h-10 px-3 rounded-md border border-input bg-background">
                <SelectValue>
                  {filterDepartment === "all"
                    ? "All Departments"
                    : filterDepartment}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>
                    {dept === "all" ? "All Departments" : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date From */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Date From
            </Label>
            <Input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
            />
          </div>

          {/* Date To */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Date To
            </Label>
            <Input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
            />
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setFilterEmployee("all");
                setFilterType("all");
                setFilterStatus("all");
                setFilterDepartment("all");
                setDateFrom("");
                setDateTo("");
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Bookings List */}
      {viewState === "list" && (
        <div className="space-y-3">
          {filteredBookings.map(booking => {
            const TypeIcon = getTypeIcon(booking.type);
            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                layout
              >
                <Card className="p-5 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{
                          background: `linear-gradient(to right, ${themeColors.primary}1A, ${themeColors.accent}1A)`,
                        }}
                      >
                        <TypeIcon
                          className="h-6 w-6"
                          style={{ color: themeColors.primary }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-semibold">{booking.title}</h3>
                        <Badge
                          variant="outline"
                          className={getStatusColor(booking.status)}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {booking.details}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span>👤 {booking.employeeName}</span>
                        <span>
                          📅 Booked:{" "}
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </span>
                        <span>
                          ✈️ Travel:{" "}
                          {new Date(booking.travelDate).toLocaleDateString()}
                        </span>
                        <span>🏢 {booking.department}</span>
                      </div>
                    </div>

                    {/* Amount & Action */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">
                          Amount
                        </p>
                        <p
                          className="text-xl font-bold"
                          style={{ color: themeColors.primary }}
                        >
                          {booking.amount}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {booking.bookingReference}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(booking)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}

          {filteredBookings.length === 0 && (
            <Card className="p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-muted-foreground">
                No bookings found matching your filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setFilterEmployee("all");
                  setFilterType("all");
                  setFilterStatus("all");
                  setFilterDepartment("all");
                  setDateFrom("");
                  setDateTo("");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
