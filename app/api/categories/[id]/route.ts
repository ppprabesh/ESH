import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = Promise<{ id: string }>


export async function GET(req: NextRequest, { params }: { params : Params }) {
  const {id} = await params;
  const category = await prisma.category.findUnique({ where: { id: id } });

  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  return NextResponse.json(category);
}

export async function PUT(req: NextRequest, { params }: { params : Params }) {
  const body = await req.json();
  const {id} = await params;

  try {
    const updated = await prisma.category.update({
      where: { id: id },
      data: body,
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Category update failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const {id} = await params;

  try {
    await prisma.category.delete({ where: { id: id } });
    return NextResponse.json({ message: 'Category deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
