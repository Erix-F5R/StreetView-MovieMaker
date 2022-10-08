import { useEffect } from "react"
import { useParams } from "react-router-dom"

const Trip =  () => {
    const {tripId} = useParams();
    const [trip ,setTrip] = useState(null)

    useEffect(()=>{
        fetch(`/trip/${tripId}`).then(res => res.json()).then((data) => setTrips(data.data))
    }, [])

    return <div>Trip</div>
}
export default Trip