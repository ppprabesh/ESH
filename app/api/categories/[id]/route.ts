import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

// GET: Fetch a single category by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

// PUT: Update a category by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

// DELETE: Delete a category by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}