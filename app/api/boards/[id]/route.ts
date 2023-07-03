/* eslint-disable import/prefer-default-export */
// export async default로 하니까 안 됨.
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const board = await prisma!.board.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json(board);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
