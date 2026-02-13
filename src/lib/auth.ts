import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-key-change-me'
);

export const COOKIE_NAME = 'smart-interviewer-token';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
};

export async function createToken(payload: { id: string; name: string; email: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { id: string; name: string; email: string };
  } catch {
    return null;
  }
}

/** Set auth cookie directly on a NextResponse object */
export function setAuthCookieOnResponse(response: NextResponse, token: string) {
  response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);
  return response;
}

/** Remove auth cookie from a NextResponse object */
export function removeAuthCookieFromResponse(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, '', { ...COOKIE_OPTIONS, maxAge: 0 });
  return response;
}

export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function getCurrentUser() {
  const token = await getAuthCookie();
  if (!token) return null;
  return verifyToken(token);
}
