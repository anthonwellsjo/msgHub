import React, { useContext, useEffect, useRef, useState } from 'react';
import { PostIt } from '../../Types/postIt';
import { HubConnectionContext } from '../../Utils/Context/HubConnectionContext';
import * as signalR from '@microsoft/signalr';
import { MovePostItPayload } from '../../Types/movePostItPayload';
import { whiteBoardName } from '../../Utils/Utils';



const PostItUI: React.FC<PostIt> = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(isDragging);
  const setIsDraggingExpanded = (value: boolean) => {
    setIsDragging(value);
    isDraggingRef.current = value;
  }

  const [offset, setOffset] = useState([0, 0]);
  const offsetRef = useRef(offset);
  const setOffsetExpanded = (XY: [number, number]) => {
    setOffset(XY);
    offsetRef.current = XY;
  }

  const [hubConnection] = useContext<any>(HubConnectionContext);

  const MouseMoveEventHandler = (e: any) => {
    if (isDraggingRef.current === true) {
      const x = e.screenX - offsetRef.current[0];
      const y = e.clientY - offsetRef.current[1];
      const payload: MovePostItPayload = { x: x, y: y, postItId: props.id };
      (hubConnection as signalR.HubConnection).send("movePostIt", payload, whiteBoardName);
    }
  }
  const onDragStartEventHander: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.nativeEvent.offsetY < 50) {
      setOffsetExpanded([e.nativeEvent.offsetX, e.nativeEvent.offsetY])
      setIsDraggingExpanded(true);
    }
  }
  const onTouchMoveEventHandler: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (isDraggingRef.current === true) {
      const x = Math.floor(e.targetTouches[0].clientX - offsetRef.current[0]);
      const y = Math.floor(e.targetTouches[0].clientY - offsetRef.current[1]);
      const payload: MovePostItPayload = { x: x, y: y, postItId: props.id };
      (hubConnection as signalR.HubConnection).send("movePostIt", payload, whiteBoardName);
    }
  }
  const onTouchStartEventHander: React.TouchEventHandler<HTMLDivElement> = (e: any) => {
    var bcr = e.target.getBoundingClientRect();
    var offsetX = e.targetTouches[0].clientX - bcr.x;
    var offsetY = e.targetTouches[0].clientY - bcr.y;

    if (offsetY < 50) {
      setOffsetExpanded([offsetX, offsetY])
      setIsDraggingExpanded(true);
    }
  }
  const onDragStopEventHander = () => {
    setIsDraggingExpanded(false);
  }

  useEffect(() => {
    window.addEventListener("mousemove", MouseMoveEventHandler)

    return () => {
      window.removeEventListener("mousemove", MouseMoveEventHandler);
    }
  }, [])


  return (
    <div
      onMouseDown={onDragStartEventHander}
      onMouseUp={onDragStopEventHander}
      onTouchStart={onTouchStartEventHander}
      onTouchMove={onTouchMoveEventHandler}
      onTouchEnd={onDragStopEventHander}
      style={{
        touchAction: "none",
        position: "absolute",
        top: props.position.y,
        left: props.position.x,
        width: "150px",
        height: "150px",
        backgroundColor: "lightyellow",
        background: "#FFF09F",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "2px",
        padding: "15px",
        boxSizing: "border-box",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
      }}>
      <h4 >{props.header}</h4>
      <p>{props.id}</p>
    </div>
  )
}

export default PostItUI;