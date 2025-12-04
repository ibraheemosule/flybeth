import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { logger, connectRedis, prisma, config } from "./config";
import { apiRouter } from "./router";

const app = express();
const PORT = config.port;

// Middleware
app.use(helmet());
app.use(compression());
app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Session-ID"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

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
app.use("/", apiRouter);

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
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    logger.error("Unhandled error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message:
        config.nodeEnv === "development" ? err.message : "Something went wrong",
    });
  }
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  logger.info("SIGTERM received, shutting down gracefully");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  logger.info("SIGINT received, shutting down gracefully");
  await prisma.$disconnect();
  process.exit(0);
});

async function startServer() {
  try {
    // Connect to Redis
    await connectRedis();
    logger.info("Redis connected successfully");

    // Test database connection
    await prisma.$connect();
    logger.info("Database connected successfully");

    // Start server
    app.listen(PORT, () => {
      logger.info(`FlyBeth Backend running on port ${PORT}`, {
        service: "flybeth-backend",
        port: PORT,
        environment: config.nodeEnv,
      });
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

export { app };
