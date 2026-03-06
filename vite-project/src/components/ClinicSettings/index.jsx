import {Component} from "react"
import { FaClock, FaMoneyBillWave, FaSave, FaHospital } from "react-icons/fa"
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
    try {

      const response = await fetch(
        "https://clinora-backend.onrender.com/api/clinic/settings",
        {
          credentials: "include"
        }
      )

      if (response.ok) {

        const data = await response.json()

        this.setState({
          start_time: data.start_time || "",
          end_time: data.end_time || "",
          consultation_fee: data.consultation_fee || ""
        })
      }

    } catch (err) {
      console.log("Fetch settings error", err)
    }
  }

  updateSettings = async () => {

    const {start_time, end_time, consultation_fee} = this.state

    try {

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
      } else {
        alert("Failed to update settings")
      }

    } catch (err) {
      console.log("Update settings error", err)
    }
  }

  render() {

    const {start_time, end_time, consultation_fee} = this.state

    return (

      <div className="clinic-settings-page">

        <div className="clinic-settings-card">

          <h2 className="settings-title">
            <FaHospital className="settings-icon"/>
            Clinic Settings
          </h2>

          <div className="settings-group">

            <label className="settings-label">
              <FaClock />
              Clinic Start Time
            </label>

            <input
              className="settings-input"
              type="time"
              value={start_time}
              onChange={(e) =>
                this.setState({start_time: e.target.value})
              }
            />

          </div>

          <div className="settings-group">

            <label className="settings-label">
              <FaClock />
              Clinic End Time
            </label>

            <input
              className="settings-input"
              type="time"
              value={end_time}
              onChange={(e) =>
                this.setState({end_time: e.target.value})
              }
            />

          </div>

          <div className="settings-group">

            <label className="settings-label">
              <FaMoneyBillWave />
              Consultation Fee
            </label>

            <input
              className="settings-input"
              type="number"
              placeholder="Enter consultation fee"
              value={consultation_fee}
              onChange={(e) =>
                this.setState({consultation_fee: e.target.value})
              }
            />

          </div>

          <button
            className="settings-save-btn"
            onClick={this.updateSettings}
          >
            <FaSave />
            Save Settings
          </button>

        </div>

      </div>

    )
  }
}

export default ClinicSettings