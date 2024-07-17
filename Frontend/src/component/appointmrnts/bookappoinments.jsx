import React from 'react';
import api from '../../api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Bookappointments({children}) {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await api.get('api/users_view/');
                const filteredDoctors = response.data.filter((user) => user.role === 'doctor');
                setDoctors(filteredDoctors);   
            } catch (error) {
                console.log(error);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <>
        <div className="row">
            <div className="col-5">
                <div>Book Appointments</div>
                    <br />
                    <h2>Doctors Lists</h2>
                    {doctors.map((doc) => (
                        <React.Fragment key={doc.id}> 
                            <span>{doc.username}</span>  <Link to={`/patient-dashboard/bookappointments/form/${doc.id}/${doc.username}`}>Book Appointment</Link><br /><br />
                        </React.Fragment>
                    ))}
            </div>
            <div className="col-7">
                {children}
            </div>
        </div>
        
        </>
    );
}

