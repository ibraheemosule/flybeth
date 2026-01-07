import { useState, useRef, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Search,
  Users,
  ArrowRightLeft,
  Plus,
  Minus,
  X,
  Building2,
  Plane,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar as CalendarComponent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { format } from "date-fns";
import { airports } from "./utilsFlightSearch";
import {
  useFlightsStore,
  useHotelsStore,
  useCarsStore,
  usePackagesStore,
  useAttractionsStore,
  FlightSearchParamState,
} from "@/stores";
import { useRouter } from "next/navigation";

interface FlightSearchProps {
  onSearch?: (params: any) => void;
}

interface MultiCitySegment {
  from: string;
  to: string;
  date: Date | undefined;
}

interface SearchSuggestion {
  type: "city" | "airport";
  data: any;
  displayText: string;
  secondaryText: string;
  code: string;
}

interface Airport {
  code: string;
  name: string;
  city: string;
  country?: string;
}

export default function FlightSearch({ onSearch }: FlightSearchProps) {
  const router = useRouter();
  const { searchParams } = useFlightsStore();
  const {
    from,
    to,
    departure,
    return: returnDate,
    passengers,
    tripType,
  } = searchParams || {};

  const update = (updates: Partial<FlightSearchParamState>) => {
    const currentParams = useFlightsStore.getState().searchParams;
    useFlightsStore.setState({
      searchParams: {
        from: currentParams?.from || "",
        to: currentParams?.to || "",
        departure: currentParams?.departure || "",
        return: currentParams?.return || "",
        passengers: currentParams?.passengers || 1,
        tripType: currentParams?.tripType || "roundtrip",
        ...updates,
      },
    });
  };

  const [fromSuggestions, setFromSuggestions] = useState<typeof airports>([]);
  const [toSuggestions, setToSuggestions] = useState<typeof airports>([]);

  // Multi-city state
  const [multiCitySegments, setMultiCitySegments] = useState<
    MultiCitySegment[]
  >([
    { from: "", to: "", date: undefined },
    { from: "", to: "", date: undefined },
  ]);
  const [multiCitySuggestions, setMultiCitySuggestions] = useState<{
    [key: string]: SearchSuggestion[];
  }>({});
  const [showMultiCitySuggestions, setShowMultiCitySuggestions] = useState<{
    [key: string]: boolean;
  }>({});

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("economy");

  const fromInputRef = useRef<HTMLDivElement>(null);
  const toInputRef = useRef<HTMLDivElement>(null);

  const totalTravelers = adults + children + infants;

  const getTravelersText = () => {
    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults !== 1 ? "s" : ""}`);
    if (children > 0)
      parts.push(`${children} Child${children !== 1 ? "ren" : ""}`);
    if (infants > 0) parts.push(`${infants} Infant${infants !== 1 ? "s" : ""}`);
    return parts.join(", ") || "0 Travelers";
  };

  // Generate suggestions function for multi-city
  const generateSuggestions = (query: string): SearchSuggestion[] => {
    if (!query || query.length < 2) return [];

    const suggestions: SearchSuggestion[] = [];
    const matchingAirports = airports
      .filter(
        airport =>
          airport.city.toLowerCase().includes(query.toLowerCase()) ||
          airport.code.toLowerCase().includes(query.toLowerCase()) ||
          airport.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10);

    const citiesAdded = new Set<string>();
    const airportsByCity = matchingAirports.reduce((acc, airport) => {
      if (!acc[airport.city]) {
        acc[airport.city] = [];
      }
      acc[airport.city].push(airport);
      return acc;
    }, {} as Record<string, Airport[]>);

    Object.entries(airportsByCity).forEach(([city, cityAirports]) => {
      if (cityAirports.length > 1) {
        suggestions.push({
          type: "city",
          data: {
            city,
            country: cityAirports[0].country,
            airports: cityAirports,
          },
          displayText: city,
          secondaryText: `All airports (${cityAirports.length})`,
          code: city.substring(0, 3).toUpperCase(),
        });
        citiesAdded.add(city);
      }
    });

    matchingAirports.forEach(airport => {
      suggestions.push({
        type: "airport",
        data: airport,
        displayText: airport.name,
        secondaryText: `${airport.city}${
          (airport as any).country ? ", " + (airport as any).country : ""
        }`,
        code: airport.code,
      });
    });

    return suggestions.slice(0, 8);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fromInputRef.current &&
        !fromInputRef.current.contains(event.target as Node)
      ) {
        setFromSuggestions([]);
      }
      if (
        toInputRef.current &&
        !toInputRef.current.contains(event.target as Node)
      ) {
        setToSuggestions([]);
      }

      // Close all multi-city suggestions if clicked outside
      setShowMultiCitySuggestions({});
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCityChange = (value: string, field: "from" | "to") => {
    update({ [field]: value });
    if (value.length > 0) {
      const filtered = airports.filter(
        airport =>
          airport.city.toLowerCase().includes(value.toLowerCase()) ||
          airport.code.toLowerCase().includes(value.toLowerCase()) ||
          airport.name.toLowerCase().includes(value.toLowerCase())
      );
      if (field === "from") {
        setFromSuggestions(filtered);
        setToSuggestions([]);
      } else {
        setToSuggestions(filtered);
        setFromSuggestions([]);
      }
    }
  };

  const selectAirport = (
    airport: (typeof airports)[0],
    field: "from" | "to"
  ) => {
    update({ [field]: `${airport.city} (${airport.code})` });
    setFromSuggestions([]);
    setToSuggestions([]);
  };

  // Multi-city handlers
  const handleMultiCityFieldChange = (
    index: number,
    field: "from" | "to",
    value: string
  ) => {
    const newSegments = [...multiCitySegments];
    newSegments[index][field] = value;
    setMultiCitySegments(newSegments);

    if (value.length > 0) {
      const suggestions = generateSuggestions(value);
      setMultiCitySuggestions(prev => ({
        ...prev,
        [`${index}-${field}`]: suggestions,
      }));
      setShowMultiCitySuggestions(prev => ({
        ...prev,
        [`${index}-${field}`]: suggestions.length > 0,
      }));
    } else {
      setMultiCitySuggestions(prev => ({
        ...prev,
        [`${index}-${field}`]: [],
      }));
      setShowMultiCitySuggestions(prev => ({
        ...prev,
        [`${index}-${field}`]: false,
      }));
    }
  };

  const handleMultiCityDateChange = (index: number, date: Date | undefined) => {
    const newSegments = [...multiCitySegments];
    newSegments[index].date = date;
    setMultiCitySegments(newSegments);
  };

  const selectMultiCitySuggestion = (
    index: number,
    field: "from" | "to",
    suggestion: SearchSuggestion
  ) => {
    const newSegments = [...multiCitySegments];
    if (suggestion.type === "city") {
      const cityData = suggestion.data as { city: string; airports: Airport[] };
      newSegments[index][field] = `${cityData.city} (All Airports)`;
    } else {
      const airport = suggestion.data as Airport;
      newSegments[index][field] = `${airport.city} (${airport.code})`;
    }
    setMultiCitySegments(newSegments);
    setShowMultiCitySuggestions(prev => ({
      ...prev,
      [`${index}-${field}`]: false,
    }));
  };

  const addMultiCitySegment = () => {
    if (multiCitySegments.length < 6) {
      setMultiCitySegments([
        ...multiCitySegments,
        { from: "", to: "", date: undefined },
      ]);
    }
  };

  const removeMultiCitySegment = (index: number) => {
    if (multiCitySegments.length > 2) {
      const newSegments = multiCitySegments.filter((_, i) => i !== index);
      setMultiCitySegments(newSegments);
    }
  };

  const isSearchDisabled =
    tripType === "multicity"
      ? !multiCitySegments.every(seg => seg.from && seg.to && seg.date)
      : !from || !to || !departure;

  //   const handleSearch = async () => {
  //     if (from && to && departDate && passengers) {
  //       const searchData: FlightSearchParamState = {
  //         from,
  //         to,
  //         departDate: format(new Date(departDate), "yyyy-MM-dd"),
  //         returnDate:
  //           tripType === "roundtrip" && returnDate
  //             ? format(new Date(returnDate), "yyyy-MM-dd")
  //             : undefined,
  //         passengers: +passengers || 1,
  //         flightClass: "economy",
  //         tripType: tripType as "roundtrip" | "oneway" | "multicity",
  //       };

  //       // Update store with search params and trigger search
  //       await searchFlights(searchData);

  //       // Also call the onSearch prop for any parent component handling
  //       onSearch(searchData);
  //     }
  //   };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50 relative overflow-hidden z-50">
      {/* Enhanced gradient overlay with glass effect */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/10 via-primary/5 to-transparent pointer-events-none backdrop-blur-sm" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none backdrop-blur-sm" />

      <div className="relative z-10">
        <RadioGroup
          value={tripType}
          onValueChange={(value: "roundtrip" | "oneway" | "multicity") => {
            update({ tripType: value });
          }}
          className="flex flex-wrap gap-6 mb-8"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="roundtrip"
              id="roundtrip"
              className="border-primary data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent"
            />
            <Label htmlFor="roundtrip" className="cursor-pointer">
              Round-trip
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="oneway"
              id="oneway"
              className="border-primary data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent"
            />
            <Label htmlFor="oneway" className="cursor-pointer">
              One-way
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="multicity"
              id="multicity"
              className="border-primary data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent"
            />
            <Label htmlFor="multicity" className="cursor-pointer">
              Multi-city
            </Label>
          </div>
        </RadioGroup>

        {/* Standard and One-way Search Form */}
        {tripType !== "multicity" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2" ref={fromInputRef}>
              <Label htmlFor="from" className="text-primary">
                Flying From
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent z-10" />
                <Input
                  id="from"
                  placeholder="City or airport"
                  className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm"
                  value={from ?? ""}
                  onChange={e => handleCityChange(e.target.value, "from")}
                />
                {from?.trim() && fromSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border-2 border-primary/20 rounded-xl shadow-2xl max-h-64 overflow-y-auto z-[9999]">
                    {fromSuggestions.map(airport => (
                      <div
                        key={airport.code}
                        onClick={() => selectAirport(airport, "from")}
                        className="p-3 hover:bg-primary/10 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">
                              {airport.city}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {airport.name}
                            </div>
                          </div>
                          <div className="text-primary px-2 py-1 bg-primary/10 rounded text-xs font-medium">
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
              <Label htmlFor="to" className="text-primary">
                Flying To
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent z-10" />
                <Input
                  id="to"
                  placeholder="City or airport"
                  className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm"
                  value={to ?? ""}
                  onChange={e => handleCityChange(e.target.value, "to")}
                />
                {to?.trim() && toSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border-2 border-accent/20 rounded-xl shadow-2xl max-h-64 overflow-y-auto z-[9999]">
                    {toSuggestions.map(airport => (
                      <div
                        key={airport.code}
                        onClick={() => selectAirport(airport, "to")}
                        className="p-3 hover:bg-accent/10 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">
                              {airport.city}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {airport.name}
                            </div>
                          </div>
                          <div className="text-accent px-2 py-1 bg-accent/10 rounded text-xs font-medium">
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
              <Label htmlFor="depart" className="text-primary">
                Departure
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-12 border-2 hover:border-accent bg-white/80 backdrop-blur-sm"
                  >
                    <Calendar className="mr-2 h-5 w-5 text-accent" />
                    {departure
                      ? format(new Date(departure), "PPP")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-white/95 backdrop-blur-xl border-2"
                  align="start"
                >
                  <CalendarComponent
                    mode="single"
                    selected={new Date(departure || "")}
                    onSelect={date => update({ departure: String(date) })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="return" className="text-primary">
                Return
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-12 border-2 hover:border-accent bg-white/80 backdrop-blur-sm"
                    disabled={tripType === "oneway"}
                  >
                    <Calendar className="mr-2 h-5 w-5 text-accent" />
                    {returnDate
                      ? format(new Date(returnDate), "PPP")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-white/95 backdrop-blur-xl border-2"
                  align="start"
                >
                  <CalendarComponent
                    mode="single"
                    selected={new Date(returnDate || "")}
                    onSelect={date => update({ return: String(date) })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
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
                            onChange={e =>
                              handleMultiCityFieldChange(
                                index,
                                "from",
                                e.target.value
                              )
                            }
                            onFocus={() => {
                              if (segment.from && segment.from.length > 0) {
                                const suggestions = generateSuggestions(
                                  segment.from
                                );
                                setMultiCitySuggestions(prev => ({
                                  ...prev,
                                  [`${index}-from`]: suggestions,
                                }));
                                setShowMultiCitySuggestions(prev => ({
                                  ...prev,
                                  [`${index}-from`]: suggestions.length > 0,
                                }));
                              }
                            }}
                          />
                          {showMultiCitySuggestions[`${index}-from`] &&
                            multiCitySuggestions[`${index}-from`]?.length >
                              0 && (
                              <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border-2 border-primary/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-[9999]">
                                {multiCitySuggestions[`${index}-from`].map(
                                  (suggestion, idx) => (
                                    <div
                                      key={`${index}-from-${suggestion.code}-${idx}`}
                                      onClick={() =>
                                        selectMultiCitySuggestion(
                                          index,
                                          "from",
                                          suggestion
                                        )
                                      }
                                      className="p-2 hover:bg-primary/10 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                                    >
                                      <div className="flex items-start gap-2">
                                        <div
                                          className={`mt-0.5 p-1 rounded-lg ${
                                            suggestion.type === "city"
                                              ? "bg-accent/10"
                                              : "bg-primary/10"
                                          }`}
                                        >
                                          {suggestion.type === "city" ? (
                                            <Building2 className="h-3 w-3 text-accent" />
                                          ) : (
                                            <Plane className="h-3 w-3 text-primary" />
                                          )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1">
                                              <div className="text-xs">
                                                {suggestion.displayText}
                                              </div>
                                              <div className="text-xs text-muted-foreground">
                                                {suggestion.secondaryText}
                                              </div>
                                            </div>
                                            <div
                                              className={`text-xs px-1.5 py-0.5 rounded shrink-0 ${
                                                suggestion.type === "city"
                                                  ? "text-accent bg-accent/10"
                                                  : "text-primary bg-primary/10"
                                              }`}
                                            >
                                              {suggestion.code}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
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
                            onChange={e =>
                              handleMultiCityFieldChange(
                                index,
                                "to",
                                e.target.value
                              )
                            }
                            onFocus={() => {
                              if (segment.to && segment.to.length > 1) {
                                const suggestions = generateSuggestions(
                                  segment.to
                                );
                                setMultiCitySuggestions(prev => ({
                                  ...prev,
                                  [`${index}-to`]: suggestions,
                                }));
                                setShowMultiCitySuggestions(prev => ({
                                  ...prev,
                                  [`${index}-to`]: suggestions.length > 0,
                                }));
                              }
                            }}
                          />
                          {showMultiCitySuggestions[`${index}-to`] &&
                            multiCitySuggestions[`${index}-to`]?.length > 0 && (
                              <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border-2 border-accent/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-[9999]">
                                {multiCitySuggestions[`${index}-to`].map(
                                  (suggestion, idx) => (
                                    <div
                                      key={`${index}-to-${suggestion.code}-${idx}`}
                                      onClick={() =>
                                        selectMultiCitySuggestion(
                                          index,
                                          "to",
                                          suggestion
                                        )
                                      }
                                      className="p-2 hover:bg-accent/10 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                                    >
                                      <div className="flex items-start gap-2">
                                        <div
                                          className={`mt-0.5 p-1 rounded-lg ${
                                            suggestion.type === "city"
                                              ? "bg-accent/10"
                                              : "bg-primary/10"
                                          }`}
                                        >
                                          {suggestion.type === "city" ? (
                                            <Building2 className="h-3 w-3 text-accent" />
                                          ) : (
                                            <Plane className="h-3 w-3 text-primary" />
                                          )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1">
                                              <div className="text-xs">
                                                {suggestion.displayText}
                                              </div>
                                              <div className="text-xs text-muted-foreground">
                                                {suggestion.secondaryText}
                                              </div>
                                            </div>
                                            <div
                                              className={`text-xs px-1.5 py-0.5 rounded shrink-0 ${
                                                suggestion.type === "city"
                                                  ? "text-accent bg-accent/10"
                                                  : "text-primary bg-primary/10"
                                              }`}
                                            >
                                              {suggestion.code}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
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
                              {segment.date
                                ? format(segment.date, "PPP")
                                : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-white/95 backdrop-blur-xl border-2"
                            align="start"
                          >
                            <CalendarComponent
                              mode="single"
                              selected={segment.date}
                              onSelect={date =>
                                handleMultiCityDateChange(index, date)
                              }
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
              <PopoverContent
                className="w-80 p-6 bg-white/95 backdrop-blur-xl border-2 shadow-xl"
                align="start"
              >
                <div className="space-y-5">
                  {/* Adults */}
                  <div className="flex items-center justify-between group">
                    <div>
                      <div className="font-medium">Adults</div>
                      <div className="text-xs text-muted-foreground">
                        18+ years
                      </div>
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
                      <span className="w-10 text-center font-medium">
                        {adults}
                      </span>
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
                      <div className="text-xs text-muted-foreground">
                        2-17 years
                      </div>
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
                      <span className="w-10 text-center font-medium">
                        {children}
                      </span>
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
                      <div className="text-xs text-muted-foreground">
                        Under 2
                      </div>
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
                      <span className="w-10 text-center font-medium">
                        {infants}
                      </span>
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
            <Label htmlFor="class" className="text-primary">
              Class
            </Label>
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
            onClick={async () => {
              if (onSearch) {
                // If onSearch prop is provided, use it for integrated search flow
                const searchData = {
                  type: "flight",
                  from: tripType === "multicity" ? multiCitySegments : from,
                  to: tripType === "multicity" ? multiCitySegments : to,
                  departure:
                    tripType === "multicity" ? multiCitySegments : departure,
                  returnDate: tripType === "roundtrip" ? returnDate : undefined,
                  passengers: totalTravelers,
                  adults,
                  children,
                  infants,
                  travelClass,
                  tripType,
                  multiCitySegments:
                    tripType === "multicity" ? multiCitySegments : undefined,
                };
                onSearch(searchData);
              } else {
                // Otherwise, use Next.js navigation (existing behavior)
                // Clear other store params
                useCarsStore.setState({ searchParams: undefined });
                usePackagesStore.setState({ searchParams: undefined });
                useAttractionsStore.setState({ searchParams: undefined });
                router.push("/search");
              }
            }}
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
