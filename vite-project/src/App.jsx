import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/LoginPage"
import ChangePassword from './components/ChangePassword'
import Doctors from './components/Doctors'
import Settings from './components/Settings'
import Appointments from "./components/GetAppointments"
import ClinicSettings from './components/ClinicSettings'
import DepartmentSettings from './components/DepartmentSettings'
import SuperAdmin from "./components/SuperAdmin"
import Insurance from './components/Insurance'
import Offers from './components/Offers'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/settings/password" element={<ChangePassword />} />
        <Route path="/settings/clinic" element={<ClinicSettings/>}/>
        <Route path="/settings/departments" element={<DepartmentSettings/>}/>
        <Route path="/dashboard" element={<Appointments />} />
        <Route path="/settings/doctors" element={<Doctors/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path='/superadmin' element={<SuperAdmin/>}/>
        <Route path="/settings/insurance" element={<Insurance />} />
        <Route path="/settings/offers" element={<Offers />} />
      </Routes>
    </BrowserRouter>
  )
 
}

export default App
