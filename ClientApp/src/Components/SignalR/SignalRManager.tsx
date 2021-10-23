import React, { useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAppDispatch } from '../../Utils/Redux/hooks';

import { HubConnectionContext } from '../../Utils/Context/HubConnectionContext';
import { useSelector } from 'react-redux';
import { MovePostItPayload } from '../../Types/movePostItPayload';
import { deleteTextBlock, editPostItHeader, editTextBlockText, newPostIt, setNewTextBlock, setPostItIsMoving, setPostItPosition, setUsersLoggedIn, trashPostIt } from '../../Utils/Redux/features/msgHub/whiteboardSlice';
import { AlertContext } from '../../Utils/Context/alertContext';
import { AlertItem } from '../../Types/alertItem';
import { GetAlertColor } from '../../Utils/Utils';
import { UserLoggedInPayload } from '../../Types/userLoggedInPayload';
import { AlertType } from '../../Types/alertType';
import { NewBlockTextPayloadFromServer } from '../../Types/newBlockTextPayload';
import { EditTextBlockTextFromServer } from '../../Types/editTextBlockText';
import { DeleteTextBlockFromServer } from '../../Types/deleteTextBlock';
import { IsPostItMovingFromServer } from '../../Types/isPostItMoving';
import { TrashPostItFromServer } from '../../Types/trashPostIt';
import { NewPostItPayloadFromServer } from '../../Types/newPostItPayload';
import { EditPostItHeaderFromServer } from '../../Types/editPostItHeader';

const SignalRManager: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const [hubConnection, setHubConnection] = useContext<any>(HubConnectionContext);
  const [alerts, setAlerts] = useContext(AlertContext);



  useEffect(() => {
    if (hubConnection === undefined) {
      setHubConnection(new signalR.HubConnectionBuilder()
        .withUrl("/hub")
        .build())
    }
  }, [hubConnection, dispatch]);


  useEffect(() => {

    if (hubConnection != null && (hubConnection as signalR.HubConnection).state === signalR.HubConnectionState.Disconnected) {
      hubConnection.start()
        .then(() => {
          (hubConnection as signalR.HubConnection).onclose(() => {
            console.log("on close");
            (hubConnection as signalR.HubConnection).start();
          })

          hubConnection.on("userLoggedIn", (payload: UserLoggedInPayload) => {
            const alertItem: AlertItem = { text: `${payload.userName} just logged in.`, color: GetAlertColor(AlertType.primary) }
            setAlerts((prev: AlertItem[]) => [...prev, alertItem]);
            dispatch(setUsersLoggedIn(payload.userName));
          });

          hubConnection.on("movePostIt", (payload: MovePostItPayload) => {
            dispatch(setPostItPosition(payload))
          });

          hubConnection.on("newBlockText", (payload: NewBlockTextPayloadFromServer) => {
            const alertItem: AlertItem = { text: `${payload.author} is adding text...`, color: GetAlertColor(AlertType.primary) }
            setAlerts((prev: AlertItem[]) => [...prev, alertItem]);
            dispatch(setNewTextBlock(payload));
          });

          hubConnection.on("editTextBlockText", (payload: EditTextBlockTextFromServer) => {
            dispatch(editTextBlockText(payload));
          });

          hubConnection.on("isPostItMoving", (payload: IsPostItMovingFromServer) => {
            dispatch(setPostItIsMoving(payload));
          });

          hubConnection.on("trashPostIt", (payload: TrashPostItFromServer) => {
            dispatch(trashPostIt(payload));
          });

          hubConnection.on("deleteTextBlockFromClient", (payload: DeleteTextBlockFromServer) => {
            dispatch(deleteTextBlock(payload));
          });

          hubConnection.on("newPostIt", (payload: NewPostItPayloadFromServer) => {
            dispatch(newPostIt(payload));
          });

          hubConnection.on("editPostItHeader", (payload: EditPostItHeaderFromServer) => {
            dispatch(editPostItHeader(payload));
          });
        })
        .catch((error: any) => { throw error; })
    }

  }, [hubConnection, dispatch])


  if ((hubConnection as signalR.HubConnection).state === signalR.HubConnectionState.Connected) {
    return (
      <div>
        {children}
      </div>
    );
  } else return null;
}

export default SignalRManager;