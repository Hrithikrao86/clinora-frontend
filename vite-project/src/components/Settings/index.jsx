import {Component} from "react"

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

<div className="settingsContainer">

<h2>Settings</h2>

<button onClick={this.goProfile}>
Profile
</button>

<button onClick={this.goDoctors}>
Manage Doctors
</button>

<button onClick={this.goPassword}>
Change Password
</button>

<button onClick={this.logout}>
Logout
</button>

</div>

)

}

}

export default Settings