import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { Link } from "react-router-dom";

export default function Appointmentbookform({userid}) {
  const { docname } = useParams()
  const { id } = useParams()
  const [datatime, setDatetime ] = useState()
  const [note, setNote] = useState()
  const [profile_details, setProfile_details]= useState()
  const navigate  = useNavigate()

  useEffect(()=>{
    const datas = async()=>{
      try{
        const profiledata = await api.get('api/Profile_view/')
        setProfile_details(profiledata.data[0])
      }catch(error){
        console.log(error)
      }
    }
    datas()
    
  }, [])

 

  async function managesubmit(e){
    e.preventDefault()
    try {
      const response = await api.post('/api/bookappointments/',{
        "appointment_date": datatime,
        "notes": note,
        "patient": profile_details.user_name.id,        
        "doctor": id,

      });
      console.log(response);
      alert('Appointment Booked Successfully')
      navigate('/patient-dashboard/bookappoinments')
        
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container">
        <div className="card-body">

          <form onSubmit={managesubmit}>
            <div className="col-lg-8">
              <div className="card">
                
                <div className="card-body">
                  <h3 style={{textAlign:'right'}}><Link style={{textDecoration:"none", color:"black"}} to='/patient-dashboard/bookappoinments'>x</Link></h3>
                  <h2>Dr. {docname} Appointment</h2>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Date Time :</h6>
                    </div>
                    <div className="col-sm-9 ">
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={datatime}
                        onChange={(e)=>{ setDatetime(e.target.value )}}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Notes :</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <textarea
                        type="text"
                        className="form-control"
                        value={note}
                        onChange={(e)=>{ setNote(e.target.value )}}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="submit"
                        className="btn btn-primary px-4"
                        value="Book Appointment"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
