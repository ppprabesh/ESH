import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the import path based on your project structure

// GET: Fetch all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true, // Adjust based on your schema relationships
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST: Create a new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, categoryId } = body; // Adjust fields based on your schema

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        categoryId, // Adjust based on your schema
        slug: name.toLowerCase().replace(/\s+/g, '-'), // Example slug generation
        description: body.description || '', // Provide a default or required description
        category: { connect: { id: categoryId } }, // Adjust based on your schema relationships
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}