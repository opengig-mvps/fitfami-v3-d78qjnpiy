import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const body = await request.json();
    const { email, username, name, bio } = body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email: email ? String(email) : undefined,
        username: username ? String(username) : undefined,
        name: name ? String(name) : undefined,
        bio: bio ? String(bio) : undefined,
      },
    });

    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'User profile updated successfully',
      data: user,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}