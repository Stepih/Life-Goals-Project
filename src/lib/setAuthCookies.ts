import { NextResponse } from 'next/server';
import { generateAccessToken, generateRefreshToken } from './auth';
import { IJwtSignPayload } from '@/interfaces/jwt';

export async function setAuthCookiesFromServer(res: NextResponse, payload: IJwtSignPayload) {
  const accessToken = generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);

  res.cookies.set('token', accessToken, {
    httpOnly: true,
    path: '/',
    maxAge: Number(process.env.JWT_TIME),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/',
    maxAge: Number(process.env.JWT_REFRESH_TIME),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
}
