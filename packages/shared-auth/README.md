# Shared Auth Store

This package provides a shared authentication state management solution using Zustand for all FlyBeth frontend applications.

## Features

- ✅ Shared auth state across apps
- ✅ Configurable API service integration
- ✅ Persistent storage with localStorage
- ✅ TypeScript support
- ✅ Error handling and loading states

## Usage

### 1. Create an API Service Adapter

```typescript
import { type AuthApiService } from "@packages/shared-auth";
import apiService from "./your-api-service";

const authApiAdapter: AuthApiService = {
  login: apiService.login.bind(apiService),
  register: apiService.register.bind(apiService),
  logout: apiService.logout?.bind(apiService),
};
```

### 2. Create the Auth Store

```typescript
import { createAuthStore } from "@packages/shared-auth";

export const useAuthStore = createAuthStore(authApiAdapter, "your-app-name");
```

### 3. Use in Components

```typescript
import { useAuthStore } from "./store/authStore";

function LoginForm() {
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // User is now logged in
    } catch (error) {
      // Handle error
    }
  };
}
```

## API Service Interface

Your API service must implement the `AuthApiService` interface:

```typescript
interface AuthApiService {
  login: (
    email: string,
    password: string
  ) => Promise<{
    user: FrontendUser;
    accessToken: string;
    refreshToken: string;
  }>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<{
    user: FrontendUser;
    accessToken: string;
    refreshToken: string;
  }>;
  logout?: () => Promise<void>;
}
```
