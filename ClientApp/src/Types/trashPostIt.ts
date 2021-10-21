export interface TrashPostItFromClient {
  postItId: string;
  user: string;
}

export interface TrashPostItFromServer {
  postItId: string;
  user: string;
  trashedOn: string;
}