import { User } from '@prisma/client';

export interface Board {
  id?: string;
  user?: User
  userId?: string;
  title: string;
  description: string;
  players: number[];
  createdAt: Date;
  updatedAt?: Date;
  like: number;
  dislike: number;
}
