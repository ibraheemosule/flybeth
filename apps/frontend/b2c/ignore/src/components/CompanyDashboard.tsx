import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Building2,
  Users,
  Calendar,
  CreditCard,
  Settings,
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Package,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { EmployeesSection } from "./company/EmployeesSection";
import { BookingHistorySection } from "./company/BookingHistorySection";
import { TransactionsSection } from "./company/TransactionsSection";
import { CustomersSection } from "./company/CustomersSection";
import { CompanyOverview } from "./company/CompanyOverview";
import { CompanySettingsSection } from "./company/CompanySettingsSection";

interface CompanyDashboardProps {
  onBack: () => void;
}

type DashboardSection = "overview" | "employees" | "bookings" | "transactions" | "customers" | "settings";

export function CompanyDashboard({ onBack }: CompanyDashboardProps) {
  const [activeSection, setActiveSection] = useState<DashboardSection>("overview");
  const [hasCompany, setHasCompany] = useState(false);

  // Check if company exists and set default section
  useEffect(() => {
    const companyDetails = localStorage.getItem("flybeth-company-details");
    const hasCompanyDetails = !!companyDetails;
    setHasCompany(hasCompanyDetails);
    
    // If no company details, default to settings section
    if (!hasCompanyDetails) {
      setActiveSection("settings");
    }
  }, []);

  const navigation = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
      description: "Company statistics and insights",
    },
    {
      id: "employees",
      label: "Employees",
      icon: Users,
      description: "Manage team members and roles",
      badge: "12",
    },
    {
      id: "bookings",
      label: "Booking History",
      icon: Calendar,
      description: "All company bookings and orders",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: CreditCard,
      description: "Financial overview and payments",
    },
    {
      id: "customers",
      label: "Customers",
      icon: Package,
      description: "Manage and view customer details",
      badge: "50",
    },
    {
      id: "settings",
      label: "Company Settings",
      icon: Settings,
      description: "Edit company profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Company Dashboard</h1>
                  <p className="text-sm text-muted-foreground">
                    Tech Innovations Inc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">
                NAVIGATION
              </h3>
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveSection(item.id as DashboardSection)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center justify-between ${
                        isActive
                          ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`h-4 w-4 ${isActive ? "text-primary" : ""}`} />
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                          {!isActive && (
                            <div className="text-xs text-muted-foreground">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-2">
                          {item.badge}
                        </Badge>
                      )}
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {!hasCompany && activeSection !== "settings" ? (
                /* Welcome CTA - No Company Profile */
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <div className="max-w-2xl mx-auto">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6">
                      <Building2 className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-semibold mb-3">Welcome to Your Company Dashboard</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                      Before you can access your company dashboard features, you'll need to set up your company profile.
                    </p>
                    <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 mb-8 border border-primary/10">
                      <h3 className="font-semibold mb-3">What you'll get:</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-left">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-white shadow-sm">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Employee Management</p>
                            <p className="text-xs text-muted-foreground">Manage team members and roles</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-white shadow-sm">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Booking History</p>
                            <p className="text-xs text-muted-foreground">Track all company bookings</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-white shadow-sm">
                            <CreditCard className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Transaction Reports</p>
                            <p className="text-xs text-muted-foreground">Financial overview and analytics</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-white shadow-sm">
                            <TrendingUp className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Business Insights</p>
                            <p className="text-xs text-muted-foreground">Data-driven travel decisions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => setActiveSection("settings")}
                      size="lg"
                      className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 text-lg px-8"
                    >
                      <Building2 className="mr-2 h-5 w-5" />
                      Set Up Company Profile
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {activeSection === "overview" && <CompanyOverview />}
                  {activeSection === "employees" && <EmployeesSection />}
                  {activeSection === "bookings" && <BookingHistorySection />}
                  {activeSection === "transactions" && <TransactionsSection />}
                  {activeSection === "customers" && <CustomersSection />}
                  {activeSection === "settings" && <CompanySettingsSection />}
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}