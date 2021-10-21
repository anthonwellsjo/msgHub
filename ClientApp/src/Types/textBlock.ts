import { Format } from "./format";

export interface TextBlock {
  id: string;
  text: string;
  author: string;
  lastUpdated: string;
  formatting: Format[];
}