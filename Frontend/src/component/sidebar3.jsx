

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



import '../assets/css/sidebar.css'; 
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from 'react-sidebar';


const Sidebar3 = ({children, user_name = 'User', profile_pic = '' }) => {
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
              <div className='sidebaroptions'><Link  to={'/nurse-dashboard'}><i className="fa-solid fa-id-card"></i>Profile</Link></div>    
              <div className='sidebaroptions'><Link  to={'/nurse-dashboard/appointments'}><i class="fa-solid fa-notes-medical"></i>All Appointments</Link></div>
              <div className='sidebaroptions'><Link  to={'/nurse-dashboard/bookappointment'}><i class="fa-solid fa-user-doctor"></i>Book Appointment</Link></div>
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
              <div className='sidebaroptions'><Link  to={'/nurse-dashboard'}><i style={{fontSize:'25px'}} className="fa-solid fa-id-card"></i></Link></div>    
              <div className='sidebaroptions'><Link  to={'/nurse-dashboard/appointments'}><i style={{fontSize:'25px'}} class="fa-solid fa-notes-medical"></i></Link></div>
              <div className='sidebaroptions'><Link className='sidebaroptions' to={'/nurse-dashboard/bookappointment'}><i style={{fontSize:'25px'}} class="fa-solid fa-user-doctor"></i></Link></div>
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

export default Sidebar3;






