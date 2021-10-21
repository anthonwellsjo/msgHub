import React from 'react';
import PlusButton from './PlusButton';

const NewPostIt: React.FC = () => {
  return (
    <div
      // onMouseDown={onMouseDownEventHandler}
      // onMouseUp={onDragStopEventHander}
      // onTouchStart={onTouchStartEventHander}
      // onTouchMove={onTouchMoveEventHandler}
      // onTouchEnd={onDragStopEventHander}
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