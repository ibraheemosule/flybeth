import { useState } from "react";
import { Calendar, MapPin, Search, Clock, Car, Plane } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { format } from "date-fns";
import { Checkbox } from "./ui/checkbox";

interface CarSearchProps {
  onSearch: (params: any) => void;
}

export function CarSearch({ onSearch }: CarSearchProps) {
  const [carType, setCarType] = useState<"rental" | "taxi">("rental");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState<Date>();
  const [dropOffDate, setDropOffDate] = useState<Date>();
  const [sameLocation, setSameLocation] = useState(true);

  const handleSearch = () => {
    if (carType === "rental") {
      if (!pickUpLocation || !pickUpDate || !dropOffDate) {
        return;
      }
      onSearch({
        type: "car",
        carType: "rental",
        pickUpLocation,
        dropOffLocation: sameLocation ? pickUpLocation : dropOffLocation,
        pickUpDate: format(pickUpDate, "PPP"),
        dropOffDate: format(dropOffDate, "PPP"),
      });
    } else {
      if (!pickUpLocation || !dropOffLocation || !pickUpDate) {
        return;
      }
      onSearch({
        type: "car",
        carType: "taxi",
        pickUpLocation,
        dropOffLocation,
        pickUpDate: format(pickUpDate, "PPP"),
      });
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {/* Car Type Selection - Improved UI */}
        <div className="mb-6">
          <Label className="text-accent mb-3 block text-lg">Choose Your Service</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setCarType("rental")}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                carType === "rental"
                  ? "border-primary bg-gradient-to-br from-primary/10 to-accent/5 shadow-lg scale-[1.02]"
                  : "border-gray-200 bg-white hover:border-primary/50 hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                  carType === "rental"
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary"
                }`}>
                  <Car className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 flex items-center gap-2">
                    Car Rental
                    {carType === "rental" && (
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Rent a vehicle for your entire trip with flexible pick-up and drop-off
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setCarType("taxi")}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                carType === "taxi"
                  ? "border-accent bg-gradient-to-br from-accent/10 to-primary/5 shadow-lg scale-[1.02]"
                  : "border-gray-200 bg-white hover:border-accent/50 hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                  carType === "taxi"
                    ? "bg-accent text-white"
                    : "bg-accent/10 text-accent"
                }`}>
                  <Plane className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 flex items-center gap-2">
                    Airport Taxi
                    {carType === "taxi" && (
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Book reliable airport transfers to and from your destination
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Car Rental Form */}
        {carType === "rental" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="pickup-location" className="text-accent">Pick-up Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                  <Input
                    id="pickup-location"
                    placeholder="City or airport"
                    value={pickUpLocation}
                    onChange={(e) => setPickUpLocation(e.target.value)}
                    className="pl-11 h-12 border-2 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickup-date" className="text-accent">Pick-up Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-12 border-2 hover:border-primary"
                    >
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      {pickUpDate ? format(pickUpDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={pickUpDate}
                      onSelect={setPickUpDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dropoff-date" className="text-accent">Drop-off Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-12 border-2 hover:border-primary"
                    >
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      {dropOffDate ? format(dropOffDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={dropOffDate}
                      onSelect={setDropOffDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickup-time" className="text-accent">Pick-up Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                  <Input
                    id="pickup-time"
                    type="time"
                    defaultValue="10:00"
                    className="pl-11 h-12 border-2 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <Checkbox
                id="same-location"
                checked={sameLocation}
                onCheckedChange={(checked) => setSameLocation(checked as boolean)}
              />
              <label
                htmlFor="same-location"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Return to same location
              </label>
            </div>

            {!sameLocation && (
              <div className="mb-6">
                <Label htmlFor="dropoff-location" className="text-accent">Drop-off Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                  <Input
                    id="dropoff-location"
                    placeholder="City or airport"
                    value={dropOffLocation}
                    onChange={(e) => setDropOffLocation(e.target.value)}
                    className="pl-11 h-12 border-2 focus:border-primary"
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* Airport Taxi Form */}
        {carType === "taxi" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="taxi-from" className="text-accent">From</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <Input
                  id="taxi-from"
                  placeholder="Airport or address"
                  value={pickUpLocation}
                  onChange={(e) => setPickUpLocation(e.target.value)}
                  className="pl-11 h-12 border-2 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxi-to" className="text-accent">To</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
                <Input
                  id="taxi-to"
                  placeholder="Address or airport"
                  value={dropOffLocation}
                  onChange={(e) => setDropOffLocation(e.target.value)}
                  className="pl-11 h-12 border-2 focus:border-accent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxi-date" className="text-accent">Transfer Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-12 border-2 hover:border-primary"
                  >
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    {pickUpDate ? format(pickUpDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={pickUpDate}
                    onSelect={setPickUpDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxi-time" className="text-accent">Transfer Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <Input
                  id="taxi-time"
                  type="time"
                  defaultValue="10:00"
                  className="pl-11 h-12 border-2 focus:border-primary"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 h-12 px-12 shadow-lg hover:shadow-xl transition-all"
          >
            <Search className="mr-2 h-5 w-5" />
            {carType === "rental" ? "Find Rental Cars" : "Book Airport Transfer"}
          </Button>
        </div>
      </div>
    </div>
  );
}