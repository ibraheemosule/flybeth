import { Package } from "lucide-react";

export default function PackageSearch() {
  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-12 text-center border border-white/50">
      <Package className="h-16 w-16 text-primary mx-auto mb-4" />
      <h3 className="mb-2">Vacation Packages Coming Soon</h3>
      <p className="text-muted-foreground">
        Bundle and save on your perfect getaway. Exciting deals ahead!
      </p>
    </div>
  );
}
