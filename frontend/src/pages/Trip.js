import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TripDetailMap from "../components/TripDetailMap";
import Loading from "../components/Loading";

//Trip detail page
const Trip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const nav = useNavigate();

  //applies a filter on Alltrips.js
  const navToAllTrips = (ev, key, value) => {
    ev.preventDefault();
    nav(`/all-trips/${key}=${value}`);
  };

  //Filter on profile
  const navToProfile = (ev) => {
    ev.preventDefault();
    nav(`/user/${trip.author}`);
  };

  //Load the trip
  useEffect(() => {
    fetch(`/trip/${tripId}`)
      .then((res) => res.json())
      .then((data) => setTrip(data.data));
  }, []);

  return (
    <Center>
      {trip ? (
        <Container>
          <HeaderWrapper>
            <InfoWrapper>
              <Label>{trip.formData.label} </Label>
              <Author onClick={(ev) => navToProfile(ev)}>by {"pacific"}</Author>

              <Difficulty>
                Rated:{" "}
                <SpanLink
                  onClick={(ev) =>
                    navToAllTrips(ev, "difficulty", trip.formData.difficulty)
                  }
                >
                  {trip.formData.difficulty}
                </SpanLink>
                <Span>({Math.floor(trip.distance / 100) / 10} km)</Span>
              </Difficulty>
              <Location>
                <SpanLink
                  onClick={(ev) =>
                    navToAllTrips(ev, "locality", trip.formData.locality)
                  }
                >
                  {trip.formData.locality}
                </SpanLink>
                ,{" "}
                <SpanLink
                  onClick={(ev) =>
                    navToAllTrips(ev, "country", trip.formData.country)
                  }
                >
                  {trip.formData.country}
                </SpanLink>
              </Location>
            </InfoWrapper>
            <NotesWrapper>
              Notes: <Notes>{trip.formData.notes}</Notes>
            </NotesWrapper>
          </HeaderWrapper>
          <TripDetailMap bbox={trip.bbox} pathBearing={trip.pathBearing} />
        </Container>
      ) : (
        <Loading />
      )}
    </Center>
  );
};

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

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
  padding-top: 15px;
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
  max-width: 70%;
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
  transition: color 0.5s;
  cursor: pointer;

  &:hover {
    color: var(--color-dark);
  }
`;

const Difficulty = styled.div`
  margin-top: 10px;
  font-size: 16px;
`;

const Span = styled.span`
  margin-left: 20px;
  font-weight: bold;
`;

const SpanLink = styled.span`
  transition: color 0.5s;
  cursor: pointer;

  &:hover {
    color: var(--color-main);
  }
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
