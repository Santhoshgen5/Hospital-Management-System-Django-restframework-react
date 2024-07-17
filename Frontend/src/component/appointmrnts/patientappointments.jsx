import React from 'react';
import api from '../../api';
import { useState, useEffect } from 'react';

export default function Patientappointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get('api/patient_appointment/');
                setAppointments(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAppointments();
    }, []);
    
    return (
        <>
            <h1>Appointments Details</h1>
            <ol>
                {appointments.map((appointment) => (

                    <React.Fragment key={appointment.id}>
                    <li>
                        Doctor Name: {appointment.doctor.username}---- Date: {appointment.appointment_date}---- patient Name: {appointment.patient.username}<br/>
                        Status : {appointment.status}<br/>
                        Notes : {appointment.notes}

                    </li>
                    <br />
                    </React.Fragment>
                ))}
                
            </ol>
        </>
    );
}
