import React, { useState } from 'react';
import axios from 'axios';
import { Comment } from '@prisma/client';

import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import AlertBox from '@/app/components/common/alertBox';
import AddCommentBox from './components/addCommentBox';
import CommentItem from './components/commentItem';
import Skeleton from './components/skeleton';
import Modal from './components/modal';

async function getComments(id: string) {
  const { data } = await axios.get(`/api/boards/comments/${id}`);
  return data;
}

function Index() {
  const { id } = useParams();
  const email = useSession().data?.user?.email;
  const [showModal, setShowModal] = useState<string>('');

  const { isLoading, error, data } = useQuery<Comment[]>({
    queryKey: ['comments', id],
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
        {data.map((item) => (
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
