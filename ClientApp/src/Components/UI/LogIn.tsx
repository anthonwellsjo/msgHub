import React, { useContext, useState } from 'react';
import { AlertItem } from '../../Types/alertItem';
import { loginUser } from '../../Utils/api';
import { AlertContext } from '../../Utils/Context/alertContext';
import { HubConnectionContext } from '../../Utils/Context/HubConnectionContext';
import { setUserName, setUserStatus } from '../../Utils/Redux/features/msgHub/userSlice';
import { setUsersLoggedIn } from '../../Utils/Redux/features/msgHub/whiteboardSlice';
import { useAppDispatch, useAppSelector } from '../../Utils/Redux/hooks';
import { randomName, tempWhiteBoardName } from '../../Utils/Utils';



const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [hubConnection, setHubConnection] = useContext<any>(HubConnectionContext);
  const dispatch = useAppDispatch();


  const onLoginEventHandler = () => {

    if (name.length < 1) {
      setName(randomName());
      return;
    }
    if (hubConnection.connectionId !== undefined) {
      dispatch(setUserStatus("Pending"));
      try {
        loginUser(name, tempWhiteBoardName, hubConnection.connectionId)
          .then(() => {
            dispatch(setUserName(name));
            dispatch(setUserStatus("Online"));
          })
      } catch {
        dispatch(setUserStatus("Offline"));
        throw new Error("Couldn't log in...");
      }
    }
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input value={name} minLength={2} maxLength={10} onChange={(e) => { setName(e.target.value) }} type="text" />
      <button onClick={onLoginEventHandler}>Let me in!</button>
    </div>

  )
}

export default Login;