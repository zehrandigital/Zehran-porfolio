import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectToDatabase } from '@/lib/mongodb'
import { ContactMessage } from '@/lib/models/contact-message'
import { verifySession, SESSION_COOKIE } from '@/lib/auth'

/** Public: the site's contact form posts here. */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const budget = typeof body?.budget === 'string' ? body.budget.trim() : ''
  const message = typeof body?.message === 'string' ? body.message.trim() : ''

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }

  try {
    await connectToDatabase()
  } catch {
    return NextResponse.json({ error: 'Database is not configured. Set MONGODB_URI in .env.local.' }, { status: 503 })
  }

  await ContactMessage.create({ name, email, budget, message })
  return NextResponse.json({ ok: true })
}

/** Admin-only: lists submissions for the admin panel inbox, newest first. */
export async function GET() {
  const cookieStore = await cookies()
  const session = await verifySession(cookieStore.get(SESSION_COOKIE)?.value)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectToDatabase()
  } catch {
    return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 })
  }

  const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean()
  return NextResponse.json({ messages })
}
