/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { boardId, content } = await request.json();
    const board = await prisma!.comment.create({
      data: {
        userId: currentUser.id,
        boardId,
        email: currentUser.email,
        content: content.substring(0, 100),
        createdAt: new Date(),
        updatedAt: null,
      },
    });
    return NextResponse.json(board);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
