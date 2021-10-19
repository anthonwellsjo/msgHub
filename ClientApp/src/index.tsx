import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginManager from './Components/Auth/LoginManager';
import RTDataManager from './Components/SignalR/RTDataManager';

ReactDOM.render(
  <React.StrictMode>
    <RTDataManager>
      <LoginManager>
        <App />
      </LoginManager>
    </RTDataManager>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
