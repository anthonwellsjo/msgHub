import React, { createRef, useEffect, useState } from 'react';

const WhiteboardDrawingLayer: React.FC = () => {
  const canvasRef: React.RefObject<HTMLCanvasElement> = createRef();
  const [canvasDImensions, setCanvasDimensions] = useState({ height: window.innerHeight, width: window.innerWidth });

  const onWindowResizeEventHandler = () => {
    setCanvasDimensions({ height: window.innerHeight, width: window.innerWidth });
  }

  useEffect(() => {
    window.addEventListener("resize", onWindowResizeEventHandler);

    return () => {
      window.removeEventListener("resize", onWindowResizeEventHandler);
    }

  }, [])

  useEffect(() => {
    var canvas = canvasRef.current;
    var ctx = canvas?.getContext("2d");
    ctx?.moveTo(0, 0);
    ctx?.lineTo(200, 100);
    ctx?.stroke();
  }, [canvasRef])


  return (
    <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{ border: "1px solid #000000" }}>
    </canvas>
  )
}

export default WhiteboardDrawingLayer;