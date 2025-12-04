# FlyBeth - Travel Booking Platform

A comprehensive travel booking platform built with modern web technologies, featuring authentication, flight booking (Amadeus API), hotel booking, car rental services, and multiple frontend applications for different user types.

## 🏗️ Project Structure

This is a monorepo containing multiple applications and shared packages:

```text
flybeth/
├── apps/
│   ├── backend/              # Node.js/Express API server
│   │   ├── services/         # Modular services
│   │   │   ├── auth/        # Authentication service
│   │   │   ├── flight/      # Flight booking service
│   │   │   ├── hotel/       # Hotel booking service
│   │   │   └── car/         # Car rental service
│   │   ├── src/             # Core server files
│   │   └── prisma/          # Database schema & migrations
│   ├── frontend/
│   │   ├── admin/           # Admin dashboard (Next.js)
│   │   ├── b2b/             # Business portal (Next.js)
│   │   └── b2c/             # Consumer app (Next.js)
│   └── mobile/              # React Native mobile app
├── packages/
│   ├── shared-config/       # Shared configuration files
│   ├── shared-frontend/     # Shared frontend components
│   └── shared-utils/        # Shared utilities
└── docker/                  # Docker configuration
```

## 🔌 Development Ports

### Frontend Applications

- **Admin Dashboard**: `http://localhost:4000`
- **B2B Portal**: `http://localhost:4100`
- **B2C App**: `http://localhost:4200`

### Backend Services

- **API Server**: `http://localhost:5000`

### Mobile

- **React Native Metro**: Port 8081 (default)

### Databases

- **PostgreSQL**: Port 5432 (default)
- **Redis**: Port 6379 (default)

## ✨ Features

- **🔐 Authentication**: JWT + Google OAuth integration
- **✈️ Flight Booking**: Amadeus API integration with search and booking
- **🏨 Hotel Booking**: Hotel search and reservation system
- **🚗 Car Rental**: Car rental booking service
- **📊 Admin Dashboard**: Administrative interface for platform management
- **💼 B2B Portal**: Business-to-business booking interface
- **🛍️ B2C App**: Consumer-facing booking application
- **📱 Mobile App**: Cross-platform React Native application
- **🔧 Shared Packages**: Reusable components and utilities

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL
- Redis (optional, for caching)

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd flybeth

# Install dependencies for all workspaces
npm install

# Set up environment variables (copy .env.example files)
cp apps/backend/.env.example apps/backend/.env
# Configure your environment variables

# Set up the database
npm run db:setup

# Start all development servers
npm run dev:all
```

### Individual Development Commands

```bash
# Backend only
npm run dev:backend

# All frontend apps
npm run dev:frontend

# Individual frontend apps
npm run dev:admin
npm run dev:b2c
npm run dev:b2b

# Mobile app
npm run dev:mobile
npm run mobile:ios     # iOS simulator
npm run mobile:android # Android emulator

# Check all running services
npm run status
```

## 📱 Applications

### Backend API (`apps/backend`)

Node.js/Express server with modular service architecture:

- **Authentication Service**: JWT tokens, Google OAuth integration
- **Flight Service**: Amadeus API integration for flight search and booking
- **Hotel Service**: Hotel search and reservation management
- **Car Service**: Car rental booking functionality
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for performance optimization

### Admin Dashboard (`apps/frontend/admin`)

Next.js application for platform administration:

- User management and analytics
- Booking oversight and management
- System configuration and monitoring
- Restricted access with domain-based authentication

### B2B Portal (`apps/frontend/b2b`)

Business-to-business interface:

- Corporate booking management
- Volume discounts and special rates
- Integration tools and APIs
- Business analytics and reporting

### B2C App (`apps/frontend/b2c`)

Consumer-facing booking application:

- Flight, hotel, and car rental search
- User registration and profile management
- Booking history and management
- Payment processing and confirmations

### Mobile App (`apps/mobile`)

React Native cross-platform mobile application:

- Native iOS and Android experience
- All core booking functionality
- Push notifications
- Offline capability for bookings

## 🔧 Development

### Project Scripts

```bash
# Development
npm run dev              # Start backend only
npm run dev:all          # Start all applications
npm run dev:frontend     # Start all frontend apps
npm run dev:mobile       # Start mobile development server

# Building
npm run build            # Build all applications
npm run build:frontend   # Build frontend applications
npm run build:backend    # Build backend

# Testing
npm run test             # Run all tests
npm run test:frontend    # Run frontend tests

# Utilities
npm run lint             # Lint all code
npm run clean            # Clean node_modules
npm run setup            # Fresh installation
```

### Environment Variables

Each application requires environment configuration:

#### Backend (`apps/backend/.env`)

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/flybeth"

# Authentication
JWT_SECRET="your-jwt-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# External APIs
AMADEUS_API_KEY="your-amadeus-api-key"
AMADEUS_API_SECRET="your-amadeus-api-secret"

# Optional: Redis
REDIS_URL="redis://localhost:6379"
```

## 🐳 Docker Support

Development and production Docker configurations are available:

```bash
# Development with Docker Compose
docker-compose -f docker-compose.dev.yml up

# Microservices architecture
docker-compose -f docker-compose.microservices.yml up
```

## 📋 API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/refresh` - Refresh JWT token

### Flight Endpoints

- `GET /api/flights/search` - Search flights
- `POST /api/flights/book` - Book a flight
- `GET /api/flights/bookings` - User's flight bookings

### Hotel Endpoints

- `GET /api/hotels/search` - Search hotels
- `POST /api/hotels/book` - Book a hotel
- `GET /api/hotels/bookings` - User's hotel bookings

### Car Endpoints

- `GET /api/cars/search` - Search car rentals
- `POST /api/cars/book` - Book a car
- `GET /api/cars/bookings` - User's car bookings

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in this repository
- Contact the development team
- Check the documentation in each application's README

---

Happy coding! 🚀
