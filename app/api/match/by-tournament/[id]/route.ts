// /app/api/match/by-tournament/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: any, { params }: { params: { id: string } }) {
  const { id } = params;
  const matches = await prisma.match.findMany({
    where: { tournament_id: id },
    select: { id: true },
  });
  return NextResponse.json(matches);
}
