import React from 'react';
import api from '../../api';
import { useState, useEffect } from 'react';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [checkbox, setCheckbox] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('api/doctor_appointment/');
      setAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const chkboxmanage = async (value, appoi_id) => {
    const newStatus = value;
    
    try {
      await api.patch(`/api/doctor_Appointment_update/${appoi_id}/`, {
        status: newStatus,
      });
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Appointments Details</h1>
      <ol>
        {appointments.map((appointment) => (
          <React.Fragment key={appointment.id}>
            <li>
              Patient Name: {appointment.patient.username} ---- Date: {appointment.appointment_date} ---- Doctor Name: {appointment.doctor.username}<br />
              Status: {appointment.status}<br />
              Notes: {appointment.notes}<br /><br />
              <select name="" id="" defaultValue={appointment.status} onChange={(e)=>{
                chkboxmanage(e.target.value, appointment.id)
              }}>
                <option value="completed">Completed</option>
                <option value="scheduled">Scheduled</option>
                <option value="cancelled">Cancelled</option>

              </select>
            </li>
            <br />
          </React.Fragment>
        ))}
      </ol>
    </>
  );
}
