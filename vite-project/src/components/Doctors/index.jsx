import "./index.css"
import {Component} from "react"
import {FiUserPlus, FiTrash2} from "react-icons/fi"

class Doctors extends Component{

state={
  doctors:[],
  departments:[],
  showModal:false,
  name:"",
  department:"",
  schedules:{}
}

componentDidMount(){
  this.fetchDoctors()
  this.fetchDepartments()
}

fetchDoctors = async () => {

  const response = await fetch(
    "https://clinora-backend.onrender.com/api/clinic/doctors",
    {
      credentials:"include"
    }
  )

  const data = await response.json()

  if(response.ok){
    this.setState({doctors:data})
  }
}

fetchDepartments = async () => {

  const res = await fetch(
    "https://clinora-backend.onrender.com/api/clinic/departments",
    {
      credentials: "include"
    }
  )

  if(res.ok){
    const data = await res.json()

    this.setState({
      departments: data
    })
  }

}

addDoctor = async () => {

  const { name, department } = this.state

  console.log("Sending doctor:", name, department)

  try {

    const response = await fetch(
      "https://clinora-backend.onrender.com/api/clinic/doctors",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          department
        })
      }
    )

    console.log("Response received")

    const data = await response.json()

    console.log("Backend response:", data)

    if (response.ok) {

      this.setState({
        name: "",
        department: "",
        showModal: false
      })

      this.fetchDoctors()

    } else {

      alert(data.error || "Failed to add doctor")

    }

  } catch (err) {

    console.error("ERROR:", err)
    alert("Server error")

  }
}
deleteDoctor = async (id) => {

  await fetch(
    `https://clinora-backend.onrender.com/api/clinic/doctors/${id}`,
    {
      method:"DELETE",
      credentials:"include"
    }
  )

  this.fetchDoctors()
}

updateScheduleField = (doctorId, field, value) => {

  const schedules = {...this.state.schedules}

  if(!schedules[doctorId]){
    schedules[doctorId] = {}
  }

  schedules[doctorId][field] = value

  this.setState({ schedules })

}


toggleDay = (doctorId, day) => {

  const schedules = {...this.state.schedules}

  if(!schedules[doctorId]){
    schedules[doctorId] = {working_days:[]}
  }

  const days = schedules[doctorId].working_days || []

  if(days.includes(day)){
    schedules[doctorId].working_days =
      days.filter(d => d !== day)
  }else{
    schedules[doctorId].working_days =
      [...days, day]
  }

  this.setState({ schedules })

}


saveSchedule = async (doctorId) => {

  const schedule = this.state.schedules[doctorId]

  if(!schedule){
    alert("Please configure schedule first")
    return
  }

  const response = await fetch(
    `https://clinora-backend.onrender.com/api/clinic/doctors/${doctorId}/schedule`,
    {
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify(schedule)
    }
  )

  if(response.ok){
    alert("Schedule saved")
  }else{
    alert("Failed to save schedule")
  }

}

render(){

const {doctors,showModal,name,department}=this.state

return(

<div className="doctors-page">

<div className="doctor-header">

<div>
<h1>Doctors</h1>
<p>Manage clinic doctors</p>
</div>

<button
className="add-btn"
onClick={()=>this.setState({showModal:true})}
>
<FiUserPlus/> Add Doctor
</button>

</div>


<div className="doctor-grid">

{doctors.map(doc => (

<div key={doc.id} className="doctor-card">

<div className="avatar">👨‍⚕️</div>

<h3>{doc.name}</h3>

<p>{doc.department || "General"}</p>


<div className="schedule-box">

<label>Start Time</label>

<input
type="time"
onChange={(e)=>
this.updateScheduleField(doc.id,"start_time",e.target.value)
}
/>


<label>End Time</label>

<input
type="time"
onChange={(e)=>
this.updateScheduleField(doc.id,"end_time",e.target.value)
}
/>


<div className="days">

{["mon","tue","wed","thu","fri","sat","sun"].map(day => (

<label key={day}>

<input
type="checkbox"
onChange={()=>this.toggleDay(doc.id,day)}
/>

{day.toUpperCase()}

</label>

))}

</div>


<button
className="schedule-btn"
onClick={()=>this.saveSchedule(doc.id)}
>
Save Schedule
</button>

</div>


<button
className="delete-btn"
onClick={()=>this.deleteDoctor(doc.id)}
>
<FiTrash2/>
</button>

</div>

))}

</div>


{showModal && (

<div className="modal">

<div className="modal-card">

<h2>Add Doctor</h2>

<input
placeholder="Doctor Name"
value={name}
onChange={(e)=>this.setState({name:e.target.value})}
/>

<select
  value={this.state.department}
  onChange={(e)=>this.setState({department:e.target.value})}
  className="doctor-select"
>

<option value="">Select Department</option>

{this.state.departments.map(dep => (
  <option key={dep.dept_key} value={dep.dept_key}>
    {dep.name_en}
  </option>
))}

</select>
<button
className="save-btn"
onClick={this.addDoctor}
>
Save Doctor
</button>

<button
className="cancel-btn"
onClick={()=>this.setState({showModal:false})}
>
Cancel
</button>

</div>

</div>

)}

</div>

)

}

}

export default Doctors