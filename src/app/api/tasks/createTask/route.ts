import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { ICreateTask, ITask } from '@/interfaces/dashboardData';

export async function POST(req: Request) {
  const user = await getAuthenticatedUser();

  if (!user.isAuthenticated || !user.accessPayload)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { title, scheduledFor, goalId, priority, description } : ICreateTask = await req.json();

  const maxOrder = await prisma.task.aggregate({
    where: { goalId },
    _max: { order: true },
  });

  const newOrder = (maxOrder._max.order ?? 0) + 1;

  
  const task: ITask = await prisma.task.create({
    data: {
      title,
      scheduledFor,
      goalId,
      priority,
      completed: false, 
      userId: user.accessPayload.userId,
      order: newOrder,
      description
    },
  });

  
  if (goalId) {
    await prisma.goal.update({
      where: { id: goalId },
      data: { achieved: false },
    });
  }

  return NextResponse.json(task);
}
