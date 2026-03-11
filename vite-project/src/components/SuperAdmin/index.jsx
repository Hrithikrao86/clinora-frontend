import {Component} from "react"
import {FiPlus, FiPower, FiX, FiTrash2, FiCalendar} from "react-icons/fi"
import "./index.css"

class SuperAdmin extends Component{

state={
  clinics:[],
  showModal:false,
  name:"",
  username:"",
  password:"",
  phone_number_id:"",
  subscription_end:"",

  // 🔐 Access control
  isAuthorized:false,
  accessCode:""
}

// 🔐 verify code
verifyCode = () => {
  const SECRET_CODE = "218981"

  if(this.state.accessCode === SECRET_CODE){
    this.setState({isAuthorized:true}, this.fetchClinics)
  }else{
    alert("Invalid Access Code")
  }
}

componentDidMount(){
  if(this.state.isAuthorized){
    this.fetchClinics()
  }
}

fetchClinics = async ()=>{

  const response = await fetch(
    "https://api.clinorahq.in/api/superadmin/clinics",
    {credentials:"include"}
  )

  if(response.ok){
    const data = await response.json()

    this.setState({
      clinics:data
    })
  }

}

createClinic = async ()=>{

  const {name,username,password,phone_number_id} = this.state

  const response = await fetch(
    "https://api.clinorahq.in/api/superadmin/create-clinic",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify({
        name,
        username,
        password,
        phone_number_id
      })
    }
  )

  if(response.ok){

    this.setState({
      showModal:false,
      name:"",
      username:"",
      password:"",
      phone_number_id:""
    })

    this.fetchClinics()
  }

}

toggleClinic = async (id,is_active)=>{

  await fetch(
    `https://api.clinorahq.in/api/superadmin/toggle/${id}`,
    {
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify({
        is_active:!is_active
      })
    }
  )

  this.fetchClinics()

}

deleteClinic = async (id) => {

  const confirmDelete = window.confirm("Delete this hospital?")

  if(!confirmDelete) return

  await fetch(
    `https://api.clinorahq.in/api/superadmin/clinics/${id}`,
    {
      method:"DELETE",
      credentials:"include"
    }
  )

  this.fetchClinics()

}

extendSubscription = async (id) => {

  const newDate = prompt("Enter new expiry date (YYYY-MM-DD)")

  if(!newDate) return

  await fetch(
    `https://api.clinorahq.in/api/superadmin/clinics/${id}/subscription`,
    {
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify({
        subscription_end:newDate
      })
    }
  )

  this.fetchClinics()

}

render(){

const {clinics,showModal,name,username,password,phone_number_id,isAuthorized,accessCode} = this.state

// 🔐 Login Screen
if(!isAuthorized){
  return(
    <div className="superadmin-login">

      <h2>Clinora Super Admin</h2>

      <input
        type="password"
        placeholder="Enter Access Code"
        value={accessCode}
        onChange={(e)=>this.setState({accessCode:e.target.value})}
      />

      <button onClick={this.verifyCode}>
        Unlock
      </button>

    </div>
  )
}

return(

<div className="superadmin-page">

<div className="superadmin-header">

<div>
<h1>Clinora Control Center</h1>
<p>Manage hospitals using Clinora platform</p>
</div>

<button
className="add-hospital-btn"
onClick={()=>this.setState({showModal:true})}
>
<FiPlus/> Add Hospital
</button>

</div>


<div className="clinic-table">

<table>

<thead>
<tr>
<th>Hospital</th>
<th>Username</th>
<th>Status</th>
<th>WhatsApp ID</th>
<th>Subscription</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{clinics.map(clinic=>(
<tr key={clinic.id}>

<td className="hospital-name">
{clinic.name}
</td>

<td>{clinic.username}</td>

<td>
{clinic.is_active ?
<span className="status-active">Active</span> :
<span className="status-inactive">Disabled</span>
}
</td>

<td className="phoneid">
{clinic.phone_number_id}
</td>

<td>
{clinic.subscription_end || "—"}
</td>

<td className="action-buttons">

<button
className="toggle-btn"
onClick={()=>this.toggleClinic(clinic.id,clinic.is_active)}
title="Activate / Deactivate"
>
<FiPower/>
</button>



<button
className="subscription-btn"
onClick={()=>this.extendSubscription(clinic.id)}
title="Extend Subscription"
>
<FiCalendar/>
</button>



</td>

</tr>
)) }

</tbody>

</table>

</div>


{showModal && (

<div className="modal-overlay">

<div className="modal-card">

<div className="modal-header">

<h2>Create Hospital</h2>

<button
className="close-btn"
onClick={()=>this.setState({showModal:false})}
>
<FiX/>
</button>

</div>

<input
placeholder="Hospital Name"
value={name}
onChange={(e)=>this.setState({name:e.target.value})}
/>

<input
placeholder="Username"
value={username}
onChange={(e)=>this.setState({username:e.target.value})}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>this.setState({password:e.target.value})}
/>

<input
placeholder="Phone Number ID"
value={phone_number_id}
onChange={(e)=>this.setState({phone_number_id:e.target.value})}
/>

<button
className="create-btn"
onClick={this.createClinic}
>
Create Hospital
</button>

</div>

</div>

)}

</div>

)

}

}

export default SuperAdmin