import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get one product
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Update a product
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Delete a product
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}