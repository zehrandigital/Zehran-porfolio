'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, LogOut, ExternalLink, Inbox } from 'lucide-react'
import { SiteEditor, adminNavSections } from '@/components/admin/site-editor'
import { AdminMessages } from '@/components/admin/messages'
import { AdminSidebar } from '@/components/admin/sidebar'
import { siteData as defaultSiteData, type SiteData } from '@/lib/site-data'

const MESSAGES_SECTION_ID = 'messages'
const navSections = [...adminNavSections, { id: MESSAGES_SECTION_ID, label: 'Messages', icon: Inbox }]

export default function AdminPage() {
  const router = useRouter()
  const [username, setUsername] = useState<string | null>(null)
  const [content, setContent] = useState<SiteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState(adminNavSections[0].id)

  useEffect(() => {
    (async () => {
      const [meRes, dataRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/site-data'),
      ])
      if (meRes.ok) {
        const me = await meRes.json()
        setUsername(me.user?.username ?? null)
      }
      const data = dataRes.ok ? await dataRes.json() : defaultSiteData
      setContent(data)
      setLoading(false)
    })()
  }, [])

  const handleChange = (updater: (prev: any) => any) => {
    setContent((prev) => (prev ? updater(prev) : prev))
  }

  const handleSave = async () => {
    if (!content) return
    setSaving(true)
    setStatus(null)
    try {
      const res = await fetch('/api/site-data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus(data.error || 'Failed to save.')
        return
      }
      setStatus('Saved.')
    } catch {
      setStatus('Failed to save — check your connection.')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  if (loading || !content) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Loading content…
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#08090a]/90 px-6 py-4 backdrop-blur-xl">
        <div>
          <p className="font-mono-tight text-xs uppercase tracking-widest text-primary">Admin</p>
          {username && <p className="text-sm text-muted-foreground">Signed in as {username}</p>}
        </div>
        <div className="flex items-center gap-3">
          {status && <span className="text-xs text-muted-foreground">{status}</span>}
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-xs hover:border-primary hover:text-primary">
            View site <ExternalLink size={12} />
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            <Check size={13} /> {saving ? 'Saving…' : 'Save changes'}
          </button>
          <button onClick={handleLogout} className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-xs hover:border-accent hover:text-accent">
            <LogOut size={13} /> Log out
          </button>
        </div>
      </header>

      <div className="flex gap-8 px-6 py-10 md:px-10">
        <AdminSidebar sections={navSections} activeSection={activeSection} onSelect={setActiveSection} />
        <div className="min-w-0 max-w-5xl flex-1">
          {activeSection === MESSAGES_SECTION_ID
            ? <AdminMessages />
            : <SiteEditor content={content} onChange={handleChange} activeSection={activeSection} />}
        </div>
      </div>
    </main>
  )
}
