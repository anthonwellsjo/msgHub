import React, { useState } from 'react';
import { selectHubConnectionId } from '../../Utils/Redux/features/msgHub/hubConnectionSlice';
import { useAppSelector } from '../../Utils/Redux/hooks';



const Login: React.FC = () => {
  const [name, setName] = useState("");
  const whiteBoardName = "redroom";
  const connectionId = useAppSelector(selectHubConnectionId)

  const onLoginEventHandler = () => {
    if (connectionId !== undefined) {
      fetch(`/User/Login?username=${name}&whiteBoardName=${whiteBoardName}&connectionId=${connectionId}`, {
        method: "post",
      })
    }
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input value={name} maxLength={10} onChange={(e) => { setName(e.target.value) }} type="text" />
      <button onClick={onLoginEventHandler}>Let me in!</button>
    </div>

  )
}

export default Login;