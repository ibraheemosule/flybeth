import { useState, useRef, useEffect } from "react";
import { Calendar, MapPin, Search, Users, ArrowRightLeft, Plane, Building2, Plus, X, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { format } from "date-fns";
import { motion, AnimatePresence } from "motion/react";

interface FlightSearchProps {
  onSearch: (params: any) => void;
}

interface Airport {
  code: string;
  city: string;
  name: string;
  country?: string;
}

interface SearchSuggestion {
  type: 'airport' | 'city';
  data: Airport | { city: string; country?: string; airports: Airport[] };
  displayText: string;
  secondaryText: string;
  code?: string;
}

interface MultiCitySegment {
  from: string;
  to: string;
  date: Date | undefined;
}

const airports: Airport[] = [
  { code: "JFK", city: "New York", name: "John F. Kennedy International", country: "USA" },
  { code: "LGA", city: "New York", name: "LaGuardia Airport", country: "USA" },
  { code: "EWR", city: "New York", name: "Newark Liberty International", country: "USA" },
  { code: "LAX", city: "Los Angeles", name: "Los Angeles International", country: "USA" },
  { code: "ORD", city: "Chicago", name: "O'Hare International", country: "USA" },
  { code: "MDW", city: "Chicago", name: "Midway International", country: "USA" },
  { code: "DFW", city: "Dallas", name: "Dallas/Fort Worth International", country: "USA" },
  { code: "DEN", city: "Denver", name: "Denver International", country: "USA" },
  { code: "ATL", city: "Atlanta", name: "Hartsfield-Jackson Atlanta International", country: "USA" },
  { code: "LHR", city: "London", name: "London Heathrow", country: "UK" },
  { code: "LGW", city: "London", name: "London Gatwick", country: "UK" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle", country: "France" },
  { code: "ORY", city: "Paris", name: "Paris Orly", country: "France" },
  { code: "NRT", city: "Tokyo", name: "Narita International", country: "Japan" },
  { code: "HND", city: "Tokyo", name: "Tokyo Haneda", country: "Japan" },
  { code: "DXB", city: "Dubai", name: "Dubai International", country: "UAE" },
  { code: "SIN", city: "Singapore", name: "Singapore Changi", country: "Singapore" },
  { code: "HKG", city: "Hong Kong", name: "Hong Kong International", country: "Hong Kong" },
  { code: "SYD", city: "Sydney", name: "Sydney Kingsford Smith", country: "Australia" },
  { code: "MIA", city: "Miami", name: "Miami International", country: "USA" },
  { code: "SFO", city: "San Francisco", name: "San Francisco International", country: "USA" },
];

const generateSuggestions = (query: string): SearchSuggestion[] => {
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  const suggestions: SearchSuggestion[] = [];
  const citiesAdded = new Set<string>();

  // Find matching airports
  const matchingAirports = airports.filter(
    (airport) =>
      airport.city.toLowerCase().includes(lowerQuery) ||
      airport.code.toLowerCase().includes(lowerQuery) ||
      airport.name.toLowerCase().includes(lowerQuery)
  );

  // Group airports by city
  const airportsByCity = matchingAirports.reduce((acc, airport) => {
    if (!acc[airport.city]) {
      acc[airport.city] = [];
    }
    acc[airport.city].push(airport);
    return acc;
  }, {} as Record<string, Airport[]>);

  // Add city options first (for cities with multiple airports)
  Object.entries(airportsByCity).forEach(([city, cityAirports]) => {
    if (cityAirports.length > 1) {
      suggestions.push({
        type: 'city',
        data: { 
          city, 
          country: cityAirports[0].country,
          airports: cityAirports 
        },
        displayText: city,
        secondaryText: `All airports (${cityAirports.length})`,
        code: city.substring(0, 3).toUpperCase()
      });
      citiesAdded.add(city);
    }
  });

  // Add individual airport options
  matchingAirports.forEach((airport) => {
    suggestions.push({
      type: 'airport',
      data: airport,
      displayText: airport.name,
      secondaryText: `${airport.city}${airport.country ? ', ' + airport.country : ''}`,
      code: airport.code
    });
  });

  return suggestions.slice(0, 8);
};

export function FlightSearch({ onSearch }: FlightSearchProps) {
  const [tripType, setTripType] = useState("roundtrip");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("economy");
  const [fromSuggestions, setFromSuggestions] = useState<SearchSuggestion[]>([]);
  const [toSuggestions, setToSuggestions] = useState<SearchSuggestion[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  
  // Multi-city state
  const [multiCitySegments, setMultiCitySegments] = useState<MultiCitySegment[]>([
    { from: "", to: "", date: undefined },
    { from: "", to: "", date: undefined },
  ]);
  const [multiCitySuggestions, setMultiCitySuggestions] = useState<{ [key: string]: SearchSuggestion[] }>({});
  const [showMultiCitySuggestions, setShowMultiCitySuggestions] = useState<{ [key: string]: boolean }>({});
  
  const fromInputRef = useRef<HTMLDivElement>(null);
  const toInputRef = useRef<HTMLDivElement>(null);
  
  const totalTravelers = adults + children + infants;
  
  const getTravelersText = () => {
    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults !== 1 ? 's' : ''}`);
    if (children > 0) parts.push(`${children} Child${children !== 1 ? 'ren' : ''}`);
    if (infants > 0) parts.push(`${infants} Infant${infants !== 1 ? 's' : ''}`);
    return parts.join(', ') || '0 Travelers';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromInputRef.current && !fromInputRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toInputRef.current && !toInputRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
      
      // Close all multi-city suggestions if clicked outside
      setShowMultiCitySuggestions({});
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFromChange = (value: string) => {
    setFrom(value);
    if (value.length > 0) {
      const suggestions = generateSuggestions(value);
      setFromSuggestions(suggestions);
      setShowFromSuggestions(true);
    } else {
      setShowFromSuggestions(false);
    }
  };

  const handleToChange = (value: string) => {
    setTo(value);
    if (value.length > 0) {
      const suggestions = generateSuggestions(value);
      setToSuggestions(suggestions);
      setShowToSuggestions(true);
    } else {
      setShowToSuggestions(false);
    }
  };

  const selectFromSuggestion = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'city') {
      const cityData = suggestion.data as { city: string; airports: Airport[] };
      setFrom(`${cityData.city} (All Airports)`);
    } else {
      const airport = suggestion.data as Airport;
      setFrom(`${airport.city} (${airport.code})`);
    }
    setShowFromSuggestions(false);
  };

  const selectToSuggestion = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'city') {
      const cityData = suggestion.data as { city: string; airports: Airport[] };
      setTo(`${cityData.city} (All Airports)`);
    } else {
      const airport = suggestion.data as Airport;
      setTo(`${airport.city} (${airport.code})`);
    }
    setShowToSuggestions(false);
  };

  // Multi-city handlers
  const handleMultiCityFieldChange = (index: number, field: 'from' | 'to', value: string) => {
    const newSegments = [...multiCitySegments];
    newSegments[index][field] = value;
    setMultiCitySegments(newSegments);

    if (value.length > 0) {
      const suggestions = generateSuggestions(value);
      setMultiCitySuggestions(prev => ({
        ...prev,
        [`${index}-${field}`]: suggestions
      }));
      setShowMultiCitySuggestions(prev => ({
        ...prev,
        [`${index}-${field}`]: true
      }));
    } else {
      setShowMultiCitySuggestions(prev => ({
        ...prev,
        [`${index}-${field}`]: false
      }));
    }
  };

  const handleMultiCityDateChange = (index: number, date: Date | undefined) => {
    const newSegments = [...multiCitySegments];
    newSegments[index].date = date;
    setMultiCitySegments(newSegments);
  };

  const selectMultiCitySuggestion = (index: number, field: 'from' | 'to', suggestion: SearchSuggestion) => {
    const newSegments = [...multiCitySegments];
    if (suggestion.type === 'city') {
      const cityData = suggestion.data as { city: string; airports: Airport[] };
      newSegments[index][field] = `${cityData.city} (All Airports)`;
    } else {
      const airport = suggestion.data as Airport;
      newSegments[index][field] = `${airport.city} (${airport.code})`;
    }
    setMultiCitySegments(newSegments);
    setShowMultiCitySuggestions(prev => ({
      ...prev,
      [`${index}-${field}`]: false
    }));
  };

  const addMultiCitySegment = () => {
    if (multiCitySegments.length < 6) {
      setMultiCitySegments([...multiCitySegments, { from: "", to: "", date: undefined }]);
    }
  };

  const removeMultiCitySegment = (index: number) => {
    if (multiCitySegments.length > 2) {
      const newSegments = multiCitySegments.filter((_, i) => i !== index);
      setMultiCitySegments(newSegments);
    }
  };

  const handleSearch = () => {
    if (tripType === "multicity") {
      // Validate all multi-city segments
      const allSegmentsValid = multiCitySegments.every(seg => seg.from && seg.to && seg.date);
      if (allSegmentsValid) {
        onSearch({
          tripType,
          passengers: totalTravelers,
          travelClass,
          multiCitySegments: multiCitySegments.map(seg => ({
            from: seg.from,
            to: seg.to,
            departDate: seg.date ? format(seg.date, "PPP") : ""
          }))
        });
      }
    } else {
      if (from && to && departDate) {
        onSearch({
          from,
          to,
          departDate: format(departDate, "PPP"),
          returnDate: returnDate ? format(returnDate, "PPP") : undefined,
          passengers: totalTravelers,
          tripType,
          travelClass,
        });
      }
    }
  };

  const isSearchDisabled = tripType === "multicity" 
    ? !multiCitySegments.every(seg => seg.from && seg.to && seg.date)
    : !from || !to || !departDate;

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

        {/* Standard and One-way Search Form */}
        {tripType !== "multicity" && (
          <>
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
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border-2 border-primary/20 rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50">
                      {fromSuggestions.map((suggestion, index) => (
                        <div
                          key={`${suggestion.type}-${suggestion.code}-${index}`}
                          onClick={() => selectFromSuggestion(suggestion)}
                          className="p-3 hover:bg-primary/10 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 p-1.5 rounded-lg ${
                              suggestion.type === 'city' ? 'bg-accent/10' : 'bg-primary/10'
                            }`}>
                              {suggestion.type === 'city' ? (
                                <Building2 className="h-4 w-4 text-accent" />
                              ) : (
                                <Plane className="h-4 w-4 text-primary" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="text-sm">{suggestion.displayText}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {suggestion.secondaryText}
                                  </div>
                                </div>
                                <div className={`text-xs px-2 py-1 rounded shrink-0 ${
                                  suggestion.type === 'city' ? 'text-accent bg-accent/10' : 'text-primary bg-primary/10'
                                }`}>
                                  {suggestion.code}
                                </div>
                              </div>
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
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border-2 border-accent/20 rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50">
                      {toSuggestions.map((suggestion, index) => (
                        <div
                          key={`${suggestion.type}-${suggestion.code}-${index}`}
                          onClick={() => selectToSuggestion(suggestion)}
                          className="p-3 hover:bg-accent/10 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 p-1.5 rounded-lg ${
                              suggestion.type === 'city' ? 'bg-accent/10' : 'bg-primary/10'
                            }`}>
                              {suggestion.type === 'city' ? (
                                <Building2 className="h-4 w-4 text-accent" />
                              ) : (
                                <Plane className="h-4 w-4 text-primary" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="text-sm">{suggestion.displayText}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {suggestion.secondaryText}
                                  </div>
                                </div>
                                <div className={`text-xs px-2 py-1 rounded shrink-0 ${
                                  suggestion.type === 'city' ? 'text-accent bg-accent/10' : 'text-primary bg-primary/10'
                                }`}>
                                  {suggestion.code}
                                </div>
                              </div>
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
          </>
        )}

        {/* Multi-city Search Form */}
        {tripType === "multicity" && (
          <div className="space-y-4 mb-6">
            <AnimatePresence mode="popLayout">
              {multiCitySegments.map((segment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border-2 border-primary/10">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm shrink-0 mt-7">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* From */}
                      <div className="space-y-2">
                        <Label className="text-primary">From</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent z-10" />
                          <Input 
                            placeholder="City or airport" 
                            className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm" 
                            value={segment.from}
                            onChange={(e) => handleMultiCityFieldChange(index, 'from', e.target.value)}
                            onFocus={() => segment.from && setShowMultiCitySuggestions(prev => ({ ...prev, [`${index}-from`]: true }))}
                          />
                          {showMultiCitySuggestions[`${index}-from`] && multiCitySuggestions[`${index}-from`]?.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border-2 border-primary/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-50">
                              {multiCitySuggestions[`${index}-from`].map((suggestion, idx) => (
                                <div
                                  key={`${index}-from-${suggestion.code}-${idx}`}
                                  onClick={() => selectMultiCitySuggestion(index, 'from', suggestion)}
                                  className="p-2 hover:bg-primary/10 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                                >
                                  <div className="flex items-start gap-2">
                                    <div className={`mt-0.5 p-1 rounded-lg ${suggestion.type === 'city' ? 'bg-accent/10' : 'bg-primary/10'}`}>
                                      {suggestion.type === 'city' ? <Building2 className="h-3 w-3 text-accent" /> : <Plane className="h-3 w-3 text-primary" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                          <div className="text-xs">{suggestion.displayText}</div>
                                          <div className="text-xs text-muted-foreground">{suggestion.secondaryText}</div>
                                        </div>
                                        <div className={`text-xs px-1.5 py-0.5 rounded shrink-0 ${suggestion.type === 'city' ? 'text-accent bg-accent/10' : 'text-primary bg-primary/10'}`}>
                                          {suggestion.code}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* To */}
                      <div className="space-y-2">
                        <Label className="text-primary">To</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent z-10" />
                          <Input 
                            placeholder="City or airport" 
                            className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm" 
                            value={segment.to}
                            onChange={(e) => handleMultiCityFieldChange(index, 'to', e.target.value)}
                            onFocus={() => segment.to && setShowMultiCitySuggestions(prev => ({ ...prev, [`${index}-to`]: true }))}
                          />
                          {showMultiCitySuggestions[`${index}-to`] && multiCitySuggestions[`${index}-to`]?.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border-2 border-accent/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-50">
                              {multiCitySuggestions[`${index}-to`].map((suggestion, idx) => (
                                <div
                                  key={`${index}-to-${suggestion.code}-${idx}`}
                                  onClick={() => selectMultiCitySuggestion(index, 'to', suggestion)}
                                  className="p-2 hover:bg-accent/10 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                                >
                                  <div className="flex items-start gap-2">
                                    <div className={`mt-0.5 p-1 rounded-lg ${suggestion.type === 'city' ? 'bg-accent/10' : 'bg-primary/10'}`}>
                                      {suggestion.type === 'city' ? <Building2 className="h-3 w-3 text-accent" /> : <Plane className="h-3 w-3 text-primary" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                          <div className="text-xs">{suggestion.displayText}</div>
                                          <div className="text-xs text-muted-foreground">{suggestion.secondaryText}</div>
                                        </div>
                                        <div className={`text-xs px-1.5 py-0.5 rounded shrink-0 ${suggestion.type === 'city' ? 'text-accent bg-accent/10' : 'text-primary bg-primary/10'}`}>
                                          {suggestion.code}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Date */}
                      <div className="space-y-2">
                        <Label className="text-primary">Departure</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left h-12 border-2 hover:border-accent bg-white/80 backdrop-blur-sm"
                            >
                              <Calendar className="mr-2 h-5 w-5 text-accent" />
                              {segment.date ? format(segment.date, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-xl border-2" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={segment.date}
                              onSelect={(date) => handleMultiCityDateChange(index, date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* Remove button */}
                    {multiCitySegments.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMultiCitySegment(index)}
                        className="shrink-0 mt-7 hover:bg-red-50 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add Flight Button */}
            {multiCitySegments.length < 6 && (
              <Button
                variant="outline"
                onClick={addMultiCitySegment}
                className="w-full border-2 border-primary/20 bg-gradient-to-r from-primary/3 to-accent/3 hover:from-primary/8 hover:to-accent/8 hover:border-primary/30 transition-all text-primary/70 hover:text-primary"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Flight
              </Button>
            )}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-end gap-4">
          <div className="space-y-2 flex-1">
            <Label className="text-primary">Travelers</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-12 border-2 hover:border-accent bg-white/80 backdrop-blur-sm"
                >
                  <Users className="mr-2 h-5 w-5 text-accent" />
                  {getTravelersText()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-6 bg-white/95 backdrop-blur-xl border-2 shadow-xl" align="start">
                <div className="space-y-5">
                  {/* Adults */}
                  <div className="flex items-center justify-between group">
                    <div>
                      <div className="font-medium">Adults</div>
                      <div className="text-xs text-muted-foreground">18+ years</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg border-primary/30 hover:border-primary hover:bg-primary/5"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        disabled={adults <= 1}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="w-10 text-center font-medium">{adults}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg border-primary/30 hover:border-primary hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10"
                        onClick={() => setAdults(Math.min(9, adults + 1))}
                        disabled={adults >= 9}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between group">
                    <div>
                      <div className="font-medium">Children</div>
                      <div className="text-xs text-muted-foreground">2-17 years</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg border-primary/30 hover:border-primary hover:bg-primary/5"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        disabled={children <= 0}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="w-10 text-center font-medium">{children}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg border-primary/30 hover:border-primary hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10"
                        onClick={() => setChildren(Math.min(9, children + 1))}
                        disabled={children >= 9}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="flex items-center justify-between group">
                    <div>
                      <div className="font-medium">Infants</div>
                      <div className="text-xs text-muted-foreground">Under 2</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg border-primary/30 hover:border-primary hover:bg-primary/5"
                        onClick={() => setInfants(Math.max(0, infants - 1))}
                        disabled={infants <= 0}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="w-10 text-center font-medium">{infants}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg border-primary/30 hover:border-primary hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10"
                        onClick={() => setInfants(Math.min(9, infants + 1))}
                        disabled={infants >= 9}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2 flex-1">
            <Label htmlFor="class" className="text-primary">Class</Label>
            <Select value={travelClass} onValueChange={setTravelClass}>
              <SelectTrigger className="!h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm w-full">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-2">
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="premium-economy">Premium Economy</SelectItem>
                <SelectItem value="business">Business Class</SelectItem>
                <SelectItem value="first">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleSearch}
            disabled={isSearchDisabled}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12 px-12 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Search className="mr-2 h-5 w-5" />
            Search Flights
          </Button>
        </div>
      </div>
    </div>
  );
}