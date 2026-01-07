"use client";

import { useState } from "react";
import {
  Calendar,
  MapPin,
  Search,
  Users,
  Plane,
  Hotel,
  Car,
  Ticket,
} from "lucide-react";
import { Button } from "../../../../../ui/button";
import { Input } from "../../../../../ui/input";
import { Label } from "../../../../../ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../ui/popover";
import { Calendar as CalendarComponent } from "../../../../../ui/calendar";
import { Checkbox } from "../../../../../ui/checkbox";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  usePackagesStore,
  useFlightsStore,
  useHotelsStore,
  useCarsStore,
  useAttractionsStore,
  PackageSearchParamState,
} from "@/stores";

interface PackageSearchProps {
  onSearch?: (params: any) => void;
}

export default function PackageSearch({ onSearch }: PackageSearchProps) {
  const router = useRouter();
  const { searchParams } = usePackagesStore();
  const { destination, departDate, returnDate, travelers, inclusions } =
    searchParams || {};

  const update = (updates: Partial<PackageSearchParamState>) => {
    const currentParams = usePackagesStore.getState().searchParams;
    usePackagesStore.setState({
      searchParams: {
        destination: currentParams?.destination || "",
        departDate: currentParams?.departDate || "",
        returnDate: currentParams?.returnDate || "",
        travelers: currentParams?.travelers || 2,
        inclusions: currentParams?.inclusions || {
          flights: true,
          hotels: true,
          cars: false,
          activities: false,
        },
        ...updates,
      },
    });
  };

  const [destinationLocal, setDestinationLocal] = useState(destination || "");
  const [departDateLocal, setDepartDateLocal] = useState<Date | undefined>(
    departDate ? new Date(departDate) : undefined
  );
  const [returnDateLocal, setReturnDateLocal] = useState<Date | undefined>(
    returnDate ? new Date(returnDate) : undefined
  );
  const [travelersLocal, setTravelersLocal] = useState(
    travelers?.toString() || "2"
  );
  const [includeFlights, setIncludeFlights] = useState(
    inclusions?.flights ?? true
  );
  const [includeHotels, setIncludeHotels] = useState(
    inclusions?.hotels ?? true
  );
  const [includeCars, setIncludeCars] = useState(inclusions?.cars ?? false);
  const [includeActivities, setIncludeActivities] = useState(
    inclusions?.activities ?? false
  );

  const handleSearch = () => {
    if (!destinationLocal || !departDateLocal || !returnDateLocal) {
      return;
    }

    if (onSearch) {
      // If onSearch prop is provided, use it for integrated search flow
      const searchData = {
        type: "package",
        destination: destinationLocal,
        departDate: departDateLocal.toISOString(),
        returnDate: returnDateLocal.toISOString(),
        travelers: parseInt(travelersLocal),
        inclusions: {
          flights: includeFlights,
          hotels: includeHotels,
          cars: includeCars,
          activities: includeActivities,
        },
      };
      onSearch(searchData);
    } else {
      // Otherwise, use Next.js navigation (existing behavior)
      useFlightsStore.setState({ searchParams: null });
      useHotelsStore.setState({ searchParams: null });
      useCarsStore.setState({ searchParams: null });
      useAttractionsStore.setState({ searchParams: null });

      update({
        destination: destinationLocal,
        departDate: departDateLocal.toISOString(),
        returnDate: returnDateLocal.toISOString(),
        travelers: parseInt(travelersLocal),
        inclusions: {
          flights: includeFlights,
          hotels: includeHotels,
          cars: includeCars,
          activities: includeActivities,
        },
      });
      router.push("/search");
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
          <p className="text-sm text-center">
            <span className="font-semibold">Save more with packages!</span>{" "}
            Bundle flights, hotels, and more for the best deals
          </p>
        </div>

        <div className="space-y-6">
          {/* Destination */}
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-primary">
              Destination
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
              <Input
                id="destination"
                placeholder="Where do you want to go?"
                value={destinationLocal}
                onChange={e => {
                  setDestinationLocal(e.target.value);
                  update({ destination: e.target.value });
                }}
                className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Departure Date */}
            <div className="space-y-2">
              <Label className="text-primary">Departure</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-12 border-2 hover:border-accent bg-white/80 backdrop-blur-sm"
                  >
                    <Calendar className="mr-3 h-5 w-5 text-primary" />
                    {departDateLocal
                      ? format(departDateLocal, "PPP")
                      : "Departure date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border-2 border-primary/20 shadow-2xl z-50">
                  <CalendarComponent
                    mode="single"
                    selected={departDateLocal}
                    onSelect={date => {
                      setDepartDateLocal(date);
                      if (date) update({ departDate: date.toISOString() });
                    }}
                    disabled={date => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            <div className="space-y-2">
              <Label className="text-primary">Return</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-12 border-2 hover:border-accent bg-white/80 backdrop-blur-sm"
                  >
                    <Calendar className="mr-3 h-5 w-5 text-primary" />
                    {returnDateLocal
                      ? format(returnDateLocal, "PPP")
                      : "Return date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border-2 border-primary/20 shadow-2xl z-50">
                  <CalendarComponent
                    mode="single"
                    selected={returnDateLocal}
                    onSelect={date => {
                      setReturnDateLocal(date);
                      if (date) update({ returnDate: date.toISOString() });
                    }}
                    disabled={date => date < (departDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Travelers */}
            <div className="space-y-2">
              <Label htmlFor="travelers" className="text-primary">
                Travelers
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <Input
                  id="travelers"
                  placeholder="2 adults"
                  value={travelersLocal}
                  onChange={e => {
                    setTravelersLocal(e.target.value);
                    update({ travelers: parseInt(e.target.value) || 1 });
                  }}
                  className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          {/* Package Includes */}
          <div className="space-y-4">
            <Label className="text-primary font-semibold">
              What to include in your package:
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flights"
                  checked={includeFlights}
                  onCheckedChange={checked => {
                    const isChecked = checked === true;
                    setIncludeFlights(isChecked);
                    update({
                      inclusions: {
                        flights: isChecked,
                        hotels: includeHotels,
                        cars: includeCars,
                        activities: includeActivities,
                      },
                    });
                  }}
                />
                <Label htmlFor="flights" className="flex items-center">
                  <Plane className="mr-2 h-4 w-4" />
                  Flights
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hotels"
                  checked={includeHotels}
                  onCheckedChange={checked => {
                    const isChecked = checked === true;
                    setIncludeHotels(isChecked);
                    update({
                      inclusions: {
                        flights: includeFlights,
                        hotels: isChecked,
                        cars: includeCars,
                        activities: includeActivities,
                      },
                    });
                  }}
                />
                <Label htmlFor="hotels" className="flex items-center">
                  <Hotel className="mr-2 h-4 w-4" />
                  Hotels
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cars"
                  checked={includeCars}
                  onCheckedChange={checked => {
                    const isChecked = checked === true;
                    setIncludeCars(isChecked);
                    update({
                      inclusions: {
                        flights: includeFlights,
                        hotels: includeHotels,
                        cars: isChecked,
                        activities: includeActivities,
                      },
                    });
                  }}
                />
                <Label htmlFor="cars" className="flex items-center">
                  <Car className="mr-2 h-4 w-4" />
                  Car Rental
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="activities"
                  checked={includeActivities}
                  onCheckedChange={checked => {
                    const isChecked = checked === true;
                    setIncludeActivities(isChecked);
                    update({
                      inclusions: {
                        flights: includeFlights,
                        hotels: includeHotels,
                        cars: includeCars,
                        activities: isChecked,
                      },
                    });
                  }}
                />
                <Label htmlFor="activities" className="flex items-center">
                  <Ticket className="mr-2 h-4 w-4" />
                  Activities
                </Label>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="space-y-2 flex-1">
              <Label htmlFor="budget" className="text-primary">
                Budget Range
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
                <Input
                  id="budget"
                  placeholder="$1000 - $5000"
                  className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            <Button
              onClick={handleSearch}
              disabled={
                !includeFlights &&
                !includeHotels &&
                !includeCars &&
                !includeActivities
              }
              className="btn-gradient-primary disabled:opacity-50 disabled:cursor-not-allowed h-12"
            >
              <Search className="mr-2 h-5 w-5" />
              Find Package Deals
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
