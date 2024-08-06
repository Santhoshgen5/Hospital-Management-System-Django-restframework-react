import '../assets/css/sidebar.css'; 
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from 'react-sidebar';


const Sidebar1 = ({children, user_name = 'User', profile_pic = '' }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <Sidebar
      sidebar={
        <div className="sidebar-content">
          {!isMobile && (
            <>
            <div className='backbtn'><Link  to={'/'}>Back</Link></div>
            <div className="sidebar-logo" style={{textAlign:"center"}}>
              <img style={{borderRadius:'50%',height:'140px',width:'140px'}} src={profile_pic} alt="Logo" />
            </div>
            
            <div className="sidebar-menu">
              <div className='sidebaroptions'><Link  to={'/doctor-dashboard'}><i className="fa-solid fa-id-card"></i>Profile</Link></div>    
              <div className='sidebaroptions'><Link  to={'/doctor-dashboard/appointments'}><i class="fa-solid fa-notes-medical"></i>All Appointments</Link></div>
            </div>
            </>
          )}
          {isMobile && (
            <>
            <div className='backbtn'><Link  to={'/'}>Back</Link></div>
            <div className="sidebar-logo" style={{textAlign:"center"}}>
              <img style={{height:'54px', width:'54px', borderRadius:'50%'}} src={profile_pic} alt="Logo" />  
            </div>
            <div className="sidebar-menu">
              <div className='sidebaroptions'><Link  to={'/doctor-dashboard'}><i style={{fontSize:'25px'}} className="fa-solid fa-id-card"></i></Link></div>    
              <div className='sidebaroptions'><Link  to={'/doctor-dashboard/appointments'}><i style={{fontSize:'25px'}} class="fa-solid fa-notes-medical"></i></Link></div>
            </div>
            </>
          )}
        </div>
      }
      
      styles={{ sidebar: {  width: (isMobile) ? '80px' : '200px' } }}
      
      docked={true}
      >
      
      <div className="content">
        {children}
        
      </div>
      
    </Sidebar>
  );
};

export default Sidebar1;







