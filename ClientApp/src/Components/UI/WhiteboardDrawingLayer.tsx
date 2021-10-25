import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import { HubConnectionContext } from '../../Utils/Context/HubConnectionContext';
import * as signalR from '@microsoft/signalr';
import { NewDrawingPayload } from '../../Types/newDrawingPayload';
import { SendToHub } from '../../Utils/SignalR/SignalRHub';

const WhiteboardDrawingLayer: React.FC = () => {
  const [hubConnection] = useContext(HubConnectionContext);
  const [pointerPosition, setPointerPosition] = useState<[number, number]>([0, 0]);
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const pointerRef = useRef(pointerPosition);
  const setPointerPositionExpanded = (position: [number, number]) => {
    setPointerPosition(position);
    pointerRef.current = position;
  }
  const canvasRef: React.RefObject<HTMLCanvasElement> = createRef();
  const [canvasDimensions, setCanvasDimensions] = useState({ height: window.innerHeight, width: window.innerWidth });

  const onWindowResizeEventHandler = () => {
    setCanvasDimensions({ height: window.innerHeight, width: window.innerWidth });
  }

  const onMouseMoveEventHandler: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (mouseIsDown) {
      console.log(e.pageX, e.pageY);
      const x = e.pageX;
      const y = e.pageY;
      const payload: NewDrawingPayload = { lastX: pointerRef.current[0], lastY: pointerRef.current[1], newX: x, newY: y };
      SendToHub(payload, "newDrawing", (hubConnection as signalR.HubConnection));
      setPointerPositionExpanded([x, y]);
    }
  }
  const onTouchMoveEventHandler: React.TouchEventHandler<HTMLCanvasElement> = (e) => {
    const x = e.targetTouches[0].clientX;
    const y = e.targetTouches[0].clientY;

    setPointerPositionExpanded([x, y]);
  }
  const onTouchStartEventHandler: React.TouchEventHandler<HTMLCanvasElement> = (e) => {
    const x = e.targetTouches[0].clientX;
    const y = e.targetTouches[0].clientY;
    setPointerPositionExpanded([x, y]);
  }
  const onMouseDownEventHandler: React.MouseEventHandler = (e) => {
    const x = e.pageX;
    const y = e.pageY;
    setPointerPositionExpanded([x, y]);
    setMouseIsDown(true);
  }

  const draw = (payload: NewDrawingPayload) => {
    var ctx = canvasRef.current?.getContext("2d");
    console.log("drawing!!!", ctx);
    ctx?.moveTo(payload.lastX, payload.lastY);
    ctx?.lineTo(payload.newX, payload.newY);
    ctx?.stroke();
  }

  useEffect(() => {
    window.addEventListener("resize", onWindowResizeEventHandler);

    return () => {
      window.removeEventListener("resize", onWindowResizeEventHandler);
    }

  }, [])

  useEffect(() => {
    if (canvasRef.current != null) {
      (hubConnection as signalR.HubConnection).on("newDrawing", (payload: NewDrawingPayload) => {
        draw(payload);
      });
    }
    return () => {

    }
  }, [canvasRef])



  return (
    <canvas
      className="penCursor"
      ref={canvasRef}
      onTouchStart={onTouchStartEventHandler}
      onTouchMove={onTouchMoveEventHandler}
      onMouseMove={onMouseMoveEventHandler}
      onMouseDown={onMouseDownEventHandler}
      onMouseUp={() => { setMouseIsDown(false); }}
      onMouseLeave={() => { setMouseIsDown(false); }}
      width={canvasDimensions.width}
      height={canvasDimensions.height}>
    </canvas>
  )
}

export default WhiteboardDrawingLayer;