import { DeleteTextBlockFromClient } from "../../Types/deleteTextBlock"
import { EditTextBlockTextFromClient } from "../../Types/editTextBlockText"
import { IsPostItMovingFromClient } from "../../Types/isPostItMoving"
import { MovePostItPayload } from "../../Types/movePostItPayload"
import { NewBlockTextPayloadFromClient } from "../../Types/newBlockTextPayload"
import { TrashPostItFromClient } from "../../Types/trashPostIt"
import { tempWhiteBoardName } from "../Utils"
import * as signalR from '@microsoft/signalr';
import { NewPostItPayloadFromClient } from "../../Types/newPostItPayload"
import { EditPostItHeaderFromClient } from "../../Types/editPostItHeader"
import { NewDrawingPayload } from "../../Types/newDrawingPayload"

type Payload = DeleteTextBlockFromClient |
  EditTextBlockTextFromClient |
  IsPostItMovingFromClient |
  MovePostItPayload |
  NewBlockTextPayloadFromClient |
  TrashPostItFromClient |
  EditPostItHeaderFromClient |
  NewDrawingPayload |
  NewPostItPayloadFromClient;
type Action = "editTextBlockText" |
  "deleteTextBlock" |
  "isPostItMoving" |
  "movePostIt" |
  "trashPostIt" |
  "editPostItHeader" |
  "newDrawing" |
  "newPostIt";

export const SendToHub:
  (payload: Payload, action: Action, hubConnection: signalR.HubConnection, whiteboardName?: string) => void =
  (payload, action, hubConnection, whiteboardName = tempWhiteBoardName) => {
    if (hubConnection.state === signalR.HubConnectionState.Connected) {
      (hubConnection as signalR.HubConnection).send(action, payload, whiteboardName);
    } else {
      hubConnection.start()
        .then(() => {
          (hubConnection as signalR.HubConnection).send(action, payload, whiteboardName);
        })
    }
    return;
  }