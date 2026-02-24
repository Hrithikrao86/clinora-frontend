import "./index.css"

const DatesHeader=(props)=>{
const {day,selectedDate,updateDate}=props
const updatedate=()=>{
    updateDate(day.value)
}
return ( <li key={day.value}>
      <button
        className={
          selectedDate === day.value ? "dateBtn activeDate" : "dateBtn"
        }
        onClick={updatedate}
      >
        {day.label}
      </button>
    </li>)
}
export default DatesHeader