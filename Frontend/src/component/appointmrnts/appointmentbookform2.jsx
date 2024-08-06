import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { Link } from "react-router-dom";

export default function Appointmentbookform2( ) {
  const { docname } = useParams();
  const { id } = useParams();
  const [datetime, setDatetime] = useState();
  const [note, setNote] = useState();
  const [patientname, setPatientname] = useState("");
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profiledata = await api.get('api/Profile_view/');
        setProfile_details(profiledata.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileData();
  }, []);

  const fetchPatient = async (patientname) => {
    try {
      const response = await api.get('api/users_view/');
      const filteredpatient = response.data.find((user) => user.username === patientname);
      return filteredpatient;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchedPatient = await fetchPatient(patientname);
    if (!fetchedPatient) {
      alert("Patient must be registered first!");
      return;
    }
    setPatient(fetchedPatient);

    try {
      await api.post('/api/bookappointments/', {
        appointment_date: datetime,
        notes: note,
        patient: fetchedPatient.id,
        doctor: id,
      });
      alert('Appointment Booked Successfully');
      navigate('/nurse-dashboard/bookappointment');
    } catch (error) {
      console.log(error);
      alert("Please Fill The appointment Form Correctly!");
    }
  };

  return (
    <div className="container">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <h3 style={{ textAlign: 'right' }}>
                  <Link style={{ textDecoration: "none", color: "black" }} to='/nurse-dashboard/bookappointment/'>x</Link>
                </h3>
                <h2>Dr. {docname} Appointment</h2>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Patient Name : </h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      className="form-control"
                      value={patientname}
                      onChange={(e) => { setPatientname(e.target.value) }}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Date Time :</h6>
                  </div>
                  <div className="col-sm-9 ">
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={datetime}
                      onChange={(e) => { setDatetime(e.target.value) }}
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
                      onChange={(e) => { setNote(e.target.value) }}
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
  );
}
