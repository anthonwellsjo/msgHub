import React, { useContext } from 'react';
import { PostIt } from '../../Types/postIt';
import { HubConnectionContext } from '../../Utils/Context/HubConnectionContext';
import * as signalR from '@microsoft/signalr';
import { MovePostItPayload } from '../../Types/movePostItPayload';
import { whiteBoardName } from '../../Utils/Utils';



const PostItUI: React.FC<PostIt> = (props) => {

  const [hubConnection, setHubConnection] = useContext<any>(HubConnectionContext);
  const onDragEventHander = () => {
    console.log("sending");
    const payload: MovePostItPayload = { x: 2, y: 2, postItId: props.id };
    (hubConnection as signalR.HubConnection).send("movePostIt", payload, whiteBoardName);
  }



  return (
    <div
      draggable
      onTouchMove={() => console.log("onTouchMoveEMove")}
      onTouchEnd={() => console.log("onTouchMoveEnd")}
      onTouchStart={onDragEventHander}
      onDrag={() => console.log("drag")}
      onDragEnter={() => console.log("drag enter")}
      onDragExit={() => console.log("drag exit")}
      onDragStart={() => console.log("drag start")}
      onDragEnd={() => console.log("drag end")}

      style={{ position: "absolute", top: props.position.y, left: props.position.x, width: "150px", height: "150px", backgroundColor: "lightyellow" }}>
      <h4>{props.header}</h4>
      <p>{props.id}</p>
    </div>
  )
}

export default PostItUI;