import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function ProgressSteps({ step }: { step: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center justify-center gap-4 mb-2">
        <div
          className={`flex items-center gap-2 ${
            step >= 1 ? "text-[#2563eb]" : "text-muted-foreground"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1
                ? "bg-gradient-to-r from-[#2563eb] to-[#10b981] text-white"
                : "bg-gray-200"
            }`}
          >
            {step > 1 ? <CheckCircle2 className="h-5 w-5" /> : "1"}
          </div>
          <span className="text-sm hidden sm:inline">Account</span>
        </div>
        <div
          className={`h-[2px] w-20 ${
            step >= 2
              ? "bg-gradient-to-r from-[#2563eb] to-[#10b981]"
              : "bg-gray-200"
          }`}
        />
        <div
          className={`flex items-center gap-2 ${
            step >= 2 ? "text-[#2563eb]" : "text-muted-foreground"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2
                ? "bg-gradient-to-r from-[#2563eb] to-[#10b981] text-white"
                : "bg-gray-200"
            }`}
          >
            {step > 2 ? <CheckCircle2 className="h-5 w-5" /> : "2"}
          </div>
          <span className="text-sm hidden sm:inline">Passenger</span>
        </div>
        <div
          className={`h-[2px] w-20 ${
            step >= 3
              ? "bg-gradient-to-r from-[#2563eb] to-[#10b981]"
              : "bg-gray-200"
          }`}
        />
        <div
          className={`flex items-center gap-2 ${
            step >= 3 ? "text-[#2563eb]" : "text-muted-foreground"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 3
                ? "bg-gradient-to-r from-[#2563eb] to-[#10b981] text-white"
                : "bg-gray-200"
            }`}
          >
            3
          </div>
          <span className="text-sm hidden sm:inline">Payment</span>
        </div>
      </div>
    </motion.div>
  );
}
