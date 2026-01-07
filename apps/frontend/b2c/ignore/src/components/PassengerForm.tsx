import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { User, Mail, Phone, Calendar, Globe, CreditCard as PassportIcon } from "lucide-react";
import { Badge } from "./ui/badge";

interface PassengerData {
  dateOfBirth: string;
  name: {
    firstName: string;
    lastName: string;
  };
  gender: "MALE" | "FEMALE" | "";
  contact: {
    emailAddress: string;
    phones: Array<{
      deviceType: "MOBILE" | "LANDLINE";
      countryCallingCode: string;
      number: string;
    }>;
  };
  documents?: Array<{
    documentType: "PASSPORT" | "ID_CARD";
    birthPlace: string;
    issuanceLocation: string;
    issuanceDate: string;
    number: string;
    expiryDate: string;
    issuanceCountry: string;
    validityCountry: string;
    nationality: string;
    holder: boolean;
  }>;
}

interface PassengerFormProps {
  index: number;
  onUpdate: (index: number, data: PassengerData) => void;
  isInternational: boolean;
  initialData?: PassengerData;
}

// Country codes with flags for phone numbers
const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
  { code: "+1", country: "CA", flag: "🇨🇦", name: "Canada" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "+39", country: "IT", flag: "🇮🇹", name: "Italy" },
  { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
  { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
  { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil" },
  { code: "+52", country: "MX", flag: "🇲🇽", name: "Mexico" },
  { code: "+7", country: "RU", flag: "🇷🇺", name: "Russia" },
  { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
  { code: "+31", country: "NL", flag: "🇳🇱", name: "Netherlands" },
  { code: "+46", country: "SE", flag: "🇸🇪", name: "Sweden" },
  { code: "+41", country: "CH", flag: "🇨🇭", name: "Switzerland" },
  { code: "+47", country: "NO", flag: "🇳🇴", name: "Norway" },
  { code: "+45", country: "DK", flag: "🇩🇰", name: "Denmark" },
  { code: "+351", country: "PT", flag: "🇵🇹", name: "Portugal" },
  { code: "+48", country: "PL", flag: "🇵🇱", name: "Poland" },
  { code: "+30", country: "GR", flag: "🇬🇷", name: "Greece" },
  { code: "+90", country: "TR", flag: "🇹🇷", name: "Turkey" },
  { code: "+971", country: "AE", flag: "🇦🇪", name: "UAE" },
  { code: "+966", country: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
  { code: "+852", country: "HK", flag: "🇭🇰", name: "Hong Kong" },
  { code: "+64", country: "NZ", flag: "🇳🇿", name: "New Zealand" },
  { code: "+27", country: "ZA", flag: "🇿🇦", name: "South Africa" },
];

// Countries with flags for nationality/issuance
const countries = [
  { code: "US", flag: "🇺🇸", name: "United States" },
  { code: "CA", flag: "🇨🇦", name: "Canada" },
  { code: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "FR", flag: "🇫🇷", name: "France" },
  { code: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "IT", flag: "🇮🇹", name: "Italy" },
  { code: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "CN", flag: "🇨🇳", name: "China" },
  { code: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "IN", flag: "🇮🇳", name: "India" },
  { code: "BR", flag: "🇧🇷", name: "Brazil" },
  { code: "MX", flag: "🇲🇽", name: "Mexico" },
  { code: "RU", flag: "🇷🇺", name: "Russia" },
  { code: "KR", flag: "🇰🇷", name: "South Korea" },
  { code: "NL", flag: "🇳🇱", name: "Netherlands" },
  { code: "SE", flag: "🇸🇪", name: "Sweden" },
  { code: "CH", flag: "🇨🇭", name: "Switzerland" },
  { code: "NO", flag: "🇳🇴", name: "Norway" },
  { code: "DK", flag: "🇩🇰", name: "Denmark" },
  { code: "PT", flag: "🇵🇹", name: "Portugal" },
  { code: "PL", flag: "🇵🇱", name: "Poland" },
  { code: "GR", flag: "🇬🇷", name: "Greece" },
  { code: "TR", flag: "🇹🇷", name: "Turkey" },
  { code: "AE", flag: "🇦🇪", name: "UAE" },
  { code: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "SG", flag: "🇸🇬", name: "Singapore" },
  { code: "HK", flag: "🇭🇰", name: "Hong Kong" },
  { code: "NZ", flag: "🇳🇿", name: "New Zealand" },
  { code: "ZA", flag: "🇿🇦", name: "South Africa" },
  { code: "AR", flag: "🇦🇷", name: "Argentina" },
  { code: "CL", flag: "🇨🇱", name: "Chile" },
  { code: "CO", flag: "🇨🇴", name: "Colombia" },
  { code: "EG", flag: "🇪🇬", name: "Egypt" },
  { code: "ID", flag: "🇮🇩", name: "Indonesia" },
  { code: "MY", flag: "🇲🇾", name: "Malaysia" },
  { code: "NG", flag: "🇳🇬", name: "Nigeria" },
  { code: "PH", flag: "🇵🇭", name: "Philippines" },
  { code: "TH", flag: "🇹🇭", name: "Thailand" },
  { code: "VN", flag: "🇻🇳", name: "Vietnam" },
];

export function PassengerForm({
  index,
  onUpdate,
  isInternational,
  initialData,
}: PassengerFormProps) {
  const passengerNumber = index + 1;
  
  // Default data structure
  const defaultData: PassengerData = {
    dateOfBirth: "",
    name: {
      firstName: "",
      lastName: "",
    },
    gender: "",
    contact: {
      emailAddress: "",
      phones: [
        {
          deviceType: "MOBILE",
          countryCallingCode: "+1",
          number: "",
        },
      ],
    },
    documents: isInternational
      ? [
          {
            documentType: "PASSPORT",
            birthPlace: "",
            issuanceLocation: "",
            issuanceDate: "",
            number: "",
            expiryDate: "",
            issuanceCountry: "",
            validityCountry: "",
            nationality: "",
            holder: true,
          },
        ]
      : undefined,
  };

  // Merge initial data with defaults
  const [passengerData, setPassengerData] = useState<PassengerData>({
    ...defaultData,
    ...initialData,
    name: {
      ...defaultData.name,
      ...(initialData?.name || {}),
    },
    contact: {
      ...defaultData.contact,
      ...(initialData?.contact || {}),
      phones: initialData?.contact?.phones || defaultData.contact.phones,
    },
    documents: initialData?.documents || defaultData.documents,
  });

  const updateData = (updates: Partial<PassengerData>) => {
    const newData = { ...passengerData, ...updates };
    setPassengerData(newData);
    onUpdate(index, newData);
  };

  const updateName = (field: "firstName" | "lastName", value: string) => {
    const newData = {
      ...passengerData,
      name: { ...passengerData.name, [field]: value.toUpperCase() },
    };
    setPassengerData(newData);
    onUpdate(index, newData);
  };

  const updateContact = (field: "emailAddress", value: string) => {
    const newData = {
      ...passengerData,
      contact: { ...passengerData.contact, [field]: value },
    };
    setPassengerData(newData);
    onUpdate(index, newData);
  };

  const updatePhone = (field: "countryCallingCode" | "number", value: string) => {
    // Extract just the country code from the value (format: "+1|US")
    const countryCode = field === "countryCallingCode" ? value.split('|')[0] : value;
    const newData = {
      ...passengerData,
      contact: {
        ...passengerData.contact,
        phones: [{ ...passengerData.contact.phones[0], [field]: countryCode }],
      },
    };
    setPassengerData(newData);
    onUpdate(index, newData);
  };

  const updateDocument = (field: string, value: string) => {
    if (!passengerData.documents) return;
    const newData = {
      ...passengerData,
      documents: [{ ...passengerData.documents[0], [field]: value }],
    };
    setPassengerData(newData);
    onUpdate(index, newData);
  };

  return (
    <Card className="border-2 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Passenger {passengerNumber}
          </div>
          <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-accent/10">
            {passengerNumber === 1 ? "Primary Contact" : "Additional Traveler"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`firstName-${passengerNumber}`}>
                First Name *
              </Label>
              <Input
                id={`firstName-${passengerNumber}`}
                value={passengerData.name.firstName}
                onChange={(e) => updateName("firstName", e.target.value)}
                placeholder="JOHN"
                className="uppercase"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`lastName-${passengerNumber}`}>
                Last Name *
              </Label>
              <Input
                id={`lastName-${passengerNumber}`}
                value={passengerData.name.lastName}
                onChange={(e) => updateName("lastName", e.target.value)}
                placeholder="DOE"
                className="uppercase"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`gender-${passengerNumber}`}>Gender *</Label>
              <Select
                value={passengerData.gender}
                onValueChange={(value) => updateData({ gender: value as "MALE" | "FEMALE" })}
              >
                <SelectTrigger id={`gender-${passengerNumber}`}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`dob-${passengerNumber}`}>Date of Birth *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id={`dob-${passengerNumber}`}
                type="date"
                value={passengerData.dateOfBirth}
                onChange={(e) => updateData({ dateOfBirth: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Information - Only for primary passenger */}
        {passengerNumber === 1 && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
            <div className="space-y-2">
              <Label htmlFor={`email-${passengerNumber}`}>Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id={`email-${passengerNumber}`}
                  type="email"
                  value={passengerData.contact.emailAddress}
                  onChange={(e) => updateContact("emailAddress", e.target.value)}
                  placeholder="john@example.com"
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Booking confirmation will be sent to this email
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`phone-${passengerNumber}`}>Phone Number *</Label>
              <div className="flex gap-2">
                <Select
                  value={countryCodes.find(c => c.code === passengerData.contact.phones[0].countryCallingCode) 
                    ? `${passengerData.contact.phones[0].countryCallingCode}|${countryCodes.find(c => c.code === passengerData.contact.phones[0].countryCallingCode)?.country}` 
                    : `${passengerData.contact.phones[0].countryCallingCode}|US`}
                  onValueChange={(value) => updatePhone("countryCallingCode", value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {countryCodes.map((country, idx) => (
                      <SelectItem
                        key={`${country.code}-${country.country}-${idx}`}
                        value={`${country.code}|${country.country}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{country.flag}</span>
                          <span>{country.code}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`phone-${passengerNumber}`}
                    type="tel"
                    value={passengerData.contact.phones[0].number}
                    onChange={(e) => updatePhone("number", e.target.value)}
                    placeholder="555-123-4567"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Passport Information - For international flights */}
        {isInternational && passengerData.documents && (
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <PassportIcon className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium text-muted-foreground">Passport Information</h4>
              <Badge variant="secondary" className="text-xs">Required for International Flight</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`passportNumber-${passengerNumber}`}>
                  Passport Number *
                </Label>
                <Input
                  id={`passportNumber-${passengerNumber}`}
                  value={passengerData.documents[0].number}
                  onChange={(e) => updateDocument("number", e.target.value)}
                  placeholder="ABC123456"
                  className="uppercase"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`nationality-${passengerNumber}`}>
                  Nationality *
                </Label>
                <Select
                  value={passengerData.documents[0].nationality}
                  onValueChange={(value) => updateDocument("nationality", value)}
                >
                  <SelectTrigger id={`nationality-${passengerNumber}`}>
                    <SelectValue placeholder="Select country">
                      {passengerData.documents[0].nationality && (
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {countries.find(c => c.code === passengerData.documents[0].nationality)?.flag}
                          </span>
                          <span>
                            {countries.find(c => c.code === passengerData.documents[0].nationality)?.name}
                          </span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{country.flag}</span>
                          <span>{country.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`issuanceDate-${passengerNumber}`}>
                  Issuance Date *
                </Label>
                <Input
                  id={`issuanceDate-${passengerNumber}`}
                  type="date"
                  value={passengerData.documents[0].issuanceDate}
                  onChange={(e) => updateDocument("issuanceDate", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`expiryDate-${passengerNumber}`}>
                  Expiry Date *
                </Label>
                <Input
                  id={`expiryDate-${passengerNumber}`}
                  type="date"
                  value={passengerData.documents[0].expiryDate}
                  onChange={(e) => updateDocument("expiryDate", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`issuanceCountry-${passengerNumber}`}>
                  Issuance Country *
                </Label>
                <Select
                  value={passengerData.documents[0].issuanceCountry}
                  onValueChange={(value) => updateDocument("issuanceCountry", value)}
                >
                  <SelectTrigger id={`issuanceCountry-${passengerNumber}`}>
                    <SelectValue placeholder="Select country">
                      {passengerData.documents[0].issuanceCountry && (
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {countries.find(c => c.code === passengerData.documents[0].issuanceCountry)?.flag}
                          </span>
                          <span>
                            {countries.find(c => c.code === passengerData.documents[0].issuanceCountry)?.name}
                          </span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{country.flag}</span>
                          <span>{country.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`birthPlace-${passengerNumber}`}>
                  Birth Place *
                </Label>
                <Input
                  id={`birthPlace-${passengerNumber}`}
                  value={passengerData.documents[0].birthPlace}
                  onChange={(e) => updateDocument("birthPlace", e.target.value)}
                  placeholder="New York"
                  required
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-xs text-blue-800">
                ℹ️ <strong>Important:</strong> Ensure your passport is valid for at least 6 months beyond your travel date. Names must match exactly as shown on your passport.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}