import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../component/navbar'
import api from '../api'
import { Link } from 'react-router-dom'
import Sidebar2 from '../component/sidebar2'
import propic from '../assets/img/demoprofile.png'



export default function Patient_dasboard({children}) {
  
  const [profile_details, setProfile_details]= useState()
  const [profile_pic, setProfile_pic]=useState(propic)


  useEffect(()=>{
    const datas = async()=>{
      try{
        const appointdata = await api.get('api/patient_appointment/')

      }catch(error){
        console.log(error)
      }

      try{
        const profiledata = await api.get('api/Profile_view/')
        setProfile_details(profiledata.data[0])
        setProfile_pic(profiledata.data[0].user_profile_pic?profiledata.data[0].user_profile_pic:propic)

      }catch(error){
        console.log(error)
      }
    }

    datas()
    
    
  }, [])

  


  return (

    <div className="dashboard_main">
    {profile_details && <Sidebar2 user_name={profile_details.user_name.username} profile_pic={profile_pic}>{children}</Sidebar2>}
    
    </div>
  );
}

