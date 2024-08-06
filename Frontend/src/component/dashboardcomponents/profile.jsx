import React from 'react';
import { useState, useEffect } from 'react';
import api from '../../api';
import '../../assets/css/profilepage.css'
import propic from '../../assets/img/demoprofile.png';

export default function Profile() {
  const [profile_detail, setProfile_detail]= useState([])
  const [role, Setrole] = useState('')
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
        Setrole(profiledata.data[0].user_name.role)
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
      alert('Successfully Updated !')
    }catch(error){
      console.log(error)

    }
    

  }

  return (
  //   <>
  //     <div className="card mb-3" style={{ width: "99%" }}>
  //       <div className="row g-0">
  //         <div className="col-12 col-sm-12 col-md-5 col-lg-5">
  //         <img  src={profile_pic} className="profimg img-fluid rounded-start" alt="Profile"/>
  //         </div>
          
  //         <div className="col-12 col-sm-12 col-md-7 col-lg-7">
  //           <div className="card-body">
  //             <h5 className="card-title">Profile</h5>
  //             <form onSubmit={managesubmit}>
  //               <div className="col-lg-8">
  //                 <div className="card">
  //                   <div className="card-body">
  //                     <div className="row mb-3">
  //                       <div className="col-sm-3">
  //                         <h6 className="mb-0">Username</h6>
  //                       </div>
  //                       <div className="col-sm-9 ">
  //                         <input type="text" className="form-control" value={username} onChange={(e)=>{ setusername(e.target.value)} } disabled />
  //                       </div>
  //                     </div>
  //                     <div className="row mb-3">
  //                       <div className="col-sm-3">
  //                         <h6 className="mb-0">Mobile</h6>
  //                       </div>
  //                       <div className="col-sm-9 text-secondary">
  //                         <input type="text" className="form-control" value={mobilenumber} onChange={(e)=>{ setmobilenumber(e.target.value)} } />
  //                       </div>
  //                     </div>
  //                     <div className="row mb-3">
  //                       <div className="col-sm-3">
  //                         <h6 className="mb-0">City</h6>
  //                       </div>
  //                       <div className="col-sm-9 text-secondary">
  //                         <input type="text" className="form-control" value={city} onChange={(e)=>{ setcity(e.target.value)} }/>
  //                       </div>
  //                     </div>
  //                     <div className="row mb-3">
  //                       <div className="col-sm-3">
  //                         <h6 className="mb-0">Address</h6>
  //                       </div>
  //                       <div className="col-sm-9 text-secondary">
  //                         <input type="text" className="form-control" value={address} onChange={(e)=>{ setaddress(e.target.value)} } />
  //                       </div>
  //                     </div>
  //                     <div className="row">
  //                       <div className="col-sm-3"></div>
  //                       <div className="col-sm-9 text-secondary">
  //                         <input type="submit" className="btn btn-primary px-4" value="Save Changes" />
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  <>
  <div className="promaincon">
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-3" style={{margin:'10px 0px'}}>
          <div className='profcon1'>
            <div className='imgdiv'>
              <img style={{height:'220px',width:'220px',borderRadius:'50%'}} src={profile_pic} alt="" />
            </div>
            <h3 style={{textAlign:'center'}}>{username}</h3>
            <p style={{textAlign:'center', fontSize:'18px'}}>welcome {role} {username}</p>
            {role=='nurse' && <p style={{padding:'0px 4px 0px 4px', fontSize:'14px'}}>In Nurse Dashboard You Can Able To See all The Appointments,Receipt And You Can Book Appoinments, Receipts For Patient And Doctor</p>}
            {role=='doctor' && <p style={{padding:'0px 4px 0px 4px', fontSize:'14px'}}>In Doctor Dashboard You Can Able To See The Appointments,Receipt Booked For You And You Can Able Edit The Status Of Appointments </p>}
            {role=='patient' && <p style={{padding:'0px 4px 0px 4px', fontSize:'14px'}}>In Patient Dashboard You Can Able To See The Appointments,Receipt Booked For You And You Can Book Appoinments for Doctor </p>}

          </div>

        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
          <div className="profcon2" style={{padding:'40px 20px 0px 20px',margin:'10px 0px'}}>
            <form onSubmit={managesubmit}>
              <h3 style={{color:'blue'}}>Personal Detail's</h3>
              <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{margin:'10px 0px'}}>
                    <h6 className="mb-0" style={{padding:'10px 0px'}}>Username</h6>
                    <input type="text" className="form-control" value={username} onChange={(e)=>{ setusername(e.target.value)} } disabled />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{margin:'10px 0px'}}>
                    <h6 className="mb-0" style={{padding:'10px 0px'}}>Email</h6>
                    <input type="text" className="form-control" value="under-work" disabled  />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{margin:'10px 0px'}}>
                    <h6 className="mb-0" style={{padding:'10px 0px'}}>Mobile</h6>
                    <input type="text" className="form-control" value={mobilenumber} onChange={(e)=>{ setmobilenumber(e.target.value)} } />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{margin:'10px 0px'}}>
                    <h6 className="mb-0" style={{padding:'10px 0px'}}>Role</h6>
                    <input type="text" className="form-control" value={role} disabled />
                  </div>
              </div>
              <h3 style={{color:'blue', margin:'30px 0px 0px 0px'}}>Address</h3>
              <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{margin:'10px 0px'}}>
                    <h6 className="mb-0" style={{padding:'10px 0px'}}>City</h6>
                    <input type="text" className="form-control" value={city} onChange={(e)=>{ setcity(e.target.value)} }/>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{margin:'10px 0px'}}>
                    <h6 className="mb-0" style={{padding:'10px 0px'}}>Location</h6>
                    <input type="text" className="form-control" value={address} onChange={(e)=>{ setaddress(e.target.value)} } />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{margin:'10px 0px'}}>
                    <h6 className="mb-0" style={{padding:'10px 0px'}}>State</h6>
                    <input type="text" className="form-control" value="under-work" disabled />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{margin:'10px 0px'}}>
                    <h6 className="mb-0" style={{padding:'10px 0px'}}>Pin Code</h6>
                    <input type="text" className="form-control" value="under-work" disabled />
                  </div>
              </div>
              <button type='submit' style={{margin:'20px 0px 0px 10px'}}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
  

  </>
     );
}
