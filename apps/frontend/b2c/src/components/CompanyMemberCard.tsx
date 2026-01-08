import { motion } from "framer-motion";
import { Building2, Check, X, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useThemeStore } from "../stores";

interface CompanyMemberCardProps {
  companyName: string;
  onLeaveCompany: () => void;
  onNavigate?: (page: string) => void;
}

export function CompanyMemberCard({
  companyName,
  onLeaveCompany,
  onNavigate,
}: CompanyMemberCardProps) {
  const { getCurrentColors } = useThemeStore();
  const themeColors = getCurrentColors();

  const handleLeave = () => {
    if (confirm(`Are you sure you want to leave ${companyName}?`)) {
      onLeaveCompany();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border-2 border-primary/20 shadow-xl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2"
          style={{ backgroundColor: themeColors.accent }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full translate-y-1/2 -translate-x-1/2"
          style={{ backgroundColor: themeColors.primary }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            {/* Company Logo */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -5 }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg"
              style={{
                background: `linear-gradient(to bottom right, ${themeColors.primary}, ${themeColors.accent})`,
              }}
            >
              {companyName[0]}
            </motion.div>

            {/* Company Info */}
            <div>
              <Badge
                className="text-white border-0 shadow-md mb-2"
                style={{
                  background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.accent})`,
                }}
              >
                <Check className="h-3 w-3 mr-1.5" />
                Company Member
              </Badge>
              <h3 className="text-2xl font-bold mb-1">{companyName}</h3>
              <p className="text-sm text-muted-foreground">
                Member since{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => onNavigate?.("company-dashboard")}
              className="text-white hover:opacity-90 shadow-lg"
              style={{
                background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.accent})`,
              }}
              size="lg"
            >
              <Building2 className="mr-2 h-5 w-5" />
              Open Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={handleLeave}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
              size="lg"
            >
              <X className="mr-2 h-5 w-5" />
              Leave Company
            </Button>
          </div>
        </div>

        {/* Member Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div
            className="p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"
            style={{ borderColor: `${themeColors.primary}33` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="p-1.5 rounded"
                style={{ backgroundColor: `${themeColors.primary}0D` }}
              >
                <Check
                  className="h-3.5 w-3.5"
                  style={{ color: themeColors.primary }}
                />
              </div>
              <p
                className="text-xs font-semibold"
                style={{ color: themeColors.primary }}
              >
                TRACKED TRIPS
              </p>
            </div>
            <p className="text-sm text-gray-700">
              Your company tracks and manages your business travel
            </p>
          </div>

          <div
            className="p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"
            style={{ borderColor: `${themeColors.accent}33` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="p-1.5 rounded"
                style={{ backgroundColor: `${themeColors.accent}0D` }}
              >
                <Check
                  className="h-3.5 w-3.5"
                  style={{ color: themeColors.accent }}
                />
              </div>
              <p
                className="text-xs font-semibold"
                style={{ color: themeColors.accent }}
              >
                EASY EXPENSE CLAIMS
              </p>
            </div>
            <p className="text-sm text-gray-700">
              Simplified expense reporting and reimbursement process
            </p>
          </div>

          <div
            className="p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"
            style={{ borderColor: `${themeColors.primary}33` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="p-1.5 rounded"
                style={{ backgroundColor: `${themeColors.primary}0D` }}
              >
                <Check
                  className="h-3.5 w-3.5"
                  style={{ color: themeColors.primary }}
                />
              </div>
              <p
                className="text-xs font-semibold"
                style={{ color: themeColors.primary }}
              >
                SPECIAL RATES
              </p>
            </div>
            <p className="text-sm text-gray-700">
              Access to corporate rates and exclusive travel deals
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-50">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">
                All your bookings are visible to your company administrator
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Building2 className="h-3.5 w-3.5" />
              <span>Corporate Travel Member</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
