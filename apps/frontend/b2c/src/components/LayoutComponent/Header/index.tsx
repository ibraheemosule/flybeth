"use client";

import {
  Plane,
  Menu,
  User,
  X,
  Sparkles,
  Home,
  MapPin,
  HelpCircle,
  Briefcase,
  Hotel,
  Car,
  Package,
  ChevronDown,
  Settings,
  Building2,
} from "lucide-react";
import { Button } from "../../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Route } from "next";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const currentPage =
    pathname === "/" ? "home" : pathname.slice(1).split("/")[0];

  const hideHeader = ["/reset-password", "/company-dashboard", "/signin", "/signup", "/404", "/500"].includes(pathname);

  const handleNavClick = (page: string, tab?: string) => {
    if (page === "home") {
      router.push("/");
    } else {
      router.push(`/${page}${tab ? `#${tab}` : ""}` as Route);
    }
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "bookings", label: "My Bookings", icon: Briefcase },
    { id: "company-dashboard", label: "Company", icon: Building2 },
    { id: "deals", label: "Deals", icon: Sparkles },
    { id: "help", label: "Help", icon: HelpCircle },
  ];

  const productItems = [
    { id: "flights", label: "Flights", icon: Plane, tab: "flights" },
    { id: "hotels", label: "Hotels", icon: Hotel, tab: "hotels" },
    { id: "cars", label: "Cars", icon: Car, tab: "cars" },
    { id: "packages", label: "Packages", icon: Package, tab: "packages" },
  ];

  return hideHeader ? null : (
    <>
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <motion.button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 rounded-lg blur-xl transition-opacity duration-300"
                  style={{ background: "var(--gradient-blue-green)" }}
                />
                <span
                  className="text-2xl font-bold bg-clip-text text-transparent relative z-10 transition-transform group-hover:scale-105"
                  style={{ backgroundImage: "var(--gradient-blue-green)" }}
                >
                  FlyBeth
                </span>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "text-white"
                        : "text-gray-700 hover:text-primary hover:bg-primary/5"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: "var(--gradient-blue-green)" }}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <Icon
                      className={`h-4 w-4 relative z-10 ${
                        isActive ? "text-white" : ""
                      }`}
                    />
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                );
              })}

              {/* Products Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Package className="h-4 w-4" />
                  <span>Services</span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-300 ${
                      isProductsOpen ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>

                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200/50 py-2 z-50"
                    >
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                        Book Your Travel
                      </div>
                      {productItems.map(item => {
                        const Icon = item.icon;
                        return (
                          <motion.button
                            key={item.id}
                            onClick={() => handleNavClick("home", item.tab)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary/5 transition-all duration-200 text-gray-700 hover:text-primary"
                            whileHover={{ x: 4 }}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Settings Button - Desktop */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-[#2563eb]/10 text-gray-700 hover:text-[#2563eb] transition-all"
                  onClick={() => handleNavClick("settings")}
                  title="Settings"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </motion.div>

              {/* Sign In Button - Desktop */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2563eb]/10 to-[#10b981]/10 hover:from-[#2563eb]/20 hover:to-[#10b981]/20 text-[#2563eb] border border-[#2563eb]/20 hover:border-[#2563eb]/30 transition-all shadow-sm hover:shadow-md"
                  onClick={() => handleNavClick("signin")}
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-2">
                  {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                          isActive
                            ? "text-white shadow-lg"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        style={
                          isActive
                            ? { background: "var(--gradient-blue-green)" }
                            : {}
                        }
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </motion.button>
                    );
                  })}

                  {/* Mobile Products */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
                      Services
                    </div>
                    {productItems.map(item => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={item.id}
                          onClick={() => handleNavClick("home", item.tab)}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all text-left"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Settings Button - Mobile */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <motion.button
                      onClick={() => handleNavClick("settings")}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Settings className="h-5 w-5" />
                      Settings
                    </motion.button>

                    {/* Mobile Sign In */}
                    <motion.button
                      onClick={() => handleNavClick("signin")}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white transition-all text-left mt-2"
                      style={{ background: "var(--gradient-blue-green)" }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <User className="h-5 w-5" />
                      Sign In
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
