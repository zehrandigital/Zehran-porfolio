import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '@/lib/mongodb'
import { User } from '@/lib/models/user'
import { signSession, SESSION_COOKIE } from '@/lib/auth'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const username = typeof body?.username === 'string' ? body.username.trim().toLowerCase() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 })
  }

  try {
    await connectToDatabase()
  } catch {
    return NextResponse.json({ error: 'Database is not configured. Set MONGODB_URI in .env.local.' }, { status: 503 })
  }

  const user = await User.findOne({ username })
  if (!user) {
    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 })
  }

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
}
