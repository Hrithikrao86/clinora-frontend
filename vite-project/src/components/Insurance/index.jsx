import { Component } from "react"
import "./index.css"

class Insurance extends Component {

state = {
  list: [],
  name: ""
}

componentDidMount(){
  this.fetchInsurance()
}

fetchInsurance = async () => {
  const res = await fetch(
    "https://api.clinorahq.in/api/insurance",
    { credentials: "include" }
  )

  if(res.ok){
    const data = await res.json()
    this.setState({ list: data })
  }
}

addInsurance = async () => {
  const { name } = this.state

  if(!name) return

  await fetch(
    "https://api.clinorahq.in/api/insurance",
    {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      credentials:"include",
      body: JSON.stringify({ name })
    }
  )

  this.setState({ name:"" })
  this.fetchInsurance()
}

deleteInsurance = async (id) => {
  await fetch(
    `https://api.clinorahq.in/api/insurance/${id}`,
    {
      method:"DELETE",
      credentials:"include"
    }
  )

  this.fetchInsurance()
}

render(){

const { list, name } = this.state

return(

<div className="page">

<h2>Insurance</h2>

<div className="add-box">
  <input
    placeholder="Enter insurance name"
    value={name}
    onChange={(e)=>this.setState({name:e.target.value})}
  />
  <button onClick={this.addInsurance}>Add</button>
</div>

<div className="list">
{list.map(item=>(
  <div className="list-item" key={item.id}>
    {item.name}
    <button onClick={()=>this.deleteInsurance(item.id)}>❌</button>
  </div>
))}
</div>

</div>

)

}

}

export default Insurance