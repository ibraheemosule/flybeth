export declare const config: {
    port: number;
    nodeEnv: string;
    databaseUrl: string;
    redisUrl: string;
    jwtSecret: string;
    jwtRefreshSecret: string;
    jwtExpiry: string;
    jwtRefreshExpiry: string;
    google: {
        clientId: string;
        clientSecret: string;
    };
    amadeus: {
        apiKey: string;
        apiSecret: string;
        baseUrl: string;
    };
    corsOrigins: string[];
    rateLimit: {
        windowMs: number;
        max: number;
    };
};
