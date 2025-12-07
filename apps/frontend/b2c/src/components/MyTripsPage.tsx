import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import {
  Calendar,
  MapPin,
  Plane,
  Hotel,
  Clock,
  CheckCircle2,
  XCircle,
  Car,
} from "lucide-react";
import { ReceiptModal } from "./ReceiptModal";
import { TripDetailsModal } from "./TripDetailsModal";
import { ManageBookingModal } from "./ManageBookingModal";
import { SmartPagination } from "./SmartPagination";
import {
  useAsyncPagination,
  type PaginationRequest,
  type PaginationResponse,
} from "@packages/shared-frontend";
import { toast } from "sonner";

const upcomingTrips = [
  {
    id: 1,
    destination: "Phuket, Thailand",
    type: "Flight + Hotel",
    dates: "Dec 15 - Dec 22, 2025",
    bookingRef: "FB-2025-001234",
    status: "confirmed",
    price: "$649",
    details: {
      flight: "JFK → HKT",
      hotel: "Paradise Beach Resort",
      guests: "2 Adults",
    },
  },
  {
    id: 2,
    destination: "Tokyo, Japan",
    type: "Flight Only",
    dates: "Jan 10 - Jan 20, 2026",
    bookingRef: "FB-2026-001567",
    status: "confirmed",
    price: "$1,099",
    details: {
      flight: "LAX → NRT",
      guests: "1 Adult",
    },
  },
];

// Enhanced booking history with flights, hotels, and cars
const bookingHistory = [
  {
    id: 3,
    destination: "Paris, France",
    type: "Flight",
    category: "flight",
    dates: "Aug 5 - Aug 12, 2025",
    bookingRef: "FB-2025-000987",
    status: "completed",
    price: "$899",
    details: {
      flight: "JFK → CDG",
      guests: "2 Adults",
    },
  },
  {
    id: 4,
    destination: "Barcelona, Spain",
    type: "Hotel",
    category: "hotel",
    dates: "Jun 20 - Jun 27, 2025",
    bookingRef: "FB-2025-000654",
    status: "completed",
    price: "$799",
    details: {
      hotel: "Gothic Quarter Hotel",
      guests: "2 Adults",
      nights: "7 nights",
    },
  },
  {
    id: 5,
    destination: "Miami, Florida",
    type: "Car Rental",
    category: "car",
    dates: "Jul 15 - Jul 22, 2025",
    bookingRef: "FB-2025-000543",
    status: "completed",
    price: "$289",
    details: {
      car: "Toyota Camry or similar",
      pickUp: "Miami International Airport",
      dropOff: "Miami International Airport",
      days: "7 days",
    },
  },
  {
    id: 6,
    destination: "Dubai, UAE",
    type: "Hotel",
    category: "hotel",
    dates: "May 10 - May 17, 2025",
    bookingRef: "FB-2025-000432",
    status: "completed",
    price: "$1,299",
    details: {
      hotel: "Burj Al Arab",
      guests: "2 Adults",
      nights: "7 nights",
    },
  },
  {
    id: 7,
    destination: "Los Angeles, CA",
    type: "Car Rental",
    category: "car",
    dates: "Apr 5 - Apr 12, 2025",
    bookingRef: "FB-2025-000321",
    status: "completed",
    price: "$349",
    details: {
      car: "Ford Mustang Convertible",
      pickUp: "LAX Airport",
      dropOff: "LAX Airport",
      days: "7 days",
    },
  },
  {
    id: 8,
    destination: "London, UK",
    type: "Flight",
    category: "flight",
    dates: "Mar 20 - Mar 28, 2025",
    bookingRef: "FB-2025-000210",
    status: "completed",
    price: "$649",
    details: {
      flight: "JFK → LHR",
      guests: "1 Adult",
    },
  },
  {
    id: 9,
    destination: "Rome, Italy",
    type: "Hotel",
    category: "hotel",
    dates: "Feb 14 - Feb 21, 2025",
    bookingRef: "FB-2025-000109",
    status: "completed",
    price: "$899",
    details: {
      hotel: "Hotel de Russie",
      guests: "2 Adults",
      nights: "7 nights",
    },
  },
  {
    id: 10,
    destination: "San Francisco, CA",
    type: "Car Rental",
    category: "car",
    dates: "Jan 8 - Jan 15, 2025",
    bookingRef: "FB-2025-000087",
    status: "completed",
    price: "$259",
    details: {
      car: "Tesla Model 3",
      pickUp: "SFO Airport",
      dropOff: "SFO Airport",
      days: "7 days",
    },
  },
];

