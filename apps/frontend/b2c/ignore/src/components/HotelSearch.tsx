import { useState } from "react";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { format } from "date-fns";

interface HotelSearchProps {
  onSearch: (params: any) => void;
}

export function HotelSearch({ onSearch }: HotelSearchProps) {
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState("2 Adults, 1 Room");

  const handleSearch = () => {
    if (!destination || !checkInDate || !checkOutDate) {
      return;
    }
    onSearch({
      type: "hotel",
      destination,
      checkInDate: format(checkInDate, "PPP"),
      checkOutDate: format(checkOutDate, "PPP"),
      guests,
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-accent">Where to?</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
              <Input
                id="destination"
                placeholder="City, hotel, landmark..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-11 h-12 border-2 focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkin" className="text-accent">Check-in</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-12 border-2 hover:border-primary"
                >
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkout" className="text-accent">Check-out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-12 border-2 hover:border-primary"
                >
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={checkOutDate}
                  onSelect={setCheckOutDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests" className="text-accent">Guests & Rooms</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
              <Input
                id="guests"
                placeholder="2 Adults, 1 Room"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="pl-11 h-12 border-2 focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 h-12 px-12 shadow-lg hover:shadow-xl transition-all"
          >
            <Search className="mr-2 h-5 w-5" />
            Find Hotels
          </Button>
        </div>
      </div>
    </div>
  );
}