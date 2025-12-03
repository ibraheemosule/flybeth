/*
  Warnings:

  - You are about to drop the `business_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `consumer_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userType` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "business_profiles_userId_key";

-- DropIndex
DROP INDEX "consumer_profiles_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "business_profiles";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "consumer_profiles";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "businesses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "googleId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
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
    "representativeName" TEXT NOT NULL,
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
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "business_flight_bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightId" TEXT NOT NULL,
    "businessBookingId" TEXT NOT NULL,
    "seatNumber" TEXT,
    "seatClass" TEXT NOT NULL DEFAULT 'ECONOMY',
    "price" REAL NOT NULL,
    "travelerName" TEXT NOT NULL,
    "travelerEmail" TEXT,
    "employeeId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "business_flight_bookings_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flights" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "business_flight_bookings_businessBookingId_fkey" FOREIGN KEY ("businessBookingId") REFERENCES "business_bookings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "business_hotel_bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hotelId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "businessBookingId" TEXT NOT NULL,
    "checkIn" DATETIME NOT NULL,
    "checkOut" DATETIME NOT NULL,
    "guests" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "guestName" TEXT NOT NULL,
    "guestEmail" TEXT,
    "employeeId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "business_hotel_bookings_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "business_hotel_bookings_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "hotel_rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "business_hotel_bookings_businessBookingId_fkey" FOREIGN KEY ("businessBookingId") REFERENCES "business_bookings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "business_bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "businessId" TEXT NOT NULL,
    "bookingType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "totalAmount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT,
    "poNumber" TEXT,
    "approvedBy" TEXT,
    "costCenter" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "business_bookings_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "googleId" TEXT,
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_admins" ("createdAt", "email", "firstName", "id", "isActive", "lastName", "password", "role", "updatedAt") SELECT "createdAt", "email", "firstName", "id", "isActive", "lastName", "password", "role", "updatedAt" FROM "admins";
DROP TABLE "admins";
ALTER TABLE "new_admins" RENAME TO "admins";
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");
CREATE UNIQUE INDEX "admins_googleId_key" ON "admins"("googleId");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "googleId" TEXT,
    "avatar" TEXT,
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
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("avatar", "createdAt", "email", "firstName", "googleId", "id", "isActive", "lastName", "password", "updatedAt") SELECT "avatar", "createdAt", "email", "firstName", "googleId", "id", "isActive", "lastName", "password", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "businesses_email_key" ON "businesses"("email");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_googleId_key" ON "businesses"("googleId");
