/* eslint-disable import/prefer-default-export */
// export async default로 하니까 안 됨.
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function GET(
  request: Request,
) {
  try {
    const perPage = 10;
    const paginatedList = 5;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const page = Number(new URL(request.url).searchParams.get('page'));

    const total = await prisma!.board.count();
    const board = await prisma!.board.findMany({
      skip: perPage * (Number(page) - 1),
      take: perPage,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const startPageInList = (Math.ceil(page / paginatedList) - 1) * paginatedList + 1;
    const endPageInList = Math.min(
      (Math.ceil(page / paginatedList) - 1) * paginatedList + paginatedList,
      Math.ceil(total / perPage),
    );

    const range = (start: number, end: number) => {
      const array = [];
      // eslint-disable-next-line no-plusplus
      for (let i = start; i <= end; i++) {
        array.push(i);
      }
      return array;
    };

    return NextResponse.json({
      board,
      hasPrevious: page > paginatedList,
      hasNext: Math.ceil(page / paginatedList) < Math.ceil(total / perPage / paginatedList),
      pageList: range(startPageInList, endPageInList),
    });
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
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
    const board = await prisma!.board.create({
      data: {
        userId: currentUser.id,
        email: currentUser.email,
        updatedAt: null,
        ...body,
      },
    });
    return NextResponse.json(board);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
