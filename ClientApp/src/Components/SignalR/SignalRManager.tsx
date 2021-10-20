import React, { useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAppDispatch } from '../../Utils/Redux/hooks';
import { setHubConnectionId, setHubConnectionStatus } from '../../Utils/Redux/features/msgHub/hubConnectionSlice';
import { HubConnectionContext } from '../Context/HubConnectionContext';

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

    if (hubConnection != null) {
      hubConnection.start()
        .then(() => {
          dispatch(setHubConnectionId(hubConnection.connectionId));
          dispatch(setHubConnectionStatus("open"));
          setConnectionStarted(true);
          console.log("hubConnection open", hubConnection);
          hubConnection.send("logInUser", "anthon");
          hubConnection.on("userStatus", (status) => {
            console.log("User status", status);
          });
          hubConnection.on("groupNotification", (status) => {
            console.log("MEssage", status);
          });
          setTimeout(() => {
            hubConnection.send("logOutUser", "anthon");
          }, 2000);
        })
        .catch((error) => { throw error; })
    }

  }, [connection])


  if (connectionStarted) {

    return (
      <div>
        {children}
      </div>
    );
  } else return null;
}

export default SignalRManager;