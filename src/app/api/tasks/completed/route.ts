import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function POST(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user.isAuthenticated || !user.accessPayload)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, completed } = await req.json();

  const updateData = {
    completed,
    completedAt: completed ? new Date() : null
  };

  const updatedTask = await prisma.task.update({
    where: { id },
    data: updateData,
    include: { goal: true },
  });

  const goalId = updatedTask.goalId;

  if (!goalId) {
    return NextResponse.json({ error: 'Задача не привязана к цели' }, { status: 400 });
  }

  const tasksOfGoal = await prisma.task.findMany({
    where: { goalId },
    select: { completed: true },
  });

  // Проверка: все ли задачи выполнены
  const allCompleted = tasksOfGoal.length > 0 && tasksOfGoal.every(t => t.completed);

  // Обновляем цель
  await prisma.goal.update({
    where: { id: goalId },
    data: { achieved: allCompleted },
  });

  return NextResponse.json({ success: true });
}
