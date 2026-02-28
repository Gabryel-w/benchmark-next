import { NextRequest, NextResponse } from 'next/server'

// NOTE: We only check cookie existence here, not JWT validity.
// jsonwebtoken uses Node.js crypto which is not available in Edge Runtime.
// Actual JWT verification happens in the API routes (Node.js runtime).

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Use the non-httpOnly companion cookie for route protection checks.
    // The actual httpOnly 'auth-token' JWT is verified in API routes (Node.js runtime).
    const token = request.cookies.get('auth-logged-in')?.value

    // If user is on the login page
    if (request.nextUrl.pathname === '/admin/login') {
      // If they have a token, redirect to admin panel
      if (token) {
        return NextResponse.redirect(new URL('/admin/posts', request.url))
      }
      // Otherwise, let them see the login page
      return NextResponse.next()
    }

    // For all other admin routes, require a token
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
