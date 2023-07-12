import React, { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Interface {
  defaultValue: string;
  showModify: string;
  setShowModify: (value: string) => void;
}

function EditCommentBox({ defaultValue, showModify, setShowModify } : Interface) {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [value, setValue] = useState<string>(defaultValue);

  const updateComment = async (content: string) => axios.put(`/api/comments/${showModify}`, {
    content,
  });
  const updateCommentMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', { board: id }] });
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
            className="btn-primary"
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
  );
}

export default EditCommentBox;
