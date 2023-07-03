'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { useParams } from 'next/navigation';
import axios from 'axios';
import BoardDetail from '@/app/components/Skeleton/boardDetail';
import AlertBox from '@/app/components/common/alertBox';
import { Board } from '@/app/types/Board';

async function getBoard(id: string) {
  const { data } = await axios.get(`/api/boards/${id}`);
  return data;
}

function Page() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery<Board>({
    queryKey: ['boards', id],
    queryFn: () => getBoard(id),
    keepPreviousData: true,
    staleTime: 5000,
  });

  if (isLoading) {
    return <BoardDetail />;
  }

  if (error) {
    return <AlertBox />;
  }

  if (data) {
    return (
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Title</h3>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{data.title}</p>
        <br />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h3>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{data.description}</p>
      </div>
    );
  }
}

export default Page;
