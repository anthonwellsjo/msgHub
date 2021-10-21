import { produceWithPatches } from '@reduxjs/toolkit/node_modules/immer';
import React, { useState } from 'react';

interface props {
  color: string;
  onClick: () => void;
  children: React.ReactNode;
}

const AddTextBlockButton: React.FC<props> = ({ color, onClick, children }) => {
  const [hover, setHover] = useState(false);
  return (
    <div onClick={onClick} onMouseLeave={() => { setHover(false) }} onMouseEnter={() => { setHover(true) }} style={{ width: "100%", cursor: "pointer", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px", outline: "1px dotted grey", backgroundColor: hover ? color : "transparent", }}>
      {children}
    </div>
  )
}

export default AddTextBlockButton;