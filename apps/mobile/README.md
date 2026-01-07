# FlyBeth Mobile App

React Native mobile application for the FlyBeth monorepo, built with Expo.

## Features

- **Cross-platform**: Runs on iOS, Android, and Web
- **Authentication**: Login/Signup with consumer and business account types
- **Trip Booking**: Book trips with form validation and API integration
- **Real-time Updates**: View and manage your trip bookings
- **Secure Storage**: JWT tokens stored securely with expo-secure-store
- **Modern UI**: Clean, responsive design with React Native

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Secure Storage**: Expo Secure Store
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 20.10.0+
- npm or yarn
- Expo CLI
- Expo Go app (for testing on device)

### Installation

1. Navigate to the mobile app directory:

   ```bash
   cd apps/mobile
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Running the App

#### Web Version

- Open http://localhost:8081 in your browser

#### Mobile Device (Expo Go)

1. Install Expo Go from the App Store or Google Play
2. Scan the QR code from the terminal with Expo Go (Android) or Camera app (iOS)

#### iOS Simulator

```bash
npm run ios
```

#### Android Emulator

```bash
npm run android
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TripCard.tsx    # Trip display component
│   └── TripBookingForm.tsx # Trip booking modal
├── screens/            # Screen components
│   ├── LoadingScreen.tsx
│   ├── LoginScreen.tsx
│   └── DashboardScreen.tsx
├── services/           # API and external services
│   └── api.ts         # Axios configuration and API calls
├── store/             # Zustand state management
│   ├── authStore.ts   # Authentication state
│   └── tripStore.ts   # Trip management state
└── types/             # TypeScript type definitions
```

## API Integration

The mobile app is designed to connect to your external API services. Update the API configuration in your app settings.

- `POST /auth/signup` - User registration
- `POST /auth/login` - User authentication
- `GET /trips` - Fetch user trips
- `POST /trips/book` - Book a new trip (consumers)
- `POST /trips/book/b2b` - Book a new trip (business users)

## Authentication Flow

1. **Login/Signup**: Users can create accounts as consumers or business users
2. **JWT Storage**: Authentication tokens are securely stored using Expo Secure Store
3. **Auto-login**: App checks for valid tokens on startup
4. **Token Management**: Automatic token cleanup on logout or 401 errors

## User Types

- **Consumer**: Independent travelers ("Hello independent user")
- **Business**: B2B platform users ("Hello business user")

## Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser

## Development Notes

### Known Issues

1. **Node.js Version Warning**: The app works with Node.js 20.10.0 but some packages recommend 20.19.4+
2. **iOS Simulator**: `simctl` errors are common on macOS without Xcode Command Line Tools
3. **Type Versions**: @types/react version mismatch warnings (functional but should be updated)

### API Connection

Configure your API endpoints in the app settings to connect to your preferred backend services.

### Environment Configuration

The app is configured to connect to `localhost:3001` for development. For production or different environments, update the `API_BASE_URL` in `src/services/api.ts`.

## Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for all new files
3. Implement proper error handling
4. Add loading states for async operations
5. Test on multiple platforms (iOS, Android, Web)

## Deployment

### Web Version

The Expo web version can be deployed to any static hosting service:

```bash
npm run build:web
```

### Mobile App Store

For production deployment to app stores, you'll need to build native binaries:

```bash
eas build --platform ios
eas build --platform android
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Package conflicts**: Delete node_modules and reinstall
3. **Network issues**: Check API server connectivity
4. **Configuration**: Verify API endpoint settings
5. **Simulator not launching**: Ensure iOS Simulator or Android Emulator is properly configured

### Debugging

- Use React Native Debugger or Expo DevTools
- Check network requests in the browser dev tools (web version)
- Monitor API logs for connection errors
- Use console.log statements for mobile debugging

## Future Enhancements

- [ ] Push notifications for trip updates
- [ ] Offline support with data caching
- [ ] Biometric authentication
- [ ] Maps integration for trip visualization
- [ ] Photo upload for trip documentation
- [ ] Social sharing features
- [ ] Dark mode support
- [ ] Internationalization (i18n)
