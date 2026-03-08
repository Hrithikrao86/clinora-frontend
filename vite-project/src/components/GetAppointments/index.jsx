import "./index.css"
import { th } from "date-fns/locale"

import { Component} from "react"
import EachAppointment from "../EachAppointment"
import StatusHeader from "../StatusHeader"
import DatesHeader from "../DatesHeader"
import GetTotalApp from "../GetTotalApp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHospital } from "@fortawesome/free-solid-svg-icons"

const getNext7Days = () => {
  const days = []
  const today = new Date()
const iso = today.toLocaleDateString("en-CA")

  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)

    days.push({
      label:
        i === 0
          ? "Today"
          : i === 1
          ? "Tomorrow"
          : d.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            }),
      value: d.toLocaleDateString("en-CA"),
    })
  }

  return days
}

const statusList=[{statusId:"BOOKED",statusLang:"Booked"},
    {statusId:"CANCELLED",statusLang:"Cancelled"},
    {statusId:"COMPLETED",statusLang:"Completed"}]




class Appointments extends Component{
    state={appointmentList:[],statusId:statusList[0].statusId,selectedDate: new Date().toLocaleDateString("en-CA"),totalApp:[],blockedDates:[],clinicName:""

    }


    updateId=(id)=>{
     this.setState({statusId:id},this.getAppointment)
    }
    updateDate = (date) => {
  this.setState({ selectedDate: date }, this.getAppointment)
}

fetchBlockedDates = async () => {
  
  const response = await fetch(`https://clinora-backend.onrender.com/api/clinic/blocked-dates`,{
    credentials: "include"
  }
)
  const data = await response.json()

  this.setState({
    blockedDates: data.map(d => d.blocked_date)
  })
}

fetchClinicInfo = async () => {
  

  const response = await fetch(
    "https://clinora-backend.onrender.com/api/me",
   {
    credentials: "include"
  }
)
  


  if (response.ok) {
    const data = await response.json()
    this.setState({ clinicName: data.name })
  }
}

handlePasswordChange = async () => {
  

  const { oldPassword, newPassword } = this.state

  const response = await fetch(
    "https://clinora-backend.onrender.com/api/clinic/change-password",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        
      },
      credentials: "include",
      body: JSON.stringify({ oldPassword, newPassword })
    }
  )

  const data = await response.json()

  if (response.ok) {
    alert("Password updated successfully")
    this.setState({
      oldPassword: "",
      newPassword: "",
      showProfile: false
    })
  } else {
    alert(data.error)
  }
}

onCancel = async (id) => {
  

  const response = await fetch(
    `https://clinora-backend.onrender.com/api/appointments/cancel/${id}`,
    {
      method: "PUT",
     credentials: "include"
    }
  )

  if (response.ok) {
    this.getAppointment()
    this.getallApp()
  }
}
getallApp = async () => {
  const {selectedDate}=this.state

  const response = await fetch(
    `https://clinora-backend.onrender.com/api/appointments/all`,
    {
      method: "GET",
      credentials: "include"
    }
  )

  const data = await response.json()

  console.log("🔥 TOTAL APP API RESPONSE:", data)

  this.setState({ totalApp: data })
}

toggleDate = async (date) => {

  const isBlocked = this.state.blockedDates.includes(date)

  if (isBlocked) {
    await fetch(`https://clinora-backend.onrender.com/api/clinic/unblock-date/${date}`, {
      method: "DELETE",
      credentials: "include"
      
    })
  } else {
    await fetch(`https://clinora-backend.onrender.com/api/clinic/block-date`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ date })
    })
  }

  this.fetchBlockedDates()
}
handleLogout = async () => {

  await fetch(
    "https://clinora-backend.onrender.com/api/logout",
    {
      method: "POST",
      credentials: "include"
    }
  )

  window.location.href = "/"
}
    onComplete=async (id)=>{
      
        const url=`https://clinora-backend.onrender.com/api/appointments/${id}/complete`
        const options={
            method:"PUT",
           credentials:"include",
         }
        const response=await fetch(url,options)
        console.log(response)
    }
    getAppointment=async ()=>{
        const {statusId,selectedDate}=this.state
         const url=`https://clinora-backend.onrender.com/api/appointments/${statusId}?date=${selectedDate}`
         const options={
            method:"GET",
            credentials:"include",
         }
        const response=await fetch(url,options)
        if (response.ok){
            const fetchedData=await response.json()
 console.log(fetchedData)
            this.setState({appointmentList:fetchedData})
           
        }
        else{
            console.log("error in react")
        }
        }
        checkAuth = async () => {
  const response = await fetch(
    "https://clinora-backend.onrender.com/api/me",
    {
      credentials: "include"
    }
  )

  if (!response.ok) {
    window.location = "/"
  }
}
    componentDidMount(){

        this.checkAuth()
  
this.getAppointment()
this.getallApp()
this.fetchBlockedDates()
this.fetchClinicInfo()

this.interval=setInterval(() => {
    this.getAppointment();
    this.getallApp();
    this.fetchBlockedDates()
    
}, 3000);
    }  
    
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    render(){
        const days = getNext7Days()


        const {appointmentList,statusId,selectedDate,blockedDates,totalApp}=this.state
        const isBlocked = blockedDates.includes(selectedDate)
        console.log(selectedDate)
       console.log(totalApp)
        return (
        
       <div className='maincontainer'>

  {/* HEADER */}
  <div className="hero">
    <div className="hero-text">
      <h1>Hello <span>{this.state.clinicName},</span></h1>
      <p>Manage today’s and upcoming appointments easily</p>
    </div>

    <div className="header-actions">
      <img 
        src="https://image2url.com/r2/default/images/1771932757551-0110636d-ee4f-4cd2-838e-3fddff9323ec.png"
        alt="clinora logo"
        className="smallLogo"
      />

      <button
        className="logout-btn"
        onClick={()=>window.location.href="/settings"}
      >
        Settings
      </button>
    </div>
  </div>


  {/* FILTER SECTION */}
  <div className="dashboard-controls">

    <GetTotalApp appointmentList={totalApp}/>

    <ul className="filteritems">
      {statusList.map(i =>
        <StatusHeader
          isclicked={statusId}
          details={i}
          updateId={this.updateId}
        />
      )}
    </ul>

    <ul className="dateContainer">
      {days.map(day =>
        <DatesHeader
          day={day}
          selectedDate={selectedDate}
          updateDate={this.updateDate}
        />
      )}
    </ul>

    <div className="date-action-container">
      <button
        type="button"
        onClick={() => this.toggleDate(selectedDate)}
        className={isBlocked ? "blocked-btn" : "available-btn"}
      >
        {isBlocked ? "🔴 Unblock Date" : "🟢 Block Date"}
      </button>
    </div>

  </div>


  {/* SCROLLABLE AREA */}
  <div className="appointments-scroll">

    {appointmentList.length===0 ? (

      <div className="empty-state">
        <img
          src="https://image2url.com/r2/default/images/1770708770798-5deb8e57-7a2e-4070-8e22-6c2937214d73.png"
          alt="No appointments"
          className="empty-image"
        />
        <h3 className="empty-title">No Appointments</h3>
        <p className="empty-text">
          There are no appointments scheduled for this date.
        </p>
      </div>

    ) : (

      <ul className="appointmentContainer">
        {appointmentList.map(i =>
          <EachAppointment
            details={i}
            onCancel={this.onCancel}
            onComplete={this.onComplete}
          />
        )}
      </ul>

    )}

  </div>

</div>
  )
    }
    }

export default Appointments