import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { KeyRound, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

interface ResetPasswordTestLinkProps {
  onNavigate: (page: string) => void;
}

export function ResetPasswordTestLink({ onNavigate }: ResetPasswordTestLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Card className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 shadow-xl max-w-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-orange-100">
            <KeyRound className="h-5 w-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1 text-orange-900">
              🧪 Test Reset Password Page
            </h4>
            <p className="text-xs text-orange-700 mb-3">
              Click below to view the password reset page UI
            </p>
            <Button
              onClick={() => onNavigate("reset-password")}
              size="sm"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              <ExternalLink className="mr-2 h-3.5 w-3.5" />
              View Reset Password Page
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
