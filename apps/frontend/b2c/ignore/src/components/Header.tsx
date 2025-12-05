import { Plane, Menu, User, X, Sparkles, Home, MapPin, HelpCircle, Briefcase, Hotel, Car, Package, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import flybethLogo from "figma:asset/cc0c72fad362bbd2c66729e646104165003b6a43.png";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export function Header({ currentPage, onNavigate }: { currentPage?: string; onNavigate?: (page: string, tab?: string) => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const handleNavClick = (page: string, tab?: string) => {
    if (onNavigate) {
      onNavigate(page, tab);
    }
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'trips', label: 'My Bookings', icon: Briefcase },
    { id: 'deals', label: 'Deals', icon: Sparkles },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  const productItems = [
    { id: 'flights', label: 'Flights', icon: Plane, tab: 'flights' },
    { id: 'hotels', label: 'Hotels', icon: Hotel, tab: 'hotels' },
    { id: 'cars', label: 'Cars', icon: Car, tab: 'cars' },
    { id: 'packages', label: 'Packages', icon: Package, tab: 'packages' },
  ];

  return (
    <>
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <motion.button 
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 rounded-lg blur-xl transition-opacity duration-300" />
                <img src={flybethLogo} alt="Flybeth" className="h-11 relative z-10 transition-transform group-hover:scale-105" />
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl shadow-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className={`h-4 w-4 relative z-10 ${isActive ? 'text-white' : ''}`} />
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                );
              })}

              {/* Products Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className={`relative px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    isProductsOpen
                      ? 'text-white bg-gradient-to-r from-primary to-accent'
                      : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Products</span>
                  <ChevronDown className={`h-4 w-4 relative z-10 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Products Dropdown Menu */}
                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 right-0 w-56 bg-white/95 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-2xl overflow-hidden"
                    >
                      <div className="p-2">
                        {productItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <motion.button
                              key={item.id}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => handleNavClick('home', item.tab)}
                              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 text-gray-700 hover:text-primary w-full"
                            >
                              <Icon className="h-5 w-5" />
                              <span>{item.label}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Sign In Button - Desktop */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 text-primary border border-primary/20 hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
                  onClick={() => handleNavClick('signin')}
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
              </motion.div>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 text-primary hover:from-primary/20 hover:to-accent/20 transition-all"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-[73px] left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-2xl z-40 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                          : 'hover:bg-primary/5 text-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}

                {/* Products Section - Mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="mt-2 pt-2 border-t border-gray-200"
                >
                  <p className="text-xs text-muted-foreground px-4 mb-2">Products</p>
                  {productItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navItems.length + index + 1) * 0.1 }}
                        onClick={() => handleNavClick('home', item.tab)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 text-gray-700 w-full"
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </motion.button>
                    );
                  })}
                </motion.div>

                {/* Sign In Button - Mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navItems.length + productItems.length + 1) * 0.1 }}
                  className="mt-2 pt-2 border-t border-gray-200"
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 text-primary border border-primary/20"
                    onClick={() => handleNavClick('signin')}
                  >
                    <User className="h-5 w-5" />
                    Sign In
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}