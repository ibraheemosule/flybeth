import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Setup MSW worker for browser environment
export const worker = setupWorker(...handlers);

// Start the worker for browser mocking
export const startMSW = async (): Promise<void> => {
  if (typeof window !== "undefined") {
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
};

// Re-export for convenience
export { worker as mockWorker };
export * from "./handlers";
