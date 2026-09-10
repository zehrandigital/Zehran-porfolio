import { SignJWT, jwtVerify } from 'jose'

export const SESSION_COOKIE = 'session'
const SESSION_DURATION = '7d'

export interface SessionPayload {
  sub: string
  username: string
  role: string
}

function getSecretKey() {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error('AUTH_SECRET is not set. Add it to .env.local (see .env.example).')
  }
  return new TextEncoder().encode(secret)
}

export async function signSession(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey())
}

/** Verifies a session token. Returns null (never throws) on missing/invalid/expired tokens. */
export async function verifySession(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}
