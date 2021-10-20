import { Format } from "./format";

export interface TextBlock {
  iD: string;
  text: string;
  author: string;
  lastUpdated: string;
  formatting: Format[];
}