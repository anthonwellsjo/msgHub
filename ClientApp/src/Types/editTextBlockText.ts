export interface EditTextBlockTextFromClient {
  value: string;
  textBlockId: string;
  postItId: string;
}

export interface EditTextBlockTextFromServer {
  value: string;
  textBlockId: string;
  postItId: string;
  lastUpdatedOn: string;
}