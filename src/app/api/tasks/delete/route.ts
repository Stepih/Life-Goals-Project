import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function DELETE(req: Request) {
   
    const user = await getAuthenticatedUser();
    
    if (!user.isAuthenticated  || !user.accessPayload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await req.json();

    await prisma.task.delete({
        where: {
            id
        }, 
    });

    return NextResponse.json('Удалено');
}