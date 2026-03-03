import { Component } from "react"
import "./index.css"

class Profile extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    message: "",
    error: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    const response = await fetch(
      "https://clinora-backend.onrender.com/api/clinic/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword
        })
      }
    )

    const data = await response.json()

    if (response.ok) {
  alert("Password updated successfully. Please login again.")

  localStorage.removeItem("token")

  window.location.href = "/"
} else {
      this.setState({
        error: data.error || "Something went wrong",
        message: ""
      })
    }
  }

  render() {
    const { oldPassword, newPassword, message, error } = this.state

    return (
      <div className="profile-container">
        <h2>Change Password</h2>

        <form onSubmit={this.handleSubmit}>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={oldPassword}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Update Password</button>
        </form>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    )
  }
}

export default Profile