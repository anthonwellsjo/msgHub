import React, { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

const SignalRManager: React.FC = () => {

  useEffect(() => {

    fetch("/whiteboard")
      .then(response => response.json())
      .then(data => { console.log(data) })


    console.log("starting connection");

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("/hub")
      .build();

    connection.start()
      .then(() => {
        console.log("connection open", connection);
        connection.send("logInUser", "anthon");
        connection.on("userStatus", (status) => {
          console.log("User status", status);
        });
        setTimeout(() => {
          connection.send("logOutUser", "anthon");
        }, 2000);
      })
      .catch((error) => { throw error; })

  })

  return null;
}

export default SignalRManager;