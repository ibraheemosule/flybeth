import { Plane, Hotel, Car, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FlightSearch } from "./FlightSearch";
import { HotelSearch } from "./HotelSearch";

interface BookingTabsProps {
  onSearch: (params: any) => void;
  activeTab?: string;
}

export function BookingTabs({ onSearch, activeTab }: BookingTabsProps) {
  return (
    <Tabs defaultValue={activeTab || "flights"} className="w-full">
      <TabsList className="grid w-full grid-cols-4 max-w-xl mx-auto mb-8 h-14 bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl">
        <TabsTrigger 
          value="flights" 
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary h-full"
        >
          <Plane className="h-5 w-5" />
          <span className="hidden sm:inline">Flights</span>
        </TabsTrigger>
        <TabsTrigger 
          value="hotels" 
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-accent h-full"
        >
          <Hotel className="h-5 w-5" />
          <span className="hidden sm:inline">Hotels</span>
        </TabsTrigger>
        <TabsTrigger 
          value="cars" 
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary h-full"
        >
          <Car className="h-5 w-5" />
          <span className="hidden sm:inline">Cars</span>
        </TabsTrigger>
        <TabsTrigger 
          value="packages" 
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-accent h-full"
        >
          <Package className="h-5 w-5" />
          <span className="hidden sm:inline">Packages</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="flights">
        <FlightSearch onSearch={onSearch} />
      </TabsContent>
      <TabsContent value="hotels">
        <HotelSearch />
      </TabsContent>
      <TabsContent value="cars">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-12 text-center border border-white/50">
          <Car className="h-16 w-16 text-accent mx-auto mb-4" />
          <h3 className="mb-2">Car Rentals Coming Soon</h3>
          <p className="text-muted-foreground">Hit the road with the best rental deals. Stay tuned!</p>
        </div>
      </TabsContent>
      <TabsContent value="packages">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-12 text-center border border-white/50">
          <Package className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="mb-2">Vacation Packages Coming Soon</h3>
          <p className="text-muted-foreground">Bundle and save on your perfect getaway. Exciting deals ahead!</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}