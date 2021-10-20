import React, { useContext, useEffect, useRef, useState } from 'react';
import { PostIt } from '../../Types/postIt';
import { HubConnectionContext } from '../../Utils/Context/HubConnectionContext';
import * as signalR from '@microsoft/signalr';
import { MovePostItPayload } from '../../Types/movePostItPayload';
import { whiteBoardName } from '../../Utils/Utils';

interface props {
  PostIt: PostIt,
  onOpen: (PostIt: PostIt) => void
}

const PostItSmall: React.FC<props> = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [timer, setTimer] = useState(Date.now());
  const [offset, setOffset] = useState([0, 0]);
  const [hubConnection] = useContext<any>(HubConnectionContext);


  const isDraggingRef = useRef(isDragging);
  const setIsDraggingExpanded = (value: boolean) => {
    setIsDragging(value);
    isDraggingRef.current = value;
  }

  const offsetRef = useRef(offset);
  const setOffsetExpanded = (XY: [number, number]) => {
    setOffset(XY);
    offsetRef.current = XY;
  }

  const CheckDoubleClick = () => {
    if (timer != null) {
      if (Date.now() - timer < 500) {
        props.onOpen(props.PostIt);
        return true;
      } else {
        setTimer(Date.now());
        return false;
      }
    } else {
      setTimer(Date.now());
      return false;
    }
  }


  const MouseMoveEventHandler = (e: any) => {
    if (isDraggingRef.current === true) {
      const x = e.clientX - offsetRef.current[0];
      const y = e.clientY - offsetRef.current[1];
      const payload: MovePostItPayload = { x: x, y: y, postItId: props.PostIt.id };
      (hubConnection as signalR.HubConnection).send("movePostIt", payload, whiteBoardName);
    }
  }
  const onMouseDownEventHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const isDbClick = CheckDoubleClick();

    if (isDbClick === false) {
      setOffsetExpanded([e.nativeEvent.offsetX, e.nativeEvent.offsetY])
      setIsDraggingExpanded(true);
    }

  }
  const onTouchMoveEventHandler: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (isDraggingRef.current === true) {
      const x = Math.floor(e.targetTouches[0].clientX - offsetRef.current[0]);
      const y = Math.floor(e.targetTouches[0].clientY - offsetRef.current[1]);
      const payload: MovePostItPayload = { x: x, y: y, postItId: props.PostIt.id };
      (hubConnection as signalR.HubConnection).send("movePostIt", payload, whiteBoardName);
    }
  }
  const onTouchStartEventHander: React.TouchEventHandler<HTMLDivElement> = (e: any) => {
    const isDbClick = CheckDoubleClick();

    if (isDbClick === false) {

      var bcr = e.target.getBoundingClientRect();
      var offsetX = e.targetTouches[0].clientX - bcr.x;
      var offsetY = e.targetTouches[0].clientY - bcr.y;


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
      onMouseDown={onMouseDownEventHandler}
      onMouseUp={onDragStopEventHander}
      onTouchStart={onTouchStartEventHander}
      onTouchMove={onTouchMoveEventHandler}
      onTouchEnd={onDragStopEventHander}
      style={{
        cursor: "pointer",
        userSelect: "none",
        touchAction: "none",
        position: "absolute",
        top: props.PostIt.position.y,
        left: props.PostIt.position.x,
        width: "150px",
        height: "150px",
        backgroundColor: "lightyellow",
        background: "#FFF09F",
        boxShadow: `0px ${isDragging ? "14px  15px" : "4px 4px"} rgba(0, 0, 0, 0.25)`,
        borderRadius: "2px",
        padding: "15px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <h4 style={{ textAlign: "center", fontFamily: "handwriting", fontSize: "1.2em", marginTop: "-10px" }}>{props.PostIt.header}</h4>
      <div style={{ position: "absolute", color: "grey", bottom: "-10px", right: "10px", fontSize: "0.75em" }}>
        <p>{props.PostIt.createdBy}</p>
      </div>
    </div>
  )
}

export default PostItSmall;