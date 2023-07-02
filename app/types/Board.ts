export interface Board {
  id?: string;
  userId?: string;
  title: string;
  email?: string;
  description: string;
  players: number[];
  createdAt: Date;
  updatedAt?: Date;
  like: number;
  dislike: number;
}
