import React, { createContext, useState } from 'react';
import AlertHandler from '../../Components/UI/AlertHandler';
import { AlertItem } from '../../Types/alertItem';

let alerts: AlertItem[] = [];
let setAlerts: any;

const AlertContext = createContext([alerts, setAlerts])

const AlertProvider: React.FC = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  return (
    <AlertContext.Provider value={[alerts, setAlerts]}>
      <AlertHandler messageDelayMs={6000} setter={setAlerts} items={alerts} />
      {children}
    </AlertContext.Provider>
  )
};

export { AlertContext };
export { AlertProvider };

