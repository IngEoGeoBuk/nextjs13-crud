import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import ModalFrame from './modalFrame';

interface Interface {
  setShowModal: (value: boolean) => void;
}

function Modal({ setShowModal }: Interface) {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  const deleteBoard = async () => axios.delete(`/api/boards/${id}`);
  const deleteBoardMutation = useMutation(deleteBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards', id] });
      router.push('/');
    },
    onError: (error) => {
      throw error;
    },
  });

  return (
    <ModalFrame
      body="Do you want to delete this board?"
      hideModal={() => setShowModal(false)}
      deleteMutation={() => deleteBoardMutation.mutate()}
    />
  );
}

export default Modal;
