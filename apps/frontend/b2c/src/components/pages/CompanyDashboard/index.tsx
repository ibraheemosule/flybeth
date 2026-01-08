"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Calendar,
  DollarSign,
  FileText,
  ArrowLeft,
  Settings,
} from "lucide-react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";

// Import the modular sections
import { CompanyOverview } from "../../company/CompanyOverview";
import { EmployeesSection } from "../../company/EmployeesSection";
import { BookingHistorySection } from "../../company/BookingHistorySection";
import { TransactionsSection } from "../../company/TransactionsSection";
import { CustomersSection } from "../../company/CustomersSection";
import { CompanySettings } from "../../company/CompanySettings";
import { useThemeStore } from "../../../stores";

type TabType =
  | "overview"
  | "employees"
  | "bookings"
  | "transactions"
  | "customers"
  | "settings";

export function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const router = useRouter();
  const { getCurrentColors } = useThemeStore();
  const themeColors = getCurrentColors();

  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: Building2 },
    { id: "employees" as TabType, label: "Employees", icon: Users },
    { id: "bookings" as TabType, label: "Bookings", icon: Calendar },
    { id: "transactions" as TabType, label: "Transactions", icon: DollarSign },
    { id: "customers" as TabType, label: "Customers", icon: FileText },
    { id: "settings" as TabType, label: "Settings", icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <CompanyOverview />;
      case "employees":
        return <EmployeesSection />;
      case "bookings":
        return <BookingHistorySection />;
      case "transactions":
        return <TransactionsSection />;
      case "customers":
        return <CustomersSection />;
      case "settings":
        return <CompanySettings />;
      default:
        return <CompanyOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/settings")}
                className="text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Settings
              </Button>
              <div className="hidden sm:block h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.accent})`,
                  }}
                >
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Company Dashboard</h1>
                  <p className="text-sm text-muted-foreground">
                    Manage your team and travel
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm
                    transition-colors whitespace-nowrap
                    ${
                      isActive
                        ? `border-[${themeColors.primary}] text-[${themeColors.primary}] bg-[${themeColors.primary}]/5`
                        : "border-transparent text-muted-foreground hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
}
