import React from 'react'
import { Link } from 'react-router-dom'
import HomePage from '../pages/homepage'
import Login from '../pages/homepage'
import '../assets/css/main.css'
import Logo from '../assets/img/mayo-clinic-logo.svg'
import { useState, useEffect } from 'react'


export default function Navbar({ scrollToLogin }) {
    const [Log, setIsLog] = useState(false);
    const [Role, setRole] = useState(null)

    useEffect(() => {
      const checkLoginStatus = () => {
        const status = localStorage.getItem('login_status');
        const ro = localStorage.getItem('role')
        if (status === 'logined') {
          setIsLog(true);
          setRole(ro)
        }
      };
  
      checkLoginStatus();
    }, []);

  return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{padding:'15px 0px'}}>
        <div className="container">
            <Link className="navbar-brand" to="/"><img className='logo' src={Logo} alt="" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-notes-medical"></i>Buy Medicine
                </Link>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="#">Action</Link></li>
                    <li><Link className="dropdown-item" to="#">Another action</Link></li>
                    <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                </ul>
                </li>
                {Log&&(<li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={`/${Role}-dashboard`} >
                <i className="fa-solid fa-id-card"></i>Dashboard
                </Link>
                </li>)}
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex" style={{marginRight:'10px'}}>
                {!Log&&(<li className="nav-item">
                <Link className="nav-link active loginbtn" aria-current="page" onClick={scrollToLogin} >
                <i className="fa-solid fa-right-to-bracket"></i>Login
                </Link>
                </li>)}
                {Log&&(<li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'/logout'} >
                <i className="fa-solid fa-right-to-bracket"></i>Logout
                </Link>
                </li>)}
            </ul>
            <ul className='navbar-nav mb-2 mb-lg-0 d-flex'>
                {!Log&&(<li className="nav-item">
                  <Link className="nav-link active loginbtn" aria-current="page" onClick={scrollToLogin} >
                  <i className="fa-solid fa-user-tie"></i>Admin
                  </Link>
                </li>)}
            </ul>

            </div>
        </div>
        </nav>
        </>
    )
}