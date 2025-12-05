import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "../components/ui/sonner";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

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
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
