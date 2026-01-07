import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from './src/store/authStore';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import LoadingScreen from './src/screens/LoadingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const { user, isLoading, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
generator client {
  provider = "prisma-client"
  // output   = "../generated/prisma/client"
  output   = "../node_modules/@prisma/client"
  moduleFormat = "esm"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        String                @id @db.VarChar(64)
  email     String                @unique @db.VarChar(255)
  password  String?               @db.VarChar(255)
  isActive  Boolean               @default(true)
  googleId  String?               @unique
  createdAt DateTime              @default(now()) @db.Timestamptz(3)
  updatedAt DateTime              @updatedAt
  identity  IdentityVerification?

  companyId    String?  
  company      Company? @relation("CompanyMembers", fields: [companyId], references: [id])
  role         CompanyRole?

  ownedCompanies Company[] @relation("CompanyOwner")

  orders    Order[]
  profile   Profile?

  @@map("users")
}

model Company {
  id        String   @id @default(cuid())
  inviteCode  String   @unique 
  createdAt   DateTime @default(now())  @db.Timestamptz(3)
  name     String @unique @db.VarChar(64)
  ownerId   String
  owner     User     @relation("CompanyOwner", fields: [ownerId], references: [id])

  members     User[]   @relation("CompanyMembers")
  orders      Order[]
}

model Profile {
  id          String    @id @default(cuid())
  userId      String    @unique @db.VarChar(64)
  firstName   String
  lastName    String
  phoneNumber String?
  avatar      String?
  nationality String?
  dateOfBirth DateTime? @db.Date
  user        User      @relation(fields: [userId], references: [id])

  @@map("profiles")
}

model IdentityVerification {
  id           String    @id @default(cuid())
  userId       String    @unique @db.VarChar(64)
  idType       String?  @db.VarChar(64)
  idNumber     String?  @db.VarChar(64)
  idExpiryDate DateTime? @db.Date
  kycStatus    String    @default("PENDING")
  verifiedAt   DateTime?
  user         User      @relation(fields: [userId], references: [id])

  @@map("identity_verifications")
}

model Order {
  id             String          @id @default(cuid())
  totalAmount    Decimal         @db.Decimal(10, 2)
  status         OrderStatus     @default(PENDING)
  category       ServiceType
  createdAt      DateTime        @default(now()) @db.Timestamptz(3)
  updatedAt      DateTime        @updatedAt @db.Timestamptz(3)
  carDetails     CarBooking?
  flightDetails  FlightBooking?
  hotelDetails   HotelBooking?
  packageDetails PackageBooking?

 // NEW FIELDS: For guest checkouts
  customerEmail  String?         @db.VarChar(255)
  customerPhone  String?         @db.VarChar(20)

  // CHANGE THESE: Make them optional with '?'
  userId         String?         @db.VarChar(64)
  user           User?           @relation(fields: [userId], references: [id])
  companyId   String?
  company     Company? @relation(fields: [companyId], references: [id])


  transactions   Transaction[]

  @@map("orders")
}

model Transaction {
  id             String            @id @default(cuid())
  reference      String            @unique  @db.VarChar(64)
  amount         Decimal           @db.Decimal(10, 2)
  status         TransactionStatus @default(PENDING)
  paymentGateway String            @default("PAYSTACK")
  email          String            @db.VarChar(64)

  createdAt      DateTime          @default(now()) @db.Timestamptz(3)
  updatedAt      DateTime          @updatedAt @db.Timestamptz(3)
  reason        String?

  orderId        String
  order          Order             @relation(fields: [orderId], references: [id])

  @@map("transactions")
}

model FlightBooking {
  id         String   @id @default(cuid())
  orderId    String   @unique  @db.VarChar(64)
  pnr        String?  @unique
  airline    String
  passengers Json
  itinerary  Json
  createdAt  DateTime @default(now())  @db.Timestamptz(3)
  updatedAt  DateTime @updatedAt @db.Timestamptz(3)
  order      Order    @relation(fields: [orderId], references: [id])

  @@map("flight_bookings")
}

model HotelBooking {
  id           String   @id @default(cuid())
  orderId      String   @unique  @db.VarChar(64)
  confirmation String?  @unique
  hotelName    String
  checkIn      DateTime
  checkOut     DateTime
  roomDetails  Json
  createdAt    DateTime @default(now()) @db.Timestamptz(3)
  updatedAt    DateTime @updatedAt @db.Timestamptz(3)
  order        Order    @relation(fields: [orderId], references: [id])

  @@map("hotel_bookings")
}

model CarBooking {
  id                 String   @id @default(cuid())
  orderId            String   @unique  @db.VarChar(64)
  confirmationNumber String?  @unique
  carType            String
  companyName        String
  pickupLocation     String
  pickupDate         DateTime
  returnLocation     String
  returnDate         DateTime
  driverDetails      Json
  createdAt      DateTime        @default(now()) @db.Timestamptz(3)
  updatedAt      DateTime        @updatedAt @db.Timestamptz(3)
  order              Order    @relation(fields: [orderId], references: [id])

  @@map("car_bookings")
}

model PackageBooking {
  id          String   @id @default(cuid())
  orderId     String   @unique  @db.VarChar(64)
  description String
  components  Json
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  order       Order    @relation(fields: [orderId], references: [id])

  @@map("package_bookings")
}

enum TransactionStatus {
  PENDING
  SUCCESS
  FAILED
  REFUNDED
}

enum OrderStatus {
  PENDING
  PAID
  CONFIRMED
  CANCELLED
  FAILED
}

enum ServiceType {
  FLIGHT
  HOTEL
  PACKAGE
  SIGHTSEEING
  CAR
}

enum CompanyRole {
  OWNER   
  ADMIN   
  MANAGER 
  MEMBER 
}