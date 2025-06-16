import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';


export async function GET() {
   
    const user = await getAuthenticatedUser();
    
    if (!user.isAuthenticated  || !user.accessPayload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });


   const groupedRaw = await prisma.task.findMany({
    where: {
      userId: user.accessPayload.userId,
    },
    select: {
      completedAt: true,
    },
    orderBy: {
      completedAt: 'asc',
    },
  });


const countsByDate: Record<string, number> = {};

for (const task of groupedRaw) {
  if (task.completedAt !== null) {
    const dateKey = task.completedAt.toISOString().split("T")[0]; // "2025-06-09"
    countsByDate[dateKey] = (countsByDate[dateKey] ?? 0) + 1;
  }
}

const result = Object.entries(countsByDate).map(([date, count]) => ({
  date,
  completedTasks: count,
}));

return NextResponse.json(result);


}