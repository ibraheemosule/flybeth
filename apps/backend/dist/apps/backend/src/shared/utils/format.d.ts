/**
 * Format a date to a readable string
 */
export declare const formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
/**
 * Format a price to currency string
 */
export declare const formatPrice: (amount: number, currency?: string) => string;
/**
 * Calculate days between two dates
 */
export declare const getDaysBetween: (startDate: Date | string, endDate: Date | string) => number;
/**
 * Check if a date is in the past
 */
export declare const isPastDate: (date: Date | string) => boolean;
/**
 * Format a date for input fields (YYYY-MM-DD)
 */
export declare const formatDateForInput: (date: Date | string) => string;
/**
 * Add days to a date
 */
export declare const addDays: (date: Date | string, days: number) => Date;
/**
 * Get the start and end of day for a given date
 */
export declare const getStartOfDay: (date: Date | string) => Date;
export declare const getEndOfDay: (date: Date | string) => Date;
