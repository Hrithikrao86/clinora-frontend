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

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/setings/password" element={<ChangePassword />} />
        <Route path="/dashboard" element={<Appointments />} />
        <Route path="/settings/doctors" element={<Doctors/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </BrowserRouter>
  )
 
}

export default App
