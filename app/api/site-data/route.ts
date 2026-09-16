import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectToDatabase } from '@/lib/mongodb'
import { SiteContent } from '@/lib/models/site-content'
import { siteData as defaultSiteData, socialCapabilities as defaultSocialCapabilities, type SiteData } from '@/lib/site-data'
import { verifySession, SESSION_COOKIE } from '@/lib/auth'

const knownByLabel = new Map(defaultSocialCapabilities.map((item) => [item.label.toLowerCase(), item]))

/**
 * Older stored documents have `socialCapabilities` as plain strings (the
 * shape before each item gained an icon), or as `{ icon, label }` objects
 * from before `description` existed. Coerce those into the current shape so
 * old records don't crash the page or show up blank in the admin editor —
 * matching against the known default labels picks the right icon/description
 * immediately instead of a generic fallback, and an admin can still edit any
 * of it afterward.
 */
function normalizeSiteData(data: Record<string, unknown>) {
  if (Array.isArray(data.socialCapabilities)) {
    data.socialCapabilities = data.socialCapabilities.map((item) => {
      if (typeof item === 'string') {
        const known = knownByLabel.get(item.toLowerCase())
        return { icon: known?.icon ?? 'sparkles', label: item, description: known?.description }
      }
      if (item && typeof item === 'object' && !('description' in item)) {
        const known = knownByLabel.get((item as { label?: string }).label?.toLowerCase() ?? '')
        return { ...item, description: known?.description }
      }
      return item
    })
  }
  return data
}

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
      return NextResponse.json(normalizeSiteData({ ...defaultSiteData, ...existing.data }))
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
