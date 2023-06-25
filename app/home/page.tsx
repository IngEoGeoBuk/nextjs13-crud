'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../components/common/spinner';
import AlertBox from '../components/common/alertBox';
import BoardList from './boardList';

async function getBoards(page = 0) {
  const { data } = await axios.get(`/api/boards?page=${page}`);
  return data;
}

function Home() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);

  const {
    isLoading, error, data, isFetching, isPreviousData,
  } = useQuery({
    queryKey: ['boards', page],
    queryFn: () => getBoards(page),
    keepPreviousData: true,
    staleTime: 5000,
  });

  // Prefetch the next page!
  useEffect(() => {
    if (!isPreviousData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['boards', page + 1],
        queryFn: () => getBoards(page + 1),
      });
    }
  }, [data, isPreviousData, page, queryClient]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <AlertBox />;
  }

  // return <div>home</div>;
  if (data && data.length > 0) {
    return (
      <div className="w-full">
        <BoardList data={data} />
      </div>
    );
  }
}

export default Home;
