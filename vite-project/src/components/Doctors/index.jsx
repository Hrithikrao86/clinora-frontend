import {Component} from "react"

class Doctors extends Component {

state = {
  doctors: [],
  name: "",
  department: "",
  description_en: "",
  description_te: "",
  description_hi: ""
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

  this.setState({doctors:data})
}

addDoctor = async () => {

  const {name,department,description_en,description_te,description_hi} = this.state

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
        department,
        description_en,
        description_te,
        description_hi
      })
    }
  )

  if(response.ok){
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

const {doctors} = this.state

return(

<div>

<h2>Doctors</h2>

<input placeholder="Doctor Name"
onChange={(e)=>this.setState({name:e.target.value})}/>

<input placeholder="Department"
onChange={(e)=>this.setState({department:e.target.value})}/>

<input placeholder="English Description"
onChange={(e)=>this.setState({description_en:e.target.value})}/>

<input placeholder="Telugu Description"
onChange={(e)=>this.setState({description_te:e.target.value})}/>

<input placeholder="Hindi Description"
onChange={(e)=>this.setState({description_hi:e.target.value})}/>

<button onClick={this.addDoctor}>Add Doctor</button>

<hr/>

{doctors.map(doc => (

<div key={doc.id}>

<h4>{doc.name}</h4>
<p>{doc.department}</p>

<button onClick={()=>this.deleteDoctor(doc.id)}>
Delete
</button>

</div>

))}

</div>

)

}

}

export default Doctors