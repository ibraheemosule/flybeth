export * from './utils/redis';
export * from './utils/auth';
export * from './testFunction';
import * as winston from 'winston';
export declare const createLogger: (serviceName: string) => winston.Logger;
