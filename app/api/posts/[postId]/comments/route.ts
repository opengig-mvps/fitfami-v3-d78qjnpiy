import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export async function POST(request: Request, { params }: { params: { postId: string } }) {
  try {
    const session: any = await getSession({ req: request as any });
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session?.user?.id;
    const postId = parseInt(params?.postId, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ success: false, message: 'Invalid post ID' }, { status: 400 });
    }

    const body: any = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json({ success: false, message: 'Content is required' }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        userId: parseInt(userId, 10),
        postId,
      },
    });

    const commentData = await prisma.comment.findFirst({
      where: { id: comment?.id },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
        post: {
          select: {
            id: true,
            description: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Comment added successfully',
      data: commentData,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}