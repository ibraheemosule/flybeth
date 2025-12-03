import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Travel Platform Admin',
  description: 'Admin dashboard for travel platform management',
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