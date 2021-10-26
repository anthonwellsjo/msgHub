import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import { loginUser } from '../../Utils/api';
import { HubConnectionContext } from '../../Utils/Context/HubConnectionContext';
import { setUserName, setUserStatus } from '../../Utils/Redux/features/msgHub/userSlice';
import { useAppDispatch } from '../../Utils/Redux/hooks';
import { randomName, tempWhiteBoardName } from '../../Utils/Utils';
import Loader from './Loader';



const Login: React.FC = () => {
  const [name, setName] = useState("");
  const nameRef = useRef(name);
  const setNameExpanded = (name: string) => {
    setName(name);
    nameRef.current = name;
  }
  const [generatingName, setGeneratingName] = useState(false);
  const [hubConnection] = useContext<any>(HubConnectionContext);
  const dispatch = useAppDispatch();
  const loginRef: React.RefObject<HTMLInputElement> = createRef();


  const onLoginEventHandler = () => {
    if (nameRef.current.length < 1) {
      setGeneratingName(true);
      setTimeout(() => {
        setNameExpanded(randomName().split("").map((l, i) => i === 0 ? l.toUpperCase() : l).join(""));
        setGeneratingName(false);
      }, 500);
      return;
    }
    if (hubConnection.connectionId !== undefined) {
      dispatch(setUserStatus("Pending"));
      try {
        loginUser(nameRef.current, tempWhiteBoardName, hubConnection.connectionId)
          .then(() => {
            dispatch(setUserName(nameRef.current));
            dispatch(setUserStatus("Online"));
          })
      } catch {
        dispatch(setUserStatus("Offline"));
        throw new Error("Couldn't log in...");
      }
    }
  }

  const onKeyDownEventHandler = (e: any) => {
    if (e.key === "Enter") {
      onLoginEventHandler();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyDownEventHandler);

    return () => {
      window.removeEventListener("keydown", onKeyDownEventHandler);
    }
  }, [])

  useEffect(() => {
    loginRef?.current?.focus();
  }, [loginRef])


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input style={{
        outline: "none",
        border: "none",
        borderBottom: "3px solid black",
        width: "200px",
        textAlign: "center",
        fontSize: "2em"
      }}
        ref={loginRef}
        value={name}
        minLength={2}
        maxLength={10}
        onChange={(e) => { setNameExpanded(e.target.value) }} type="text" />
      <button
        className="button"
        style={{
          marginTop: "50px",
          fontSize: "3em",
          width: "100px",
          height: "100px",
          borderRadius: "100px",
          cursor: "pointer"
        }}
      >
        {name.length < 1 && !generatingName && <svg onClick={onLoginEventHandler} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height=".5em" width=".5em" xmlns="http://www.w3.org/2000/svg"><path d="M11.001 10H13.001V15H11.001zM11 16H13V18H11z"></path><path d="M13.768,4.2C13.42,3.545,12.742,3.138,12,3.138s-1.42,0.407-1.768,1.063L2.894,18.064 c-0.331,0.626-0.311,1.361,0.054,1.968C3.313,20.638,3.953,21,4.661,21h14.678c0.708,0,1.349-0.362,1.714-0.968 c0.364-0.606,0.385-1.342,0.054-1.968L13.768,4.2z M4.661,19L12,5.137L19.344,19H4.661z"></path></svg>}
        {name.length > 0 && <svg onClick={onLoginEventHandler} stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height=".5em" width=".5em" xmlns="http://www.w3.org/2000/svg"><path d="M6 8h-5v-2h5v-2l3 3-3 3zM16 0v13l-6 3v-3h-6v-4h1v3h5v-9l4-2h-9v4h-1v-5z"></path></svg>}
        {generatingName && <Loader />}
      </button>
    </div>

  )
}

export default Login;