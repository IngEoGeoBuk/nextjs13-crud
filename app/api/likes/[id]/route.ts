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
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { id } = params;
    const like = await prisma!.like.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(like);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
