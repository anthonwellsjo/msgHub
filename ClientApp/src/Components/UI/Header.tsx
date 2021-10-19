import React from 'react';
import logo from '../../Public/ymca_logo.png';


const Header: React.FC = () => {
  return (
    <div style={{
      position: "absolute",
      left: 0,
      top: 0
    }}>
      <img width={100} src={logo} alt="logo" />
    </div>
  )
}

export default Header;