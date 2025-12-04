"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const router_1 = require("./router");
const app = (0, express_1.default)();
exports.app = app;
const PORT = config_1.config.port;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)("combined", {
    stream: {
        write: (message) => config_1.logger.info(message.trim()),
    },
}));
app.use((0, cors_1.default)({
    origin: config_1.config.corsOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Session-ID"],
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        service: "flybeth-backend",
        version: "1.0.0",
    });
});
// Mount all API routes through the main router
app.use("/", router_1.apiRouter);
// Root endpoint
app.get("/", (req, res) => {
    res.json({
        message: "FlyBeth Backend API",
        version: "1.0.0",
        endpoints: {
            auth: "/api/auth",
            admin: "/api/admin",
            flights: "/api/flights",
            hotels: "/api/hotels",
            cars: "/api/cars",
        },
    });
});
// Global error handler
app.use((err, req, res, next) => {
    config_1.logger.error("Unhandled error:", err);
    res.status(500).json({
        error: "Internal Server Error",
        message: config_1.config.nodeEnv === "development" ? err.message : "Something went wrong",
    });
});
// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
});
// Graceful shutdown
process.on("SIGTERM", async () => {
    config_1.logger.info("SIGTERM received, shutting down gracefully");
    await config_1.prisma.$disconnect();
    process.exit(0);
});
process.on("SIGINT", async () => {
    config_1.logger.info("SIGINT received, shutting down gracefully");
    await config_1.prisma.$disconnect();
    process.exit(0);
});
async function startServer() {
    try {
        // Connect to Redis
        await (0, config_1.connectRedis)();
        config_1.logger.info("Redis connected successfully");
        // Test database connection
        await config_1.prisma.$connect();
        config_1.logger.info("Database connected successfully");
        // Start server
        app.listen(PORT, () => {
            config_1.logger.info(`FlyBeth Backend running on port ${PORT}`, {
                service: "flybeth-backend",
                port: PORT,
                environment: config_1.config.nodeEnv,
            });
        });
    }
    catch (error) {
        config_1.logger.error("Failed to start server:", error);
        process.exit(1);
    }
}
startServer();
