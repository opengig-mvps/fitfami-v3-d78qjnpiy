import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type PostRequestBody = {
  imageUrl: string;
  description: string;
  userId: number;
};

export async function POST(request: Request) {
  try {
    const body: PostRequestBody = await request.json();

    const { imageUrl, description, userId } = body;

    if (!imageUrl || !description || isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Missing required fields or incorrect format' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const post = await prisma.post.create({
      data: {
        imageUrl,
        description,
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Post created successfully',
      data: post,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}