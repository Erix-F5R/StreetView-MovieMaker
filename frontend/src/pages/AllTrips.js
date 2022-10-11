import { useEffect, useState } from "react";
import TripTile from "../components/TripTile";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { FiXCircle } from "react-icons/fi";
import RadioButton from "../components/RadioButton";

const AllTrips = () => {
  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState({ key: undefined, value: undefined });
  const [localities, setLocalities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [difficulties, setDifficulties] = useState([
    "accessible",
    "easy",
    "intermediate",
    "dangerous",
  ]);
  const { filterParam } = useParams();

  //Grab all trips and
  useEffect(() => {
    fetch("/trips")
      .then((res) => res.json())
      .then((data) => {
        setTrips(data.data);
        return data.data;
      })
      .then((trips) => {
        let filteredLocalities = trips.map((item) => item.formData.locality);

        filteredLocalities = [...new Set(filteredLocalities)];
        setLocalities(filteredLocalities);

        let filteredCountries = trips.map((item) => item.formData.country);
        filteredCountries = [...new Set(filteredCountries)];
        setCountries(filteredCountries);
      });
    if (filterParam) {
      const paramArray = filterParam.split("=");
      setFilter({ key: paramArray[0], value: paramArray[1] });
    }
  }, []);

  //This alernative filter update reacts to clicking filters in the tiles
  useEffect(() => {
    if (filterParam) {
      const paramArray = filterParam.split("=");
      setFilter({ key: paramArray[0], value: paramArray[1] });
    }
  }, [filterParam]);

  const handleClick = (event) => {
    console.log(event.target.value);
    const paramArray = event.target.value.split("=");
    setFilter({ key: paramArray[0], value: paramArray[1] });
  };

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

      <FilterContainer>
        <CurrentFilter
          hidden={filter.key}
          onClick={(event) => {
            event.preventDefault();
            setFilter({ key: undefined, value: undefined });
          }}
        >
          <Span>{filter.value}</Span>
          <FiXCircle />
        </CurrentFilter>
        <FilterCard>
          <fieldset>
            <Title>Difficulty</Title>
            {difficulties.map((option) => (
              <RadioButton
                key={option}
                category={"difficulty"}
                option={option}
                filterValue={filter.value}
                handleClick={handleClick}
              />
            ))}
            <Title>Country</Title>
            {countries.map((option) => (
              <RadioButton
                key={option}
                category={"country"}
                option={option}
                filterValue={filter.value}
                handleClick={handleClick}
              />
            ))}
            <Title>City</Title>
            {localities.map((option) => (
              <RadioButton
                key={option}
                category={"locality"}
                option={option}
                filterValue={filter.value}
                handleClick={handleClick}
              />
            ))}
          </fieldset>
        </FilterCard>
      </FilterContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: var(--color-dark);
  margin-top: 10px;

  border-bottom: 2px solid;
  border-image: linear-gradient(
      to right,
      var(--color-main),
      var(--color-main-faded) 10%,
      white 40%
    )
    1;
`;

const FilterContainer = styled.div`
  position: sticky;
  align-self: flex-start;
  top: 60px;
  overflow-y: auto;
  margin: 10px 40px 10px 0px;
  min-width: 15%;

  display: flex;
  flex-direction: column;
  align-items: center;

`;

const FilterCard = styled.div`
  border-radius: 3px;
  padding: 10px 10px 20px;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 2px solid var(--color-main);



`;

const Span = styled.div`
  margin-right: 10px;
  font-size: 16px;
`;

const CurrentFilter = styled.div`
  visibility: ${(props) => (props.hidden ? "visible" : "hidden")};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: fit-content;

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
  width: 100%;
`;

export default AllTrips;
