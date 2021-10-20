import React, { createContext, useState } from 'react';
import * as signalR from '@microsoft/signalr';

let hubConnection = {};
let setHubConnection;

const HubConnectionContext = createContext([hubConnection, setHubConnection])

const HubConnectionProvider: React.FC = ({ children }) => {
  const [hubConnection, setHubConnection] = useState<signalR.HubConnection>(
    new signalR.HubConnectionBuilder()
      .withUrl("/hub")
      .build()
  );
  return (
    <HubConnectionContext.Provider value={[hubConnection, setHubConnection]}>
      {children}
    </HubConnectionContext.Provider>
  )
};

export { HubConnectionContext };
export { HubConnectionProvider };

