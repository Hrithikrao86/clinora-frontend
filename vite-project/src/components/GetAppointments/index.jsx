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
      value: d.toISOString().split("T")[0],
    })
  }

  return days
}

const statusList=[{statusId:"BOOKED",statusLang:"Booked"},
    {statusId:"CANCELLED",statusLang:"Cancelled"},
    {statusId:"COMPLETED",statusLang:"Completed"}]




class Appointments extends Component{
    state={appointmentList:[],statusId:statusList[0].statusId,selectedDate: new Date().toISOString().split("T")[0],totalApp:[],blockedDates:[]}



    updateId=(id)=>{
     this.setState({statusId:id},this.getAppointment)
    }
    updateDate = (date) => {
  this.setState({ selectedDate: date }, this.getAppointment)
}

fetchBlockedDates = async () => {
  const token = localStorage.getItem("token")
  const response = await fetch(`https://clinora-backend.onrender.com/api/clinic/blocked-dates`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  const data = await response.json()

  this.setState({
    blockedDates: data.map(d => d.blocked_date)
  })
}

onCancel=async (id)=>{
  const token = localStorage.getItem("token")
  console.log("clicked")
const url=`https://clinora-backend.onrender.com/api/appointments/cancel/${id}`

        const options={
            method:"PUT",
            headers:{
      Authorization:`Bearer ${token}`
    }
         }
        const response=await fetch(url,options)
        console.log(response)
}

getallApp=async ()=>{
  const token = localStorage.getItem("token")
  console.log("entered allapp")
  const url=`https://clinora-backend.onrender.com/api/appointments/all`
  const options={method:"GET",headers:{
      Authorization:`Bearer ${token}`
    }}
  const response=await fetch(url,options)
  console.log(response)
  if (response.ok){
    
    const data=await response.json()
    console.log(data)
    this.setState({totalApp:data})

  }
}

toggleDate = async (date) => {
  const token = localStorage.getItem("token")
  const isBlocked = this.state.blockedDates.includes(date)

  if (isBlocked) {
    await fetch(`https://clinora-backend.onrender.com/api/clinic/unblock-date/${date}`, {
      method: "DELETE",
      headers:{
      Authorization:`Bearer ${token}`
    }
    })
  } else {
    await fetch(`https://clinora-backend.onrender.com/api/clinic/block-date`, {
      method: "POST",
      headers: { "Content-Type": "application/json",  Authorization:`Bearer ${token}` },
      body: JSON.stringify({ date })
    })
  }

  this.fetchBlockedDates()
}
handleLogout = () => {
  
  localStorage.removeItem("token")
  window.location.href = "/"
}
    onComplete=async (id)=>{
      const token = localStorage.getItem("token")
        const url=`https://clinora-backend.onrender.com/api/appointments/${id}/complete`
        const options={
            method:"PUT",
            headers:{
      Authorization:`Bearer ${token}`
    }
         }
        const response=await fetch(url,options)
        console.log(response)
    }
    getAppointment=async ()=>{
      const token = localStorage.getItem("token")
        const {statusId,selectedDate}=this.state
         const url=`https://clinora-backend.onrender.com/api/appointments/${statusId}?date=${selectedDate}`
         const options={
            method:"GET",
            headers:{
      Authorization:`Bearer ${token}`
    }
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
    componentDidMount(){

        const token = localStorage.getItem("token")
  if (!token) {
    window.location = "/"
  }
this.getAppointment()
this.getallApp()
this.fetchBlockedDates()

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
      <div className="hero">
  <div className="hero-text">
    <h1>Hello <span>Life Line,</span></h1>
    <p>Manage today’s and upcoming appointments easily</p>
  </div>
<div className="header-actions">
  <img src="https://image2url.com/r2/default/images/1771932757551-0110636d-ee4f-4cd2-838e-3fddff9323ec.png" alt="clinora logo" className="smallLogo"/>


  <button className="logout-btn" onClick={this.handleLogout}>
    Logout
  </button>
</div>

  
</div>

      
      <div className="maincontainer1">
          <GetTotalApp appointmentList={totalApp}/>
            <ul className="filteritems">{statusList.map(i=><StatusHeader isclicked={statusId} details={i} updateId={this.updateId}/>)}</ul>
            <ul className="dateContainer">
  {days.map(day => 
    <DatesHeader day={day} selectedDate={selectedDate} updateDate={this.updateDate}/>
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

       {appointmentList.length===0?
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
:
        (   <ul className="appointmentContainer">
            {appointmentList.map(i=><EachAppointment details={i} onCancel={this.onCancel} onComplete={this.onComplete}/>)}
            </ul>)}  
        </div>
    </div>
  )
    }
    }

export default Appointments