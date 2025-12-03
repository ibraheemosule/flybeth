# Travel Platform - Microservices Architecture

A comprehensive travel booking platform built with microservices architecture, featuring separate services for authentication, flight booking (Amadeus API), hotel booking (RateHawk API), and admin management.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend B2C  │    │   Frontend B2B  │    │   Mobile App    │
│  (Port 4200)    │    │  (Port 4100)    │    │ (React Native)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
          │                       │                       │
          └───────────────────────┼───────────────────────┘
                                  │
                    ┌─────────────────┐
                    │   API Gateway   │
                    │   (Port 3000)   │
                    └─────────────────┘
                              │
    ┌─────────────────────────┼─────────────────────────┐
    │                         │                         │
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│Auth Service │  │Flight Service│  │Hotel Service│  │Admin Service│
│(Port 3100)  │  │(Port 3200)   │  │(Port 3300)  │  │(Port 3400)  │
│Google OAuth │  │Amadeus API   │  │RateHawk API │  │Admin Panel  │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
       │                │                │                │
┌──────────┐      ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Auth DB  │      │Flight DB │    │Hotel DB  │    │Admin DB  │
└──────────┘      └──────────┘    └──────────┘    └──────────┘
```

## 🔌 Port Allocation

To avoid port conflicts, each service runs on a dedicated port:

### Backend Services

- **API Gateway**: Port 3000 - Main entry point for all requests
- **Auth Service**: Port 3100 - Authentication and user management
- **Flight Service**: Port 3200 - Flight booking with Amadeus API
- **Hotel Service**: Port 3300 - Hotel booking with RateHawk API
- **Admin Service**: Port 3400 - Admin dashboard and management

### Frontend Applications

- **Admin Dashboard**: Port 4000 - Administrative interface
- **B2B Frontend**: Port 4100 - Business-to-business interface
- **B2C Frontend**: Port 4200 - Consumer-facing application

### Development Servers

- React Native Metro Bundler: Port 8081 (default)
- Database (PostgreSQL): Port 5432 (default)
- Redis: Port 6379 (default)

## 🚀 Microservices

### Services Structure

```text
services/
├── api-gateway/       # Request routing and load balancing  
├── auth-service/      # Authentication & user management
├── flight-service/    # Flight booking with Amadeus API
├── hotel-service/     # Hotel booking with RateHawk API
└── admin-service/     # Admin dashboard and management
apps/
├── frontend-b2c/      # Consumer React app
├── frontend-b2b/      # Business React app  
└── mobile/           # React Native mobile app
packages/
└── shared-utils/     # Shared utilities across services
```

## ✨ Features

- **🔐 Authentication**: JWT + Google OAuth, domain restrictions for admin
- **✈️ Flight Booking**: Amadeus API integration with fallback mock data
- **🏨 Hotel Booking**: RateHawk API integration (ready for implementation)
- **📊 Admin Dashboard**: Google OAuth restricted to @flybeth.com domain
- **🚪 API Gateway**: Single entry point with rate limiting and health monitoring
- **📱 Mobile Support**: Cross-platform React Native app
- **🔄 Independent Scaling**: Each service scales independently

## Quick Start

```bash
# Install dependencies
npm install

# Start all services in development
npm run dev

# Database setup (requires PostgreSQL and Redis running)
npm run db:migrate
npm run db:seed
```

## Services

### Auth Service (Port 3100)

- REST API with TypeScript
- PostgreSQL for data persistence
- Redis for sessions and caching
- JWT authentication
- Rate limiting and security middleware

### Frontend B2C (Port 4200)

- Consumer-facing React app
- User registration and trip booking

### Frontend B2B (Port 4100)

- Business dashboard
- Platform integration tools

## Environment Setup

1. Install PostgreSQL and Redis locally or use Docker
2. Copy `.env.example` files and configure
3. Run migrations: `npm run db:migrate`
4. Start development: `npm run dev`
