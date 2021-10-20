import { PostIt } from "./postIt";

export interface Whiteboard {
  id: string;
  postits: PostIt[];
  createdOn: string;
  createdBy: string;
}