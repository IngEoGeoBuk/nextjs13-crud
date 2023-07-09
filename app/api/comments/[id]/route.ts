/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const { id } = params;

    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID');
    }
    const comments = await prisma?.comment.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(comments);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const { id } = params;
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID');
    }
    const body = await request.json();
    const comment = await prisma!.comment.update({
      data: {
        content: body.content.substring(0, 100),
        ...body,
      },
      where: {
        id,
      },
    });
    return NextResponse.json(comment);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
