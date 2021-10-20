import React from 'react';
import logo from '../../Public/ymca_logo.png';
import { selectLoggedInUsers } from '../../Utils/Redux/features/msgHub/whiteboardSlice';
import { useAppSelector } from '../../Utils/Redux/hooks';


const Header: React.FC = () => {

  const loggedInUsers = useAppSelector(selectLoggedInUsers);
  return (
    <div style={{
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <img style={{marginTop:"10px" }} width={100} src={logo} alt="logo" />

      <p style={{marginRight:"50px" }}>{loggedInUsers.join(", ")}</p>

    </div>
  )
}

export default Header;