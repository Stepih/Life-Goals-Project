import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { setAuthCookiesFromServer } from '@/lib/setAuthCookies';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user= await prisma.user.findUnique({ where: { email } });

  if (!user) return NextResponse.json({ error: 'Invalid email' }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });

  const res = NextResponse.json({ message: 'Logged in' });
  
  await setAuthCookiesFromServer(res, { userId: user.id, email })

  return res;
}
