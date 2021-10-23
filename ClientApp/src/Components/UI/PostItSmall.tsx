import React, { useContext, useEffect, useRef, useState } from 'react';
import { PostIt } from '../../Types/postIt';
import { HubConnectionContext } from '../../Utils/Context/HubConnectionContext';
import * as signalR from '@microsoft/signalr';
import { MovePostItPayload } from '../../Types/movePostItPayload';
import { useAppDispatch, useAppSelector } from '../../Utils/Redux/hooks';
import { tempWhiteBoardName } from '../../Utils/Utils';
import { IsPostItMovingFromClient } from '../../Types/isPostItMoving';
import { SendToHub } from '../../Utils/SignalR/SignalRHub';
import PlusButton from './PlusButton';
import { selectUserName } from '../../Utils/Redux/features/msgHub/userSlice';
import { EditPostItHeaderFromClient } from '../../Types/editPostItHeader';


interface props {
  PostIt: PostIt,
  onOpen: (PostItId: string) => void
}

const PostItSmall: React.FC<props> = (props) => {
  const isDragging = props.PostIt.position.isMoving;
  const [editHeader, setEditHeader] = useState(false);
  const [timer, setTimer] = useState(Date.now());
  const [offset, setOffset] = useState([0, 0]);
  const [hubConnection] = useContext<any>(HubConnectionContext);
  const username = useAppSelector(selectUserName);

  const isDraggingRef = useRef(isDragging);
  const setIsDraggingExpanded = (value: boolean) => {
    const payload: IsPostItMovingFromClient = { value: value, postItId: props.PostIt.id };
    SendToHub(payload, "isPostItMoving", (hubConnection as signalR.HubConnection));
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
        props.onOpen(props.PostIt.id);
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
      SendToHub(payload, "movePostIt", (hubConnection as signalR.HubConnection));
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
      SendToHub(payload, "movePostIt", (hubConnection as signalR.HubConnection));
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

  const onHeaderChangeEventHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const payload: EditPostItHeaderFromClient = { postItId: props.PostIt.id, value: e.target.value };
    SendToHub(payload, "editPostItHeader", (hubConnection as signalR.HubConnection));
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
        boxShadow: props.PostIt.position.isMoving ? "0px 14px  15px rgba(0, 0, 0, 0.25)" : "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "2px",
        padding: "15px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
      {props.PostIt.header.length < 1 && props.PostIt.createdBy === username && !editHeader &&
        <button onClick={() => { setEditHeader(true); }}>
          <PlusButton />
        </button>
      }
      {props.PostIt.createdBy === username && editHeader &&
        <input onChange={onHeaderChangeEventHandler} value={props.PostIt.header} />
      }
      {props.PostIt.header.length > 0 && !editHeader &&
        <h4 style={{ textAlign: "center", fontFamily: "handwriting", fontSize: "1.2em", marginTop: "-10px" }}>{props.PostIt.header}</h4>
      }
      <div style={{ position: "absolute", bottom: "-10px", right: "5px", fontSize: "0.7em", textAlign: "right" }}>
        <p className="subtitle">{props.PostIt.createdBy + " on " + new Date(props.PostIt.createdOn).toDateString() + "."}</p>
      </div>
    </div >
  )
}

export default PostItSmall;