// import React, { useEffect, useState } from 'react';
import '../assets/css/dashboard2.css';
// import { FaGem, FaHeart } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const Sidebar3 = ({ user_name = 'User', profile_pic = '' }) => {
//   const [isLog, setIsLog] = useState(false);
//   const [role, setRole] = useState('');

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const status = localStorage.getItem('login_status');
//       const ro = localStorage.getItem('role');
      
//       if (status === 'logined') {
//         setIsLog(true);
//         setRole(ro); 
//       }
//     };

//     checkLoginStatus();
//   }, []);

//   if (!isLog) {
//     return null; 
//   }

//   return (
//     <div className="sidebar">
//       <ProSidebar>
//         <Menu iconShape="square" className='sidebarmain'>
//           <MenuItem>
//             <img src={profile_pic} alt="img not loaded" className='profileimg' />
//           </MenuItem>
//           <p className="username-menu-item">{user_name}</p>
//           <MenuItem icon={<FaGem />}><Link to={'/nurse-dashboard'}>Profile</Link></MenuItem>
//           <MenuItem icon={<FaGem />}><Link to={'/nurse-dashboard/appointments'}>All Appointments</Link></MenuItem>
//           <MenuItem icon={<FaGem />}><Link to={'/nurse-dashboard/bookappointment'}>Book Appointment</Link></MenuItem>

//           <SubMenu title="Components" icon={<FaHeart />}>
//             <MenuItem>Profile</MenuItem>
//             <MenuItem>Component 2</MenuItem>
//           </SubMenu>
//         </Menu>
//       </ProSidebar>
//     </div>
//   );
// };

// export default Sidebar3;




import React, { useState, useEffect } from 'react';
import Sidebar from 'react-sidebar';


const Sidebar3 = ({children}) => {
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
          <div className="sidebar-logo">
            <img src="logo.png" alt="Logo" />
          </div>
          {!isMobile && (
            <div className="sidebar-menu">
              <div>Profile</div>
              <div>Settings</div>
            </div>
          )}
          {isMobile && (
            <div className="sidebar-menu">
              <i class="fa-solid fa-bars" ></i>
            </div>
          )}
        </div>
      }
      
      styles={{ sidebar: { background: 'white', width: isMobile ? '80px' : '200px' } }}
      docked={true}
      >
      <div className="content">
        {children}
        
      </div>
      
    </Sidebar>
  );
};

export default Sidebar3;






