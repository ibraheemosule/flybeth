/**
 * Frontend-specific storage utilities
 * Handles localStorage, sessionStorage, and cookies with SSR safety
 */

// Storage interface for consistent API
interface Storage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

// Safe storage wrapper that works in SSR environments
class SafeStorage implements Storage {
  private storage: Storage | null

  constructor(storageType: 'localStorage' | 'sessionStorage' = 'localStorage') {
    if (typeof window !== 'undefined') {
      this.storage = storageType === 'localStorage' ? window.localStorage : window.sessionStorage
    } else {
      this.storage = null
    }
  }

  getItem(key: string): string | null {
    if (!this.storage) return null
    try {
      return this.storage.getItem(key)
    } catch {
      return null
    }
  }

  setItem(key: string, value: string): void {
    if (!this.storage) return
    try {
      this.storage.setItem(key, value)
    } catch {
      // Silently fail in SSR or storage quota exceeded
    }
  }

  removeItem(key: string): void {
    if (!this.storage) return
    try {
      this.storage.removeItem(key)
    } catch {
      // Silently fail in SSR
    }
  }
}

// Cookie utilities
export const cookies = {
  get(name: string): string | null {
    if (typeof document === 'undefined') return null
    
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop()?.split(';').shift() || '')
    }
    return null
  },

  set(name: string, value: string, options: {
    expires?: number | Date
    path?: string
    domain?: string
    secure?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
  } = {}): void {
    if (typeof document === 'undefined') return

    let cookieString = `${name}=${encodeURIComponent(value)}`

    if (options.expires) {
      const expires = options.expires instanceof Date 
        ? options.expires 
        : new Date(Date.now() + options.expires * 24 * 60 * 60 * 1000)
      cookieString += `; expires=${expires.toUTCString()}`
    }

    if (options.path) cookieString += `; path=${options.path}`
    if (options.domain) cookieString += `; domain=${options.domain}`
    if (options.secure) cookieString += `; secure`
    if (options.sameSite) cookieString += `; SameSite=${options.sameSite}`

    document.cookie = cookieString
  },

  remove(name: string, path: string = '/'): void {
    if (typeof document === 'undefined') return
    document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:01 GMT`
  }
}

// Storage instances
export const localStorage = new SafeStorage('localStorage')
export const sessionStorage = new SafeStorage('sessionStorage')

// JSON storage utilities
export const jsonStorage = {
  local: {
    get<T>(key: string): T | null {
      const item = localStorage.getItem(key)
      if (!item) return null
      try {
        return JSON.parse(item)
      } catch {
        return null
      }
    },

    set<T>(key: string, value: T): void {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch {
        // Silently fail
      }
    },

    remove(key: string): void {
      localStorage.removeItem(key)
    }
  },

  session: {
    get<T>(key: string): T | null {
      const item = sessionStorage.getItem(key)
      if (!item) return null
      try {
        return JSON.parse(item)
      } catch {
        return null
      }
    },

    set<T>(key: string, value: T): void {
      try {
        sessionStorage.setItem(key, JSON.stringify(value))
      } catch {
        // Silently fail
      }
    },

    remove(key: string): void {
      sessionStorage.removeItem(key)
    }
  },

  cookie: {
    get<T>(name: string): T | null {
      const value = cookies.get(name)
      if (!value) return null
      try {
        return JSON.parse(value)
      } catch {
        return null
      }
    },

    set<T>(name: string, value: T, options?: {
      expires?: number | Date
      path?: string
      domain?: string
      secure?: boolean
      sameSite?: 'strict' | 'lax' | 'none'
    }): void {
      try {
        cookies.set(name, JSON.stringify(value), options)
      } catch {
        // Silently fail
      }
    },

    remove(name: string, path?: string): void {
      cookies.remove(name, path)
    }
  }
}

// Cross-tab synchronization utility
export const createStorageSync = <T>(key: string, initialValue: T) => {
  const getValue = (): T => {
    return jsonStorage.local.get<T>(key) ?? initialValue
  }

  const setValue = (value: T): void => {
    jsonStorage.local.set(key, value)
    
    // Dispatch custom event for cross-tab sync
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(`storage-sync-${key}`, {
        detail: value
      }))
    }
  }

  const subscribe = (callback: (value: T) => void): (() => void) => {
    if (typeof window === 'undefined') return () => {}

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        callback(getValue())
      }
    }

    const handleCustomSync = (e: CustomEvent) => {
      callback(e.detail)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener(`storage-sync-${key}`, handleCustomSync as EventListener)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener(`storage-sync-${key}`, handleCustomSync as EventListener)
    }
  }

  return {
    getValue,
    setValue,
    subscribe
  }
}