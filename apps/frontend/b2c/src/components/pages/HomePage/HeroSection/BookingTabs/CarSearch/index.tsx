import { Car } from "lucide-react";

export default function CarSearch() {
  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-12 text-center border border-white/50">
      <Car className="h-16 w-16 text-accent mx-auto mb-4" />
      <h3 className="mb-2">Car Rentals Coming Soon</h3>
      <p className="text-muted-foreground">
        Hit the road with the best rental deals. Stay tuned!
      </p>
    </div>
  );
}
