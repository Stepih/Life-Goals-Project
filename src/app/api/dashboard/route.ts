
import { startOfDay, endOfDay } from 'date-fns';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

import { IGoal, ITodayTasks } from '@/interfaces/dashboardData';
import { IDashboardData } from '@/interfaces/dashboardData';

export async function GET() {
   
    const user = await getAuthenticatedUser();
    
    if (!user.isAuthenticated  || !user.accessPayload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });


    const goals: IGoal[] = await prisma.goal.findMany({
        where: { userId: user.accessPayload.userId },
        include: {
            tasks: {
                orderBy: {
                    order: 'asc'
                }
            }, 
        },
    });

    const now = new Date();
    const todayTasks:ITodayTasks[] = await prisma.task.findMany({
        where: {
            userId: user.accessPayload.userId,
            scheduledFor: {
                gte: startOfDay(now),
                lte: endOfDay(now),
            },
        },
        include: {
            goal: {
                select: { title: true },
            },
        },
    });

    const res:IDashboardData = {goals, todayTasks, userName: user.accessPayload.email}
    
    return NextResponse.json(res);

}