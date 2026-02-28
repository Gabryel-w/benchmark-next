import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key'

export interface TokenPayload {
  userId: number
  email: string
  iat?: number
  exp?: number
}

export function signToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload
    return decoded
  } catch (error) {
    return null
  }
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('auth-token')?.value || null
}

export async function verifyAuthToken(): Promise<TokenPayload | null> {
  const token = await getAuthToken()
  if (!token) return null
  return verifyToken(token)
}

export function createAuthCookie(token: string): void {
  // This is used in API routes via response.cookies.set
}
