import { GetServerSideProps } from "next";
import { useEffect } from "react";
import AuthGuard from "@/components/AuthGuard";
import { useAuthStore } from "@/stores";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";

interface DashboardProps {
  initialData?: any;
}

const DashboardPage = ({ initialData }: DashboardProps) => {
  const { user } = useAuthStore();

  // Set up token refresh with user activity tracking
  const { refreshToken, isTokenValid, timeUntilExpiry } = useTokenRefresh({
    enableAutoRefresh: true,
    refreshBufferMinutes: 5,
    showNotifications: true,
    onRefreshSuccess: () => {
      console.log("Token refreshed successfully in dashboard");
    },
    onRefreshError: error => {
      console.error("Token refresh failed in dashboard:", error);
      // Could show a notification to user here
    },
    onLogout: () => {
      console.log("User logged out due to token refresh failure");
      // Could show a "session expired" message here
    },
  });

  // TODO: Implement activity tracking if needed

  const handleManualRefresh = async () => {
    try {
      await refreshToken();
      alert("Token refreshed manually!");
    } catch (error) {
      alert("Manual refresh failed!");
    }
  };

  return (
    <AuthGuard
      redirectTo="/login"
      requiredRoles={["CONSUMER", "BUSINESS"]} // Allow both consumer and business users
      checkTokenOnMount={true}
    >
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, {user?.profile?.firstName}{" "}
                {user?.profile?.lastName}!
              </p>
            </div>

            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900">Token Status</h3>
                  <p className="text-sm text-blue-700">
                    {isTokenValid ? "Valid" : "Expired/Invalid"}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900">
                    Time Until Expiry
                  </h3>
                  <p className="text-sm text-green-700">
                    {Math.round(timeUntilExpiry / 60000)} minutes
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-900">User Type</h3>
                  <p className="text-sm text-purple-700">
                    {user?.role || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleManualRefresh}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Manual Token Refresh
                </button>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Token Refresh Implementation
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <ul className="list-disc list-inside space-y-1">
                          <li>
                            Automatic token refresh 5 minutes before expiry
                          </li>
                          <li>Activity-based session management</li>
                          <li>Silent refresh on page focus/visibility</li>
                          <li>Graceful logout on refresh failure</li>
                          <li>Cross-tab synchronization</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

// Example of server-side token validation
export const getServerSideProps: GetServerSideProps = async context => {
  const { req } = context;

  // Check for auth cookie on server
  const authCookie = req.cookies["flybeth-auth"];

  if (!authCookie) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const authState = JSON.parse(authCookie);

    // You could validate the token server-side here
    // For now, just pass some initial data

    return {
      props: {
        initialData: {
          timestamp: new Date().toISOString(),
        },
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

export default DashboardPage;
