import { NextResponse, type NextRequest } from 'next/server'
import { verifySession, SESSION_COOKIE } from '@/lib/auth'

// Optimistic check only (cookie presence/validity, no DB call) — the real
// authorization for content writes lives in app/api/site-data's PUT handler.
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin/login') || request.nextUrl.pathname.startsWith('/admin/register')) {
    return NextResponse.next()
  }

  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value)
  if (!session) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
