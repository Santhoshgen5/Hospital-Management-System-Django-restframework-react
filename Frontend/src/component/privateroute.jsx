import React from 'react'
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function PrivateRoute({children}) {
  const [Log, setIsLog] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const status = localStorage.getItem('login_status');
      if (status === 'logined') {
        setIsLog(true);
      }
    };

    checkLoginStatus();
  }, []);

    if (Log){
        const role = localStorage.getItem('role')
        return <Navigate to={`/${role}-dashboard`}/>
    }


  return children
}
