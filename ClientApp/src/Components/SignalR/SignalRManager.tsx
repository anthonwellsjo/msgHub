import React, { useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAppDispatch } from '../../Utils/Redux/hooks';

import { HubConnectionContext } from '../../Utils/Context/HubConnectionContext';
import { useSelector } from 'react-redux';
import { MovePostItPayload } from '../../Types/movePostItPayload';
import { setPostItPosition, setUsersLoggedIn } from '../../Utils/Redux/features/msgHub/whiteboardSlice';
import { AlertContext } from '../../Utils/Context/alertContext';
import { AlertItem } from '../../Types/alertItem';
import { GetAlertColor } from '../../Utils/Utils';
import { UserLoggedInPayload } from '../../Types/userLoggedInPayload';
import { AlertType } from '../../Types/alertType';

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
          hubConnection.on("userLoggedIn", (payload: UserLoggedInPayload) => {
            const alertItem: AlertItem = { text: `${payload.userName} just logged in.`, color: GetAlertColor(AlertType.primary) }
            setAlerts((prev: AlertItem[]) => [...prev, alertItem]);
            dispatch(setUsersLoggedIn(payload.userName));
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