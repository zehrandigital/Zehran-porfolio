import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectToDatabase } from '@/lib/mongodb'
import { ContactMessage } from '@/lib/models/contact-message'
import { verifySession, SESSION_COOKIE } from '@/lib/auth'

async function requireSession() {
  const cookieStore = await cookies()
  return verifySession(cookieStore.get(SESSION_COOKIE)?.value)
}

/** Admin-only: mark a submission read/unread. */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await request.json().catch(() => ({}))

  await connectToDatabase()
  await ContactMessage.findByIdAndUpdate(id, { read: Boolean(body?.read) })
  return NextResponse.json({ ok: true })
}

/** Admin-only: delete a submission. */
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  await connectToDatabase()
  await ContactMessage.findByIdAndDelete(id)
  return NextResponse.json({ ok: true })
}
