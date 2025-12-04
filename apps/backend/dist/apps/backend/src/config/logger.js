"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const shared_1 = require("../shared");
// Create logger instance for the backend
const logger = (0, shared_1.createLogger)('backend');
exports.logger = logger;
