import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from './pages/homepage'
import Login from './pages/login'
import Register from './pages/register'
import Doctor_dasboard from './pages/doctor_dasboard'
import Patient_dasboard from './pages/patient_dasboard'
import Nurse_dasboard from './pages/nurse_dasboard'
import ProtectedRoute from './component/protectedroute'
import PageNotFount from './pages/pagenotfount'
import '../src/assets/css/main.css'
import PrivateRoute from './component/privateroute'
import Profile from './component/dashboardcomponents/profile'
import Appoinments from './component/dashboardcomponents/appoinments'
import Patientappointments from './component/appointmrnts/patientappointments'
import Bookappointments from './component/appointmrnts/bookappoinments'
import Appointmentbookform from './component/appointmrnts/appointmentbookform'

function App() {
  
  function Logout() {
    localStorage.clear()
    return <Navigate to="/" />
  }

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='*' element={<PageNotFount/>} />
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={ <PrivateRoute><Login/></PrivateRoute> } />
      <Route path="/logout" element={<Logout/>} />
      <Route path="/register" element={<PrivateRoute><Register/></PrivateRoute> } />
      <Route path="/doctor-dashboard" element={<ProtectedRoute requiredrole={'doctor'}><Doctor_dasboard><Profile/></Doctor_dasboard></ProtectedRoute>} />
      <Route path="/doctor-dashboard/appointments" element={<ProtectedRoute requiredrole={'doctor'}><Doctor_dasboard><Appoinments/></Doctor_dasboard></ProtectedRoute>} />
      <Route path="/nurse-dashboard" element={<ProtectedRoute requiredrole={'nurse'}><Profile/><Nurse_dasboard/></ProtectedRoute>} />
      <Route path="/patient-dashboard" element={<ProtectedRoute requiredrole={'patient'}><Patient_dasboard><Profile/></Patient_dasboard></ProtectedRoute>} />
      <Route path="/patient-dashboard/appoinments" element={<ProtectedRoute requiredrole={'patient'}><Patient_dasboard><Patientappointments/></Patient_dasboard></ProtectedRoute>} />
      <Route path="/patient-dashboard/bookappointments/form/:id/:docname" element={<ProtectedRoute requiredrole={'patient'}><Patient_dasboard><Bookappointments><Appointmentbookform/></Bookappointments></Patient_dasboard></ProtectedRoute>} />
      <Route path="/patient-dashboard/bookappoinments" element={<ProtectedRoute requiredrole={'patient'}><Patient_dasboard><Bookappointments/></Patient_dasboard></ProtectedRoute>} />
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
