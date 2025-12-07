"use client";

import CheckoutPage  from "@/components/pages/CheckoutPage";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();

  // Mock flight data for demonstration
  const mockFlight = {
    id: 1,
    airline: "FlyBeth Airlines",
    price: 299,
    departure: { time: "10:00 AM", airport: "LAX" },
    arrival: { time: "2:00 PM", airport: "JFK" },
    duration: "4h 30m",
    stops: "Non-stop",
    class: "Economy",
  };

  const mockSearchParams = {
    from: "Los Angeles",
    to: "New York",
    departDate: "2024-02-15",
    returnDate: "2024-02-22",
  };

  return (
    <CheckoutPage
      flight={mockFlight}
      searchParams={mockSearchParams}
      onBack={() => router.back()}
      onComplete={() => router.push("/")}
      isSignedIn={false}
      onSignIn={() => router.push("/signin")}
    />
  );
}
