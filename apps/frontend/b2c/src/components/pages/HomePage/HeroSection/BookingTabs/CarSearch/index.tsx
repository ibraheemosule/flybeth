"use client";

import { useState } from "react";
import {
  Calendar,
  MapPin,
  Search,
  Clock,
  Car,
  Plane,
  Users,
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
import { format } from "date-fns";
import { Checkbox } from "../../../../../ui/checkbox";
import { useRouter } from "next/navigation";
import {
  useCarsStore,
  useFlightsStore,
  useHotelsStore,
  usePackagesStore,
  useAttractionsStore,
  CarSearchParamState,
} from "@/stores";

interface CarSearchProps {
  onSearch?: (params: any) => void;
}

export default function CarSearch({ onSearch }: CarSearchProps) {
  const router = useRouter();
  const { searchParams } = useCarsStore();
  const {
    serviceType,
    pickUpLocation,
    dropOffLocation,
    pickUpDate,
    dropOffDate,
    sameLocation,
  } = searchParams || {};

  const update = (updates: Partial<CarSearchParamState>) => {
    const currentParams = useCarsStore.getState().searchParams;
    useCarsStore.setState({
      searchParams: {
        serviceType: currentParams?.serviceType || "rental",
        pickUpLocation: currentParams?.pickUpLocation || "",
        dropOffLocation: currentParams?.dropOffLocation || "",
        pickUpDate: currentParams?.pickUpDate || "",
        dropOffDate: currentParams?.dropOffDate || "",
        sameLocation: currentParams?.sameLocation ?? true,
        ...updates,
      },
    });
  };

  const [carType, setCarType] = useState<"rental" | "taxi">(
    serviceType || "rental"
  );
  const [pickUpLocationLocal, setPickUpLocationLocal] = useState(
    pickUpLocation || ""
  );
  const [dropOffLocationLocal, setDropOffLocationLocal] = useState(
    dropOffLocation || ""
  );
  const [pickUpDateLocal, setPickUpDateLocal] = useState<Date | undefined>(
    pickUpDate ? new Date(pickUpDate) : undefined
  );
  const [dropOffDateLocal, setDropOffDateLocal] = useState<Date | undefined>(
    dropOffDate ? new Date(dropOffDate) : undefined
  );
  const [sameLocationLocal, setSameLocationLocal] = useState(
    sameLocation ?? true
  );

  const handleCarTypeChange = (type: "rental" | "taxi") => {
    setCarType(type);
    update({ serviceType: type });
  };

  const handleSearch = () => {
    if (onSearch) {
      // If onSearch prop is provided, use it for integrated search flow
      let searchData;

      if (carType === "rental") {
        if (!pickUpLocationLocal || !pickUpDateLocal || !dropOffDateLocal) {
          return;
        }
        searchData = {
          type: "car",
          serviceType: carType,
          pickUpLocation: pickUpLocationLocal,
          dropOffLocation: sameLocationLocal
            ? pickUpLocationLocal
            : dropOffLocationLocal,
          pickUpDate: pickUpDateLocal.toISOString(),
          dropOffDate: dropOffDateLocal.toISOString(),
          sameLocation: sameLocationLocal,
        };
      } else {
        if (!pickUpLocationLocal || !dropOffLocationLocal || !pickUpDateLocal) {
          return;
        }
        searchData = {
          type: "car",
          serviceType: carType,
          pickUpLocation: pickUpLocationLocal,
          dropOffLocation: dropOffLocationLocal,
          pickUpDate: pickUpDateLocal.toISOString(),
          sameLocation: false,
        };
      }

      onSearch(searchData);
    } else {
      // Otherwise, use Next.js navigation (existing behavior)
      useFlightsStore.setState({ searchParams: null });
      useHotelsStore.setState({ searchParams: null });
      usePackagesStore.setState({ searchParams: null });
      useAttractionsStore.setState({ searchParams: null });

      if (carType === "rental") {
        if (!pickUpLocationLocal || !pickUpDateLocal || !dropOffDateLocal) {
          return;
        }
        update({
          serviceType: carType,
          pickUpLocation: pickUpLocationLocal,
          dropOffLocation: sameLocationLocal
            ? pickUpLocationLocal
            : dropOffLocationLocal,
          pickUpDate: pickUpDateLocal.toISOString(),
          dropOffDate: dropOffDateLocal.toISOString(),
          sameLocation: sameLocationLocal,
        });
      } else {
        if (!pickUpLocationLocal || !dropOffLocationLocal || !pickUpDateLocal) {
          return;
        }
        update({
          serviceType: carType,
          pickUpLocation: pickUpLocationLocal,
          dropOffLocation: dropOffLocationLocal,
          pickUpDate: pickUpDateLocal.toISOString(),
          sameLocation: false,
        });
      }
      router.push("/search");
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        {/* Car Type Selection - Improved UI */}
        <div className="mb-6">
          <Label className="text-accent mb-3 block text-lg">
            Choose Your Service
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleCarTypeChange("rental")}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                carType === "rental"
                  ? "border-primary bg-gradient-to-br from-primary/10 to-accent/5 shadow-lg scale-[1.02]"
                  : "border-gray-200 bg-white hover:border-primary/50 hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                    carType === "rental"
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary"
                  }`}
                >
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
                    Rent a vehicle for your entire trip with flexible pick-up
                    and drop-off
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleCarTypeChange("taxi")}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                carType === "taxi"
                  ? "border-accent bg-gradient-to-br from-accent/10 to-primary/5 shadow-lg scale-[1.02]"
                  : "border-gray-200 bg-white hover:border-accent/50 hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                    carType === "taxi"
                      ? "bg-accent text-white"
                      : "bg-accent/10 text-accent"
                  }`}
                >
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
                <Label htmlFor="pickup-location" className="text-accent">
                  Pick-up Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                  <Input
                    id="pickup-location"
                    placeholder="City or airport"
                    value={pickUpLocationLocal}
                    onChange={e => {
                      setPickUpLocationLocal(e.target.value);
                      update({ pickUpLocation: e.target.value });
                    }}
                    className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickup-date" className="text-accent">
                  Pick-up Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-12 border-2 hover:border-accent bg-white/80 backdrop-blur-sm"
                    >
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      {pickUpDateLocal
                        ? format(pickUpDateLocal, "PPP")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-white border-2 border-primary/20 shadow-2xl z-50"
                    align="start"
                  >
                    <CalendarComponent
                      mode="single"
                      selected={pickUpDateLocal}
                      onSelect={date => {
                        setPickUpDateLocal(date);
                        if (date) update({ pickUpDate: date.toISOString() });
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dropoff-date" className="text-accent">
                  Drop-off Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-12 border-2 hover:border-accent bg-white/80 backdrop-blur-sm"
                    >
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      {dropOffDateLocal
                        ? format(dropOffDateLocal, "PPP")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-white border-2 border-primary/20 shadow-2xl z-50"
                    align="start"
                  >
                    <CalendarComponent
                      mode="single"
                      selected={dropOffDateLocal}
                      onSelect={date => {
                        setDropOffDateLocal(date);
                        if (date) update({ dropOffDate: date.toISOString() });
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickup-time" className="text-accent">
                  Pick-up Time
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                  <Input
                    id="pickup-time"
                    type="time"
                    defaultValue="10:00"
                    className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <Checkbox
                id="same-location"
                checked={sameLocationLocal}
                onCheckedChange={checked => {
                  setSameLocationLocal(checked as boolean);
                  update({ sameLocation: checked as boolean });
                }}
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
                <Label htmlFor="dropoff-location" className="text-accent">
                  Drop-off Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                  <Input
                    id="dropoff-location"
                    placeholder="City or airport"
                    value={dropOffLocationLocal}
                    onChange={e => {
                      setDropOffLocationLocal(e.target.value);
                      update({ dropOffLocation: e.target.value });
                    }}
                    className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm"
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
              <Label htmlFor="taxi-from" className="text-accent">
                From
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <Input
                  id="taxi-from"
                  placeholder="Airport or address"
                  value={pickUpLocationLocal}
                  onChange={e => {
                    setPickUpLocationLocal(e.target.value);
                    update({ pickUpLocation: e.target.value });
                  }}
                  className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxi-to" className="text-accent">
                To
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
                <Input
                  id="taxi-to"
                  placeholder="Address or airport"
                  value={dropOffLocationLocal}
                  onChange={e => {
                    setDropOffLocationLocal(e.target.value);
                    update({ dropOffLocation: e.target.value });
                  }}
                  className="pl-11 h-12 border-2 focus:border-accent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxi-date" className="text-accent">
                Transfer Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-12 border-2 hover:border-accent bg-white/80 backdrop-blur-sm"
                  >
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    {pickUpDateLocal
                      ? format(pickUpDateLocal, "PPP")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-white border-2 border-primary/20 shadow-2xl z-50"
                  align="start"
                >
                  <CalendarComponent
                    mode="single"
                    selected={pickUpDateLocal}
                    onSelect={date => {
                      setPickUpDateLocal(date);
                      if (date) update({ pickUpDate: date.toISOString() });
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxi-time" className="text-accent">
                Transfer Time
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <Input
                  id="taxi-time"
                  type="time"
                  defaultValue="10:00"
                  className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-end gap-4">
          <div className="space-y-2 flex-1">
            <Label htmlFor="driver-age" className="text-primary">
              Driver Age
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
              <Input
                id="driver-age"
                placeholder="25+ years"
                defaultValue="25"
                className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          <Button onClick={handleSearch} className="btn-gradient-primary h-12">
            <Search className="mr-2 h-5 w-5" />
            {carType === "rental"
              ? "Find Rental Cars"
              : "Book Airport Transfer"}
          </Button>
        </div>
      </div>
    </div>
  );
}
