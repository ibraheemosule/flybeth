"use client";

import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Separator } from "./ui/separator";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavigation = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white py-12 px-4 relative overflow-hidden">
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="mb-4">About Flybeth</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  onClick={handleNavigation("about")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleNavigation("blogs")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleNavigation("b2b-signin")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Flybeth for Business
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  onClick={handleNavigation("home")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Flights
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleNavigation("home")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Hotels
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleNavigation("deals")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Deals
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  onClick={handleNavigation("help")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleNavigation("help")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleNavigation("refund-policy")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleNavigation("terms")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 mb-8" />

        <div className="text-center text-white/70">
          <p>&copy; 2025 Flybeth.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
