import React, { useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAppDispatch } from '../../Utils/Redux/hooks';

import { HubConnectionContext } from '../../Utils/Context/HubConnectionContext';
import { useSelector } from 'react-redux';
import { GroupNotificationPayload } from '../../Types/groupNotification';
import { MovePostItPayload } from '../../Types/movePostItPayload';
import { setPostItPosition } from '../../Utils/Redux/features/msgHub/whiteboardSlice';

const SignalRManager: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const [hubConnection, setHubConnection] = useContext<any>(HubConnectionContext);


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
          hubConnection.on("groupNotification", (payload: GroupNotificationPayload) => {
          });

          hubConnection.on("movePostIt", (payload: MovePostItPayload) => {
            dispatch(setPostItPosition(payload))
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