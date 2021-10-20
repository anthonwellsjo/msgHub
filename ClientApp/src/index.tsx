import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SignalRManager from './Components/SignalR/SignalRManager';
import { Provider } from 'react-redux';
import { store } from './Utils/Redux/store';
import { HubConnectionProvider } from './Components/Context/HubConnectionContext';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HubConnectionProvider>
        <SignalRManager />
        <App />
      </HubConnectionProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
