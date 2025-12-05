"use client";

import { HomePage } from "../components/HomePage";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();

  const handleNavigate = (page: string, tab?: string) => {
    if (page === "home") {
      router.push("/");
    } else {
      router.push(`/${page}` as any);
    }
  };

  return (
    <HomePage
      isSignedIn={isSignedIn}
      onNavigate={handleNavigate}
      activeTab={undefined}
    />
  );
}
