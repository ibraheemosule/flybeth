export declare const server: import("msw/node").SetupServerApi;
export declare const setupMSW: () => {
    beforeAll: () => void;
    afterEach: () => void;
    afterAll: () => void;
};
export { server as mockServer };
export * from "msw";
export { http, HttpResponse } from "msw";
