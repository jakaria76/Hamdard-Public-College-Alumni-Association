import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(req) {
  const { pathname } = req.nextUrl

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const isLoggedIn = !!token

  const isAuthPage =
    pathname === '/login' ||
    pathname === '/register'

  const isProtected =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin')

  // Protected route — login না থাকলে /login এ পাঠাও
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Already logged in — /login বা /register এ গেলে /dashboard এ পাঠাও
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/dashboard/:path*',
    '/admin/:path*',
  ],
}