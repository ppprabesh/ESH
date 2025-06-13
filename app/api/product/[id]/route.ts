import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = Promise<{ id: string }>


export async function GET(_: NextRequest, { params }: { params: Params }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const body = await req.json();

  try {
    // Check if the category exists (using either name or slug)
    const categoryRecord = body.category
      ? await prisma.category.findFirst({
          where: {
            OR: [
              { slug: body.category },
              { name: body.category },
            ],
          },
        })
      : null;

    if (body.category && !categoryRecord) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 400 }
      );
    }

    // Perform the update on the product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        images: body.images,
        size: body.size,
        colors: body.colors,
        featured: body.featured,
        additionalInfo: body.additionalInfo,
        // If category exists, connect it using its ID
        category: categoryRecord ? { connect: { id: categoryRecord.id } } : undefined,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error); // Log the error details
    return NextResponse.json({ error: 'Product update failed', details: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Params }) {
  const { id } = await params;

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: 'Product deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
