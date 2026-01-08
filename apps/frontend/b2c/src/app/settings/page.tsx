"use client";

import { SettingsPage } from "../../components/pages/SettingsPage";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === "company-dashboard") {
      router.push("/company-dashboard");
    }
  };

  return <SettingsPage onNavigate={handleNavigate} />;
}
