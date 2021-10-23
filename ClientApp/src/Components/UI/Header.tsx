import React from 'react';
import logo from '../../Public/ymca_logo.png';
import { selectUserStatus } from '../../Utils/Redux/features/msgHub/userSlice';
import { useAppSelector } from '../../Utils/Redux/hooks';
import NewPostIt from './NewPostIt';


const Header: React.FC = () => {
  const userStatus = useAppSelector(selectUserStatus);


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
      <img style={{ marginTop: "40px", marginLeft:"10px" }} width={100} src={logo} alt="logo" />
      {userStatus === "Online" && <NewPostIt />}
    </div>
  )
}

export default Header;