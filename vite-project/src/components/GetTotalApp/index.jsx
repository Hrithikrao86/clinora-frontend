import { constructFromSymbol } from "date-fns/constants"
import "./index.css"

const GetTotalApp=(props)=>{
  const {appointmentList}=props
  console.log("entered totalApp")
  console.log(appointmentList)
    const total = appointmentList.length
const booked = appointmentList.filter(a => a.status === "BOOKED").length
const completed = appointmentList.filter(a => a.status === "COMPLETED").length
const cancelled = appointmentList.filter(a => a.status === "CANCELLED").length

    return ( 
    <div className="summary-container">
  <div className="summary-container">

  <div className="summary-card total">
    <p className="summary-number">{total}</p>
    <p className="summary-label">Total</p>
  </div>

  <div className="summary-card booked">
    <p className="summary-number">{booked}</p>
    <p className="summary-label">Booked</p>
  </div>

  <div className="summary-card completed">
    <p className="summary-number">{completed}</p>
    <p className="summary-label">Completed</p>
  </div>

  <div className="summary-card cancelled">
    <p className="summary-number">{cancelled}</p>
    <p className="summary-label">Cancelled</p>
  </div>

</div>
</div>

)
}
export default GetTotalApp