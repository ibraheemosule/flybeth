/**
 * Frontend-specific storage utilities
 * Handles localStorage, sessionStorage, and cookies with SSR safety
 */
// Safe storage wrapper that works in SSR environments
class SafeStorage {
    constructor(storageType = 'localStorage') {
        if (typeof window !== 'undefined') {
            this.storage = storageType === 'localStorage' ? window.localStorage : window.sessionStorage;
        }
        else {
            this.storage = null;
        }
    }
    getItem(key) {
        if (!this.storage)
            return null;
        try {
            return this.storage.getItem(key);
        }
        catch {
            return null;
        }
    }
    setItem(key, value) {
        if (!this.storage)
            return;
        try {
            this.storage.setItem(key, value);
        }
        catch {
            // Silently fail in SSR or storage quota exceeded
        }
    }
    removeItem(key) {
        if (!this.storage)
            return;
        try {
            this.storage.removeItem(key);
        }
        catch {
            // Silently fail in SSR
        }
    }
}
// Cookie utilities
export const cookies = {
    get(name) {
        if (typeof document === 'undefined')
            return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return decodeURIComponent(parts.pop()?.split(';').shift() || '');
        }
        return null;
    },
    set(name, value, options = {}) {
        if (typeof document === 'undefined')
            return;
        let cookieString = `${name}=${encodeURIComponent(value)}`;
        if (options.expires) {
            const expires = options.expires instanceof Date
                ? options.expires
                : new Date(Date.now() + options.expires * 24 * 60 * 60 * 1000);
            cookieString += `; expires=${expires.toUTCString()}`;
        }
        if (options.path)
            cookieString += `; path=${options.path}`;
        if (options.domain)
            cookieString += `; domain=${options.domain}`;
        if (options.secure)
            cookieString += `; secure`;
        if (options.sameSite)
            cookieString += `; SameSite=${options.sameSite}`;
        document.cookie = cookieString;
    },
    remove(name, path = '/') {
        if (typeof document === 'undefined')
            return;
        document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    }
};
// Storage instances
export const localStorage = new SafeStorage('localStorage');
export const sessionStorage = new SafeStorage('sessionStorage');
// JSON storage utilities
export const jsonStorage = {
    local: {
        get(key) {
            const item = localStorage.getItem(key);
            if (!item)
                return null;
            try {
                return JSON.parse(item);
            }
            catch {
                return null;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            }
            catch {
                // Silently fail
            }
        },
        remove(key) {
            localStorage.removeItem(key);
        }
    },
    session: {
        get(key) {
            const item = sessionStorage.getItem(key);
            if (!item)
                return null;
            try {
                return JSON.parse(item);
            }
            catch {
                return null;
            }
        },
        set(key, value) {
            try {
                sessionStorage.setItem(key, JSON.stringify(value));
            }
            catch {
                // Silently fail
            }
        },
        remove(key) {
            sessionStorage.removeItem(key);
        }
    },
    cookie: {
        get(name) {
            const value = cookies.get(name);
            if (!value)
                return null;
            try {
                return JSON.parse(value);
            }
            catch {
                return null;
            }
        },
        set(name, value, options) {
            try {
                cookies.set(name, JSON.stringify(value), options);
            }
            catch {
                // Silently fail
            }
        },
        remove(name, path) {
            cookies.remove(name, path);
        }
    }
};
// Cross-tab synchronization utility
export const createStorageSync = (key, initialValue) => {
    const getValue = () => {
        return jsonStorage.local.get(key) ?? initialValue;
    };
    const setValue = (value) => {
        jsonStorage.local.set(key, value);
        // Dispatch custom event for cross-tab sync
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent(`storage-sync-${key}`, {
                detail: value
            }));
        }
    };
    const subscribe = (callback) => {
        if (typeof window === 'undefined')
            return () => { };
        const handleStorageChange = (e) => {
            if (e.key === key) {
                callback(getValue());
            }
        };
        const handleCustomSync = (e) => {
            callback(e.detail);
        };
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener(`storage-sync-${key}`, handleCustomSync);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener(`storage-sync-${key}`, handleCustomSync);
        };
    };
    return {
        getValue,
        setValue,
        subscribe
    };
};
