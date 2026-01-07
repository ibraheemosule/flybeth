"use client";

import { useState } from "react";
import { Calendar, MapPin, Search, Tag, Users } from "lucide-react";
import { Button } from "../../../../../ui/button";
import { Input } from "../../../../../ui/input";
import { Label } from "../../../../../ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../ui/popover";
import { Calendar as CalendarComponent } from "../../../../../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../ui/select";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  useFlightsStore,
  useHotelsStore,
  useCarsStore,
  usePackagesStore,
  useAttractionsStore,
} from "@/stores";

interface AttractionSearchProps {
  onSearch?: (params: any) => void;
}

export default function AttractionSearch({ onSearch }: AttractionSearchProps) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();
  const [category, setCategory] = useState("all");

  const handleSearch = () => {
    if (!destination) {
      return;
    }

    if (onSearch) {
      // If onSearch prop is provided, use it for integrated search flow
      const searchData = {
        type: "attraction",
        destination,
        date: date?.toISOString() || "",
        travelers: 1,
        attractionTypes: category === "all" ? [] : [category],
        budgetMin: 0,
        budgetMax: 1000,
        duration: undefined,
        interests: [],
      };
      onSearch(searchData);
    } else {
      // Otherwise, use Next.js navigation (existing behavior)
      useFlightsStore.setState({ searchParams: null });
      useHotelsStore.setState({ searchParams: null });
      useCarsStore.setState({ searchParams: null });
      usePackagesStore.setState({ searchParams: null });

      useAttractionsStore.setState({
        searchParams: {
          destination,
          date: date?.toISOString() || "",
          travelers: 1,
          attractionTypes: category === "all" ? [] : [category],
          budgetMin: 0,
          budgetMax: 1000,
          duration: undefined,
          interests: [],
        },
      });

      router.push("/search");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-white/50 relative overflow-hidden">
      {/* Enhanced gradient overlay with glass effect */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/10 via-primary/5 to-transparent pointer-events-none backdrop-blur-sm" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none backdrop-blur-sm" />

      <div className="relative z-10">
        <div className="mb-4 p-4 bg-gradient-to-r from-primary/30 to-accent/25 rounded-xl border border-primary/20">
          <p className="text-sm text-center">
            <span className="font-semibold">Discover amazing experiences!</span>{" "}
            Book tours, activities, and attractions worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Destination */}
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-accent">
              Destination
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
              <Input
                id="destination"
                placeholder="Where are you going?"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label className="text-accent">Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-12 border-2 hover:border-accent bg-white/80 backdrop-blur-sm"
                >
                  <Calendar className="mr-3 h-5 w-5 text-accent" />
                  {date ? format(date, "PPP") : "Any date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white border-2 border-primary/20 shadow-2xl z-50">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={date => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-accent">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full h-12 border-2 focus:border-accent hover:border-accent bg-white/80 backdrop-blur-sm px-3">
                <Tag className="mr-2 h-5 w-5 text-accent shrink-0" />
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-primary/20 shadow-2xl z-50">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tours">Tours & Sightseeing</SelectItem>
                <SelectItem value="outdoor">Outdoor Activities</SelectItem>
                <SelectItem value="culture">Cultural Experiences</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="food">Food & Drink</SelectItem>
                <SelectItem value="adventure">Adventure Sports</SelectItem>
                <SelectItem value="museums">Museums & Galleries</SelectItem>
                <SelectItem value="nature">Nature & Wildlife</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="mb-6">
          <Label className="text-accent mb-3 block">Popular Categories:</Label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "tours", label: "City Tours", icon: "🏛️" },
              { id: "outdoor", label: "Adventure", icon: "🏔️" },
              { id: "culture", label: "Cultural", icon: "🎭" },
              { id: "food", label: "Food Tours", icon: "🍽️" },
              { id: "museums", label: "Museums", icon: "🏛️" },
              { id: "nature", label: "Nature", icon: "🌿" },
            ].map(cat => (
              <Button
                key={cat.id}
                variant={category === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat.id)}
                className="text-sm"
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end gap-4">
          <div className="space-y-2 flex-1">
            <Label htmlFor="budget" className="text-primary">
              Price Range
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
              <Input
                id="budget"
                placeholder="$0 - $200 per person"
                className="pl-11 h-12 border-2 focus:border-accent bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          <Button onClick={handleSearch} className="btn-gradient-primary h-12">
            <Search className="mr-2 h-5 w-5" />
            Find Attractions
          </Button>
        </div>
      </div>
    </div>
  );
}
