import { useState } from "react";
import { Calendar, MapPin, Search, Tag } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface AttractionSearchProps {
  onSearch: (params: any) => void;
}

export function AttractionSearch({ onSearch }: AttractionSearchProps) {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();
  const [category, setCategory] = useState("all");

  const handleSearch = () => {
    if (!destination) {
      return;
    }
    onSearch({
      type: "attraction",
      destination,
      date: date ? format(date, "PPP") : undefined,
      category,
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="mb-4 p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl border border-accent/20">
          <p className="text-sm text-center">
            <span className="font-semibold">Discover amazing experiences!</span> Book tours, activities, and attractions worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="attraction-destination" className="text-accent">Destination</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
              <Input
                id="attraction-destination"
                placeholder="City or attraction"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-11 h-12 border-2 focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="attraction-date" className="text-accent">Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-12 border-2 hover:border-primary"
                >
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  {date ? format(date, "PPP") : "Any date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="attraction-category" className="text-accent">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-12 border-2 focus:border-primary">
                <Tag className="mr-2 h-5 w-5 text-primary" />
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tours">Tours & Sightseeing</SelectItem>
                <SelectItem value="museums">Museums & Culture</SelectItem>
                <SelectItem value="adventure">Adventure & Outdoor</SelectItem>
                <SelectItem value="food">Food & Dining</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="water">Water Activities</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 h-12 px-12 shadow-lg hover:shadow-xl transition-all"
          >
            <Search className="mr-2 h-5 w-5" />
            Find Attractions
          </Button>
        </div>
      </div>
    </div>
  );
}
