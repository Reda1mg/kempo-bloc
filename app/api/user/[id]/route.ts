import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/user/:id — Obtenir un utilisateur par ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id);

  if (isNaN(userId)) {
    return NextResponse.json({ message: 'ID invalide' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Erreur API user/:id →', error);
    return NextResponse.json({ message: 'Erreur interne' }, { status: 500 });
  }
}

// PUT /api/user/:id — Modifier le rôle d’un utilisateur
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id);

  if (isNaN(userId)) {
    return NextResponse.json({ message: 'ID invalide' }, { status: 400 });
  }

  try {
    const { role } = await req.json();

    if (!role || typeof role !== 'string') {
      return NextResponse.json({ message: 'Rôle manquant ou invalide' }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Erreur PUT API user/:id →', error);
    return NextResponse.json({ message: 'Erreur interne' }, { status: 500 });
  }
}
