import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

const ClinicDetails = () => {
  const {id} = useParams()

  const [stats, setStats] = useState({})
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetch(`https://api.clinorahq.in/api/superadmin/clinic/${id}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setStats(data.stats)
        setAppointments(data.todayAppointments)
      })
  }, [id])

  return (
    <div>

      <h2>Clinic Details</h2>

      <div>
        <p>Patients: {stats.patients}</p>
        <p>Bookings: {stats.bookings}</p>
        <p>Conversion: {stats.conversion}%</p>
        <p>Today: {stats.todayAppointments}</p>
      </div>

      <h3>Today's Appointments</h3>

      <ul>
        {appointments.map(a => (
          <li key={a.id}>
            {a.name} - {a.appointment_time} - {a.department}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default ClinicDetails