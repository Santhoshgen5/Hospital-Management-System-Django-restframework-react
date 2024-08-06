import React from 'react';
import api from '../../api';
import { useState, useEffect } from 'react';

export default function Nurseappointments() {
    const [appointments, setAppointments] = useState([]);
    const [option, setOption] = useState('all');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get('api/nurse_appointment/');
                setAppointments(response.data);
            } catch (error) {
                console.log(error);
            }
        };
                   
        fetchAppointments();
    }, []);

    const optionchange = (e) => {
        setOption(e.target.value);
    };

    const filteredAppointments = appointments.filter((appointment) => {
        if (option === 'all') return true;
        return appointment.status === option;
    });

   
    return (
        <>
            <h1>Appointments Details</h1>
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
