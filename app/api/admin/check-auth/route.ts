import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin-token');

  if (!token) {
    return new NextResponse(null, { status: 401 });
  }

  try {
    // Verify the JWT token
    const decoded = verify(token.value, JWT_SECRET);
    
    // If token is valid, return success
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    // If token is invalid or expired
    return new NextResponse(null, { status: 401 });
  }
} 