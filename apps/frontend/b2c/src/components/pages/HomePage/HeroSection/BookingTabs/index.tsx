"use client";

import { Plane, Hotel, Car, Package, Ticket } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../ui/tabs";
import { cn } from "../../../../ui/utils";
import FlightSearch from "./FlightSearch";
import HotelSearch from "./HotelSearch";
import { usePathname } from "next/navigation";
import CarSearch from "./CarSearch";
import PackageSearch from "./PackageSearch";
import AttractionSearch from "./AttractionSearch";

interface BookingTabsProps {
  onSearch?: (params: any) => void;
  activeTab?: string;
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
  attractions: {
    label: "Attractions",
    Icon: Ticket,
    cn: "data-[state=active]:bg-white data-[state=active]:text-primary",
  },
};

export default function BookingTabs({ onSearch, activeTab }: BookingTabsProps) {
  const currentActiveTab =
    activeTab || usePathname().slice(1).split("#")[1] || "flights";

  return (
    <Tabs defaultValue={currentActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto mb-8 h-14 bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl">
        {Object.entries(products).map(([product, productObj]) => {
          const { Icon } = productObj;

          return (
            <TabsTrigger
              key={product}
              value={product}
              className={cn("flex items-center gap-2 h-full", productObj.cn)}
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
