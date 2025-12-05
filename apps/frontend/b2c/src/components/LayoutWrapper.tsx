"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { useRouter, usePathname } from "next/navigation";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (page: string, tab?: string) => {
    if (page === "home") {
      router.push("/");
    } else {
      router.push(`/${page}`);
    }
  };

  const handleFooterNavigate = (page: string) => {
    if (page === "home") {
      router.push("/");
    } else {
      router.push(`/${page}`);
    }
  };

  // Get current page from pathname
  const currentPage = pathname === "/" ? "home" : pathname.slice(1);

  return (
    <>
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{children}</main>
      <Footer onNavigate={handleFooterNavigate} />
    </>
  );
}
