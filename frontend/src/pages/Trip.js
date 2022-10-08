import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TripDetailMap from "../components/TripDetailMap";

const Trip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    fetch(`/trip/${tripId}`)
      .then((res) => res.json())
      .then((data) => setTrip(data.data));
  }, []);

  return (
    <>
      {trip ? (
        <Container>
          <HeaderWrapper>
            <InfoWrapper>
              <Label>{trip.formData.label} </Label>
              <Author>by {"pacific"}</Author>

              <Difficulty>
                Rated: {trip.formData.difficulty}{" "}
                <Span>({Math.floor(trip.distance / 100) / 10} km)</Span>
              </Difficulty>
              <Location>
                {trip.formData.locality}, {trip.formData.country}{" "}
              </Location>
            </InfoWrapper>
            <NotesWrapper>Notes: <Notes>{trip.formData.notes}</Notes></NotesWrapper>
          </HeaderWrapper>
          <TripDetailMap bbox={trip.bbox} pathBearing={trip.pathBearing} />
        </Container>
      ) : (
        "Loading..."
      )}
    </>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
    margin-right: 25px;
    max-width: 50%;
`;
const NotesWrapper = styled.div`
    font-size: 24px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;
const Notes = styled.div`
    border: 2px solid var(--color-dark);
    border-radius: 4px;
    margin-top: 5px;
    padding: 10px;
    font-size: 18px;
    height: 100%;
`;

const Container = styled.div`
  border: 1px solid black;
  color: var(--color-dark);
  width: fit-content;
  padding: 30px;
  margin: 30px;
  border: 3px solid var(--color-main);
  border-image: 0;
  transition: color 0.5s;

  ${
    "" /* &:hover {
    color: var(--color-main);
    border-bottom: 3px solid var(--color-main);
    border-image: linear-gradient(
        to right,

        var(--color-dark) 10%,
        var(--color-main) 50%
      )
      1;
  } */
  }
`;

const Label = styled.div`
  text-align: bottom;
  font-size: 36px;
  font-weight: bold;
  margin-top: 5px;
`;
const Author = styled.div`
  color: var(--color-main);
  font-size: 24px;
`;

const Difficulty = styled.div`
  margin-top: 10px;
  font-size: 16px;
`;

const Span = styled.span`
  margin-left: 20px;
  font-weight: bold;
`;

const Location = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;

const ImgWrapper = styled.div`
  margin-top: 25px;
`;

const Image = styled.img`
  width: 100%;
`;
export default Trip;
