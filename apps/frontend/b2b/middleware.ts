import { NextRequest, NextResponse } from 'next/server'

interface TokenPayload {
  exp: number
  iat: number
  userId: string
  userType: string
}

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: any
}

// Simple JWT decode function without external dependency
function decodeJWT(token: string): TokenPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const payload = parts[1]
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return decoded
  } catch (error) {
    return null
  }
}

const PUBLIC_ROUTES = [
  '/login',
  '/register', 
  '/forgot-password',
  '/reset-password',
  '/api/auth/refresh',
  '/'
]

const API_ROUTES = ['/api/']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for public routes, API routes, and static files
  if (
    PUBLIC_ROUTES.some(route => pathname.startsWith(route)) ||
    API_ROUTES.some(route => pathname.startsWith(route)) ||
    pathname.includes('/_next/') ||
    pathname.includes('/favicon') ||
    pathname.includes('.') // Static files
  ) {
    return NextResponse.next()
  }

  try {
    // Get auth state from cookie or header
    const authCookie = request.cookies.get('travel-auth')?.value
    
    if (!authCookie) {
      return redirectToLogin(request)
    }

    const authState: AuthState = JSON.parse(authCookie)
    
    if (!authState.accessToken || !authState.refreshToken) {
      return redirectToLogin(request)
    }

    // Check if access token is valid and not expired
    const isTokenValid = await validateAccessToken(authState.accessToken)
    
    if (isTokenValid) {
      // Token is valid, continue
      return NextResponse.next()
    }

    // Access token is expired, try to refresh
    const refreshResult = await refreshAccessToken(authState.refreshToken)
    
    if (refreshResult.success) {
      // Update auth state with new tokens
      const response = NextResponse.next()
      
      const newAuthState = {
        ...authState,
        accessToken: refreshResult.accessToken,
        refreshToken: refreshResult.refreshToken || authState.refreshToken
      }
      
      response.cookies.set('travel-auth', JSON.stringify(newAuthState), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })

      return response
    } else {
      // Refresh failed, redirect to login
      return redirectToLogin(request)
    }
    
  } catch (error) {
    console.error('Middleware auth error:', error)
    return redirectToLogin(request)
  }
}

async function validateAccessToken(token: string): Promise<boolean> {
  try {
    const decoded = decodeJWT(token)
    if (!decoded) return false
    
    const currentTime = Math.floor(Date.now() / 1000)
    
    // Check if token expires in next 5 minutes (buffer for refresh)
    const bufferTime = 5 * 60 // 5 minutes
    return decoded.exp > (currentTime + bufferTime)
  } catch (error) {
    return false
  }
}

async function refreshAccessToken(refreshToken: string): Promise<{
  success: boolean
  accessToken?: string
  refreshToken?: string
  error?: string
}> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken })
    })

    if (!response.ok) {
      return { success: false, error: 'Refresh failed' }
    }

    const data = await response.json()
    
    if (data.success) {
      return {
        success: true,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      }
    } else {
      return { success: false, error: data.message }
    }
  } catch (error) {
    console.error('Token refresh error:', error)
    return { success: false, error: 'Network error' }
  }
}

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
  
  const response = NextResponse.redirect(loginUrl)
  
  // Clear auth cookies
  response.cookies.delete('travel-auth')
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}