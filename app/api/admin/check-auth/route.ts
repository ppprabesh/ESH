import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: Request) {
  const cookieStore = await cookies(); // Use cookies() to access cookies
  const token = await cookieStore.get('admin-token')?.value; // Get the 'admin-token' cookie

  if (!token) {
    return new NextResponse(null, { status: 401 });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET); // Pass the token directly
    // If token is valid, return success
    return NextResponse.json({ authenticated: true, user: decoded });
  } catch (error) {
    // If token is invalid or expired
    return new NextResponse(null, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies(); // Await the cookies() function
    const token = cookieStore.get('token'); // Now you can use the get method

    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Proceed with your logic
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}