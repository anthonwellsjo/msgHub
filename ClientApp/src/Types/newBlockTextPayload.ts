export interface NewBlockTextPayloadFromClient {
  author: string;
  postItId: string;
}

export interface NewBlockTextPayloadFromServer {
  id: string;
  author: string;
  lastUpdatedOn: string;
  postItId: string;
}