'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, redirect } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useSession } from 'next-auth/react';
import Spinner from '../components/common/spinner';
import AlertBox from '../components/common/alertBox';
import BoardList from './components/boardList';
import Pagination from './components/pagination';
import BoardListSkeleton from './components/skeleton';

async function getBoards(page = 0, type = '') {
  const typeQuery = type ? `&type=${type}` : '';
  const { data } = await axios.get(`/api/boards?page=${page}${typeQuery}`);
  return data;
}

function Home() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') ?? '';
  const { data: session, status } = useSession();
  const [page, setPage] = useState(1);

  const { isLoading, error, data } = useQuery({
    queryKey: ['boards', { page }, { type }],
    queryFn: () => getBoards(page, type),
    keepPreviousData: true,
    staleTime: 5000,
  });

  if (type === 'my' && !session?.user?.email) {
    redirect('/signin');
  }

  if (isLoading) {
    return <BoardListSkeleton />;
  }

  if (error) {
    return <AlertBox />;
  }

  if (data?.board && data?.board.length > 0) {
    return (
      <div className="w-full">
        <BoardList board={data.board} />
        <Pagination
          page={page}
          onChangePage={(getPage: number) => setPage(getPage)}
          hasPrevious={data.hasPrevious}
          clickPrevious={() => setPage(data.previousPage)}
          hasNext={data.hasNext}
          clickNext={() => setPage(data.nextPage)}
          pageList={data.pageList}
        />
        {status === 'loading' ? (
          <Spinner />
        ) : (
          <div className="text-right">
            {status === 'authenticated' ? (
              <Link href="/boards/write" className="btn-primary">
                create
              </Link>
            ) : (
              null
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
