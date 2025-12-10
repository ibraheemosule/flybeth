import { useState, useRef, useEffect } from "react";
import { Calendar, MapPin, Search, Users, ArrowRightLeft } from "lucide-react";
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
} from "@/components/ui";
import { format } from "date-fns";
import { airports } from "./utilsFlightSearch";
import { useFlightsStore, FlightSearchParamState } from "@/stores";
import { useRouter } from "next/navigation";

export default function FlightSearch() {
  const router = useRouter();
  const { searchParams } = useFlightsStore();
  const { from, to, departDate, returnDate, passengers, tripType } =
    searchParams || {};

  const update = (updates: Partial<FlightSearchParamState>) => {
    const currentParams = useFlightsStore.getState().searchParams;
    useFlightsStore.setState({
      searchParams: {
        from: currentParams?.from || "",
        to: currentParams?.to || "",
        departDate: currentParams?.departDate || "",
        passengers: currentParams?.passengers || 1,
        tripType: currentParams?.tripType || "roundtrip",
        ...updates,
      },
    });
  };

  const [fromSuggestions, setFromSuggestions] = useState<typeof airports>([]);
  const [toSuggestions, setToSuggestions] = useState<typeof airports>([]);

  const fromInputRef = useRef<HTMLDivElement>(null);
  const toInputRef = useRef<HTMLDivElement>(null);

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
      setFromSuggestions(filtered);
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
    <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-white/50 relative overflow-hidden">
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
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border-2 border-primary/20 rounded-xl shadow-2xl max-h-64 overflow-y-auto z-50">
                  {fromSuggestions.map(airport => (
                    <div
                      key={airport.code}
                      onClick={() => selectAirport(airport, "from")}
                      className="p-3 hover:bg-primary/10 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm">{airport.city}</div>
                          <div className="text-xs text-muted-foreground">
                            {airport.name}
                          </div>
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
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border-2 border-accent/20 rounded-xl shadow-2xl max-h-64 overflow-y-auto z-50">
                  {toSuggestions.map(airport => (
                    <div
                      key={airport.code}
                      onClick={() => selectAirport(airport, "to")}
                      className="p-3 hover:bg-accent/10 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm">{airport.city}</div>
                          <div className="text-xs text-muted-foreground">
                            {airport.name}
                          </div>
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
                  {departDate
                    ? format(new Date(departDate), "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-white/95 backdrop-blur-xl border-2"
                align="start"
              >
                <CalendarComponent
                  mode="single"
                  selected={new Date(departDate || "")}
                  onSelect={date => update({ departDate: String(date) })}
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
                  onSelect={date => update({ returnDate: String(date) })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end gap-4">
          <div className="space-y-2 flex-1">
            <Label htmlFor="travelers" className="text-primary">
              Travelers & Class
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
              <Input
                id="travelers"
                placeholder="1 Adult, Economy"
                className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm"
                value={passengers ?? ""}
                onChange={e => update({ passengers: Number(e.target.value) })}
              />
            </div>
          </div>

          <Button
            onClick={() => router.push("/search")}
            disabled={!from || !to || !departDate || !passengers}
            className="btn-gradient-primary disabled:opacity-50 disabled:cursor-not-allowed h-12"
          >
            <Search className="mr-2 h-5 w-5" />
            Search Flights
          </Button>
        </div>
      </div>
    </div>
  );
}
