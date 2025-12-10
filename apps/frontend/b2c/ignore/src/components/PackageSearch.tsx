import { useState } from "react";
import { Calendar, MapPin, Search, Users, Plane, Hotel, Car, Ticket } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { format } from "date-fns";
import { Checkbox } from "./ui/checkbox";

interface PackageSearchProps {
  onSearch: (params: any) => void;
}

export function PackageSearch({ onSearch }: PackageSearchProps) {
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [travelers, setTravelers] = useState("2");
  const [includeFlights, setIncludeFlights] = useState(true);
  const [includeHotels, setIncludeHotels] = useState(true);
  const [includeCars, setIncludeCars] = useState(false);
  const [includeActivities, setIncludeActivities] = useState(false);

  const handleSearch = () => {
    if (!destination || !departDate || !returnDate) {
      return;
    }
    onSearch({
      type: "package",
      destination,
      departDate: format(departDate, "PPP"),
      returnDate: format(returnDate, "PPP"),
      travelers,
      includes: {
        flights: includeFlights,
        hotels: includeHotels,
        cars: includeCars,
        activities: includeActivities,
      },
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="mb-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
          <p className="text-sm text-center">
            <span className="font-semibold">Save big!</span> Bundle flights + hotels + activities for the ultimate deal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="package-destination" className="text-accent">Destination</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
              <Input
                id="package-destination"
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-11 h-12 border-2 focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="package-depart" className="text-accent">Departure</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-12 border-2 hover:border-primary"
                >
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  {departDate ? format(departDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={departDate}
                  onSelect={setDepartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="package-return" className="text-accent">Return</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-12 border-2 hover:border-primary"
                >
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  {returnDate ? format(returnDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="package-travelers" className="text-accent">Travelers</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
              <Input
                id="package-travelers"
                placeholder="2 travelers"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="pl-11 h-12 border-2 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Package Inclusions */}
        <div className="mb-6 p-4 bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl border border-accent/20">
          <Label className="text-accent mb-3 block">Customize Your Package</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-flights"
                checked={includeFlights}
                onCheckedChange={(checked) => setIncludeFlights(checked as boolean)}
              />
              <Label htmlFor="include-flights" className="flex items-center gap-2 cursor-pointer">
                <Plane className="h-4 w-4 text-primary" />
                <span>Flights</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-hotels"
                checked={includeHotels}
                onCheckedChange={(checked) => setIncludeHotels(checked as boolean)}
              />
              <Label htmlFor="include-hotels" className="flex items-center gap-2 cursor-pointer">
                <Hotel className="h-4 w-4 text-accent" />
                <span>Hotels</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-cars"
                checked={includeCars}
                onCheckedChange={(checked) => setIncludeCars(checked as boolean)}
              />
              <Label htmlFor="include-cars" className="flex items-center gap-2 cursor-pointer">
                <Car className="h-4 w-4 text-primary" />
                <span>Cars</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-activities"
                checked={includeActivities}
                onCheckedChange={(checked) => setIncludeActivities(checked as boolean)}
              />
              <Label htmlFor="include-activities" className="flex items-center gap-2 cursor-pointer">
                <Ticket className="h-4 w-4 text-accent" />
                <span>Activities</span>
              </Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12 px-12 shadow-lg hover:shadow-xl transition-all"
          >
            <Search className="mr-2 h-5 w-5" />
            Explore Packages
          </Button>
        </div>
      </div>
    </div>
  );
}