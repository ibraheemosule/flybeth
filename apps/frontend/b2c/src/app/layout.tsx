import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "../components/ui/sonner";
import { LayoutWrapper } from "../components/LayoutWrapper";

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
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster />
      </body>
    </html>
  );
}