const ITEMS_PER_PAGE = 4;

export function MyTripsPage() {
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [manageModalOpen, setManageModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Async data state
  const [bookingData, setBookingData] = useState({
    bookings: [] as typeof bookingHistory,
    totalItems: 0,
    totalPages: 0,
    isLoading: false,
  });

  // Simulate async data fetching
  const fetchBookings = async (page: number) => {
    setBookingData(prev => ({ ...prev, isLoading: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In real app, this would be: const response = await api.getBookings({ page, limit: ITEMS_PER_PAGE });
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedBookings = bookingHistory.slice(startIndex, endIndex);

      setBookingData({
        bookings: paginatedBookings,
        totalItems: bookingHistory.length,
        totalPages: Math.ceil(bookingHistory.length / ITEMS_PER_PAGE),
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookingData(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Fetch data on mount and when page changes
  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

  const totalPages = bookingData.totalPages;
  const currentBookings = bookingData.bookings;

  const handleViewDetails = (trip: any) => {
    setSelectedTrip(trip);
    setDetailsModalOpen(true);
  };

  const handleManageBooking = (trip: any) => {
    setSelectedTrip(trip);
    setManageModalOpen(true);
  };

  const handleViewReceipt = (trip: any) => {
    setSelectedTrip(trip);
    setReceiptModalOpen(true);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "flight":
        return <Plane className="h-5 w-5 text-primary" />;
      case "hotel":
        return <Hotel className="h-5 w-5 text-[#10b981]" />;
      case "car":
        return <Car className="h-5 w-5 text-[#2563eb]" />;
      default:
        return <Plane className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="mb-2">My Travel Adventures</h1>
          <p className="text-muted-foreground">
            Keep track of your journeys, past and future
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
            <TabsTrigger value="history">Booking History</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingTrips.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                    <Plane className="h-8 w-8 text-[#10b981]" />
                  </div>
                  <div>
                    <h3 className="mb-2">No Trips Planned Yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start planning your next adventure today!
                    </p>
                    <Button className="bg-gradient-to-r from-[#2563eb] to-[#10b981] hover:from-[#2563eb]/90 hover:to-[#10b981]/90">
                      Explore Destinations
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              upcomingTrips.map(trip => (
                <Card
                  key={trip.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gradient-to-br from-[#2563eb] to-[#10b981] p-8 md:w-64 flex flex-col justify-between text-white">
                      <div>
                        <Badge className="bg-white/20 text-white mb-4 backdrop-blur-sm">
                          {trip.type}
                        </Badge>
                        <h3 className="mb-2">{trip.destination}</h3>
                        <div className="flex items-center gap-2 text-white/90 mb-4">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{trip.dates}</span>
                        </div>
                      </div>
                      <div className="text-2xl">{trip.price}</div>
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-[#10b981]" />
                          <span className="text-sm">Booking Confirmed</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Ref: {trip.bookingRef}
                        </span>
                      </div>

                      <div className="space-y-4 mb-6">
                        {trip.details.flight && (
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#2563eb]/10 flex items-center justify-center flex-shrink-0">
                              <Plane className="h-5 w-5 text-[#2563eb]" />
                            </div>
                            <div>
                              <div>Flight</div>
                              <p className="text-muted-foreground text-sm">
                                {trip.details.flight}
                              </p>
                            </div>
                          </div>
                        )}
                        {trip.details.hotel && (
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 flex items-center justify-center flex-shrink-0">
                              <Hotel className="h-5 w-5 text-[#10b981]" />
                            </div>
                            <div>
                              <div>Hotel</div>
                              <p className="text-muted-foreground text-sm">
                                {trip.details.hotel}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          className="flex-1"
                          onClick={() => handleViewDetails(trip)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleManageBooking(trip)}
                        >
                          Manage Booking
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {bookingData.isLoading && currentBookings.length === 0 ? (
              // Initial loading state
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563eb]"></div>
                <span className="ml-3 text-muted-foreground">
                  Loading your trips...
                </span>
              </div>
            ) : (
              <>
                {currentBookings.map(booking => (
                  <Card
                    key={booking.id}
                    className={`overflow-hidden opacity-90 hover:opacity-100 transition-opacity hover:shadow-lg ${
                      bookingData.isLoading ? "animate-pulse" : ""
                    }`}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-gradient-to-br from-gray-700 to-gray-600 p-8 md:w-64 flex flex-col justify-between text-white">
                        <div>
                          <Badge className="bg-white/20 text-white mb-4 backdrop-blur-sm">
                            {booking.type}
                          </Badge>
                          <h3 className="mb-2">{booking.destination}</h3>
                          <div className="flex items-center gap-2 text-white/90 mb-4">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{booking.dates}</span>
                          </div>
                        </div>
                        <div className="text-2xl">{booking.price}</div>
                      </div>

                      <div className="flex-1 p-6 flex flex-col">
                        {/* Header Section - Desktop: side by side, Mobile: status only */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-[#10b981]" />
                              <span className="text-sm font-medium">
                                Completed
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground ml-7">
                              Ref: {booking.bookingRef}
                            </span>
                          </div>
                          {/* Button visible only on md+ screens */}
                          <Button
                            variant="outline"
                            onClick={() => handleViewReceipt(booking)}
                            className="shrink-0 hidden md:block"
                          >
                            View Receipt
                          </Button>
                        </div>

                        {/* Booking Details */}
                        <div className="space-y-3 mb-6 flex-1">
                          {booking.category === "flight" &&
                            booking.details.flight && (
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#2563eb]/10 flex items-center justify-center flex-shrink-0">
                                  <Plane className="h-5 w-5 text-[#2563eb]" />
                                </div>
                                <div>
                                  <div className="text-sm">Flight Route</div>
                                  <p className="text-muted-foreground text-sm">
                                    {booking.details.flight}
                                  </p>
                                </div>
                              </div>
                            )}

                          {booking.category === "hotel" &&
                            booking.details.hotel && (
                              <>
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 flex items-center justify-center flex-shrink-0">
                                    <Hotel className="h-5 w-5 text-[#10b981]" />
                                  </div>
                                  <div>
                                    <div className="text-sm">Hotel</div>
                                    <p className="text-muted-foreground text-sm">
                                      {booking.details.hotel}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground ml-13">
                                  <Clock className="h-4 w-4" />
                                  <span>{booking.details.nights}</span>
                                </div>
                              </>
                            )}

                          {booking.category === "car" &&
                            booking.details.car && (
                              <>
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-[#2563eb]/10 flex items-center justify-center flex-shrink-0">
                                    <Car className="h-5 w-5 text-[#2563eb]" />
                                  </div>
                                  <div>
                                    <div className="text-sm">Vehicle</div>
                                    <p className="text-muted-foreground text-sm">
                                      {booking.details.car}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground ml-13">
                                  <MapPin className="h-4 w-4" />
                                  <span>{booking.details.pickUp}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground ml-13">
                                  <Clock className="h-4 w-4" />
                                  <span>{booking.details.days}</span>
                                </div>
                              </>
                            )}
                        </div>

                        {/* Mobile Button - visible only on small screens, at bottom */}
                        <Button
                          variant="outline"
                          onClick={() => handleViewReceipt(booking)}
                          className="w-full md:hidden mt-auto"
                        >
                          View Receipt
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Smart Pagination with async support */}
                <SmartPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={bookingData.totalItems}
                  itemsPerPage={ITEMS_PER_PAGE}
                  isLoading={bookingData.isLoading}
                  onPageChange={page => {
                    setCurrentPage(page);
                    // Note: fetchBookings will be called automatically by useEffect
                    // In real app, you might want to scroll to top only after data loads
                    if (!bookingData.isLoading) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                />
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {selectedTrip && (
        <>
          <ReceiptModal
            open={receiptModalOpen}
            onOpenChange={setReceiptModalOpen}
            trip={selectedTrip}
          />
          <TripDetailsModal
            open={detailsModalOpen}
            onOpenChange={setDetailsModalOpen}
            trip={selectedTrip}
          />
          <ManageBookingModal
            open={manageModalOpen}
            onOpenChange={setManageModalOpen}
            trip={selectedTrip}
          />
        </>
      )}
    </div>
  );
}
