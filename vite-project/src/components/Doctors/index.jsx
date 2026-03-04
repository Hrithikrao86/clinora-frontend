import "./index.css"
import {Component} from "react"
import {FiUserPlus, FiTrash2} from "react-icons/fi"

class Doctors extends Component{

state={
  doctors:[],
  showModal:false,
  name:"",
  department:""
}

componentDidMount(){
  this.fetchDoctors()
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

addDoctor = async () => {

  const {name,department} = this.state

  const response = await fetch(
    "https://clinora-backend.onrender.com/api/clinic/doctors",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify({
        name,
        department
      })
    }
  )

  if(response.ok){

    this.setState({
      name:"",
      department:"",
      showModal:false
    })

    this.fetchDoctors()
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

{doctors.map(doc=>(
  
<div key={doc.id} className="doctor-card">

<div className="avatar">
👨‍⚕️
</div>

<h3>{doc.name}</h3>

<p>{doc.department || "General"}</p>

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

<input
placeholder="Department"
value={department}
onChange={(e)=>this.setState({department:e.target.value})}
/>

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