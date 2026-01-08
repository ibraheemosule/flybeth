import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Building2, Send, Check, X, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { OtpInput } from "./OtpInput";

interface JoinCompanySectionProps {
  userCompany: string | null;
  onJoinCompany: (companyName: string) => void;
  onLeaveCompany: () => void;
  savedCompany?: any;
  onNavigate?: (page: string) => void;
}

export function JoinCompanySection({
  userCompany,
  onJoinCompany,
  onLeaveCompany,
  savedCompany,
  onNavigate,
}: JoinCompanySectionProps) {
  const [inviteCode, setInviteCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [pendingCompanyData, setPendingCompanyData] = useState<any>(null);

  // Debug: Monitor userCompany prop changes
  useEffect(() => {
    console.log("🔍 [JoinCompanySection] userCompany prop changed to:", userCompany);
  }, [userCompany]);

  const handleJoinCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("=== JOIN COMPANY HANDLER TRIGGERED ===");
    console.log("Invite code:", inviteCode);
    console.log("isValidating:", isValidating);
    
    // TEMPORARY DEBUG MODE - Force open OTP modal for any code
    const DEBUG_MODE = true;
    
    if (DEBUG_MODE) {
      console.log("DEBUG MODE: Bypassing validation, opening OTP modal directly");
      setPendingCompanyData({
        companyName: inviteCode || "Test Company",
        generatedAt: new Date().toISOString(),
      });
      setShowOtpModal(true);
      toast.success("DEBUG: OTP modal opened! Use code: 123456");
      return;
    }
    
    if (!inviteCode.trim()) {
      toast.error("Please enter an invite code");
      return;
    }

    setIsValidating(true);

    // Validate invite code
    const storageKey = `flybeth-invite-${inviteCode.trim()}`;
    console.log("Looking for storage key:", storageKey);
    const companyData = localStorage.getItem(storageKey);
    console.log("Company data found:", companyData);
    
    if (!companyData) {
      toast.error("Invalid or expired invite code. Please check with your company administrator.");
      setIsValidating(false);
      return;
    }

    // Simulate sending OTP
    setTimeout(() => {
      try {
        const company = JSON.parse(companyData);
        setPendingCompanyData(company);
        setIsValidating(false);
        setShowOtpModal(true);
        toast.success(`OTP sent! Check your email/phone for the verification code.`);
        console.log("OTP Modal should open now");
      } catch (error) {
        console.error("Error validating invite code:", error);
        toast.error("Failed to validate invite code. Please try again.");
        setIsValidating(false);
      }
    }, 1500);
  };

  const handleVerifyOtp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("=== VERIFY OTP HANDLER TRIGGERED ===");
    console.log("OTP Code array:", otpCode);
    console.log("OTP Code joined:", otpCode.join(""));
    console.log("Pending company data:", pendingCompanyData);
    
    const otpValue = otpCode.join("");
    
    if (!otpValue.trim()) {
      console.log("OTP is empty!");
      toast.error("Please enter the OTP code");
      return;
    }

    console.log("Validating OTP:", otpValue);
    
    // Validate OTP (in real app, this would be sent to backend)
    if (otpValue !== "123456") {
      console.log("Invalid OTP!");
      toast.error("Invalid OTP code. Please try again.");
      return;
    }

    console.log("OTP is valid! Starting verification...");
    setIsVerifying(true);

    // Simulate OTP verification
    setTimeout(() => {
      console.log("Verification complete!");
      
      if (pendingCompanyData) {
        console.log("Saving company membership:", pendingCompanyData.companyName);
        
        // Save user's company membership
        localStorage.setItem("flybeth-user-company-membership", pendingCompanyData.companyName);
        
        console.log("Calling onJoinCompany callback with:", pendingCompanyData.companyName);
        console.log("Current userCompany prop before callback:", userCompany);
        onJoinCompany(pendingCompanyData.companyName);
        console.log("onJoinCompany callback completed");
        
        // Show success message
        toast.success(`Successfully joined ${pendingCompanyData.companyName}!`);
        
        // Reset state
        setInviteCode("");
        setOtpCode(["", "", "", "", "", ""]);
        setPendingCompanyData(null);
        setIsVerifying(false);
        setShowOtpModal(false);
        
        console.log("Success! User joined company - all state reset");
        console.log("LocalStorage value:", localStorage.getItem("flybeth-user-company-membership"));
      } else {
        console.error("No pending company data!");
        toast.error("Something went wrong. Please try again.");
        setIsVerifying(false);
      }
    }, 1500);
  };

  const handleCloseOtpModal = () => {
    setShowOtpModal(false);
    setOtpCode(["", "", "", "", "", ""]);
    setIsVerifying(false);
  };

  const handleResendOtp = () => {
    // Simulate resending OTP
    toast.success("OTP resent! Check your email/phone.");
    console.log("Resending OTP...");
  };

  const createTestInviteCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const testCode = "FLYBETH-TEST123";
    const testCompany = {
      companyName: "Test Company Inc.",
      generatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    localStorage.setItem(`flybeth-invite-${testCode}`, JSON.stringify(testCompany));
    setInviteCode(testCode);
    toast.success("Test invite code created and filled in!");
  };

  const handleLeaveCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (confirm("Are you sure you want to leave this company?")) {
      localStorage.removeItem("flybeth-user-company-membership");
      onLeaveCompany();
      toast.success("You have left the company");
    }
  };

  return (
    <>
      <div className="space-y-4">
        <Separator />
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Join Company Using Invite Code</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enter an invite code from your company administrator to join their organization
          </p>
        </div>

        {userCompany ? (
          /* Already in a company */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden p-5 rounded-xl bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 border border-primary/20 shadow-sm"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent rounded-full translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="p-2.5 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Building2 className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-sm mb-1.5">
                      <Check className="h-3 w-3 mr-1" />
                      Company Member
                    </Badge>
                    <h3 className="text-xl">{userCompany}</h3>
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleLeaveCompany}
                  className="border-destructive/30 text-destructive hover:bg-destructive/5"
                >
                  <X className="mr-1.5 h-3.5 w-3.5" />
                  Leave
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-200">
                  <div className="p-1.5 rounded bg-gradient-to-br from-primary/10 to-accent/10">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Your company tracks your trips</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-200">
                  <div className="p-1.5 rounded bg-gradient-to-br from-primary/10 to-accent/10">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Easy expense claims</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-200">
                  <div className="p-1.5 rounded bg-gradient-to-br from-primary/10 to-accent/10">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Access to special rates</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-3 pt-3 border-t border-gray-200">
                Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </motion.div>
        ) : (
          /* Not in a company - show join form */
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="inviteCode" className="mb-2 block">
                    Company Invite Code
                  </Label>
                  <Input
                    id="inviteCode"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    placeholder="FLYBETH-XXXXXXX-XXXXXX"
                    className="font-mono"
                    disabled={isValidating}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleJoinCompany(e as any);
                      }
                    }}
                  />
                </div>

                <div 
                  onClick={() => {
                    console.log("DIV wrapper clicked - this shouldn't block the button");
                  }}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      console.log("BUTTON CLICKED!!!");
                      handleJoinCompany(e);
                    }}
                    onMouseDown={(e) => {
                      console.log("Button mousedown detected!");
                    }}
                    onPointerDown={(e) => {
                      console.log("Button pointer down detected!");
                    }}
                    disabled={isValidating}
                    style={{
                      width: '100%',
                      height: '40px',
                      cursor: isValidating ? 'not-allowed' : 'pointer',
                      position: 'relative',
                      zIndex: 10,
                    }}
                    className="w-full h-10 px-4 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isValidating ? (
                      <>
                        <motion.div
                          className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Validating...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Join Company
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* OTP Verification Modal */}
      <Dialog open={showOtpModal} onOpenChange={handleCloseOtpModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-center">Verify Your Identity</DialogTitle>
            <DialogDescription className="text-center">
              We've sent a verification code to your registered email/phone.
              {pendingCompanyData && (
                <span className="block mt-2 font-semibold text-primary">
                  Joining: {pendingCompanyData.companyName}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="otp" className="mb-2 block text-center">
                Enter Verification Code
              </Label>
              <OtpInput
                value={otpCode}
                onChange={setOtpCode}
                disabled={isVerifying}
              />
              <p className="text-xs text-muted-foreground mt-4 text-center">
                For testing, use OTP: <strong className="text-primary">123456</strong>
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseOtpModal}
                disabled={isVerifying}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={(e) => {
                  console.log("!!! VERIFY BUTTON CLICKED - START !!!");
                  handleVerifyOtp(e);
                  console.log("!!! VERIFY BUTTON CLICKED - END !!!");
                }}
                onMouseDown={() => {
                  console.log(">>> Verify button MOUSE DOWN");
                }}
                onPointerDown={() => {
                  console.log(">>> Verify button POINTER DOWN");
                }}
                disabled={isVerifying}
                className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
              >
                {isVerifying ? (
                  <>
                    <motion.div
                      className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Verify & Join
                  </>
                )}
              </Button>
            </div>

            <button
              type="button"
              onClick={handleResendOtp}
              className="w-full text-sm text-primary hover:underline"
            >
              Didn't receive the code? Resend
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}