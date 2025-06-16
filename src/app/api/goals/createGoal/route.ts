import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { ICreateGoal, IGoal } from '@/interfaces/dashboardData';


export async function POST(req: Request) {
    const user = await getAuthenticatedUser();
    
    if (!user.isAuthenticated || !user.accessPayload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, priority }: ICreateGoal = await req.json();

    const newGoal:IGoal = await prisma.goal.create({
        data: { 
            title, 
            description,
            userId: user.accessPayload.userId,
            priority
        },
        include: {
            tasks: true,
        }
    });

    return NextResponse.json(newGoal);
}
