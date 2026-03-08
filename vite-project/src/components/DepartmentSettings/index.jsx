import { Component } from "react"
import "./index.css"

class DepartmentSettings extends Component {

  state = {
    allDepartments: [],
    selected: [],
    successMsg:""
  }

  componentDidMount() {
    this.fetchDepartments()
  }

  fetchDepartments = async () => {

    const response = await fetch(
      "https://clinora-backend.onrender.com/api/departments/all",
      { credentials:"include" }
    )

    const data = await response.json()

    this.setState({
      allDepartments:data
    })

  }

  toggleDepartment = (key) => {

    const {selected} = this.state

    if(selected.includes(key)){
      this.setState({
        selected:selected.filter(d=>d!==key)
      })
    }
    if (selected.length>8){
      alert("You can select Maximum 8 departments")
      return
    }
    
      this.setState({
        selected:[...selected,key]
      })
    

  }

  saveDepartments = async () => {

    const {selected} = this.state

    const response = await fetch(
      "https://clinora-backend.onrender.com/api/clinic/departments",
      {
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({
          departments:selected
        })
      }
    )

    if(response.ok){
      this.setState({
        successMsg:"✅ Departments saved successfully"
      })

      setTimeout(()=>{
        this.setState({successMsg:""})
      },3000)
    }

  }

  render(){

    const {allDepartments,selected,successMsg} = this.state

    return(

      <div className="dept-page">

        <h1>Hospital Departments</h1>

        <p>Select departments available in your hospital</p>

        <div className="dept-grid">

          {allDepartments.map(d=>(
            <label key={d.dept_key} className="dept-item">

              <input
                type="checkbox"
                disabled={!selected.includes(d.dept_key)}
                checked={selected.includes(d.dept_key)}
                onChange={()=>this.toggleDepartment(d.dept_key)}
              />

              {d.name_en}

            </label>
          ))}

        </div>

        <button
          className="save-btn"
          onClick={this.saveDepartments}
        >
          Save Departments
        </button>

        {successMsg && (
          <p className="success">{successMsg}</p>
        )}

      </div>

    )

  }

}

export default DepartmentSettings