import "./index.css"
const EachAppointment=(props)=>{
   const {details,onComplete,onCancel}=props
   console.log(details)
   const {id,name,phone,appointment_date,appointment_time,status,department}=details
   const completed=()=>{
      onComplete(id)
   }
   const cancelled=()=>{
    onCancel(id)
   }
   const completebtn = status==="COMPLETED"?"completebtn":"notcomplete"
   const completetxt = status==="COMPLETED"?"Completed":"Mark Complete"
   const statusCss=status==="BOOKED"?"booked":"notbooked"
   return (<li className="appointmentTab">
  <div className="card-header">
    <div>
      <p className="patient-name">{name}</p>
      <p className="patient-phone">📞 {phone}</p>
    </div>

    <span className={`status-badge ${status.toLowerCase()}`}>
      {status}
    </span>
  </div>

  <div className="card-body">
    <div className="info-row">
      <span>📅 {appointment_date}</span>
      <span>⏰ {appointment_time}</span>
    </div>

    <p className="department">🩺 {department}</p>
  </div>

  {status !== "CANCELLED" && (
    <div className="card-footer">
      {status === "COMPLETED" ? "" : <button className="cancel-btn" onClick={cancelled}>
        Cancel
      </button>}
      
      <button
        className={`action-btn ${status === "COMPLETED" ? "done" : ""}`}
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