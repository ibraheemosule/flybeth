import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Plane,
  Hotel,
  Car,
  MapPin,
  Calendar,
  User,
  Mail,
  Briefcase,
  CreditCard,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Building,
  Phone,
  RefreshCw,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { useThemeStore } from "../../stores";

interface BookingDetails {
  id: string;
  bookingReference: string;
  employeeName: string;
  employeeEmail: string;
  employeePhone: string;
  department: string;
  type: "flight" | "hotel" | "car" | "package";
  status: "confirmed" | "pending" | "cancelled" | "completed";
  bookingDate: string;
  travelDate: string;
  amount: string;

  // Package/Multi-service details
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

  // Transaction history
  transactions: {
    id: string;
    date: string;
    amount: string;
    status: "success" | "failed" | "pending" | "refunded";
    paymentMethod: string;
    transactionId: string;
    description: string;
    email?: string;
    bookingReference?: string;
    paymentServiceRef?: string;
  }[];
}

interface CompanyBookingDetailsPageProps {
  booking: BookingDetails;
  onBack: () => void;
}

export function CompanyBookingDetailsPage({
  booking,
  onBack,
}: CompanyBookingDetailsPageProps) {
  const [downloadingInvoice, setDownloadingInvoice] = useState(false);

  const handleDownloadInvoice = () => {
    setDownloadingInvoice(true);
    setTimeout(() => {
      setDownloadingInvoice(false);
      toast.success("Invoice downloaded successfully!");
    }, 1500);
  };

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

  const getTransactionStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "refunded":
        return <RefreshCw className="h-5 w-5 text-blue-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-50 border-green-200";
      case "failed":
        return "bg-red-50 border-red-200";
      case "pending":
        return "bg-yellow-50 border-yellow-200";
      case "refunded":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const TypeIcon = getTypeIcon(booking.type);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="hover:bg-gray-100 shrink-0"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Bookings
              </Button>
              <div className="h-8 w-px bg-gray-300 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl font-semibold font-mono text-primary">
                    {booking.bookingReference}
                  </h1>
                  <Badge
                    variant="outline"
                    className={getStatusColor(booking.status)}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Booked by{" "}
                  <span className="font-medium">{booking.employeeName}</span>{" "}
                  from {booking.department}
                </p>
              </div>
            </div>
            <Button
              onClick={handleDownloadInvoice}
              disabled={downloadingInvoice}
              className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shrink-0"
            >
              {downloadingInvoice ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Quick Info Bar */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Travel Date</p>
                  <p className="font-semibold">
                    {new Date(booking.travelDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Total Amount</p>
                  <p className="font-semibold text-primary text-lg">
                    {booking.amount}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Employee</p>
                  <p
                    className="font-semibold truncate"
                    title={booking.employeeName}
                  >
                    {booking.employeeName}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p
                    className="font-semibold truncate"
                    title={booking.department}
                  >
                    {booking.department}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Services/Booking Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {booking.type === "package"
                  ? "Package Details"
                  : "Booking Details"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {booking.services.length}{" "}
                {booking.services.length === 1 ? "item" : "items"}
              </p>
            </div>

            <div className="space-y-4">
              {booking.services.map((service, index) => {
                const ServiceIcon = getTypeIcon(service.type);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden">
                      {/* Service Header */}
                      <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-3 border-b">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="p-1.5 rounded-lg bg-white border border-primary/20">
                              <ServiceIcon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-sm">
                                  {service.title}
                                </h3>
                                {/* Service Provider Badge */}
                                {service.flightDetails && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {service.flightDetails.airline}
                                  </Badge>
                                )}
                                {service.hotelDetails && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Hotel
                                  </Badge>
                                )}
                                {service.carDetails && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {service.carDetails.company}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="font-bold text-primary">
                            {service.amount}
                          </p>
                        </div>
                      </div>

                      {/* Service Details - Compact Layout */}
                      <div className="p-4">
                        {/* Flight Details - Compact */}
                        {service.flightDetails && (
                          <div>
                            <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  Departure
                                </p>
                                <p className="font-semibold">
                                  {service.flightDetails.departure.city}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {service.flightDetails.departure.airport} •{" "}
                                  {service.flightDetails.departure.time}
                                </p>
                              </div>
                              <div className="text-center px-4">
                                <Plane className="h-4 w-4 text-primary mx-auto" />
                                <p className="text-xs font-medium mt-1">
                                  {service.flightDetails.duration}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {service.flightDetails.flightNumber}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  Arrival
                                </p>
                                <p className="font-semibold">
                                  {service.flightDetails.arrival.city}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {service.flightDetails.arrival.airport} •{" "}
                                  {service.flightDetails.arrival.time}
                                </p>
                              </div>
                            </div>
                            {service.passengers &&
                              service.passengers.length > 0 && (
                                <div className="mt-3 pt-3 border-t flex items-center gap-2 flex-wrap">
                                  <p className="text-xs text-muted-foreground">
                                    Passengers:
                                  </p>
                                  {service.passengers.map((passenger, pIdx) => (
                                    <Badge
                                      key={pIdx}
                                      variant="outline"
                                      className="text-xs font-normal"
                                    >
                                      {passenger.name}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                          </div>
                        )}

                        {/* Hotel Details - Compact */}
                        {service.hotelDetails && (
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  Hotel
                                </p>
                                <p className="font-semibold text-sm">
                                  {service.hotelDetails.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {service.hotelDetails.address}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">
                                  Check-in:
                                </span>
                                <span className="font-medium">
                                  {new Date(
                                    service.hotelDetails.checkIn
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">
                                  Check-out:
                                </span>
                                <span className="font-medium">
                                  {new Date(
                                    service.hotelDetails.checkOut
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">
                                  Room:
                                </span>
                                <span className="font-medium">
                                  {service.hotelDetails.roomType}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">
                                  Duration:
                                </span>
                                <span className="font-medium">
                                  {service.hotelDetails.nights} Night
                                  {service.hotelDetails.nights > 1 ? "s" : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Car Details - Compact */}
                        {service.carDetails && (
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  Vehicle
                                </p>
                                <p className="font-semibold text-sm">
                                  {service.carDetails.model}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {service.carDetails.company}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">
                                  Pick-up:
                                </span>
                                <span
                                  className="font-medium truncate ml-2"
                                  title={service.carDetails.pickupLocation}
                                >
                                  {service.carDetails.pickupLocation}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">
                                  Drop-off:
                                </span>
                                <span
                                  className="font-medium truncate ml-2"
                                  title={service.carDetails.dropoffLocation}
                                >
                                  {service.carDetails.dropoffLocation}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">
                                  Duration:
                                </span>
                                <span className="font-medium">
                                  {service.carDetails.days} Day
                                  {service.carDetails.days > 1 ? "s" : ""}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">
                                  Dates:
                                </span>
                                <span className="font-medium">
                                  {new Date(
                                    service.carDetails.pickupDate
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}{" "}
                                  -{" "}
                                  {new Date(
                                    service.carDetails.dropoffDate
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Transaction History</h2>
              <Badge variant="outline">
                {booking.transactions.length} Transactions
              </Badge>
            </div>

            <div className="space-y-2">
              {booking.transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={`border-l-4 ${
                      transaction.status === "success"
                        ? "border-l-green-500"
                        : transaction.status === "failed"
                        ? "border-l-red-500"
                        : transaction.status === "pending"
                        ? "border-l-yellow-500"
                        : "border-l-blue-500"
                    }`}
                  >
                    <div className="p-4">
                      {/* Main Transaction Info */}
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {getTransactionStatusIcon(transaction.status)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm">
                                {transaction.description}
                              </span>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  transaction.status === "success"
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : transaction.status === "failed"
                                    ? "bg-red-100 text-red-700 border-red-200"
                                    : transaction.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                    : "bg-blue-100 text-blue-700 border-blue-200"
                                }`}
                              >
                                {transaction.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {new Date(transaction.date).toLocaleString(
                                "en-US",
                                {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-semibold text-primary">
                            {transaction.amount}
                          </p>
                        </div>
                      </div>

                      {/* Transaction Metadata - Compact Inline */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pt-2 border-t">
                        <div className="flex items-center gap-1.5">
                          <CreditCard className="h-3 w-3" />
                          <span>{transaction.paymentMethod}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground/60">Txn:</span>
                          <span className="font-mono">
                            {transaction.transactionId}
                          </span>
                        </div>
                        {(transaction.bookingReference ||
                          booking.bookingReference) && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-muted-foreground/60">
                              Ref:
                            </span>
                            <span className="font-mono">
                              {transaction.bookingReference ||
                                booking.bookingReference}
                            </span>
                          </div>
                        )}
                        {transaction.paymentServiceRef && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-muted-foreground/60">
                              Payment Ref:
                            </span>
                            <span className="font-mono">
                              {transaction.paymentServiceRef}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <Card className="p-6 bg-gradient-to-r from-gray-50 to-white">
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="text-sm">{booking.employeeEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Phone</p>
                  <p className="text-sm">{booking.employeePhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Booked On
                  </p>
                  <p className="text-sm">
                    {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
