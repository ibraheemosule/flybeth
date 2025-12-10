import { Plane, Hotel, Car, Package, Ticket } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FlightSearch } from "./FlightSearch";
import { HotelSearch } from "./HotelSearch";
import { CarSearch } from "./CarSearch";
import { PackageSearch } from "./PackageSearch";
import { AttractionSearch } from "./AttractionSearch";

interface BookingTabsProps {
  onSearch: (params: any) => void;
  activeTab?: string;
}

export function BookingTabs({ onSearch, activeTab }: BookingTabsProps) {
  return (
    <Tabs defaultValue={activeTab || "flights"} className="w-full">
      <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto mb-8 h-14 bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl">
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
        <TabsTrigger 
          value="attractions" 
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary h-full"
        >
          <Ticket className="h-5 w-5" />
          <span className="hidden sm:inline">Attractions</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="flights">
        <FlightSearch onSearch={onSearch} />
      </TabsContent>
      <TabsContent value="hotels">
        <HotelSearch onSearch={onSearch} />
      </TabsContent>
      <TabsContent value="cars">
        <CarSearch onSearch={onSearch} />
      </TabsContent>
      <TabsContent value="packages">
        <PackageSearch onSearch={onSearch} />
      </TabsContent>
      <TabsContent value="attractions">
        <AttractionSearch onSearch={onSearch} />
      </TabsContent>
    </Tabs>
  );
}