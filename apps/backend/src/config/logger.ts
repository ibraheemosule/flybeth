import { createLogger } from '../shared';
import { config } from './env';

// Create logger instance for the backend
const logger = createLogger('backend');

export { logger };