import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyRefreshJwt } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import deleteAuthCookies from '@/lib/deleteAuthCookies';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (refreshToken) {
    const payload = verifyRefreshJwt(refreshToken);

    if (payload) {
      await prisma.user.update({
        where: { id: payload.userId },
        data: { refreshToken: null }, 
      });
    }
  }

  const response = NextResponse.json({ message: 'Logged out', redirectTo: '/' });

  await deleteAuthCookies(response)

  return response;
}