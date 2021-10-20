import React from 'react';
import { PostIt } from '../../Types/postIt';

interface props {
  PostIt: PostIt,
  onExit: () => void
}

const PostItBig: React.FC<props> = (props) => {
  return (
    <div
      onClick={props.onExit}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255,255,255,0.5)",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      }}>
      <div style={{
        zIndex: 1,
        background: "#FFF09F",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "2px",
        width: "492px",
        height: "564px"
      }}>

        <h3 style={{}}>{props.PostIt.header}</h3>
      </div>
    </div >
  )
}

export default PostItBig;