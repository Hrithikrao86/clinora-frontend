import "./index.css"
import { Component } from "react"

import { FiUser } from "react-icons/fi"
import { FiUsers } from "react-icons/fi"
import { FiLock } from "react-icons/fi"
import { FiLogOut } from "react-icons/fi"
import { FaHospital } from "react-icons/fa"
import { FaStethoscope } from "react-icons/fa"
import { FaShieldAlt, FaGift } from "react-icons/fa"

class Settings extends Component {

goProfile = () => {
  window.location.href="/settings/profile"
}

goInsurance = () => {
  window.location.href = "/settings/insurance"
}

goOffers = () => {
  window.location.href = "/settings/offers"
}

goClinic=()=>{
   window.location.href="/settings/clinic"
  }

goDoctors = () => {
  window.location.href="/settings/doctors"
}

goPassword = () => {
  window.location.href="/settings/password"
}

goDept=()=>{
  window.location.href="/settings/departments"
}

logout = async () => {

  await fetch(
    "https://api.clinorahq.in/api/logout",
    {
      method:"POST",
      credentials:"include"
    }
  )

  window.location.href="/"
}

render(){

return(

<div className="settings-page">

<h1 className="settings-title">Settings</h1>

<div className="settings-grid">

<div className="settings-card" >
<div className="icon-circle blue">
<FiUser size={22}/>
</div>

<h3>Profile</h3>
<p>View clinic information</p>
</div>


<div className="settings-card" onClick={this.goDoctors}>
<div className="icon-circle purple">
<FiUsers size={22}/>
</div>

<h3>Doctors</h3>
<p>Manage clinic doctors</p>
</div>

<div className="settings-card" onClick={this.goClinic}>
<div className="icon-circle orange">
<FaHospital size={21}/>
</div>

<h3>Clinic Settings</h3>
<p>Update clinic timings and consultation fee</p>
</div>


<div className="settings-card" onClick={this.goPassword}>
<div className="icon-circle orange">
<FiLock size={22}/>
</div>

<h3>Security</h3>
<p>Change account password</p>
</div>


<div className="settings-card logout" onClick={this.logout}>
<div className="icon-circle red">
<FiLogOut size={22}/>
</div>

<h3>Logout</h3>
<p>Sign out from dashboard</p>
</div>

<div className="settings-card logout" onClick={this.goDept}>
<div className="icon-circle red">
<FaStethoscope size={22}/>
</div>

<h3>Departments</h3>
<p>upadte/add departments</p>
</div>

<div className="settings-card" onClick={this.goInsurance}>
  <div className="icon-circle blue">
    <FaShieldAlt size={20}/>
  </div>
  <h3>Insurance</h3>
  <p>Manage accepted insurance</p>
</div>

<div className="settings-card" onClick={this.goOffers}>
  <div className="icon-circle purple">
    <FaGift size={20}/>
  </div>
  <h3>Offers</h3>
  <p>Manage clinic offers</p>
</div>

</div>

</div>

)

}

}

export default Settings