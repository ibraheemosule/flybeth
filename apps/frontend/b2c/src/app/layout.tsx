import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui";
import { LayoutComponent } from "@/components/LayoutComponent";
import { ThemeInitializer } from "@/components/ThemeInitializer";

export const metadata: Metadata = {
  title: "FlyBeth",
  description: "Book flights, hotels, and travel packages with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeInitializer />
        <LayoutComponent>{children}</LayoutComponent>
        <Toaster />
      </body>
    </html>
  );
}
