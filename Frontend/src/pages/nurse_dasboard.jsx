import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../component/navbar'
import api from '../api'



export default function Nurse_dasboard() {
  useEffect(()=>{
    const appointments = async()=>{
      try{
        const data = await api.get('api/nurse_appointment/')
        console.log(data)
      }catch(error){
        console.log(error)
      }
      
    }
    appointments()
  }, [])
   


  return (
    <div>Nurse Dasboard</div>
  )
}
