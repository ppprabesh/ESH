import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true, // ✅ this includes the full Category object
    },
  });
  return NextResponse.json(products);
}




export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    name,
    slug,
    description,
    price,
    images,
    size,
    colors,
    featured = false,
    additionalInfo,
    category // <-- category slug or name
  } = body;

  try {
    // Look up category by slug (or name)
    const categoryRecord = await prisma.category.findFirst({
      where: {
        OR: [
          { slug: category },
          { name: category }
        ]
      }
    });

    if (!categoryRecord) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        images,
        size,
        colors,
        featured,
        additionalInfo,
        category: {
          connect: { id: categoryRecord.id }
        }
        
      }
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product', details: error }, { status: 500 });
  }
}
