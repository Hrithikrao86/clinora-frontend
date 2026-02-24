import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/LoginPage"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHospital } from "@fortawesome/free-solid-svg-icons"

import Appointments from "./components/GetAppointments"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  )
 
}

export default App
