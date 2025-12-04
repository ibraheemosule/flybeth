import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlyBeth B2B",
  description: "B2B portal for travel agencies and partners",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
