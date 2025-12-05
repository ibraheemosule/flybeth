import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ForgotPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ForgotPasswordModal({
  open,
  onOpenChange,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Password reset email sent!", {
        description: "Check your inbox for further instructions.",
      });
    }, 1500);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border-2 border-[#2563eb]/10">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-[#2563eb]" />
                Reset Your Password
              </DialogTitle>
              <DialogDescription>
                Enter your email address and we'll send you a link to reset your
                password
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-11 h-12 border-2 focus:border-[#10b981]"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm text-blue-900">
                  💡 <strong>Note:</strong> The reset link will expire in 24
                  hours. If you don't receive an email within 5 minutes, check
                  your spam folder.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="flex-1 bg-gradient-to-r from-[#2563eb] to-[#10b981] hover:from-[#2563eb]/90 hover:to-[#10b981]/90"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#10b981]/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-[#10b981]" />
            </div>

            <div>
              <h3 className="mb-2">Check Your Email!</h3>
              <p className="text-muted-foreground">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-[#2563eb]/5 to-[#10b981]/5 border border-[#2563eb]/10">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email?{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#2563eb] hover:underline"
                >
                  Try again
                </button>
              </p>
            </div>

            <Button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-[#2563eb] to-[#10b981] hover:from-[#2563eb]/90 hover:to-[#10b981]/90"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
