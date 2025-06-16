import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { ITask } from '@/interfaces/dashboardData';


export async function PUT(req: Request) {
   
    const user = await getAuthenticatedUser();
    
    if (!user.isAuthenticated  || !user.accessPayload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { title, scheduledFor, goalId, id, priority, description } : ITask = await req.json();


    const task:ITask = await prisma.task.update({
        where: {
            id: id
        },
        data: { priority, 
            title, 
            userId: user.accessPayload.userId, 
            scheduledFor, 
            goalId,
            description
        }, 
    });


    return NextResponse.json(task);

}