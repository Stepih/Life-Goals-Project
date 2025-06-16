import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user.isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updates: { id: string; order: number }[] = await req.json();

  const updatePromises = updates.map(({ id, order }) =>
    prisma.task.update({
      where: { id },
      data: { order },
    })
  );

  await Promise.all(updatePromises);

  return NextResponse.json({ success: true });
}
