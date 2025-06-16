import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

import { prisma } from '@/lib/prisma';

import { IJwtPayload, IJwtSignPayload } from '@/interfaces/jwt';
import { IUser } from '@/interfaces/dashboardData';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!

export function generateAccessToken(payload: IJwtSignPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: Number(process.env.JWT_TIME) });
}

export async function generateRefreshToken(payload: IJwtSignPayload) {
  const token = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: Number(process.env.JWT_REFRESH_TIME) });

  await prisma.user.update({
    where: { id: payload.userId },
    data: { refreshToken: token }, 
  });

  return token;
}

function verifyJwt(token: string): IJwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as IJwtPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshJwt(token: string): IJwtPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as IJwtPayload;
  } catch {
    return null;
  }
}

function validatedUserDataFromJwtToken(token: string | undefined) {
  if (!token) return null;
  const payload = verifyJwt(token);
  if (!payload) return null;
  
  return payload;
}

async function checkRefreshOnDataBaseAndCoockie(refreshToken: string, userId: string): Promise<boolean> {
  const user:IUser | null = await prisma.user.findUnique({ where: { id: userId } });
  
  if (!user || user.refreshToken !== refreshToken) {
    return false;
  }

  return true;
}
export async function validateRefreshToken(refreshToken: string | undefined) {
  if (!refreshToken) return null;

  const payload = verifyRefreshJwt(refreshToken);
  if (!payload) return null;

  const isValid = await checkRefreshOnDataBaseAndCoockie(refreshToken, payload.userId);
  if (!isValid) return null;

  return payload;
}

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const accessPayload = validatedUserDataFromJwtToken(token);
  const refreshPayload = await validateRefreshToken(refreshToken);

  return {
    accessPayload,   // либо null, если access невалиден
    refreshPayload,  // либо null, если refresh невалиден
    isAuthenticated: !!accessPayload || !!refreshPayload,
  };
}
