"use client";

import { Plane, Hotel, Car, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FlightSearch } from "./FlightSearch";
import { HotelSearch } from "./HotelSearch";
import { usePathname } from "next/navigation";
import { cn } from "./ui/utils";

interface BookingTabsProps {
  onSearch: (params: any) => void;
}

const products = {
  flights: {
    label: "Flights",
    Icon: Plane,
    cn: "data-[state=active]:bg-white data-[state=active]:text-primary",
  },
  hotels: {
    label: "Hotels",
    Icon: Hotel,
    cn: "data-[state=active]:bg-white data-[state=active]:text-accent",
  },

  cars: {
    label: "Cars",
    Icon: Car,
    cn: "data-[state=active]:bg-white data-[state=active]:text-primary",
  },

  packages: {
    label: "Packages",
    Icon: Package,
    cn: "data-[state=active]:bg-white data-[state=active]:text-accent",
  },
};

export function BookingTabs({ onSearch }: BookingTabsProps) {
  const activeTab = usePathname().slice(1).split("#")[1] ?? "flights";

  return (
    <Tabs defaultValue={activeTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4 max-w-xl mx-auto mb-8 h-14 bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl">
        {Object.entries(products).map(([product, productObj]) => {
          const { Icon } = productObj;

          return (
            <TabsTrigger
              key={product}
              value={product}
              className={cn("flex items-center gap-2  h-full", productObj.cn)}
            >
              <Icon className="h-5 w-5" />
              <span className="hidden sm:inline">{productObj.label}</span>
            </TabsTrigger>
          );
        })}
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
          <p className="text-muted-foreground">
            Hit the road with the best rental deals. Stay tuned!
          </p>
        </div>
      </TabsContent>
      <TabsContent value="packages">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-12 text-center border border-white/50">
          <Package className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="mb-2">Vacation Packages Coming Soon</h3>
          <p className="text-muted-foreground">
            Bundle and save on your perfect getaway. Exciting deals ahead!
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
