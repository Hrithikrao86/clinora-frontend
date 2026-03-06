import { Component } from "react"
import {
  FaHospital,
  FaClock,
  FaMoneyBillWave,
  FaSave
} from "react-icons/fa"

import "./index.css"

class ClinicSettings extends Component {

  state = {
    start_time: "",
    end_time: "",
    consultation_fee: ""
  }

  componentDidMount() {
    this.fetchSettings()
  }

  fetchSettings = async () => {
    const response = await fetch(
      "https://clinora-backend.onrender.com/api/clinic/settings",
      { credentials: "include" }
    )

    if (response.ok) {
      const data = await response.json()

      this.setState({
        start_time: data.start_time || "",
        end_time: data.end_time || "",
        consultation_fee: data.consultation_fee || ""
      })
    }
  }

  updateSettings = async () => {

    const { start_time, end_time, consultation_fee } = this.state

    const response = await fetch(
      "https://clinora-backend.onrender.com/api/clinic/settings",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          start_time,
          end_time,
          consultation_fee
        })
      }
    )

    if (response.ok) {
      alert("Clinic settings updated successfully")
    }
  }

  render() {

    const { start_time, end_time, consultation_fee } = this.state

    return (

      <div className="clinic-settings-page">

        <div className="settings-container">

          <div className="settings-header">
            <FaHospital className="settings-main-icon"/>
            <h1>Clinic Settings</h1>
            <p>Manage clinic timings and consultation fee</p>
          </div>

          <div className="settings-card">

            <div className="settings-group">

              <label>
                <FaClock className="icon"/>
                Clinic Start Time
              </label>

              <input
                type="time"
                value={start_time}
                onChange={(e) =>
                  this.setState({ start_time: e.target.value })
                }
              />

            </div>

            <div className="settings-group">

              <label>
                <FaClock className="icon"/>
                Clinic End Time
              </label>

              <input
                type="time"
                value={end_time}
                onChange={(e) =>
                  this.setState({ end_time: e.target.value })
                }
              />

            </div>

            <div className="settings-group">

              <label>
                <FaMoneyBillWave className="icon"/>
                Consultation Fee
              </label>

              <input
                type="number"
                placeholder="Enter consultation fee"
                value={consultation_fee}
                onChange={(e) =>
                  this.setState({ consultation_fee: e.target.value })
                }
              />

            </div>

            <button
              className="save-btn"
              onClick={this.updateSettings}
            >
              <FaSave />
              Save Settings
            </button>

          </div>

        </div>

      </div>
    )
  }
}

export default ClinicSettings