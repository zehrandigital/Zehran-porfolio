import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '@/lib/mongodb'
import { User } from '@/lib/models/user'
import { RegistrationLock } from '@/lib/models/registration-lock'
import { signSession, SESSION_COOKIE } from '@/lib/auth'

/**
 * Reports whether registration is still open. Based on real User count
 * (not just the lock below), so a user created any other way — e.g. the
 * `npm run create-admin` script — correctly closes this too.
 */
export async function GET() {
  try {
    await connectToDatabase()
  } catch {
    return NextResponse.json({ open: false, error: 'Database is not configured. Set MONGODB_URI in .env.local.' }, { status: 503 })
  }
  const existingUsers = await User.countDocuments()
  return NextResponse.json({ open: existingUsers === 0 })
}

/**
 * Creates the one and only admin user. Locks itself permanently once any
 * user exists — this is a convenience for bootstrapping the first account
 * from the browser instead of the `npm run create-admin` script, not a
 * general signup endpoint.
 *
 * Two layers keep this correct:
 * 1. A fast-path check against the real User count — catches the case
 *    where a user already exists via any other path (e.g. the CLI script).
 * 2. An atomic lock (a document whose _id uniqueness MongoDB enforces at
 *    the storage layer) — catches two web registration requests racing
 *    each other at the same instant, which the count check alone can't.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const username = typeof body?.username === 'string' ? body.username.trim().toLowerCase() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
  }

  try {
    await connectToDatabase()
  } catch {
    return NextResponse.json({ error: 'Database is not configured. Set MONGODB_URI in .env.local.' }, { status: 503 })
  }

  const existingUsers = await User.countDocuments()
  if (existingUsers > 0) {
    return NextResponse.json({ error: 'Registration is closed — an admin account already exists.' }, { status: 403 })
  }

  try {
    await RegistrationLock.create({ _id: 'admin' })
  } catch (err) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: 'Registration is closed — an admin account already exists.' }, { status: 403 })
    }
    throw err
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ username, passwordHash, role: 'admin' })

    const token = await signSession({ sub: user._id.toString(), username: user.username, role: user.role })
    const response = NextResponse.json({ ok: true, username: user.username })
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    return response
  } catch (err) {
    // Registration didn't actually complete — release the lock so it can be retried.
    await RegistrationLock.deleteOne({ _id: 'admin' })
    throw err
  }
}
