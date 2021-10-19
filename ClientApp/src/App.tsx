import React from 'react';
import './App.css';
import Header from './Components/UI/Header';
import Login from './Components/UI/LogIn';

function App() {
  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Header />
      <Login />
    </div>
  );
}

export default App;
