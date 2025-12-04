import { setupServer } from "msw/node";
import { handlers } from "./handlers";
// Setup MSW server for Node.js environment (tests)
export const server = setupServer(...handlers);
// Establish API mocking before all tests
export const setupMSW = () => {
    // Note: beforeAll, afterEach, afterAll should be imported from your test framework
    // Example for Jest/Vitest:
    // beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
    // afterEach(() => server.resetHandlers())
    // afterAll(() => server.close())
    return {
        beforeAll: () => server.listen({ onUnhandledRequest: "error" }),
        afterEach: () => server.resetHandlers(),
        afterAll: () => server.close(),
    };
};
// Re-export for convenience
export { server as mockServer };
export * from "msw";
export { http, HttpResponse } from "msw";
