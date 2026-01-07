import { useState } from "react";
import { Button, Input, Label, Checkbox, Separator } from "@/components/ui";
import { User, Mail, Lock, Eye, EyeOff, Plane, Home } from "lucide-react";
import { motion } from "framer-motion";
import { LoadingAnimation } from "../../LoadingAnimation";
import { toast } from "sonner";
// Logo removed - using text instead

interface SignUpPageProps {
  onNavigate: (page: string) => void;
}

export default function SignupPage({ onNavigate }: SignUpPageProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome to Flybeth!", {
        description: "Your account has been created. Let's start exploring!",
      });
      onNavigate("home");
    }, 2000);
  };

  if (isLoading) {
    return <LoadingAnimation message="Creating your account..." />;
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-12"
      style={{
        background:
          "linear-gradient(135deg, var(--accent), var(--primary), var(--accent))",
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%),
                            radial-gradient(circle at 70% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
                            radial-gradient(circle at 50% 10%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
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
            <span className="text-2xl font-bold text-blue-600 mx-auto mb-4 block text-center">
              FlyBeth
            </span>
            <h2 className="mb-2">Begin Your Journey</h2>
            <p className="text-muted-foreground">
              Create your account and unlock exclusive travel deals
            </p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-primary">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="pl-11 h-12 border-2 focus:border-[#10b981] bg-white/50 backdrop-blur-sm"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-11 h-12 border-2 focus:border-[#10b981] bg-white/50 backdrop-blur-sm"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="pl-11 pr-11 h-12 border-2 focus:border-accent bg-white/50 backdrop-blur-sm"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters with a mix of letters and numbers
              </p>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={checked => setAgreeToTerms(checked as boolean)}
                className="mt-1"
              />
              <label
                htmlFor="terms"
                className="text-sm cursor-pointer select-none leading-tight"
              >
                I agree to the{" "}
                <button
                  type="button"
                  className="text-[#2563eb] hover:text-[#2563eb]/80 underline"
                  onClick={() => onNavigate("terms")}
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-[#2563eb] hover:text-[#2563eb]/80 underline"
                  onClick={() => onNavigate("privacy-policy")}
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 shadow-lg hover:shadow-xl transition-all text-white"
              style={{ background: "var(--gradient-blue-green)" }}
              disabled={!fullName || !email || !password}
            >
              <Plane className="mr-2 h-5 w-5" />
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <Separator />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-muted-foreground">
              or
            </span>
          </div>

          {/* Social Sign Up */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 hover:border-accent bg-white/50 backdrop-blur-sm"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => onNavigate("signin")}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center space-y-2"
        >
          <p className="text-sm text-white/80">
            🔒 Your data is encrypted and secure
          </p>
          <p className="text-xs text-white/70">
            By signing up, you'll get access to exclusive deals and personalized
            travel recommendations
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
