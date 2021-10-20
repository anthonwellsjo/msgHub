import { PostItPosition } from "./postItPosition";
import { TextBlock } from "./textBlock";

export interface PostIt {
  id: string;
  header: string;
  body: TextBlock[];
  position: PostItPosition;
  createdBy: string;
  createdOn: string;
}