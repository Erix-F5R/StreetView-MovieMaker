import { useEffect, useState } from "react";
import TripTile from "../components/TripTile";
import styled from "styled-components";
const AllTrips = () => {
  
  const [trips, setTrips] = useState([])

  useEffect(()=> {
    fetch('/trips').then(res => res.json()).then((data) => setTrips(data.data))
  }, [])

  return (<Wrapper>

    { trips.length ? trips.map( (trip) => <TripTile key={trip._id} trip={trip}/>) : "loading..." }

  </Wrapper>);
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default AllTrips;
