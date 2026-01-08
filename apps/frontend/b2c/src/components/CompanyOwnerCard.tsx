import { motion } from "framer-motion";
import { Building2, Check, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface CompanyOwnerCardProps {
  company: {
    companyName: string;
    companyEmail: string;
    companyPhone: string;
    companyCity?: string;
    companyCountry?: string;
    industry?: string;
  };
  onNavigate?: (page: string) => void;
}

export function CompanyOwnerCard({
  company,
  onNavigate,
}: CompanyOwnerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border-2 border-primary/20 shadow-xl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            {/* Company Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold shadow-lg"
            >
              {company.companyName[0]}
            </motion.div>

            {/* Company Info */}
            <div>
              <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-md mb-2">
                <Check className="h-3 w-3 mr-1.5" />
                Company Owner
              </Badge>
              <h3 className="text-2xl font-bold mb-1">{company.companyName}</h3>
              <p className="text-sm text-muted-foreground">
                {company.industry || "Business Travel"}
              </p>
            </div>
          </div>

          {/* Open Dashboard Button */}
          <Button
            onClick={() => onNavigate?.("company-dashboard")}
            className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <Building2 className="mr-2 h-5 w-5" />
            Open Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Company Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">Email</p>
            <p className="font-semibold truncate">{company.companyEmail}</p>
          </div>

          <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">Phone</p>
            <p className="font-semibold">{company.companyPhone}</p>
          </div>

          <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">Location</p>
            <p className="font-semibold truncate">
              {company.companyCity
                ? `${company.companyCity}, ${company.companyCountry}`
                : company.companyCountry || "Not set"}
            </p>
          </div>
        </div>

        {/* Features/Benefits */}
        <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-green-50">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-sm font-medium">Full dashboard access</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50">
              <Check className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-sm font-medium">Employee management</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-50">
              <Check className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-sm font-medium">
              Booking & transaction insights
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
