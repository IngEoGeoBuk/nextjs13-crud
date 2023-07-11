import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Comment } from '@prisma/client';
import { useParams } from 'next/navigation';
import AlertBox from '@/app/components/common/alertBox';

import { useSession } from 'next-auth/react';
import AddCommentBox from './components/addCommentBox';
import CommentItem from './components/commentItem';
import Modal from './components/modal';
import Skeleton from './components/skeleton';

async function getComments(id: string) {
  const { data } = await axios.get(`/api/boards/comments/${id}`);
  return data;
}

function Index() {
  const { id } = useParams();
  const email = useSession().data?.user?.email;
  const [showModal, setShowModal] = useState<string>('');

  const { isLoading, error, data } = useQuery<Comment[]>({
    queryKey: ['comments', { board: id }],
    queryFn: () => getComments(id),
    keepPreviousData: true,
    staleTime: 5000,
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <AlertBox />;
  }

  if (data) {
    return (
      <>
        {email && <AddCommentBox />}
        {data?.map((item) => (
          <CommentItem
            key={item.id}
            item={item}
            setShowModal={setShowModal}
          />
        ))}
        {showModal && (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </>
    );
  }
}

export default Index;
