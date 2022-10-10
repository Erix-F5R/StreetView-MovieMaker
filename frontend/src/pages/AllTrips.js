import { useEffect, useState } from "react";
import TripTile from "../components/TripTile";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const AllTrips = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [filter, setFilter] = useState({key: undefined, value: undefined});
  const { filterParam } = useParams();

  console.log(filter);

  // if(trips){
  //   setFilteredTrips(trips.filter( t => t.formData[undefined] === undefined))
  // }

  useEffect(() => {
    fetch("/trips")
      .then((res) => res.json())
      .then((data) => {
        setTrips(data.data);
      });
    if (filterParam) {
      const paramArray = filterParam.split("=");
      setFilter({ key: paramArray[0], value: paramArray[1] });
    }
  }, []);

  useEffect(() => {}, [filter]);

  return (
    <Wrapper>
      {trips.length
        ? trips
            .filter((t) => t.formData[filter.key] === filter.value)
            .map((trip) => <TripTile key={trip._id} trip={trip} />)
        : <Loading/>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default AllTrips;
