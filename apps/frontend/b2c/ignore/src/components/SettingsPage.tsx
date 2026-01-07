import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Settings,
  Palette,
  User,
  Building2,
  Save,
  X,
  Check,
  Plus,
  Upload,
  Edit,
  Mail,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { useTheme, ColorTheme, themeColors } from "../contexts/ThemeContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { JoinCompanySection } from "./JoinCompanySection";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  passportNumber: string;
  address: string;
  city: string;
  country: string;
}

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

interface SettingsPageProps {
  onNavigate?: (page: string) => void;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<"theme" | "profile" | "company">("theme");
  const { theme: currentTheme, setTheme } = useTheme();
  const [isCustomTheme, setIsCustomTheme] = useState(false);
  const [customPrimary, setCustomPrimary] = useState("#2563eb");
  const [customAccent, setCustomAccent] = useState("#10b981");

  // Profile states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [savedProfile, setSavedProfile] = useState<UserProfile | null>(null);
  const [profileForm, setProfileForm] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    passportNumber: "",
    address: "",
    city: "",
    country: "",
  });

  // Company invite states
  const [inviteCode, setInviteCode] = useState("");
  const [isJoiningCompany, setIsJoiningCompany] = useState(false);
  const [userCompany, setUserCompany] = useState<string | null>(null);

  // Company states
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
  const [otpType, setOtpType] = useState<"profile" | "company">("profile");
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const loadedProfile = localStorage.getItem("flybeth-user-profile");
    if (loadedProfile) {
      const profile = JSON.parse(loadedProfile);
      setSavedProfile(profile);
      setProfileForm(profile);
    }

    const loadedCompany = localStorage.getItem("flybeth-company-details");
    if (loadedCompany) {
      const company = JSON.parse(loadedCompany);
      setSavedCompany(company);
      setCompanyForm(company);
      setHasCompany(true);
    }
    
    // Load user's company membership
    const membershipCompany = localStorage.getItem("flybeth-user-company-membership");
    if (membershipCompany) {
      setUserCompany(membershipCompany);
    }
  }, []);

  const handleThemeSelect = (theme: ColorTheme) => {
    setTheme(theme);
    setIsCustomTheme(false);
    toast.success(`Theme changed to ${themeColors[theme].name}`);
  };

  const handleCustomThemeApply = () => {
    const root = document.documentElement;
    root.style.setProperty("--primary", customPrimary);
    root.style.setProperty("--accent", customAccent);
    root.style.setProperty("--blue-primary", customPrimary);
    root.style.setProperty("--green-accent", customAccent);
    root.style.setProperty(
      "--gradient-blue-green",
      `linear-gradient(135deg, ${customPrimary} 0%, ${customAccent} 100%)`
    );
    
    localStorage.setItem("flybeth-custom-theme", JSON.stringify({
      primary: customPrimary,
      accent: customAccent,
    }));
    
    setIsCustomTheme(true);
    toast.success("Custom theme applied successfully!");
  };

  const handleProfileSaveRequest = () => {
    // Validate required fields
    if (!profileForm.firstName || !profileForm.lastName || !profileForm.email || !profileForm.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setOtpType("profile");
    setShowOtpModal(true);
    setOtpSent(false);
  };

  const handleCompanySaveRequest = () => {
    // Validate required fields
    if (!companyForm.companyName || !companyForm.companyEmail || !companyForm.companyPhone) {
      toast.error("Please fill in all required company fields");
      return;
    }
    
    setOtpType("company");
    setShowOtpModal(true);
    setOtpSent(false);
  };

  const handleSendOtp = () => {
    // Simulate sending OTP
    setOtpSent(true);
    const targetEmail = otpType === "profile" ? profileForm.email : companyForm.companyEmail;
    toast.success(`OTP sent to ${targetEmail}`);
    
    // In real app, this would call an API
    console.log(`Sending OTP to ${targetEmail}`);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
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
    const otpValue = otpCode.join("");
    
    if (otpValue.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    setIsVerifying(true);

    // Simulate OTP verification (in real app, this would be an API call)
    setTimeout(() => {
      // For demo, accept any 6-digit code
      if (otpType === "profile") {
        // Save profile
        localStorage.setItem("flybeth-user-profile", JSON.stringify(profileForm));
        setSavedProfile(profileForm);
        setIsEditingProfile(false);
        toast.success("Profile updated successfully!");
      } else {
        // Save company
        localStorage.setItem("flybeth-company-details", JSON.stringify(companyForm));
        setSavedCompany(companyForm);
        setIsEditingCompany(false);
        toast.success("Company details updated successfully!");
      }

      setShowOtpModal(false);
      setOtpCode(["", "", "", "", "", ""]);
      setIsVerifying(false);
    }, 1500);
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleCancelProfileEdit = () => {
    if (savedProfile) {
      setProfileForm(savedProfile);
    }
    setIsEditingProfile(false);
  };

  const handleEditCompany = () => {
    setIsEditingCompany(true);
  };

  const handleCancelCompanyEdit = () => {
    if (savedCompany) {
      setCompanyForm(savedCompany);
    }
    setIsEditingCompany(false);
  };

  const tabs = [
    { id: "theme", label: "Theme", icon: Palette },
    { id: "profile", label: "Profile", icon: User },
    { id: "company", label: "Company", icon: Building2 },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl">Settings</h1>
                <p className="text-muted-foreground">
                  Manage your preferences and account details
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-6 py-3 rounded-xl transition-all flex items-center gap-2 ${
                    isActive
                      ? "text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSettingsTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`h-5 w-5 relative z-10 ${isActive ? "text-white" : ""}`} />
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
          >
            {/* THEME TAB */}
            {activeTab === "theme" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl mb-2">Theme Customization</h2>
                  <p className="text-muted-foreground">
                    Choose from preset themes or create your own custom color scheme
                  </p>
                </div>

                <Separator />

                {/* Preset Themes */}
                <div>
                  <h3 className="text-lg mb-4">Preset Themes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {(Object.keys(themeColors) as ColorTheme[]).map((themeKey) => {
                      const themeData = themeColors[themeKey];
                      const isSelected = currentTheme === themeKey && !isCustomTheme;

                      return (
                        <motion.button
                          key={themeKey}
                          onClick={() => handleThemeSelect(themeKey)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={`relative p-5 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? "border-primary bg-primary/5 shadow-lg"
                              : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
                              <Check className="h-5 w-5 text-white" />
                            </div>
                          )}

                          <div
                            className="w-full h-24 rounded-lg shadow-md mb-3"
                            style={{
                              background: `linear-gradient(135deg, ${themeData.primary} 0%, ${themeData.accent} 100%)`,
                            }}
                          />
                          <h4 className="font-semibold mb-1">{themeData.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {themeData.description}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Custom Theme */}
                <div>
                  <h3 className="text-lg mb-4">Custom Theme</h3>
                  <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
                    <p className="text-sm text-muted-foreground mb-4">
                      Create your own unique color scheme by selecting custom primary and accent colors
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Label htmlFor="customPrimary" className="mb-2 block">
                          Primary Color
                        </Label>
                        <div className="flex gap-3 items-center">
                          <input
                            type="color"
                            id="customPrimary"
                            value={customPrimary}
                            onChange={(e) => setCustomPrimary(e.target.value)}
                            className="h-12 w-20 rounded-lg border-2 border-gray-200 cursor-pointer"
                          />
                          <Input
                            value={customPrimary}
                            onChange={(e) => setCustomPrimary(e.target.value)}
                            placeholder="#2563eb"
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="customAccent" className="mb-2 block">
                          Accent Color
                        </Label>
                        <div className="flex gap-3 items-center">
                          <input
                            type="color"
                            id="customAccent"
                            value={customAccent}
                            onChange={(e) => setCustomAccent(e.target.value)}
                            className="h-12 w-20 rounded-lg border-2 border-gray-200 cursor-pointer"
                          />
                          <Input
                            value={customAccent}
                            onChange={(e) => setCustomAccent(e.target.value)}
                            placeholder="#10b981"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <Label className="mb-2 block">Preview</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className="h-24 rounded-lg flex items-center justify-center text-white font-medium shadow-md"
                          style={{
                            background: `linear-gradient(135deg, ${customPrimary} 0%, ${customAccent} 100%)`,
                          }}
                        >
                          Gradient Preview
                        </div>
                        <div className="space-y-2">
                          <div
                            className="h-10 rounded-lg"
                            style={{ backgroundColor: customPrimary }}
                          />
                          <div
                            className="h-10 rounded-lg"
                            style={{ backgroundColor: customAccent }}
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleCustomThemeApply}
                      className="w-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                    >
                      <Palette className="mr-2 h-4 w-4" />
                      Apply Custom Theme
                    </Button>

                    {isCustomTheme && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-primary">
                        <Check className="h-4 w-4" />
                        Custom theme is currently active
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl mb-2">Profile Settings</h2>
                    <p className="text-muted-foreground">
                      {savedProfile && !isEditingProfile
                        ? "Your personal information and travel details"
                        : "Update your personal information and travel details"}
                    </p>
                  </div>
                  {savedProfile && !isEditingProfile && (
                    <Button
                      onClick={handleEditProfile}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/5"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>

                <Separator />

                {savedProfile && !isEditingProfile ? (
                  /* VIEW MODE */
                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div>
                      <Label className="mb-3 block">Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-2xl">
                          {savedProfile.firstName[0]}
                          {savedProfile.lastName[0]}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Personal Information - Read Only */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-muted-foreground">First Name</Label>
                        <p className="mt-2 text-lg">{savedProfile.firstName}</p>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Last Name</Label>
                        <p className="mt-2 text-lg">{savedProfile.lastName}</p>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Email Address</Label>
                        <p className="mt-2 text-lg">{savedProfile.email}</p>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Phone Number</Label>
                        <p className="mt-2 text-lg">{savedProfile.phone}</p>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Date of Birth</Label>
                        <p className="mt-2 text-lg">{savedProfile.dateOfBirth || "Not set"}</p>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Passport Number</Label>
                        <p className="mt-2 text-lg">{savedProfile.passportNumber || "Not set"}</p>
                      </div>

                      <div className="md:col-span-2">
                        <Label className="text-muted-foreground">Address</Label>
                        <p className="mt-2 text-lg">{savedProfile.address || "Not set"}</p>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">City</Label>
                        <p className="mt-2 text-lg">{savedProfile.city || "Not set"}</p>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Country</Label>
                        <p className="mt-2 text-lg">{savedProfile.country || "Not set"}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* EDIT MODE */
                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div>
                      <Label className="mb-3 block">Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-2xl">
                          {profileForm.firstName?.[0] || "U"}
                          {profileForm.lastName?.[0] || "S"}
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Change Photo
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Personal Information - Edit Form */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={profileForm.firstName}
                          onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                          className="mt-2"
                          placeholder="John"
                        />
                      </div>

                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={profileForm.lastName}
                          onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                          className="mt-2"
                          placeholder="Doe"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="mt-2"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="mt-2"
                          placeholder="+1 234 567 8900"
                        />
                      </div>

                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={profileForm.dateOfBirth}
                          onChange={(e) => setProfileForm({ ...profileForm, dateOfBirth: e.target.value })}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="passportNumber">Passport Number</Label>
                        <Input
                          id="passportNumber"
                          value={profileForm.passportNumber}
                          onChange={(e) => setProfileForm({ ...profileForm, passportNumber: e.target.value })}
                          className="mt-2"
                          placeholder="AB1234567"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={profileForm.address}
                          onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                          className="mt-2"
                          placeholder="123 Main Street"
                        />
                      </div>

                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={profileForm.city}
                          onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                          className="mt-2"
                          placeholder="New York"
                        />
                      </div>

                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={profileForm.country}
                          onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                          className="mt-2"
                          placeholder="United States"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      {savedProfile && (
                        <Button variant="outline" onClick={handleCancelProfileEdit}>
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      )}
                      <Button
                        onClick={handleProfileSaveRequest}
                        className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Join Company Section */}
                <JoinCompanySection
                  userCompany={userCompany}
                  onJoinCompany={(companyName) => {
                    console.log("📞 [SettingsPage] onJoinCompany callback received with:", companyName);
                    console.log("📞 [SettingsPage] Current userCompany before setState:", userCompany);
                    setUserCompany(companyName);
                    console.log("📞 [SettingsPage] setUserCompany called with:", companyName);
                  }}
                  onLeaveCompany={() => {
                    console.log("📞 [SettingsPage] onLeaveCompany callback received");
                    setUserCompany(null);
                    console.log("📞 [SettingsPage] setUserCompany called with: null");
                  }}
                />
              </div>
            )}

            {/* COMPANY TAB */}
            {activeTab === "company" && (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl mb-2">Company Details</h2>
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
                    {/* Company Dashboard Button */}
                    <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Company Dashboard</h3>
                          <p className="text-sm text-muted-foreground">
                            View employees, bookings, transactions, and manage access levels
                          </p>
                        </div>
                        <Button
                          onClick={() => onNavigate?.("company-dashboard")}
                          className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                        >
                          Open Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
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
            )}
          </motion.div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Verify Your {otpType === "profile" ? "Email" : "Company Email"}
            </DialogTitle>
            <DialogDescription>
              {!otpSent
                ? `We'll send a 6-digit verification code to ${
                    otpType === "profile" ? profileForm.email : companyForm.companyEmail
                  }`
                : `Enter the 6-digit code sent to ${
                    otpType === "profile" ? profileForm.email : companyForm.companyEmail
                  }`}
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
                        {otpType === "profile" ? profileForm.email : companyForm.companyEmail}
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
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Verify & Save
                      </>
                    )}
                  </Button>
                </div>

                <button
                  onClick={handleSendOtp}
                  className="w-full text-sm text-primary hover:underline"
                >
                  Didn't receive the code? Resend
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}