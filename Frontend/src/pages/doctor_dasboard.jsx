import React, { useState, useEffect } from 'react';
import Navbar from '../component/navbar';
import api from '../api';
import Sidebar1 from '../component/sidebar';
import { Link } from 'react-router-dom';
import propic from '../assets/img/demoprofile.png';



export default function Doctor_dashboard({ children }) {
  const [profileDetails, setProfileDetails] = useState(null);
  const [profile_pic, setProfile_pic]= useState(propic)

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const appointData = await api.get('api/doctor_appointment/');
      } catch (error) {
        console.log(error);
      }

      try {
        const profileData = await api.get('api/Profile_view/');
        setProfileDetails(profileData.data[0]);
        setProfile_pic(profileData.data[0].user_profile_pic?profileData.data[0].user_profile_pic:propic)
      } catch (error) {
        console.log(error);
      }
    };

    fetchDatas();
  }, []);

  return (
    <div className="dashboard_main">
      {profileDetails && (
        <Sidebar1 user_name={profileDetails.user_name.username} profile_pic={profile_pic} >{children}</Sidebar1>
      )}
  
    </div>
  );
}
