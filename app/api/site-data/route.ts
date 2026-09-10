import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectToDatabase } from '@/lib/mongodb'
import { SiteContent } from '@/lib/models/site-content'
import { siteData as defaultSiteData, type SiteData } from '@/lib/site-data'
import { verifySession, SESSION_COOKIE } from '@/lib/auth'

/**
 * Serves the entire site content as JSON, backed by MongoDB. The static
 * lib/site-data.ts export is the seed/fallback: on first request it's
 * written into the database, and if the database isn't configured yet
 * (no MONGODB_URI) the public site still renders from those defaults
 * instead of failing.
 */
export async function GET() {
  try {
    await connectToDatabase()
    const existing = await SiteContent.findById('main').lean<{ data: Partial<SiteData> }>()
    if (existing) {
      // The stored document can predate fields added to site-data.ts since
      // it was last saved (e.g. a whole new section) — merge those in from
      // the defaults so older records don't crash the page on a missing
      // key. A real edit + save in /admin persists the merged shape.
      return NextResponse.json({ ...defaultSiteData, ...existing.data })
    }
    const seeded = await SiteContent.create({ _id: 'main', data: defaultSiteData })
    return NextResponse.json(seeded.data)
  } catch (err) {
    console.error('[site-data] falling back to static defaults:', (err as Error).message)
    return NextResponse.json(defaultSiteData)
  }
}

export async function PUT(request: Request) {
  const cookieStore = await cookies()
  const session = await verifySession(cookieStore.get(SESSION_COOKIE)?.value)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid content payload.' }, { status: 400 })
  }

  try {
    await connectToDatabase()
  } catch {
    return NextResponse.json({ error: 'Database is not configured. Set MONGODB_URI in .env.local.' }, { status: 503 })
  }

  await SiteContent.findByIdAndUpdate('main', { data: body }, { upsert: true, returnDocument: 'after' })
  return NextResponse.json({ ok: true })
}
