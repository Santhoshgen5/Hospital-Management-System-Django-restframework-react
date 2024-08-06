import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'
import Sidebar3 from '../component/sidebar3';
import propic from '../assets/img/demoprofile.png';
import { Link } from 'react-router-dom';


export default function Nurse_dasboard({children}) {
  const [profileDetails, setProfileDetails] = useState(null);
  const [profile_pic, setProfile_pic]= useState(propic)

  useEffect(()=>{
    const appointments = async()=>{
      try{
        const data = await api.get('api/nurse_appointment/')
        console.log(data)
      }catch(error){
        console.log(error)
      }
      try {
        const profileData = await api.get('api/Profile_view/');
        setProfileDetails(profileData.data[0]);
        setProfile_pic(profileData.data[0].user_profile_pic?profileData.data[0].user_profile_pic:propic)
      } catch (error) {
        console.log(error);
      }
    }
    appointments()
  }, [])
   


  return (
    <div className="dashboard_main">
    {profileDetails && (
      <Sidebar3 user_name={profileDetails.user_name.username} profile_pic={profile_pic} >{children}</Sidebar3>
    )}
    </div>
    

  )
}
