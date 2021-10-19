import React from 'react';
import logo from './Public/ymca_logo.png';
import './App.css';
import RTDataManager from './Components/SignalR/RTDataManager';

function App() {
  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        position: "absolute",
        left: 0,
        top: 0
      }}>
        <img width={100} src={logo} alt="logo" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input type="text" />
        <button>Let me in!</button>
      </div>
    </div>
  );
}

export default App;
