import { Component } from "react"
import "./index.css"

class Offers extends Component {

state = {
  list: [],
  title: "",
  description: ""
}

componentDidMount(){
  this.fetchOffers()
}

fetchOffers = async () => {
  const res = await fetch(
    "https://api.clinorahq.in/api/offers",
    { credentials: "include" }
  )

  if(res.ok){
    const data = await res.json()
    this.setState({ list: data })
  }
}

addOffer = async () => {
  const { title, description } = this.state

  if(!title) return

  await fetch(
    "https://api.clinorahq.in/api/offers",
    {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      credentials:"include",
      body: JSON.stringify({ title, description })
    }
  )

  this.setState({ title:"", description:"" })
  this.fetchOffers()
}

deleteOffer = async (id) => {
  await fetch(
    `https://api.clinorahq.in/api/offers/${id}`,
    {
      method:"DELETE",
      credentials:"include"
    }
  )

  this.fetchOffers()
}

render(){

const { list, title, description } = this.state

return(

<div className="page">

<h2>Offers</h2>

<div className="add-box">
  <input
    placeholder="Offer Title"
    value={title}
    onChange={(e)=>this.setState({title:e.target.value})}
  />
  <input
    placeholder="Description"
    value={description}
    onChange={(e)=>this.setState({description:e.target.value})}
  />
  <button onClick={this.addOffer}>Add</button>
</div>

<div className="list">
{list.map(item=>(
  <div className="list-item" key={item.id}>
    <div>
      <strong>{item.title}</strong>
      <p>{item.description}</p>
    </div>
    <button onClick={()=>this.deleteOffer(item.id)}>❌</button>
  </div>
))}
</div>

</div>

)

}

}

export default Offers