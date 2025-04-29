import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      price,
      images,
      size,
      colors,
      stock,
      featured,
      categoryId,
      scents,
      fragrances,
      flavors,
      dimensions,
      material,
      weight,
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        images,
        size,
        colors,
        stock,
        featured,
        categoryId,
        scents,
        fragrances,
        flavors,
        dimensions,
        material,
        weight,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 