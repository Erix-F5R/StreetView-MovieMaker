import { useEffect, useState } from "react";
import TripTile from "../components/TripTile";

const AllTrips = () => {
  
  const [trips, setTrips] = useState([])

  useEffect(()=> {
    fetch('/trips').then(res => res.json()).then((data) => setTrips(data.data))
  }, [])

  return (<div>

    { trips.length ? trips.map( (trip) => <TripTile key={trip._id} trip={trip}/>) : "loading..." }

  </div>);
};

export default AllTrips;
