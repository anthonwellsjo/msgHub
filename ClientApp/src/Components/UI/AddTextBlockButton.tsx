import { produceWithPatches } from '@reduxjs/toolkit/node_modules/immer';
import React, { useState } from 'react';

interface props {
  color: string;
  onClick: () => void;
}

const AddTextBlockButton: React.FC<props> = ({ color, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div onClick={onClick} onMouseLeave={() => { setHover(false) }} onMouseEnter={() => { setHover(true) }} style={{ width: "100%", cursor: "pointer", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px", outline: "1px dotted grey", backgroundColor: hover ? color : "transparent", }}>
      <svg style={{ transform: "scale(2)" }} stroke="grey" fill="grey" strokeWidth="0" viewBox="0 0 1024 1024" version="1.1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z" ></path><path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z" ></path></svg>
    </div>
  )
}

export default AddTextBlockButton;