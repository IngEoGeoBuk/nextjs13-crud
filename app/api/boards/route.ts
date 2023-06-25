/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

// export async default로 하니까 안 됨.
export async function GET(
  request: Request,
) {
  try {
    
  } catch (error) {
    
  }
}


export async function POST(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const body = await request.json();
    const {
      title,
      description,
      players,
      createdAt,
      updatedAt,
      like,
      dislike,
    } = body;
    const board = await prisma!.board.create({
      data: {
        userId: currentUser.id,
        title,
        description,
        players,
        createdAt,
        updatedAt,
        like,
        dislike,
      },
    });
    return NextResponse.json(board);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
