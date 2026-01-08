import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Building2,
  Save,
  X,
  Edit,
  Plus,
  Shield,
  Mail,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

interface CompanyDetails {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companyCity: string;
  companyCountry: string;
  taxId: string;
  industry: string;
}

export function CompanySettingsSection() {
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [hasCompany, setHasCompany] = useState(false);
  const [savedCompany, setSavedCompany] = useState<CompanyDetails | null>(null);
  const [companyForm, setCompanyForm] = useState<CompanyDetails>({
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyAddress: "",
    companyCity: "",
    companyCountry: "",
    taxId: "",
    industry: "",
  });

  // OTP verification states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);

  // Load saved company on mount
  useEffect(() => {
    const saved = localStorage.getItem("flybeth-company-details");
    if (saved) {
      const parsedCompany = JSON.parse(saved);
      setSavedCompany(parsedCompany);
      setCompanyForm(parsedCompany);
      setHasCompany(true);
    }
  }, []);

  const handleEditCompany = () => {
    if (savedCompany) {
      setCompanyForm(savedCompany);
    }
    setIsEditingCompany(true);
  };

  const handleCancelCompanyEdit = () => {
    if (savedCompany) {
      setCompanyForm(savedCompany);
    }
    setIsEditingCompany(false);
  };

  const handleCompanySaveRequest = () => {
    // Validate required fields
    if (!companyForm.companyName || !companyForm.companyEmail || !companyForm.companyPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Show OTP verification
    setShowOtpModal(true);
    setOtpSent(false);
    setOtpCode(["", "", "", "", "", ""]);
  };

  const handleSendOtp = () => {
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      toast.success("Verification code sent!");
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const code = otpCode.join("");
    if (code.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    setIsVerifying(true);

    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      
      // Save company details
      setSavedCompany(companyForm);
      setHasCompany(true);
      setIsEditingCompany(false);
      localStorage.setItem("flybeth-company-details", JSON.stringify(companyForm));
      
      // Close modal and show success
      setShowOtpModal(false);
      setOtpCode(["", "", "", "", "", ""]);
      setOtpSent(false);
      
      toast.success("Company details saved successfully!");
    }, 1500);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl mb-2">Company Settings</h2>
            <p className="text-muted-foreground">
              {savedCompany && !isEditingCompany
                ? "Your company information for business travel bookings"
                : "Manage your company information for business travel bookings"}
            </p>
          </div>
          {savedCompany && !isEditingCompany && hasCompany && (
            <Button
              onClick={handleEditCompany}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Company
            </Button>
          )}
        </div>

        <Separator />

        {/* Toggle Company */}
        {!savedCompany && !hasCompany && (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Link Company Profile</p>
              <p className="text-sm text-muted-foreground">
                Enable this to add company details for business bookings
              </p>
            </div>
            <Button
              onClick={() => {
                setHasCompany(true);
                setIsEditingCompany(true);
              }}
              variant="outline"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </div>
        )}

        {savedCompany && !isEditingCompany && hasCompany ? (
          /* VIEW MODE */
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label className="text-muted-foreground">Company Name</Label>
                <p className="mt-2 text-lg">{savedCompany.companyName}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">Company Email</Label>
                <p className="mt-2 text-lg">{savedCompany.companyEmail}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">Company Phone</Label>
                <p className="mt-2 text-lg">{savedCompany.companyPhone}</p>
              </div>

              <div className="md:col-span-2">
                <Label className="text-muted-foreground">Company Address</Label>
                <p className="mt-2 text-lg">{savedCompany.companyAddress || "Not set"}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">City</Label>
                <p className="mt-2 text-lg">{savedCompany.companyCity || "Not set"}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">Country</Label>
                <p className="mt-2 text-lg">{savedCompany.companyCountry || "Not set"}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">Tax ID / VAT Number</Label>
                <p className="mt-2 text-lg">{savedCompany.taxId || "Not set"}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">Industry</Label>
                <p className="mt-2 text-lg">{savedCompany.industry || "Not set"}</p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setHasCompany(false);
                  setSavedCompany(null);
                  localStorage.removeItem("flybeth-company-details");
                  toast.success("Company profile removed");
                }}
                className="text-destructive border-destructive hover:bg-destructive/5"
              >
                <X className="mr-2 h-4 w-4" />
                Remove Company
              </Button>
            </div>
          </div>
        ) : hasCompany || isEditingCompany ? (
          /* EDIT MODE */
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={companyForm.companyName}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, companyName: e.target.value })
                  }
                  placeholder="Acme Corporation"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="companyEmail">Company Email *</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={companyForm.companyEmail}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, companyEmail: e.target.value })
                  }
                  placeholder="contact@company.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="companyPhone">Company Phone *</Label>
                <Input
                  id="companyPhone"
                  type="tel"
                  value={companyForm.companyPhone}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, companyPhone: e.target.value })
                  }
                  placeholder="+1 234 567 8900"
                  className="mt-2"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="companyAddress">Company Address</Label>
                <Input
                  id="companyAddress"
                  value={companyForm.companyAddress}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, companyAddress: e.target.value })
                  }
                  placeholder="123 Business Avenue"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="companyCity">City</Label>
                <Input
                  id="companyCity"
                  value={companyForm.companyCity}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, companyCity: e.target.value })
                  }
                  placeholder="New York"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="companyCountry">Country</Label>
                <Input
                  id="companyCountry"
                  value={companyForm.companyCountry}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, companyCountry: e.target.value })
                  }
                  placeholder="United States"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                <Input
                  id="taxId"
                  value={companyForm.taxId}
                  onChange={(e) => setCompanyForm({ ...companyForm, taxId: e.target.value })}
                  placeholder="12-3456789"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={companyForm.industry}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, industry: e.target.value })
                  }
                  placeholder="Technology"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (savedCompany) {
                    handleCancelCompanyEdit();
                  } else {
                    setHasCompany(false);
                    setIsEditingCompany(false);
                  }
                }}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                onClick={handleCompanySaveRequest}
                className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Company Details
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-muted-foreground">
              No company profile linked. Click "Add Company" to get started.
            </p>
          </div>
        )}
      </div>

      {/* OTP Verification Modal */}
      <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Verify Your Company Email
            </DialogTitle>
            <DialogDescription>
              {!otpSent
                ? `We'll send a 6-digit verification code to ${companyForm.companyEmail}`
                : `Enter the 6-digit code sent to ${companyForm.companyEmail}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {!otpSent ? (
              /* Send OTP Step */
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Email Address</p>
                      <p className="text-sm text-muted-foreground">
                        {companyForm.companyEmail}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSendOtp}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Verification Code
                </Button>
              </div>
            ) : (
              /* Enter OTP Step */
              <div className="space-y-6">
                <div className="flex justify-center gap-2">
                  {otpCode.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !digit && index > 0) {
                          const prevInput = document.getElementById(`otp-${index - 1}`);
                          prevInput?.focus();
                        }
                      }}
                      className="w-12 h-12 text-center text-lg font-semibold"
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOtpSent(false);
                      setOtpCode(["", "", "", "", "", ""]);
                    }}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleVerifyOtp}
                    disabled={isVerifying}
                    className="flex-1 bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
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
                      "Verify Code"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
