-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userType" TEXT NOT NULL DEFAULT 'CONSUMER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "googleId" TEXT,
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "consumer_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "dateOfBirth" DATETIME,
    "phoneNumber" TEXT,
    "nationality" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "postalCode" TEXT,
    "idType" TEXT,
    "idNumber" TEXT,
    "idExpiryDate" DATETIME,
    "kycStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "kycDocuments" TEXT,
    "verifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "consumer_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "business_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "businessType" TEXT,
    "registrationNumber" TEXT,
    "taxId" TEXT,
    "industry" TEXT,
    "businessDescription" TEXT,
    "website" TEXT,
    "businessAddress" TEXT,
    "businessCity" TEXT,
    "businessState" TEXT,
    "businessCountry" TEXT,
    "businessPostalCode" TEXT,
    "businessPhone" TEXT,
    "businessEmail" TEXT,
    "representativeName" TEXT,
    "representativeTitle" TEXT,
    "representativePhone" TEXT,
    "representativeEmail" TEXT,
    "businessLicense" TEXT,
    "incorporationCertificate" TEXT,
    "taxCertificate" TEXT,
    "bankName" TEXT,
    "accountNumber" TEXT,
    "routingNumber" TEXT,
    "kycStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "kycDocuments" TEXT,
    "verifiedAt" DATETIME,
    "annualRevenue" REAL,
    "employeeCount" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "business_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "flights" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightNumber" TEXT NOT NULL,
    "airline" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departureTime" DATETIME NOT NULL,
    "arrivalTime" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "seats" INTEGER NOT NULL,
    "aircraft" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "flight_bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "seatNumber" TEXT,
    "seatClass" TEXT NOT NULL DEFAULT 'ECONOMY',
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "flight_bookings_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flights" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "flight_bookings_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "hotels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "rating" REAL,
    "pricePerNight" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "amenities" TEXT,
    "images" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "hotel_rooms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hotelId" TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "amenities" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "hotel_rooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "hotel_bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hotelId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "checkIn" DATETIME NOT NULL,
    "checkOut" DATETIME NOT NULL,
    "guests" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "hotel_bookings_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "hotel_bookings_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "hotel_rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "hotel_bookings_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bookingType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "totalAmount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "consumer_profiles_userId_key" ON "consumer_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "business_profiles_userId_key" ON "business_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");
