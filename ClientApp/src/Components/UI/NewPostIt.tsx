import React, { useContext } from 'react';
import { NewPostItPayloadFromClient } from '../../Types/newPostItPayload';
import { PostItPosition } from '../../Types/postItPosition';
import { HubConnectionContext } from '../../Utils/Context/HubConnectionContext';
import { selectUserName } from '../../Utils/Redux/features/msgHub/userSlice';
import { useAppSelector } from '../../Utils/Redux/hooks';
import { SendToHub } from '../../Utils/SignalR/SignalRHub';
import PlusButton from './PlusButton';

const NewPostIt: React.FC = () => {
  const [hubConnection] = useContext(HubConnectionContext);
  const offsetY = 50;
  const offsetX = 50;
  const username = useAppSelector(selectUserName);

  const onNewPostItMouse: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    const position: PostItPosition = { isMoving: true, x: x, y: y };
    if (username) {
      const payload: NewPostItPayloadFromClient = { position: position, createdBy: username };
      SendToHub(payload, "newPostIt", (hubConnection as signalR.HubConnection));
    } else {
      throw new Error("No username available to create postit");
    }
  }

  const onNewPostItTouch: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const x = Math.floor(e.targetTouches[0].clientX - offsetX);
    const y = Math.floor(e.targetTouches[0].clientY - offsetY);
    const position: PostItPosition = { isMoving: true, x: x, y: y };
    if (username) {
      const payload: NewPostItPayloadFromClient = { position: position, createdBy: username };
      SendToHub(payload, "newPostIt", (hubConnection as signalR.HubConnection));

    } else {
      throw new Error("No username available to create postit");
    }
  }


  return (
    <div
      onMouseDown={onNewPostItMouse}
      onTouchStart={onNewPostItTouch}
      style={{
        cursor: "pointer",
        userSelect: "none",
        touchAction: "none",
        position: "absolute",
        top: "20px",
        right: "40px",
        width: "50px",
        height: "50px",
        backgroundColor: "lightyellow",
        background: "#FFF09F",
        // boxShadow: props.PostIt.position.isMoving ? "0px 14px  15px rgba(0, 0, 0, 0.25)" : "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "2px",
        padding: "15px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <PlusButton scale={1.3} />
    </div>
  )
}

export default NewPostIt;