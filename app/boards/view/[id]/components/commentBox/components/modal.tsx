import React from 'react';
import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import ModalFrame from '../../modalFrame';

interface Interface {
  showModal: string;
  setShowModal: (value: string) => void;
}

function Modal({ showModal, setShowModal }: Interface) {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const deleteComment = async () => axios.delete(`/api/comments/${showModal}`);
  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', { board: id }] });
      setShowModal('');
    },
    onError: (error) => {
      throw error;
    },
  });

  return (
    <ModalFrame
      body="Do you want to delete this comment?"
      hideModal={() => setShowModal('')}
      deleteMutation={() => deleteCommentMutation.mutate()}
    />
  );
}

export default Modal;
