import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';


export async function GET(req: Request) {
  const user = await getAuthenticatedUser();

  if (!user.isAuthenticated || !user.accessPayload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const range = url.searchParams.get('range') || 'day';
  const now = new Date(); // UTC время

  let start: Date;
  let end: Date;

  switch (range) {
    case 'week':
      start = startOfWeek(now, { weekStartsOn: 1 });
      end = endOfWeek(now, { weekStartsOn: 1 });
      break;
    case 'month':
      start = startOfMonth(now);
      end = endOfMonth(now);
      break;
    case 'day':
    default:
      start = startOfDay(now);
      end = endOfDay(now);
      break;
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: user.accessPayload.userId,
      scheduledFor: {
        gte: start,
        lte: end,
      },
    },
    include: {
      goal: {
        select: { title: true },
      },
    },
    orderBy: {
      scheduledFor: 'asc',
    },
  });

  return NextResponse.json(tasks);
}