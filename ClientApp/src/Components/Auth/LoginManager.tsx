import React, { useEffect } from 'react';

const LoginManager: React.FC = ({ children }) => {

  useEffect(() => {
    setTimeout(() => {
      fetch("/whiteboard")
        .then(response => response.json())
        .then(data => { console.log(data) })
    }, 2000);
  }, [])
  return (
    <div>
      {children}
    </div>
  )
}

export default LoginManager;