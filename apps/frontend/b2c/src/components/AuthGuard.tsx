import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";

interface AuthGuardProps {
  children: ReactNode;
  /**
   * Redirect path when user is not authenticated
   * @default '/login'
   */
  redirectTo?: string;
  /**
   * Whether to show loading state during auth check
   * @default true
   */
  showLoading?: boolean;
  /**
   * Custom loading component
   */
  loadingComponent?: ReactNode;
  /**
   * Roles required to access this route
   */
  requiredRoles?: string[];
  /**
   * Whether to perform token refresh check on mount
   * @default true
   */
  checkTokenOnMount?: boolean;
}

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({
  message = "Checking authentication...",
}: LoadingSpinnerProps) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full mx-auto text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

const AuthGuard = ({
  children,
  redirectTo = "/login",
  showLoading = true,
  loadingComponent,
  requiredRoles = [],
  checkTokenOnMount = true,
}: AuthGuardProps) => {
  const router = useRouter();
  const { isAuthenticated, user, isLoading, checkTokenValidity } =
    useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  // Set up token refresh with auth guard specific options
  const { checkAndRefresh, isTokenValid } = useTokenRefresh({
    enableAutoRefresh: true,
    showNotifications: false,
    onRefreshError: () => {
      // Redirect to login if refresh fails
      const currentPath = router.asPath;
      const loginUrl = `${redirectTo}${
        currentPath !== redirectTo
          ? `?redirect=${encodeURIComponent(currentPath)}`
          : ""
      }`;
      router.replace(loginUrl);
    },
    onLogout: () => {
      // Handle logout
      const currentPath = router.asPath;
      const loginUrl = `${redirectTo}${
        currentPath !== redirectTo
          ? `?redirect=${encodeURIComponent(currentPath)}`
          : ""
      }`;
      router.replace(loginUrl);
    },
  });

  // Check authentication status and token validity
  const performAuthCheck = async () => {
    try {
      setIsChecking(true);

      if (!isAuthenticated) {
        throw new Error("Not authenticated");
      }

      // Check token validity if enabled
      if (checkTokenOnMount) {
        const isValidOrRefreshed = await checkTokenValidity();

        if (!isValidOrRefreshed && !isTokenValid) {
          throw new Error("Token invalid and refresh failed");
        }
      }

      // Check role-based access
      if (requiredRoles.length > 0 && user) {
        const userRoles = [user.role].filter(Boolean);
        const hasRequiredRole = requiredRoles.some(
          role =>
            userRoles.includes(role) ||
            userRoles.map(r => r.toUpperCase()).includes(role.toUpperCase())
        );

        if (!hasRequiredRole) {
          console.warn("User does not have required roles:", requiredRoles);
          router.replace("/unauthorized");
          return;
        }
      }

      setAuthCheckComplete(true);
    } catch (error) {
      console.error("Auth check failed:", error);

      // Preserve the current path for redirect after login
      const currentPath = router.asPath;
      const loginUrl = `${redirectTo}${
        currentPath !== redirectTo
          ? `?redirect=${encodeURIComponent(currentPath)}`
          : ""
      }`;

      router.replace(loginUrl);
    } finally {
      setIsChecking(false);
    }
  };

  // Perform auth check on mount and when auth state changes
  useEffect(() => {
    if (!isLoading) {
      performAuthCheck();
    }
  }, [isAuthenticated, isLoading, user]);

  // Handle route changes - recheck auth for protected routes
  useEffect(() => {
    const handleRouteChange = async () => {
      if (isAuthenticated && checkTokenOnMount) {
        try {
          await checkAndRefresh();
        } catch (error) {
          console.error("Route change auth check failed:", error);
        }
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, isAuthenticated, checkTokenOnMount, checkAndRefresh]);

  // Show loading state
  if (isLoading || isChecking || !authCheckComplete) {
    if (!showLoading) {
      return null;
    }

    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }

    return <LoadingSpinner />;
  }

  // Show children if authenticated and authorized
  if (isAuthenticated && authCheckComplete) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
};

export default AuthGuard;

// Higher-order component version
export const withAuthGuard = <P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<AuthGuardProps, "children">
) => {
  const WrappedComponent = (props: P) => (
    <AuthGuard {...options}>
      <Component {...props} />
    </AuthGuard>
  );

  WrappedComponent.displayName = `withAuthGuard(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
};

// Hook for checking auth status in components
export const useAuthGuard = (requiredRoles: string[] = []) => {
  const { isAuthenticated, user } = useAuthStore();
  const { isTokenValid } = useTokenRefresh({ enableAutoRefresh: false });

  const hasAccess = () => {
    if (!isAuthenticated || !isTokenValid) {
      return false;
    }

    if (requiredRoles.length === 0) {
      return true;
    }

    if (!user) {
      return false;
    }

    const userRoles = [user.role].filter(Boolean);
    return requiredRoles.some(
      role =>
        userRoles.includes(role) ||
        userRoles.map(r => r.toUpperCase()).includes(role.toUpperCase())
    );
  };

  return {
    isAuthenticated: isAuthenticated && isTokenValid,
    hasAccess: hasAccess(),
    user,
    isTokenValid,
  };
};
