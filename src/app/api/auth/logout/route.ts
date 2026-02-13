import { NextResponse } from 'next/server';
import { removeAuthCookieFromResponse } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({ success: true });
  removeAuthCookieFromResponse(response);
  return response;
}
