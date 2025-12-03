/**
 * Frontend-specific storage utilities
 * Handles localStorage, sessionStorage, and cookies with SSR safety
 */
interface Storage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}
declare class SafeStorage implements Storage {
    private storage;
    constructor(storageType?: 'localStorage' | 'sessionStorage');
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}
export declare const cookies: {
    get(name: string): string | null;
    set(name: string, value: string, options?: {
        expires?: number | Date;
        path?: string;
        domain?: string;
        secure?: boolean;
        sameSite?: "strict" | "lax" | "none";
    }): void;
    remove(name: string, path?: string): void;
};
export declare const localStorage: SafeStorage;
export declare const sessionStorage: SafeStorage;
export declare const jsonStorage: {
    local: {
        get<T>(key: string): T | null;
        set<T>(key: string, value: T): void;
        remove(key: string): void;
    };
    session: {
        get<T>(key: string): T | null;
        set<T>(key: string, value: T): void;
        remove(key: string): void;
    };
    cookie: {
        get<T>(name: string): T | null;
        set<T>(name: string, value: T, options?: {
            expires?: number | Date;
            path?: string;
            domain?: string;
            secure?: boolean;
            sameSite?: "strict" | "lax" | "none";
        }): void;
        remove(name: string, path?: string): void;
    };
};
export declare const createStorageSync: <T>(key: string, initialValue: T) => {
    getValue: () => T;
    setValue: (value: T) => void;
    subscribe: (callback: (value: T) => void) => (() => void);
};
export {};
