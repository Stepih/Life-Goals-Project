import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

import { IGoal } from '@/interfaces/dashboardData';


export async function PUT(req: Request) {
   
    const user = await getAuthenticatedUser();
    
    if (!user.isAuthenticated  || !user.accessPayload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { title, description, priority, id }: IGoal = await req.json();


    const goal:IGoal = await prisma.goal.update({
        where: {
            id: id
        },
        data: { priority, title: title, userId: user.accessPayload.userId, description: description,  },
        include: {
            tasks: true
        }
    });

    return NextResponse.json(goal);

}