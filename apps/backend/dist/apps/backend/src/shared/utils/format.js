"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndOfDay = exports.getStartOfDay = exports.addDays = exports.formatDateForInput = exports.isPastDate = exports.getDaysBetween = exports.formatPrice = exports.formatDate = void 0;
/**
 * Format a date to a readable string
 */
const formatDate = (date, options) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    return dateObj.toLocaleDateString('en-US', { ...defaultOptions, ...options });
};
exports.formatDate = formatDate;
/**
 * Format a price to currency string
 */
const formatPrice = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
};
exports.formatPrice = formatPrice;
/**
 * Calculate days between two dates
 */
const getDaysBetween = (startDate, endDate) => {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
exports.getDaysBetween = getDaysBetween;
/**
 * Check if a date is in the past
 */
const isPastDate = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateObj < today;
};
exports.isPastDate = isPastDate;
/**
 * Format a date for input fields (YYYY-MM-DD)
 */
const formatDateForInput = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString().split('T')[0];
};
exports.formatDateForInput = formatDateForInput;
/**
 * Add days to a date
 */
const addDays = (date, days) => {
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    dateObj.setDate(dateObj.getDate() + days);
    return dateObj;
};
exports.addDays = addDays;
/**
 * Get the start and end of day for a given date
 */
const getStartOfDay = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    dateObj.setHours(0, 0, 0, 0);
    return dateObj;
};
exports.getStartOfDay = getStartOfDay;
const getEndOfDay = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    dateObj.setHours(23, 59, 59, 999);
    return dateObj;
};
exports.getEndOfDay = getEndOfDay;
