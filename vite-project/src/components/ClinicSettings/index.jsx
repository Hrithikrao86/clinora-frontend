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
    hospitalName: "",
    start_time: "",
    end_time: "",
    consultation_fee: "",
    successMsg: "",
    broadcastStatus:""
  }

  componentDidMount() {
    this.fetchSettings()
  }

sendBroadcast = async () => {

  const { broadcastMsg } = this.state

  if(!broadcastMsg.trim()){
    this.setState({
      broadcastStatus:"⚠ Please enter a message"
    })
    return
  }

  const response = await fetch(
    "https://clinora-backend.onrender.com/api/broadcast",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify({
        message:broadcastMsg
      })
    }
  )

  const data = await response.json()

  if(response.ok){

    this.setState({
      broadcastMsg:"",
      broadcastStatus:`✅ Sent to ${data.total} patients`
    })

    setTimeout(()=>{
      this.setState({broadcastStatus:""})
    },4000)

  }

}

  fetchSettings = async () => {

    const response = await fetch(
      "https://clinora-backend.onrender.com/api/clinic/settings",
      {
        credentials: "include"
      }
    )

    if (response.ok) {

      const data = await response.json()

      this.setState({
        hospitalName: data.name || "",
        start_time: data.start_time || "",
        end_time: data.end_time || "",
        consultation_fee: data.consultation_fee || ""
      })

    }

  }

  updateSettings = async () => {

    const {
      hospitalName,
      start_time,
      end_time,
      consultation_fee
    } = this.state

    const response = await fetch(
      "https://clinora-backend.onrender.com/api/clinic/settings",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          name: hospitalName,
          start_time,
          end_time,
          consultation_fee
        })
      }
    )

    if (response.ok) {

      this.setState({
        successMsg: "✅ Settings saved successfully"
      })

      setTimeout(() => {
        this.setState({ successMsg: "" })
      }, 3000)

    }

  }

  render() {

    const {
      hospitalName,
      start_time,
      end_time,
      consultation_fee,
      successMsg
    } = this.state

    return (

      <div className="clinic-settings-page">

        <div className="settings-container">

          <div className="settings-header">
            <FaHospital className="settings-main-icon"/>
            <h1>Clinic Settings</h1>
            <p>Manage hospital information and clinic timings</p>
          </div>

          <div className="settings-card">

            {/* Hospital Name */}

            <div className="settings-group">

              <label>
                <FaHospital className="icon"/>
                Hospital Name
              </label>

              <input
                type="text"
                placeholder="Enter hospital name"
                value={hospitalName}
                onChange={(e) =>
                  this.setState({ hospitalName: e.target.value })
                }
              />

            </div>

            {/* Start Time */}

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

            {/* End Time */}

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

            {/* Consultation Fee */}

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
                  this.setState({
                    consultation_fee: e.target.value
                  })
                }
              />

            </div>

            {/* Save Button */}

            <button
              className="save-btn"
              onClick={this.updateSettings}
            >
              <FaSave />
              Save Settings
            </button>

            {successMsg && (
              <p className="success-message">
                {successMsg}
              </p>
            )}

          </div>

          {/* Broadcast Message */}

<div className="settings-group broadcast-section">

  <label>
    📢 Broadcast Message
  </label>

  <textarea
    placeholder="Send announcement to previous patients..."
    value={this.state.broadcastMsg}
    onChange={(e)=>
      this.setState({broadcastMsg:e.target.value})
    }
    rows="4"
  />

  <button
    className="broadcast-btn"
    onClick={this.sendBroadcast}
  >
    Send Broadcast
  </button>

  {this.state.broadcastStatus && (
    <p className="broadcast-status">
      {this.state.broadcastStatus}
    </p>
  )}

</div>

        </div>

      </div>

    )
  }
}

export default ClinicSettings