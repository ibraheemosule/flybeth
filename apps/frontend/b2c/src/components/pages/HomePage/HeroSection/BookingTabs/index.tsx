"use client";

import { Plane, Hotel, Car, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger, cn } from "@/components/ui";
import FlightSearch from "./FlightSearch";
import HotelSearch from "./HotelSearch";
import { usePathname } from "next/navigation";
import CarSearch from "./CarSearch";
import PackageSearch from "./PackageSearch";

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

export default function BookingTabs() {
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
        <FlightSearch />
      </TabsContent>
      <TabsContent value="hotels">
        <HotelSearch />
      </TabsContent>
      <TabsContent value="cars">
        <CarSearch />
      </TabsContent>
      <TabsContent value="packages">
        <PackageSearch />
      </TabsContent>
    </Tabs>
  );
}
