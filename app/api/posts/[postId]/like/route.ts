import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';

export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = parseInt(params?.postId, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ success: false, message: 'Invalid post ID' }, { status: 400 });
    }

    const session: any = await getServerSession(request);
    if (!session || !session?.user || !session?.user?.email) {
      return NextResponse.json({ success: false, message: 'User not authenticated' }, { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: { email: session?.user?.email },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    await prisma.like.deleteMany({
      where: {
        userId: user?.id,
        postId: postId,
      },
    });

    const likeCount = await prisma.like.count({
      where: { postId: postId },
    });

    return NextResponse.json({
      success: true,
      message: 'Like removed successfully',
      data: { likeCount },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error removing like:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}