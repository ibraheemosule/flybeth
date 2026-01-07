# FlyBeth - Travel Booking Platform

A modern frontend travel booking platform built with Next.js and React Native, featuring multiple applications for different user types.

## 🏗️ Project Structure

This is a monorepo containing multiple frontend applications and shared packages:

```text
flybeth/
├── apps/
│   ├── frontend/
│   │   ├── admin/           # Admin dashboard (Next.js)
│   │   ├── b2b/             # Business portal (Next.js)
│   │   └── b2c/             # Consumer app (Next.js)
│   └── mobile/              # React Native mobile app
├── packages/
│   ├── shared-config/       # Shared configuration files
│   ├── shared-frontend/     # Shared frontend components
│   ├── shared-auth/         # Shared authentication stores
│   ├── shared-schemas/      # Shared validation schemas
│   └── shared-utils/        # Shared utilities
└── coverage/                # Test coverage reports
```

## 🔌 Development Ports

### Frontend Applications

- **Admin Dashboard**: `http://localhost:4000`
- **B2B Portal**: `http://localhost:4100`
- **B2C App**: `http://localhost:4200`

### Mobile

- **React Native Metro**: Port 8081 (default)
- **Redis**: Port 6379 (default)

## ✨ Features

- **� Admin Dashboard**: Administrative interface for platform management
- **💼 B2B Portal**: Business-to-business booking interface
- **🛍️ B2C App**: Consumer-facing booking application
- **📱 Mobile App**: Cross-platform React Native application
- **🔧 Shared Packages**: Reusable components, stores, and utilities
- **🎨 Modern UI**: Tailwind CSS with responsive design
- **🔒 Type Safety**: Full TypeScript implementation across all applications

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+ recommended)

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd flybeth

# Install dependencies for all workspaces
npm install

# Start all frontend development servers
npm run dev
```

### Individual Development Commands

```bash
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

### Admin Dashboard (`apps/frontend/admin`)

Next.js application for platform administration:

- User management and analytics
- System configuration and monitoring
- Restricted access with domain-based authentication
- Modern dashboard with analytics and reporting

### B2B Portal (`apps/frontend/b2b`)

Business-to-business interface:

- Corporate account management
- Business analytics and reporting
- Professional booking interface
- Volume pricing and corporate features

### B2C App (`apps/frontend/b2c`)

Consumer-facing booking application:

- User registration and profile management
- Modern booking interface
- Responsive design for all devices
- Integrated payment flows

### Mobile App (`apps/mobile`)

React Native cross-platform mobile application:

- Native iOS and Android experience
- All core functionality available on mobile
- Push notifications support
- Offline capability for viewing bookings

## 🔧 Development

### Project Scripts

```bash
# Development
npm run dev              # Start all frontend applications
npm run dev:frontend     # Start all frontend apps
npm run dev:mobile       # Start mobile development server

# Building
npm run build            # Build all applications
npm run build:frontend   # Build frontend applications

# Testing
npm run test             # Run all tests
npm run test:frontend    # Run frontend tests

# Utilities
npm run lint             # Lint all code
npm run clean            # Clean node_modules
npm run setup            # Fresh installation
```

### Shared Packages

The monorepo includes several shared packages for code reuse:

- **shared-config**: ESLint, Tailwind, TypeScript configurations
- **shared-frontend**: Reusable React components
- **shared-auth**: Authentication stores and utilities
- **shared-schemas**: Validation schemas using Zod
- **shared-utils**: Common utility functions

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
