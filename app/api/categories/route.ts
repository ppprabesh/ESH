import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Enhanced GET with pagination, sorting, and search
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination parameters
    const page = Number(searchParams.get('page')) || 1;
    const perPage = Number(searchParams.get('perPage')) || 10;
    const skip = (page - 1) * perPage;
    
    // Sorting parameters
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    // Search parameter
    const search = searchParams.get('search') || '';

    // Build the where clause for search
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    } : {};

    // Execute queries in parallel for better performance
    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where: {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { slug: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        },
        skip,
        take: perPage,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      prisma.category.count({
        where: {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { slug: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return NextResponse.json({
      data: categories,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage)
      }
    });

  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch categories',
        details: process.env.NODE_ENV === 'development' 
          ? error instanceof Error ? error.message : null 
          : null
      },
      { status: 500 }
    );
  }
}

// POST remains largely the same with minor improvements
export async function POST(req: Request) {
  try {
    // Verify database connection
    await prisma.$queryRaw`SELECT 1`;
    
    const body = await req.json();
    const { name, description, image } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' }, 
        { status: 400 }
      );
    }

    // Generate slug with improved handling
    const slug = (body.slug || name)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');

    // Check for existing category with transaction
    const existingCategory = await prisma.$transaction(async (tx) => {
      try {
        return await tx.category.findUnique({ where: { slug } });
      } catch (error) {
        console.error('FindUnique failed, falling back to raw query:', error);
        const result = await tx.$queryRaw`
          SELECT id FROM "Category" WHERE slug = ${slug} LIMIT 1
        `;
        return Array.isArray(result) ? result[0] : null;
      }
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 409 }
      );
    }

    // Create new category
    const newCategory = await prisma.category.create({
      data: {
        name,
        slug,
        description: description || null,
        image: image || null,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });

  } catch (error) {
    console.error('Category creation failed:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create category',
        details: process.env.NODE_ENV === 'development' 
          ? error instanceof Error ? error.message : null 
          : null
      },
      { status: 500 }
    );
  }
}