import "./index.css"
import { Component } from "react"

import { FiUser } from "react-icons/fi"
import { FiUsers } from "react-icons/fi"
import { FiLock } from "react-icons/fi"
import { FiLogOut } from "react-icons/fi"
import { FaHospital } from "react-icons/fa"

class Settings extends Component {

goProfile = () => {
  window.location.href="/settings/profile"
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

logout = async () => {

  await fetch(
    "https://clinora-backend.onrender.com/api/logout",
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

<div className="settings-card" onClick={this.goProfile}>
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

</div>

</div>

)

}

}

export default Settings