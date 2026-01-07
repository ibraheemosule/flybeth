import { useState } from "react";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { Button } from "../../../../../ui/button";
import { Input } from "../../../../../ui/input";
import { Label } from "../../../../../ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../ui/popover";
import { Calendar as CalendarComponent } from "../../../../../ui/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  useHotelsStore,
  useFlightsStore,
  useCarsStore,
  usePackagesStore,
  useAttractionsStore,
} from "@/stores";

interface HotelSearchProps {
  onSearch?: (params: any) => void;
}

export default function HotelSearch({ onSearch }: HotelSearchProps) {
  const router = useRouter();
  const { searchParams } = useHotelsStore();
  const { location, checkIn, checkOut, guests } = searchParams || {};

  const update = (updates: {
    location?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }) => {
    const currentParams = useHotelsStore.getState().searchParams;
    useHotelsStore.setState({
      searchParams: {
        location: currentParams?.location || "",
        checkIn: currentParams?.checkIn || "",
        checkOut: currentParams?.checkOut || "",
        guests: currentParams?.guests || 2,
        ...updates,
      },
    });
  };

  const [destinationLocal, setDestinationLocal] = useState(location || "");
  const [checkInDateLocal, setCheckInDateLocal] = useState<Date | undefined>(
    checkIn ? new Date(checkIn) : undefined
  );
  const [checkOutDateLocal, setCheckOutDateLocal] = useState<Date | undefined>(
    checkOut ? new Date(checkOut) : undefined
  );
  const [guestsLocal, setGuestsLocal] = useState(guests?.toString() || "2");

  const handleSearch = () => {
    if (!destinationLocal || !checkInDateLocal || !checkOutDateLocal) {
      return;
    }

    if (onSearch) {
      // If onSearch prop is provided, use it for integrated search flow
      const searchData = {
        type: "hotel",
        location: destinationLocal,
        checkIn: checkInDateLocal.toISOString(),
        checkOut: checkOutDateLocal.toISOString(),
        guests: parseInt(guestsLocal),
        roomType: "standard",
      };
      onSearch(searchData);
    } else {
      // Otherwise, use Next.js navigation (existing behavior)
      useFlightsStore.setState({ searchParams: null });
      useCarsStore.setState({ searchParams: null });
      usePackagesStore.setState({ searchParams: null });
      useAttractionsStore.setState({ searchParams: null });

      update({
        location: destinationLocal,
        checkIn: checkInDateLocal.toISOString(),
        checkOut: checkOutDateLocal.toISOString(),
        guests: parseInt(guestsLocal),
      });
      router.push("/search");
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-accent">
              Where to?
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
              <Input
                id="destination"
                placeholder="City, hotel, landmark..."
                value={destinationLocal}
                onChange={e => {
                  setDestinationLocal(e.target.value);
                  update({ location: e.target.value });
                }}
                className="pl-11 h-12 border-2 focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkin" className="text-accent">
              Check-in
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-12 border-2 hover:border-primary"
                >
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  {checkInDateLocal
                    ? format(checkInDateLocal, "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-white border-2 border-primary/20 shadow-2xl z-50"
                align="start"
              >
                <CalendarComponent
                  mode="single"
                  selected={checkInDateLocal}
                  onSelect={date => {
                    setCheckInDateLocal(date);
                    if (date) update({ checkIn: date.toISOString() });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkout" className="text-accent">
              Check-out
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-12 border-2 hover:border-primary"
                >
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  {checkOutDateLocal
                    ? format(checkOutDateLocal, "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-white border-2 border-primary/20 shadow-2xl z-50"
                align="start"
              >
                <CalendarComponent
                  mode="single"
                  selected={checkOutDateLocal}
                  onSelect={date => {
                    setCheckOutDateLocal(date);
                    if (date) update({ checkOut: date.toISOString() });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end gap-4">
          <div className="space-y-2 flex-1">
            <Label htmlFor="guests" className="text-accent">
              Guests & Rooms
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
              <Input
                id="guests"
                placeholder="2 Adults, 1 Room"
                value={guestsLocal}
                onChange={e => {
                  setGuestsLocal(e.target.value);
                  // Extract number from guests string (simple implementation)
                  const match = e.target.value.match(/(\d+)/);
                  const guestCount = match ? parseInt(match[1]) : 2;
                  update({ guests: guestCount });
                }}
                className="pl-11 h-12 border-2 focus:border-primary"
              />
            </div>
          </div>

          <Button onClick={handleSearch} className="btn-gradient-primary h-12">
            <Search className="mr-2 h-5 w-5" />
            Find Hotels
          </Button>
        </div>
      </div>
    </div>
  );
}
