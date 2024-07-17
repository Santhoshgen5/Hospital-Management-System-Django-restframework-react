import React, { useEffect, useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../assets/css/dashboard.css';
import { FaGem, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ({ user_name = 'User', profile_pic = '' }) => {
  const [isLog, setIsLog] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const checkLoginStatus = () => {
      const status = localStorage.getItem('login_status');
      const ro = localStorage.getItem('role');
      
      if (status === 'logined') {
        setIsLog(true);
        setRole(ro); 
      }
    };

    checkLoginStatus();
  }, []);

  if (!isLog) {
    return null; 
  }

  return (
    <div className="sidebar">
      <ProSidebar>
        <Menu iconShape="square" className='sidebarmain'>
          <MenuItem>
            <img src={profile_pic} alt="img not loaded" className='profileimg' />
          </MenuItem>
          <p className="username-menu-item">{user_name}</p>
          <MenuItem icon={<FaGem />}><Link to={'/doctor-dashboard'}>Profile</Link></MenuItem>
          <MenuItem icon={<FaGem />}><Link to={'/doctor-dashboard/appointments'}>Your Appointments</Link></MenuItem>
          <SubMenu title="Components" icon={<FaHeart />}>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
