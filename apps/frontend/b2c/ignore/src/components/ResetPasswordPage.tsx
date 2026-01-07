import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "motion/react";
import { Eye, EyeOff, Lock, CheckCircle2, XCircle, Home, Sparkles } from "lucide-react";
import { LoadingAnimation } from "./LoadingAnimation";
import { toast } from "sonner@2.0.3";
import flybethLogo from "figma:asset/cc0c72fad362bbd2c66729e646104165003b6a43.png";

interface ResetPasswordPageProps {
  onNavigate: (page: string) => void;
  token?: string;
}

export function ResetPasswordPage({ onNavigate, token = "sample-token-123" }: ResetPasswordPageProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    if (strength <= 1) return { strength: 1, label: "Weak", color: "bg-red-500" };
    if (strength <= 3) return { strength: 2, label: "Fair", color: "bg-yellow-500" };
    if (strength <= 4) return { strength: 3, label: "Good", color: "bg-blue-500" };
    return { strength: 4, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(newPassword);
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
  const passwordsDontMatch = confirmPassword && newPassword !== confirmPassword;

  const passwordRequirements = [
    { met: newPassword.length >= 8, text: "At least 8 characters" },
    { met: /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword), text: "Upper & lowercase letters" },
    { met: /\d/.test(newPassword), text: "At least one number" },
    { met: /[^a-zA-Z\d]/.test(newPassword), text: "At least one special character" },
  ];

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordsMatch) {
      toast.error("Passwords don't match", {
        description: "Please make sure both passwords are identical.",
      });
      return;
    }

    if (passwordStrength.strength < 3) {
      toast.error("Password too weak", {
        description: "Please choose a stronger password for your security.",
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast.success("Password reset successful!", {
        description: "Your password has been updated. You can now sign in with your new password.",
      });
      
      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        onNavigate("signin");
      }, 3000);
    }, 2000);
  };

  if (isLoading) {
    return <LoadingAnimation message="Resetting your password..." />;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-primary relative overflow-hidden flex items-center justify-center px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                              radial-gradient(circle at 40% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            }}
          />
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center relative z-10"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border-2 border-white/50">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="mb-3">Password Reset Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Your password has been successfully updated.<br />
              Redirecting you to sign in...
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => onNavigate("signin")}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                Sign In Now
              </Button>
              <Button
                onClick={() => onNavigate("home")}
                variant="outline"
              >
                Go to Home
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-primary relative overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                            radial-gradient(circle at 40% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Home Button */}
      <Button
        onClick={() => onNavigate("home")}
        variant="outline"
        className="absolute top-4 left-4 z-20 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-md"
      >
        <Home className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-white/50">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <img src={flybethLogo} alt="Flybeth" className="h-12 mx-auto mb-4" />
            <h2 className="mb-2">Reset Your Password</h2>
            <p className="text-muted-foreground">
              Choose a strong new password for your account
            </p>
          </div>

          {/* Reset Form */}
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-primary">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="pl-11 pr-11 h-12 border-2 focus:border-accent bg-white/50 backdrop-blur-sm"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Password strength:</span>
                    <span className={`font-semibold ${
                      passwordStrength.strength === 1 ? "text-red-600" :
                      passwordStrength.strength === 2 ? "text-yellow-600" :
                      passwordStrength.strength === 3 ? "text-blue-600" :
                      "text-green-600"
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          level <= passwordStrength.strength
                            ? passwordStrength.color
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-primary">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className={`pl-11 pr-11 h-12 border-2 focus:border-accent bg-white/50 backdrop-blur-sm ${
                    passwordsDontMatch ? "border-red-500 focus:border-red-500" : ""
                  } ${passwordsMatch ? "border-green-500 focus:border-green-500" : ""}`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className={`flex items-center gap-2 text-xs ${
                  passwordsMatch ? "text-green-600" : "text-red-600"
                }`}>
                  {passwordsMatch ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Passwords match</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3.5 w-3.5" />
                      <span>Passwords don't match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-700 mb-3">Password requirements:</p>
              <ul className="space-y-2">
                {passwordRequirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs">
                    {req.met ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                    ) : (
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                    )}
                    <span className={req.met ? "text-green-700" : "text-gray-600"}>
                      {req.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all"
              disabled={!newPassword || !confirmPassword || !passwordsMatch || passwordStrength.strength < 3}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Reset Password
            </Button>
          </form>

          {/* Back to Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => onNavigate("signin")}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Back to sign in
              </button>
            </p>
          </div>
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-white/80">
            🔒 Your password is encrypted and secure
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}