import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('Login attempt for username:', username);

    if (!username || !password) {
      console.log('Missing username or password');
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Find admin by username
    let admin;
    try {
      admin = await prisma.admin.findUnique({
        where: { username },
      });
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }

    if (!admin) {
      console.log('Admin not found');
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    console.log('Admin found, comparing passwords...');

    // Compare passwords
    let isValid;
    try {
      isValid = await compare(password, admin.password);
    } catch (error) {
      console.error('Password comparison error:', error);
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    if (!isValid) {
      console.log('Password comparison failed');
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    console.log('Password comparison successful, generating token...');

    // Generate JWT token
    const token = sign(
      { 
        id: admin.id,
        username: admin.username,
        role: 'admin'
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Create response with success message
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    // Set cookie in the response
    response.cookies.set({
      name: 'admin-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
} 