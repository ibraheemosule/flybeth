import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Check,
  Plus,
  Shield,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { useThemeStore } from "../../stores";
import { toast } from "sonner";

interface CompanyDetails {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companyCity: string;
  companyCountry: string;
  taxId?: string;
  industry?: string;
}

export function CompanySettings() {
  const { getCurrentColors } = useThemeStore();
  const themeColors = getCurrentColors();

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

  // OTP states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);

  // Load saved company details on mount
  useEffect(() => {
    const savedDetails = localStorage.getItem("flybeth-company-details");
    if (savedDetails) {
      const company = JSON.parse(savedDetails);
      setSavedCompany(company);
      setCompanyForm(company);
      setHasCompany(true);
    }
  }, []);

  const handleEditCompany = () => {
    setIsEditingCompany(true);
  };

  const handleCancelCompanyEdit = () => {
    if (savedCompany) {
      setCompanyForm(savedCompany);
    }
    setIsEditingCompany(false);
  };

  const handleCompanySaveRequest = () => {
    if (
      !companyForm.companyName ||
      !companyForm.companyEmail ||
      !companyForm.companyPhone
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    setShowOtpModal(true);
  };

  const handleSendOtp = () => {
    // Simulate sending OTP
    setTimeout(() => {
      setOtpSent(true);
      toast.success(`Verification code sent to ${companyForm.companyEmail}`);
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otpCode];
      newOtp[index] = value;
      setOtpCode(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
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
      localStorage.setItem(
        "flybeth-company-details",
        JSON.stringify(companyForm)
      );
      setSavedCompany(companyForm);
      setHasCompany(true);
      setIsEditingCompany(false);
      setShowOtpModal(false);
      setOtpSent(false);
      setOtpCode(["", "", "", "", "", ""]);
      setIsVerifying(false);
      toast.success("Company profile saved successfully!");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Company Settings</h2>
        <p className="text-muted-foreground">
          Manage your company profile and business information
        </p>
      </div>

      <Separator />

      {/* Company Profile Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold mb-2">Company Details</h3>
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
              style={{
                borderColor: themeColors.primary,
                color: themeColors.primary,
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Company
            </Button>
          )}
        </div>

        {/* Add Company Button */}
        {!savedCompany && !hasCompany && (
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Set Up Company Profile</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Add company details to enable business travel management
                </p>
              </div>
              <Button
                onClick={() => {
                  setHasCompany(true);
                  setIsEditingCompany(true);
                }}
                style={{
                  background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.accent})`,
                }}
                className="text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Company
              </Button>
            </div>
          </Card>
        )}

        {savedCompany && !isEditingCompany && hasCompany ? (
          /* VIEW MODE */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label className="text-muted-foreground">Company Name</Label>
                  <p className="mt-2 text-lg font-medium">
                    {savedCompany.companyName}
                  </p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Company Email</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-lg">{savedCompany.companyEmail}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">Company Phone</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-lg">{savedCompany.companyPhone}</p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label className="text-muted-foreground">
                    Company Address
                  </Label>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-lg">
                      {savedCompany.companyAddress || "Not set"}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">City</Label>
                  <p className="mt-2 text-lg">
                    {savedCompany.companyCity || "Not set"}
                  </p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Country</Label>
                  <p className="mt-2 text-lg">
                    {savedCompany.companyCountry || "Not set"}
                  </p>
                </div>

                {savedCompany.taxId && (
                  <div>
                    <Label className="text-muted-foreground">
                      Tax ID / VAT Number
                    </Label>
                    <p className="mt-2 text-lg">{savedCompany.taxId}</p>
                  </div>
                )}

                {savedCompany.industry && (
                  <div>
                    <Label className="text-muted-foreground">Industry</Label>
                    <p className="mt-2 text-lg">{savedCompany.industry}</p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-4 border-destructive/20 bg-destructive/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-destructive">Danger Zone</p>
                  <p className="text-sm text-muted-foreground">
                    Remove company profile and all associated data
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to remove your company profile? This action cannot be undone."
                      )
                    ) {
                      setHasCompany(false);
                      setSavedCompany(null);
                      localStorage.removeItem("flybeth-company-details");
                      toast.success("Company profile removed");
                    }
                  }}
                  className="text-destructive border-destructive hover:bg-destructive/5"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove Company
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : hasCompany || isEditingCompany ? (
          /* EDIT MODE */
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={companyForm.companyName}
                    onChange={e =>
                      setCompanyForm({
                        ...companyForm,
                        companyName: e.target.value,
                      })
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
                    onChange={e =>
                      setCompanyForm({
                        ...companyForm,
                        companyEmail: e.target.value,
                      })
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
                    onChange={e =>
                      setCompanyForm({
                        ...companyForm,
                        companyPhone: e.target.value,
                      })
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
                    onChange={e =>
                      setCompanyForm({
                        ...companyForm,
                        companyAddress: e.target.value,
                      })
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
                    onChange={e =>
                      setCompanyForm({
                        ...companyForm,
                        companyCity: e.target.value,
                      })
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
                    onChange={e =>
                      setCompanyForm({
                        ...companyForm,
                        companyCountry: e.target.value,
                      })
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
                    onChange={e =>
                      setCompanyForm({
                        ...companyForm,
                        taxId: e.target.value,
                      })
                    }
                    placeholder="12-3456789"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={companyForm.industry}
                    onChange={e =>
                      setCompanyForm({
                        ...companyForm,
                        industry: e.target.value,
                      })
                    }
                    placeholder="Technology"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 mt-6 border-t">
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
                  style={{
                    background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.accent})`,
                  }}
                  className="text-white"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Company Details
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <Card className="p-12 text-center">
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-muted-foreground">
              No company profile set up. Click "Add Company" to get started.
            </p>
          </Card>
        )}
      </div>

      {/* OTP Verification Modal */}
      <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield
                className="h-5 w-5"
                style={{ color: themeColors.primary }}
              />
              Verify Company Email
            </DialogTitle>
            <DialogDescription>
              {!otpSent
                ? `We'll send a 6-digit verification code to ${companyForm.companyEmail}`
                : `Enter the 6-digit code sent to ${companyForm.companyEmail}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {!otpSent ? (
              <div className="space-y-4">
                <div
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: `${themeColors.primary}0D`,
                    borderColor: `${themeColors.primary}1A`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Mail
                      className="h-5 w-5"
                      style={{ color: themeColors.primary }}
                    />
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
                  className="w-full text-white"
                  style={{
                    background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.accent})`,
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Verification Code
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center gap-2">
                  {otpCode.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(index, e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Backspace" && !digit && index > 0) {
                          const prevInput = document.getElementById(
                            `otp-${index - 1}`
                          );
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
                    className="flex-1 text-white"
                    style={{
                      background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.accent})`,
                    }}
                  >
                    {isVerifying ? (
                      <>
                        <motion.div
                          className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Verify & Save
                      </>
                    )}
                  </Button>
                </div>

                <button
                  onClick={handleSendOtp}
                  className="w-full text-sm hover:underline"
                  style={{ color: themeColors.primary }}
                >
                  Didn't receive the code? Resend
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
