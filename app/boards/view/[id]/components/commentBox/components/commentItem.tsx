import React, { useState } from 'react';
import axios from 'axios';

import { Comment } from '@prisma/client';
import dateFormat from '@/app/hook/dateFormat';
import { useSession } from 'next-auth/react';

import './commentItem.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Interface {
  item: Comment
  setShowModal: (value: string) => void;

}

function CommentItem({ item, setShowModal }: Interface) {
  const queryClient = useQueryClient();
  const email = useSession().data?.user?.email;
  const [showModify, setShowModify] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const updateBoard = async (content: string) => axios.put(`/api/comments/${showModify}`, {
    content,
  });
  const updateCommentMutation = useMutation(updateBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setShowModify('');
      setValue('');
    },
    onError: (err) => {
      throw err;
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateCommentMutation.mutate(value);
  };

  return (
    <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            {item.email}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time>
              {item.updatedAt
                ? `${dateFormat(item.createdAt)} (Edited)`
                : dateFormat(item.createdAt)}
            </time>
          </p>
        </div>
        {email === item.email && (
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                setShowModify(item.id);
                setValue(item.content);
              }}
            >
              <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setShowModal(item.id)}
            >
              <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
              </svg>
            </button>
          </div>
        )}
      </footer>
      {showModify === item.id
        ? (
          <form onSubmit={handleSubmit}>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <textarea
                  id="comment"
                  rows={4}
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"
                  placeholder="Write a comment..."
                  required
                  maxLength={100}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Edit comment
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowModify('');
                    setValue('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            {item.content}
          </p>
        )}
      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
        >
          <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          Reply
        </button>
      </div>
    </article>
  );
}

export default CommentItem;
