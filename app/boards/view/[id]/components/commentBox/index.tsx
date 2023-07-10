import React, { useState } from 'react';
import { Comment } from '@prisma/client';

import { useSession } from 'next-auth/react';
import AddCommentBox from './components/addCommentBox';
import CommentItem from './components/commentItem';
import Modal from './components/modal';

function Index({ comments } : { comments: Comment[] }) {
  const email = useSession().data?.user?.email;
  const [showModal, setShowModal] = useState<string>('');

  if (comments) {
    return (
      <>
        {email && <AddCommentBox />}
        {comments?.map((item) => (
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
