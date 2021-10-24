import React, { useEffect } from 'react';
import './App.css';
import Body from './Components/UI/Body';
import Header from './Components/UI/Header';
import Loader from './Components/UI/Loader';
import Login from './Components/UI/LogIn';
import Whiteboard from './Components/UI/Whiteboard';
import { getWhiteboard } from './Utils/api';
import { selectUserName, selectUserStatus } from './Utils/Redux/features/msgHub/userSlice';
import { selectWhiteboard, setWhiteboard, fetchWhiteboard, selectFetchWhiteboardStatus } from './Utils/Redux/features/msgHub/whiteboardSlice';
import { useAppDispatch, useAppSelector } from './Utils/Redux/hooks';

function App() {
  const userStatus = useAppSelector(selectUserStatus);
  const userName = useAppSelector(selectUserName);
  const whiteboard = useAppSelector(selectWhiteboard);
  const whiteboardFetchStatus = useAppSelector(selectFetchWhiteboardStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userStatus === "Online" && whiteboard === undefined) {
      dispatch(fetchWhiteboard("1"));
    }
  }, [userStatus, whiteboard, dispatch])


  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <canvas>
      </canvas>
      <Header />
      <Body>
        {userStatus === "Offline" && <Login />}
        {userStatus === "Pending" && <Loader title="Logging in." />}
        {userStatus === "Online" && whiteboardFetchStatus === "pending" && <Loader title="Fetching whiteboard" />}
        {userStatus === "Online" && whiteboardFetchStatus === "done" && <Whiteboard />}
      </Body>
    </div>
  );
}

export default App;
