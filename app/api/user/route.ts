// app/api/user/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Erreur API /user →', error);
    return NextResponse.json({ message: 'Erreur interne' }, { status: 500 });
  }
}
