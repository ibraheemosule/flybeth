/**
 * Frontend-specific browser utilities
 */

// URL utilities
export const urlUtils = {
  // Get current URL parameters
  getSearchParams(): URLSearchParams {
    if (typeof window === 'undefined') return new URLSearchParams()
    return new URLSearchParams(window.location.search)
  },

  // Get specific parameter value
  getParam(name: string): string | null {
    return this.getSearchParams().get(name)
  },

  // Update URL parameters without page reload
  updateParams(params: Record<string, string | null>): void {
    if (typeof window === 'undefined') return
    
    const searchParams = this.getSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key)
      } else {
        searchParams.set(key, value)
      }
    })
    
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`
    window.history.replaceState({}, '', newUrl)
  },

  // Navigate with parameters
  navigate(path: string, params?: Record<string, string>): void {
    if (typeof window === 'undefined') return
    
    let url = path
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams(params)
      url += `?${searchParams.toString()}`
    }
    
    window.location.href = url
  }
}

// Viewport utilities
export const viewport = {
  // Get viewport dimensions
  getSize(): { width: number; height: number } {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 }
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },

  // Check if element is in viewport
  isInViewport(element: Element): boolean {
    if (typeof window === 'undefined') return false
    
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  },

  // Scroll to element
  scrollToElement(element: Element, behavior: ScrollBehavior = 'smooth'): void {
    if (typeof window === 'undefined') return
    element.scrollIntoView({ behavior, block: 'start' })
  },

  // Scroll to top
  scrollToTop(behavior: ScrollBehavior = 'smooth'): void {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior })
  }
}

// Device detection
export const device = {
  // Check if mobile device
  isMobile(): boolean {
    if (typeof navigator === 'undefined') return false
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  },

  // Check if iOS device
  isIOS(): boolean {
    if (typeof navigator === 'undefined') return false
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
  },

  // Check if Android device
  isAndroid(): boolean {
    if (typeof navigator === 'undefined') return false
    return /Android/.test(navigator.userAgent)
  },

  // Check if touch device
  isTouchDevice(): boolean {
    if (typeof navigator === 'undefined') return false
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  },

  // Get device pixel ratio
  getPixelRatio(): number {
    if (typeof window === 'undefined') return 1
    return window.devicePixelRatio || 1
  }
}

// Network utilities
export const network = {
  // Check if online
  isOnline(): boolean {
    if (typeof navigator === 'undefined') return true
    return navigator.onLine
  },

  // Listen for connection changes
  onConnectionChange(callback: (isOnline: boolean) => void): () => void {
    if (typeof window === 'undefined') return () => {}

    const handleOnline = () => callback(true)
    const handleOffline = () => callback(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  },

  // Get connection info (if available)
  getConnectionInfo(): any {
    if (typeof navigator === 'undefined') return null
    return (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
  }
}

// Clipboard utilities
export const clipboard = {
  // Copy text to clipboard
  async writeText(text: string): Promise<boolean> {
    if (typeof navigator === 'undefined') return false
    
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const result = document.execCommand('copy')
        document.body.removeChild(textArea)
        return result
      } catch {
        return false
      }
    }
  },

  // Read text from clipboard
  async readText(): Promise<string | null> {
    if (typeof navigator === 'undefined') return null
    
    try {
      return await navigator.clipboard.readText()
    } catch {
      return null
    }
  }
}

// Performance utilities
export const performance = {
  // Mark performance timing
  mark(name: string): void {
    if (typeof window === 'undefined') return
    if (window.performance && window.performance.mark) {
      window.performance.mark(name)
    }
  },

  // Measure performance between marks
  measure(name: string, startMark: string, endMark?: string): void {
    if (typeof window === 'undefined') return
    if (window.performance && window.performance.measure) {
      window.performance.measure(name, startMark, endMark)
    }
  },

  // Get timing information
  getTiming(name: string): PerformanceEntry | null {
    if (typeof window === 'undefined') return null
    if (window.performance && window.performance.getEntriesByName) {
      const entries = window.performance.getEntriesByName(name)
      return entries.length > 0 ? entries[0] : null
    }
    return null
  }
}