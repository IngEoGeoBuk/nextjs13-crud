import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AlertBox from '@/app/components/common/alertBox';
import Skeleton from './skeleton';

interface Vote {
  like: number;
  dislike: number;
  clicked?: {
    id: string;
    like: boolean;
  };
}

async function getLikes(id: string) {
  const { data } = await axios.get(`/api/boards/likes/${id}`);
  return data;
}

function Index() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [showToast, setShowToast] = useState<boolean>(false);

  // like 관련 코드
  const { isLoading, error, data } = useQuery<Vote>({
    queryKey: ['like', { board: id }],
    queryFn: () => getLikes(id),
    keepPreviousData: true,
    staleTime: 5000,
  });

  const postLike = async (like: boolean) => axios.post('/api/likes', { boardId: id, like });
  const postLikeMutation = useMutation(postLike, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['like', { board: id }] });
    },
    onError: (err) => {
      throw err;
    },
  });

  const deleteLike = async (likeId: string) => axios.delete(`/api/likes/${likeId}`);
  const deleteLikeMutation = useMutation(deleteLike, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['like', { board: id }] });
    },
    onError: (err) => {
      throw err;
    },
  });

  const clickLike = async (vote: boolean) => {
    if (!session) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    } else if (!data?.clicked) {
      postLikeMutation.mutate(vote);
    } else if (
      (vote && data.clicked.like)
      || (!vote && !data.clicked.like)
    ) {
      deleteLikeMutation.mutate(data.clicked.id);
    } else if (
      (vote && !data.clicked.like)
      || (!vote && data.clicked.like)
    ) {
      deleteLikeMutation.mutate(data.clicked.id);
      postLikeMutation.mutate(vote);
    }
  };

  if (isLoading) {
    return (
      <Skeleton />
    );
  }

  if (error) {
    return <AlertBox />;
  }

  if (data) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="flex justify-center gap-5">
          <button
            type="button"
            className="btn-primary"
            onClick={async () => clickLike(true)}
          >
            <div className="flex flex-col justify-center items-center gap-1">
              <svg className={`h-8 w-8 ${data?.clicked?.like === true ? 'text-yellow-500' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <p>{String(data?.like)}</p>
            </div>
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={async () => clickLike(false)}
          >
            <div className="flex flex-col justify-center items-center gap-1">
              <svg className={`h-8 w-8 ${data?.clicked?.like === false ? 'text-yellow-500' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
              </svg>
              <p>{String(data?.dislike)}</p>
            </div>
          </button>
        </div>
        {showToast
          ? (
            <div id="toast-default" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-500" role="alert">
              <div className="ml-3 text-sm font-normal">Please login</div>
            </div>
          )
          : <div style={{ height: '56px' }} />}
      </div>
    );
  }
}

export default Index;
