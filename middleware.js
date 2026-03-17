import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
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

  // 🔒 Protected route
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // 🔁 Auth page access while logged in
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