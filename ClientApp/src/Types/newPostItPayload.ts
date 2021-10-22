import { PostItPosition } from "./postItPosition";
import { TextBlock } from "./textBlock";

export interface NewPostItPayloadFromClient {
  position: PostItPosition;
  createdBy: string;
}

export interface NewPostItPayloadFromServer {
  id: string;
  header: string;
  body: TextBlock[];
  position: PostItPosition;
  createdBy: string;
  createdOn: string;
}