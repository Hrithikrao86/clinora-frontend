import "./index.css"
import { Component } from "react"

class Settings extends Component {

goProfile = () => {
  window.location.href="/settings/profile"
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
<h3>Profile</h3>
<p>View clinic information</p>
</div>

<div className="settings-card" onClick={this.goDoctors}>
<h3>Doctors</h3>
<p>Manage clinic doctors</p>
</div>

<div className="settings-card" onClick={this.goPassword}>
<h3>Security</h3>
<p>Change account password</p>
</div>

<div className="settings-card logout" onClick={this.logout}>
<h3>Logout</h3>
<p>Sign out from dashboard</p>
</div>

</div>

</div>

)

}

}

export default Settings