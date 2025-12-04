"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const logger_1 = require("./logger");
const prisma = new client_1.PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
});
exports.prisma = prisma;
// Log Prisma events
prisma.$on('query', (e) => {
    if (process.env.NODE_ENV === 'development') {
        logger_1.logger.debug('Query:', e.query);
        logger_1.logger.debug('Params:', e.params);
        logger_1.logger.debug('Duration:', e.duration + 'ms');
    }
});
prisma.$on('error', (e) => {
    logger_1.logger.error('Prisma error:', e);
});
prisma.$on('info', (e) => {
    logger_1.logger.info('Prisma info:', e.message);
});
prisma.$on('warn', (e) => {
    logger_1.logger.warn('Prisma warning:', e.message);
});
