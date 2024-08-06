import React from 'react';
import api from '../../api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Bookappointments2({children}) {
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
            <div className="col-12 col-sm-12 col-md-6 col-lg-5">
                <div>Book Appointments</div>
                    <br />
                    <h2>Doctors Lists</h2>
                    <table className='doctorappoitable'>
                    <thead>
                        <tr>
                            <th className='doctorappoitable' >Doctor Name</th>
                            <th className='doctorappoitable'>Book Appointment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doc) => (
                        <React.Fragment key={doc.id}> 
                        <tr>
                            <td className='doctorappoitable'>{doc.username}</td>
                            <td className='doctorappoitable'><Link to={`/nurse-dashboard/bookappointments/form/${doc.id}/${doc.username}`}>Book Appointment</Link></td>
                        </tr>
                        </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-7">
                {children}
            </div>
        </div>
        
        </>
    );
}
