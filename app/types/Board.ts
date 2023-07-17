import { Board } from '@prisma/client';

export interface CreateBoard {
  title: string;
  description: string;
  players: number[];
}

export interface BoardLike extends Board {
  likes: number;
}
