import { useEffect, useState } from "react";
import TripTile from "../components/TripTile";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { FiXCircle } from "react-icons/fi";

const AllTrips = () => {
  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState({ key: undefined, value: undefined });
  const { filterParam } = useParams();

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

  //This alernative filter update reacts to clicking on the tiles
  useEffect(() => {
    
    if (filterParam) {
      const paramArray = filterParam.split("=");
      setFilter({ key: paramArray[0], value: paramArray[1] });
    }
  }, [filterParam]);


  const handleClick = (event) => {
        
    const paramArray = event.target.value.split("=");
    setFilter({ key: paramArray[0], value: paramArray[1] });
  }

  return (
    <Container>
      <Wrapper>
        {trips.length ? (
          trips
            .filter((trip) => trip.formData[filter.key] === filter.value)
            .map((trip) => <TripTile key={trip._id} trip={trip} />)
        ) : (
          <Loading />
        )}
      </Wrapper>

      <FilterCard>
        filtercard
        {filter.key && (
          <CurrentFilter
            onClick={(event) => {
              event.preventDefault();
              setFilter({ key: undefined, value: undefined });
            }}
          >
            <Span>{filter.value}</Span>
            <FiXCircle />
          </CurrentFilter>
        )}
        <fieldset>
        <div>
          <input type="radio" value="difficulty=easy"  name='filter' checked={filter.value === 'easy'} onClick={(event)=> handleClick(event)} />
          <label>easy</label>
        </div>
        <div>
          <input type="radio" value="difficulty=intermediate" name='filter' onClick={(event)=> handleClick(event)} />
          <label>intermediate</label>
        </div>
        </fieldset>
      </FilterCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FilterCard = styled.div`
  border: 2px solid var(--color-main);
  border-radius: 3px;
  margin: 10px 40px 10px 0px;
  padding: 25px 10px 20px;
  min-width: 15%;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: sticky;
  align-self: flex-start;
  top: 60px;
  overflow-y: auto;
`;

const Span = styled.div`
  margin-right: 10px;
  font-size: 16px;
`;

const CurrentFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 15px;
  margin: 5px;
  font-size: 20px;
  background: var(--color-main);
  color: white;
  border-radius: 100px;
  cursor: pointer;
  transition: color 0.5s;

  &:hover {
    color: var(--color-dark);
  }
  &:active {
    color: white;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default AllTrips;
