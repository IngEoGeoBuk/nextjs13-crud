'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Spinner from '../components/common/spinner';
import AlertBox from '../components/common/alertBox';
import BoardList from './boardList';
import Pagination from './pagination';

async function getBoards(page = 0) {
  const { data } = await axios.get(`/api/boards?page=${page}`);
  return data;
}

function Home() {
  const [page, setPage] = useState(1);

  const { isLoading, error, data } = useQuery({
    queryKey: ['boards', page],
    queryFn: () => getBoards(page),
    keepPreviousData: true,
    staleTime: 5000,
  });

  if (isLoading) {
    return <div className="w-full flex items-center justify-center h-20"><Spinner /></div>;
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
      </div>
    );
  }
}

export default Home;
