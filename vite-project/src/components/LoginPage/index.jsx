import "./index.css"
import { Component } from "react"
import { Navigate } from "react-router-dom"

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: "",
    redirect: false
  }

  handleLogin = async () => {
  const { username, password } = this.state
  const cleanedUsername=username.trim()
  const cleanedPassword=password.trim()
  try {
    const response = await fetch("https://clinora-backend.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username:cleanedUsername, password:cleanedPassword })
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem("clinic_id", data.clinic_id)
      localStorage.setItem("isLoggedIn", "true")

      window.location.href = "/dashboard"
    } else {
      this.setState({ error: data.error || "Invalid credentials" })
    }
  } catch (error) {
    this.setState({ error: "Server error. Try again." })
  }
}



  render() {
    if (this.state.redirect) {
      return <Navigate to="/dashboard" />
    }

    return (
  <div className="login-page">
  <div className="brand-section">
    <img src="https://image2url.com/r2/default/images/1771932196784-daef0a5f-addc-48c6-8ff5-81ca62116754.png" alt="Clinora Logo" className="logo" />
  </div>

 
  <div className="login-card">
    <div className="login-top">
        <img src="https://image2url.com/r2/default/images/1771932757551-0110636d-ee4f-4cd2-838e-3fddff9323ec.png" alt="clinora logo" className="smallLogo"/>
        <div>
              <h2 className="login-title">Clinora Admin</h2>
               <p className="login-subtitle">Secure Clinic Dashboard Access</p>
        </div>
    </div>
  

    <input
      type="text"
      placeholder="Username"
      className="login-input"
      onChange={(e) => this.setState({ username: e.target.value })}
    />

    <input
      type="password"
      placeholder="Password"
      className="login-input"
      onChange={(e) => this.setState({ password: e.target.value })}
    />

    <button className="login-button" onClick={this.handleLogin}>
      Login
    </button>

    {this.state.error && (
      <p className="login-error">{this.state.error}</p>
    )}
  </div>

</div>


    
    )
  }
}

export default Login