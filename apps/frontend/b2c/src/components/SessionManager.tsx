import {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";

interface SessionContextType {
  sessionStatus: "active" | "warning" | "expired" | "refreshing";
  timeUntilExpiry: number;
  extendSession: () => Promise<void>;
  showSessionWarning: boolean;
  dismissWarning: () => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

interface SessionManagerProps {
  children: ReactNode;
  /**
   * Show warning when token expires in X minutes
   * @default 10
   */
  warningThresholdMinutes?: number;
  /**
   * Auto-extend session on user activity
   * @default true
   */
  autoExtendOnActivity?: boolean;
  /**
   * Show session extension popup
   * @default true
   */
  showExtensionPopup?: boolean;
  /**
   * Activities that count as user interaction
   * @default ['click', 'keydown', 'mousemove', 'scroll']
   */
  activityEvents?: string[];
}

const SessionManager = ({
  children,
  warningThresholdMinutes = 10,
  autoExtendOnActivity = true,
  showExtensionPopup = true,
  activityEvents = ["click", "keydown", "mousemove", "scroll"],
}: SessionManagerProps) => {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const [sessionStatus, setSessionStatus] = useState<
    "active" | "warning" | "expired" | "refreshing"
  >("active");
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const { refreshToken, isTokenValid, timeUntilExpiry, checkAndRefresh } =
    useTokenRefresh({
      enableAutoRefresh: true,
      refreshBufferMinutes: 5,
      onRefreshSuccess: () => {
        setSessionStatus("active");
        setShowSessionWarning(false);
      },
      onRefreshError: () => {
        setSessionStatus("expired");
        setShowSessionWarning(false);
      },
    });

  // Track user activity
  const handleActivity = useCallback(() => {
    if (!isAuthenticated) return;

    const now = Date.now();
    setLastActivity(now);

    // Auto-extend session if enabled and warning is shown
    if (autoExtendOnActivity && showSessionWarning) {
      extendSession();
    }
  }, [isAuthenticated, autoExtendOnActivity, showSessionWarning]);

  // Extend session
  const extendSession = useCallback(async () => {
    try {
      setSessionStatus("refreshing");
      await refreshToken();
      setSessionStatus("active");
      setShowSessionWarning(false);
    } catch (error) {
      console.error("Session extension failed:", error);
      setSessionStatus("expired");
    }
  }, [refreshToken]);

  const dismissWarning = useCallback(() => {
    setShowSessionWarning(false);
  }, []);

  // Set up activity listeners
  useEffect(() => {
    if (!isAuthenticated || !autoExtendOnActivity) return;

    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [isAuthenticated, autoExtendOnActivity, handleActivity, activityEvents]);

  // Monitor session status
  useEffect(() => {
    if (!isAuthenticated) {
      setSessionStatus("expired");
      setShowSessionWarning(false);
      return;
    }

    const checkSessionStatus = () => {
      const warningThreshold = warningThresholdMinutes * 60 * 1000;

      if (!isTokenValid) {
        setSessionStatus("expired");
        setShowSessionWarning(false);
      } else if (timeUntilExpiry <= warningThreshold) {
        setSessionStatus("warning");
        if (showExtensionPopup) {
          setShowSessionWarning(true);
        }
      } else {
        setSessionStatus("active");
        setShowSessionWarning(false);
      }
    };

    checkSessionStatus();
    const interval = setInterval(checkSessionStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [
    isAuthenticated,
    isTokenValid,
    timeUntilExpiry,
    warningThresholdMinutes,
    showExtensionPopup,
  ]);

  // Handle session expiry
  useEffect(() => {
    if (sessionStatus === "expired" && isAuthenticated) {
      setTimeout(async () => {
        await logout();
        router.replace("/login?reason=session-expired");
      }, 1000);
    }
  }, [sessionStatus, isAuthenticated, logout, router]);

  const contextValue: SessionContextType = {
    sessionStatus,
    timeUntilExpiry,
    extendSession,
    showSessionWarning,
    dismissWarning,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
      {showSessionWarning && <SessionWarningModal />}
    </SessionContext.Provider>
  );
};

const SessionWarningModal = () => {
  const context = useContext(SessionContext);
  if (!context) return null;

  const { timeUntilExpiry, extendSession, dismissWarning, sessionStatus } =
    context;
  const minutesLeft = Math.ceil(timeUntilExpiry / 60000);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Session Expiring Soon
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your session will expire in {minutesLeft} minute
                    {minutesLeft !== 1 ? "s" : ""}. Would you like to extend
                    your session?
                  </p>
                  {sessionStatus === "refreshing" && (
                    <div className="mt-3 flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      <span className="text-sm text-blue-600">
                        Extending session...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={extendSession}
              disabled={sessionStatus === "refreshing"}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sessionStatus === "refreshing"
                ? "Extending..."
                : "Extend Session"}
            </button>
            <button
              type="button"
              onClick={dismissWarning}
              disabled={sessionStatus === "refreshing"}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue Without Extending
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hook to use session context
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionManager");
  }
  return context;
};

export default SessionManager;
