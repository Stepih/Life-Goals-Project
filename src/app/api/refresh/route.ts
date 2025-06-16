import { NextResponse } from 'next/server';

import { getAuthenticatedUser } from '@/lib/auth';
import { setAuthCookiesFromServer } from '@/lib/setAuthCookies';
import { IJwtSignPayload } from '@/interfaces/jwt';


export async function POST() {
    const user = await getAuthenticatedUser();

    if (!user.refreshPayload) {
        return NextResponse.json({ message: 'Refresh failed', redirectTo: '/' }, { status: 401 });
    }
    const signPayload:IJwtSignPayload = {email: user.refreshPayload.email, userId: user.refreshPayload.userId}
    
    const res = NextResponse.json({ message: 'Refreshed' });
    console.log(user.refreshPayload);
    await setAuthCookiesFromServer(res, signPayload)

    return res;
}