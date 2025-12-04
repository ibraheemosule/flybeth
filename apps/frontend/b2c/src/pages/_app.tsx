import { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import SessionManager from "@/components/SessionManager";
import { useAuthStore } from "@/lib/auth-store";

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/privacy",
  "/terms",
];

// Routes that require specific roles
const ROLE_BASED_ROUTES: Record<string, string[]> = {
  "/admin": ["ADMIN"],
  "/business": ["BUSINESS", "ADMIN"],
  "/user": ["CONSUMER", "BUSINESS", "ADMIN"],
};

function TravelPlatformApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  // Handle route protection and role-based access
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Skip protection for public routes
      if (PUBLIC_ROUTES.includes(url) || url.startsWith("/_")) {
        return;
      }

      // Check authentication for protected routes
      if (!isAuthenticated) {
        router.replace(`/login?redirect=${encodeURIComponent(url)}`);
        return;
      }

      // Check role-based access
      const requiredRoles = Object.entries(ROLE_BASED_ROUTES).find(([route]) =>
        url.startsWith(route)
      )?.[1];

      if (requiredRoles && user) {
        const userRoles = user.roles || [user.userType] || [];
        const hasAccess = requiredRoles.some(
          role =>
            userRoles.includes(role) ||
            userRoles.map(r => r.toUpperCase()).includes(role.toUpperCase())
        );

        if (!hasAccess) {
          router.replace("/unauthorized");
          return;
        }
      }
    };

    // Check current route on mount
    handleRouteChange(router.asPath);

    // Listen for route changes
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router, isAuthenticated, user]);

  // Determine if current route needs session management
  const needsSessionManagement =
    !PUBLIC_ROUTES.includes(router.pathname) &&
    !router.pathname.startsWith("/_");

  return (
    <>
      <Head>
        <title>FlyBeth</title>
        <meta name="description" content="Complete travel booking platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {needsSessionManagement && isAuthenticated ? (
        <SessionManager
          warningThresholdMinutes={10}
          autoExtendOnActivity={true}
          showExtensionPopup={true}
          activityEvents={["click", "keydown", "mousemove", "scroll"]}
        >
          <Component {...pageProps} />
        </SessionManager>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default TravelPlatformApp;

// Export this configuration for easy reuse
export const authConfig = {
  publicRoutes: PUBLIC_ROUTES,
  roleBasedRoutes: ROLE_BASED_ROUTES,
  sessionConfig: {
    warningThresholdMinutes: 10,
    autoExtendOnActivity: true,
    showExtensionPopup: true,
    refreshBufferMinutes: 5,
  },
};
