'use client'

import { useEffect, useState } from 'react'
import { Mail, MailOpen, Trash2, RefreshCw } from 'lucide-react'

interface ContactMessageRow {
  _id: string
  name: string
  email: string
  budget?: string
  message: string
  read: boolean
  createdAt: string
}

export function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessageRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact')
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to load messages.')
        setMessages([])
        return
      }
      setMessages(data.messages)
    } catch {
      setError('Failed to load messages — check your connection.')
      setMessages([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const toggleRead = async (id: string, read: boolean) => {
    setMessages((prev) => prev?.map((m) => (m._id === id ? { ...m, read } : m)) ?? prev)
    await fetch(`/api/contact/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    })
  }

  const remove = async (id: string) => {
    setMessages((prev) => prev?.filter((m) => m._id !== id) ?? prev)
    await fetch(`/api/contact/${id}`, { method: 'DELETE' })
  }

  return (
    <section className="admin-section">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Messages</h2>
          <p className="mt-1 text-sm text-muted-foreground">Submissions from the contact form on the site.</p>
        </div>
        <button type="button" onClick={load} className="admin-icon-btn" aria-label="Refresh messages">
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {!loading && error && <p className="text-sm text-accent">{error}</p>}
        {!loading && !error && messages?.length === 0 && (
          <p className="text-sm text-muted-foreground">No one has submitted the contact form yet.</p>
        )}
        {!loading && messages?.map((m) => (
          <div key={m._id} className={`admin-array-item ${m.read ? 'opacity-70' : ''}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{m.name} {!m.read && <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-primary">New</span>}</p>
                <a href={`mailto:${m.email}`} className="text-xs text-muted-foreground hover:text-primary">{m.email}</a>
                {m.budget && <p className="mt-1 text-xs text-muted-foreground">Budget: {m.budget}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono-tight text-[10px] uppercase tracking-widest text-muted-foreground">
                  {new Date(m.createdAt).toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={() => toggleRead(m._id, !m.read)}
                  className="admin-icon-btn"
                  aria-label={m.read ? 'Mark as unread' : 'Mark as read'}
                >
                  {m.read ? <Mail size={14} /> : <MailOpen size={14} />}
                </button>
                <button type="button" onClick={() => remove(m._id)} className="admin-icon-btn" aria-label="Delete message">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{m.message}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
