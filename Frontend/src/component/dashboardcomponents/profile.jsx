import React from 'react';
import { useState, useEffect } from 'react';
import api from '../../api';

import propic from '../../assets/img/demoprofile.png';

export default function Profile() {
  const [profile_detail, setProfile_detail]= useState([])
  const [username, setusername] = useState('')
  const [city, setcity] = useState('')
  const [mobilenumber, setmobilenumber] = useState('')
  const [address, setaddress] = useState('')
  const [profile_pic, setProfile_pic]= useState(propic)


  useEffect(()=>{
    const datas = async()=>{
      try{
        const profiledata = await api.get('api/Profile_view/')
        setProfile_detail(profiledata.data[0])
        setusername(profiledata.data[0].user_name.username)
        setcity(profiledata.data[0].user_city)
        setmobilenumber(profiledata.data[0].user_phno)
        setaddress(profiledata.data[0].user_address)
        setProfile_pic(profiledata.data[0].user_profile_pic?profiledata.data[0].user_profile_pic:propic)

      }catch(error){
        console.log(error)
      }
    }

    datas()
    
    
  }, [])
  
  async function managesubmit(e){
    e.preventDefault()

    try{
      const datapatch = await api.patch(`api/profile_update/${profile_detail.id}`,{
        "user_city":city,
        "user_phno":mobilenumber,
        "user_address":address,
  
      })
      console.log(datapatch)
    }catch(error){
      console.log(error)

    }
    

  }

  return (
    <>
      <div className="card mb-3" style={{ width: "99%" }}>
        <div className="row g-0">
          <div className="col-12 col-sm-12 col-md-5 col-lg-5">
          <img  src={profile_pic} className="profimg img-fluid rounded-start" alt="Profile"/>
          </div>
          
          <div className="col-12 col-sm-12 col-md-7 col-lg-7">
            <div className="card-body">
              <h5 className="card-title">Profile</h5>
              <form onSubmit={managesubmit}>
                <div className="col-lg-8">
                  <div className="card">
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Username</h6>
                        </div>
                        <div className="col-sm-9 ">
                          <input type="text" className="form-control" value={username} onChange={(e)=>{ setusername(e.target.value)} } disabled />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Mobile</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <input type="text" className="form-control" value={mobilenumber} onChange={(e)=>{ setmobilenumber(e.target.value)} } />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">City</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <input type="text" className="form-control" value={city} onChange={(e)=>{ setcity(e.target.value)} }/>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Address</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <input type="text" className="form-control" value={address} onChange={(e)=>{ setaddress(e.target.value)} } />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-9 text-secondary">
                          <input type="submit" className="btn btn-primary px-4" value="Save Changes" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
