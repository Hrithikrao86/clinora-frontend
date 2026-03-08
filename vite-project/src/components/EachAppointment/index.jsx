import "./index.css"
const EachAppointment=(props)=>{
   const {details,onComplete,onCancel}=props
   console.log("Details :",details)
   const {id,name,phone,appointment_date,appointment_time,status,department,token_code,doctor}=details
   const completed=()=>{
      onComplete(id)
   }
   const cancelled=()=>{
    onCancel(id)
   }
   const completebtn = status==="COMPLETED"?"completebtn":"notcomplete"
   const completetxt = status==="COMPLETED"?"Completed":"Mark Complete"
   const statusCss=status==="BOOKED"?"booked":"notbooked"
   return (<li className="appointment-card">

  <div className="appointment-header">

    <div className="patient-info">
      <h3 className="patient-name">{name}</h3>
      <p className="patient-phone">📞 {phone}</p>
    </div>

    <span className={`status ${status.toLowerCase()}`}>
      {status}
    </span>

  </div>


  <div className="appointment-body">

    <div className="date-time">
      <div className="info-item">
        <span className="icon">📅</span>
        <span>{appointment_date}</span>
      </div>

      <div className="info-item">
        <span className="icon">⏰</span>
        <span>{appointment_time}</span>
      </div>
    </div>


    <div className="medical-info">

      <div className="info-item">
        <span className="icon">🩺</span>
        <span className="department">{department}</span>
      </div>

      <div className="info-item">
        <span className="icon">👨‍⚕️</span>
        <span className="doctor">{doctor}</span>
      </div>

    </div>


    <div className="token-box">
      <span className="token-label">Verification Code</span>
      <span className="token">{token_code}</span>
    </div>

  </div>


  {status !== "CANCELLED" && (

    <div className="appointment-actions">

      {status !== "COMPLETED" && (
        <button className="cancel-btn" onClick={cancelled}>
          Cancel
        </button>
      )}

      <button
        className={`complete-btn ${status === "COMPLETED" ? "done" : ""}`}
        onClick={completed}
      >
        {status === "COMPLETED" ? "Completed" : "Mark Complete"}
      </button>

    </div>

  )}

</li>
)
}
export default EachAppointment