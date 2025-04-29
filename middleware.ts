import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: '/admin/:path*',
}

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginRoute = request.nextUrl.pathname === '/admin/login'
  const token = request.cookies.get('admin-token')

  // If trying to access admin route without token, redirect to login
  if (isAdminRoute && !isLoginRoute && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // If already logged in and trying to access login page, redirect to admin dashboard
  if (isLoginRoute && token) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}