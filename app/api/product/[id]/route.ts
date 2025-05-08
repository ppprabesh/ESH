import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  // Await params before accessing its properties
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id: id } });
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  const body = await req.json();

  try {
    // Update product, assuming the category needs to be a relation with an id
    const updated = await prisma.product.update({
      where: { id: id },
      data: {
        ...body,
        category: body.category ? { connect: { name: body.category } } : undefined,  // If category exists, connect it
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating product:', error); // Log the error details
    return NextResponse.json({ error: 'Product update failed', details: (error as Error).message }, { status: 500 });
  }
}



export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  // Await params before accessing its properties
  const { id } = await params;

  try {
    await prisma.product.delete({ where: { id: id } });
    return NextResponse.json({ message: 'Product deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
