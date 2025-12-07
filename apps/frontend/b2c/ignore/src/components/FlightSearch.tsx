import { useState, useRef, useEffect } from "react";
import { Calendar, MapPin, Search, Users, ArrowRightLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { format } from "date-fns";

interface FlightSearchProps {
  onSearch: (params: any) => void;
}

const airports = [
  { code: "JFK", city: "New York", name: "John F. Kennedy International" },
  { code: "LAX", city: "Los Angeles", name: "Los Angeles International" },
  { code: "ORD", city: "Chicago", name: "O'Hare International" },
  { code: "DFW", city: "Dallas", name: "Dallas/Fort Worth International" },
  { code: "DEN", city: "Denver", name: "Denver International" },
  { code: "ATL", city: "Atlanta", name: "Hartsfield-Jackson Atlanta International" },
  { code: "LHR", city: "London", name: "London Heathrow" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle" },
  { code: "NRT", city: "Tokyo", name: "Narita International" },
  { code: "DXB", city: "Dubai", name: "Dubai International" },
  { code: "SIN", city: "Singapore", name: "Singapore Changi" },
  { code: "HKG", city: "Hong Kong", name: "Hong Kong International" },
  { code: "SYD", city: "Sydney", name: "Sydney Kingsford Smith" },
  { code: "MIA", city: "Miami", name: "Miami International" },
  { code: "SFO", city: "San Francisco", name: "San Francisco International" },
];

export function FlightSearch({ onSearch }: FlightSearchProps) {
  const [tripType, setTripType] = useState("roundtrip");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [travelers, setTravelers] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState<typeof airports>([]);
  const [toSuggestions, setToSuggestions] = useState<typeof airports>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  
  const fromInputRef = useRef<HTMLDivElement>(null);
  const toInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromInputRef.current && !fromInputRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toInputRef.current && !toInputRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFromChange = (value: string) => {
    setFrom(value);
    if (value.length > 0) {
      const filtered = airports.filter(
        (airport) =>
          airport.city.toLowerCase().includes(value.toLowerCase()) ||
          airport.code.toLowerCase().includes(value.toLowerCase()) ||
          airport.name.toLowerCase().includes(value.toLowerCase())
      );
      setFromSuggestions(filtered);
      setShowFromSuggestions(true);
    } else {
      setShowFromSuggestions(false);
    }
  };

  const handleToChange = (value: string) => {
    setTo(value);
    if (value.length > 0) {
      const filtered = airports.filter(
        (airport) =>
          airport.city.toLowerCase().includes(value.toLowerCase()) ||
          airport.code.toLowerCase().includes(value.toLowerCase()) ||
          airport.name.toLowerCase().includes(value.toLowerCase())
      );
      setToSuggestions(filtered);
      setShowToSuggestions(true);
    } else {
      setShowToSuggestions(false);
    }
  };

  const selectFromAirport = (airport: typeof airports[0]) => {
    setFrom(`${airport.city} (${airport.code})`);
    setShowFromSuggestions(false);
  };

  const selectToAirport = (airport: typeof airports[0]) => {
    setTo(`${airport.city} (${airport.code})`);
    setShowToSuggestions(false);
  };

  const handleSearch = () => {
    if (from && to && departDate) {
      onSearch({
        from,
        to,
        departDate: format(departDate, "PPP"),
        returnDate: returnDate ? format(returnDate, "PPP") : undefined,
        travelers,
        tripType,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-white/50 relative overflow-hidden">
      {/* Enhanced gradient overlay with glass effect */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/10 via-primary/5 to-transparent pointer-events-none backdrop-blur-sm" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none backdrop-blur-sm" />
      
      <div className="relative z-10">
        <RadioGroup value={tripType} onValueChange={setTripType} className="flex flex-wrap gap-6 mb-8">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="roundtrip" id="roundtrip" className="border-primary data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent" />
            <Label htmlFor="roundtrip" className="cursor-pointer">Round-trip</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oneway" id="oneway" className="border-primary data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent" />
            <Label htmlFor="oneway" className="cursor-pointer">One-way</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multicity" id="multicity" className="border-primary data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent" />
            <Label htmlFor="multicity" className="cursor-pointer">Multi-city</Label>
          </div>
        </RadioGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2" ref={fromInputRef}>
            <Label htmlFor="from" className="text-primary">Flying From</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent z-10" />
              <Input 
                id="from" 
                placeholder="City or airport" 
                className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm" 
                value={from}
                onChange={(e) => handleFromChange(e.target.value)}
                onFocus={() => from && setShowFromSuggestions(true)}
              />
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border-2 border-primary/20 rounded-xl shadow-2xl max-h-64 overflow-y-auto z-50">
                  {fromSuggestions.map((airport) => (
                    <div
                      key={airport.code}
                      onClick={() => selectFromAirport(airport)}
                      className="p-3 hover:bg-primary/10 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm">{airport.city}</div>
                          <div className="text-xs text-muted-foreground">{airport.name}</div>
                        </div>
                        <div className="text-primary px-2 py-1 bg-primary/10 rounded text-xs">
                          {airport.code}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2" ref={toInputRef}>
            <Label htmlFor="to" className="text-primary">Flying To</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent z-10" />
              <Input 
                id="to" 
                placeholder="City or airport" 
                className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm" 
                value={to}
                onChange={(e) => handleToChange(e.target.value)}
                onFocus={() => to && setShowToSuggestions(true)}
              />
              {showToSuggestions && toSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border-2 border-accent/20 rounded-xl shadow-2xl max-h-64 overflow-y-auto z-50">
                  {toSuggestions.map((airport) => (
                    <div
                      key={airport.code}
                      onClick={() => selectToAirport(airport)}
                      className="p-3 hover:bg-accent/10 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm">{airport.city}</div>
                          <div className="text-xs text-muted-foreground">{airport.name}</div>
                        </div>
                        <div className="text-accent px-2 py-1 bg-accent/10 rounded text-xs">
                          {airport.code}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="depart" className="text-primary">Departure</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-12 border-2 hover:border-accent bg-white/80 backdrop-blur-sm"
                >
                  <Calendar className="mr-2 h-5 w-5 text-accent" />
                  {departDate ? format(departDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-xl border-2" align="start">
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
            <Label htmlFor="return" className="text-primary">Return</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-12 border-2 hover:border-accent bg-white/80 backdrop-blur-sm"
                  disabled={tripType === "oneway"}
                >
                  <Calendar className="mr-2 h-5 w-5 text-accent" />
                  {returnDate ? format(returnDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-xl border-2" align="start">
                <CalendarComponent
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end gap-4">
          <div className="space-y-2 flex-1">
            <Label htmlFor="travelers" className="text-primary">Travelers & Class</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
              <Input 
                id="travelers" 
                placeholder="1 Adult, Economy" 
                className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm" 
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={handleSearch}
            disabled={!from || !to || !departDate}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12 px-12 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="mr-2 h-5 w-5" />
            Search Flights
          </Button>
        </div>
      </div>
    </div>
  );
}