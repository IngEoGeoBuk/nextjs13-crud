'use client';

import React from 'react';
import { redirect, useRouter } from 'next/navigation';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Board } from '../../types/Board';

function Create() {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin?callbackUrl=/protected/client');
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const tempData = {
    title: 'test1',
    description: 'tett',
    players: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    dislike: 0,
  };
  const addBoard = async (board: Board) => axios.post('/api/boards', board);

  const addBoardMutation = useMutation(addBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      router.push('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div>
      <button
        type="button"
        className="btn-blue"
        onClick={() => addBoardMutation.mutate(tempData)}
      >
        create
      </button>
      <br />
    </div>
  );
}

export default Create;
