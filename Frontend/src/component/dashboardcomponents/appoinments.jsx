import React, { useState, useEffect } from 'react';
import api from '../../api';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [option, setOption] = useState('all');

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

  const optionchange = (e) => {
    setOption(e.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (option === 'all') return true;
    return appointment.status === option;
  });

  return (
    <>
      <h1 style={{ margin: '0px 0px 0px 15px' }}>Appointments Details</h1>
      <div style={{ margin: '18px 0px 30px 15px' }}>
        <span style={{ marginRight: '5px' }}>Filter</span>
        <select name="" id="" onChange={optionchange}>
          <option value="all">all</option>
          <option value="cancelled">cancelled</option>
          <option value="scheduled">scheduled</option>
          <option value="completed">completed</option>
        </select>
      </div>

      <ol>
        {filteredAppointments.map((appointment) => (
          <React.Fragment key={appointment.id}>
            <li>
              Patient Name: {appointment.patient.username} ---- Date: {appointment.appointment_date} ---- Doctor Name: {appointment.doctor.username}<br />
              Status: {appointment.status}<br />
              Notes: {appointment.notes}<br /><br />
              <select name="" id="" defaultValue={appointment.status} onChange={(e) => {
                chkboxmanage(e.target.value, appointment.id);
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
