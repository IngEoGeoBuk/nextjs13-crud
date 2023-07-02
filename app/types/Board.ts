export interface Board {
  id: string;
  userId: string;
  email: string;
  title: string;
  description: string;
  players: number[];
  like: number;
  dislike: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateBoard {
  title: string;
  description: string;
  players: number[];
}
