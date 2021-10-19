import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAppDispatch } from '../../Utils/Redux/hooks';
import { setHubConnectionId, setHubConnectionStatus } from '../../Utils/Redux/features/msgHub/hubConnectionSlice';

const SignalRManager: React.FC = ({ children }) => {

  const [connection, setConnection] = useState<signalR.HubConnection | undefined>(undefined);
  const [connectionStarted, setConnectionStarted] = useState<boolean>(false);
  const dispatch = useAppDispatch();



  useEffect(() => {
    if (connection === undefined) {
      setConnection(new signalR.HubConnectionBuilder()
        .withUrl("/hub")
        .build())
    }

    if (connection !== undefined) {
    }
  }, [connection, dispatch]);
  
  
  useEffect(() => {
    
    if (connection != null) {
      connection.start()
      .then(() => {
          dispatch(setHubConnectionId(connection.connectionId));
          dispatch(setHubConnectionStatus("open"));
          setConnectionStarted(true);
          console.log("connection open", connection);
          connection.send("logInUser", "anthon");
          connection.on("userStatus", (status) => {
            console.log("User status", status);
          });
          connection.on("groupNotification", (status) => {
            console.log("MEssage", status);
          });
          setTimeout(() => {
            connection.send("logOutUser", "anthon");
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