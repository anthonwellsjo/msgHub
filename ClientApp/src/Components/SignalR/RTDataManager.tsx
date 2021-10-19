import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const RTDataManager: React.FC = ({ children }) => {

  const [connection, setConnection] = useState<signalR.HubConnection>();
  const [connectionStarted, setConnectionStarted] = useState<boolean>(false);


  useEffect(() => {

    setConnection(new signalR.HubConnectionBuilder()
      .withUrl("/hub")
      .build())
  }, []);


  useEffect(() => {

    if (connection != null) {
      connection.start()
        .then(() => {
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

export default RTDataManager;