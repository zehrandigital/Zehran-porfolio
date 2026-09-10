'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUpRight, UserPlus } from 'lucide-react'

export default function AdminRegisterPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [open, setOpen] = useState(false)
  const [checkError, setCheckError] = useState<string | null>(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/register')
        const data = await res.json()
        if (!res.ok) {
          setCheckError(data.error || 'Could not check registration status.')
        } else {
          setOpen(data.open)
        }
      } catch {
        setCheckError('Could not reach the server.')
      } finally {
        setChecking(false)
      }
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Registration failed.')
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="grain-bg flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-card/60 p-8 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-primary">
          <UserPlus size={18} />
          <p className="font-mono-tight text-xs uppercase tracking-[0.2em]">Admin setup</p>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">This works once — the first account created here becomes the only admin.</p>

        {checking && <p className="mt-8 text-sm text-muted-foreground">Checking…</p>}

        {!checking && checkError && (
          <p className="mt-8 text-sm text-accent">{checkError}</p>
        )}

        {!checking && !checkError && !open && (
          <div className="mt-8 space-y-4">
            <p className="text-sm text-muted-foreground">An admin account already exists. Registration is closed.</p>
            <a href="/admin/login" className="flex items-center gap-2 text-sm font-semibold text-primary">
              Go to login <ArrowUpRight size={16} />
            </a>
          </div>
        )}

        {!checking && !checkError && open && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Username</span>
              <input
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="contact-input"
                autoComplete="username"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Password</span>
              <input
                required
                type="password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="contact-input"
                autoComplete="new-password"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Confirm password</span>
              <input
                required
                type="password"
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="contact-input"
                autoComplete="new-password"
              />
            </label>

            {error && <p className="text-sm text-accent">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Creating…' : <>Create account <ArrowUpRight size={16} /></>}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
