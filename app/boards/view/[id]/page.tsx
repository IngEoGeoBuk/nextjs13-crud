'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dateFormat from '@/app/hook/dateFormat';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import BoardDetailSkeleton from '@/app/boards/view/[id]/components/skeleton';
import AlertBox from '@/app/components/common/alertBox';
import { useSession } from 'next-auth/react';
import { Board } from '@prisma/client';
import Modal from './components/modal';
import VoteBox from './components/VoteBox';
import CommentBox from './components/commentBox';

async function getBoard(id: string) {
  const { data } = await axios.get(`/api/boards/${id}`);
  return data;
}

function Index() {
  const { id } = useParams();
  const email = useSession().data?.user?.email;

  const { isLoading, error, data } = useQuery<Board>({
    queryKey: ['boards', id],
    queryFn: () => getBoard(id),
    keepPreviousData: true,
    staleTime: 5000,
  });

  const [showModal, setShowModal] = useState(false);

  if (isLoading) {
    return <BoardDetailSkeleton />;
  }

  if (error) {
    return <AlertBox />;
  }

  if (data) {
    return (
      <>
        <div className="p-5">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Title</h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              {data.updatedAt ? `${dateFormat(data.updatedAt)} (Edited)` : dateFormat(data.createdAt)}
            </p>
          </div>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{data.title}</p>
          <br />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h3>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{data.description}</p>
          <br />
          <VoteBox />
          <CommentBox />
          {email === data.email && (
            <div className="text-right">
              <Link href={`/boards/modify/${id}`} className="btn-secondary">modify</Link>
              <button
                className="btn-primary"
                type="button"
                onClick={() => setShowModal(true)}
              >
                delete
              </button>
            </div>
          )}
        </div>
        {showModal && (
          <Modal
            setShowModal={setShowModal}
          />
        )}
      </>
    );
  }
}

export default Index;
