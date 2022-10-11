import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TripDetailMap from "../components/TripDetailMap";
import Loading from "../components/Loading";
import { FiStar } from "react-icons/fi";
import { CurrentUserContext } from "../components/CurrentUserContext";

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

  const user = useContext(CurrentUserContext);
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    setIsFav(!isFav);
    //Patch TO DB
    fetch("/favorite-unfavorite", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user._id,
        trip: trip._id,
      }),
    });
  };

  return (
    <Center>
      {trip ? (
        <Container>
          {Object.keys(user).length !== 0 && (
            <StarButton
              fav={isFav ? isFav.toString() : undefined}
              onClick={() => handleFavorite()}
            >
              <Star fav={isFav ? isFav.toString() : undefined} />
            </StarButton>
          )}
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

const StarButton = styled.button`
  position: absolute;
  margin: 5px;
  right: 0px;
  top: 0px;
  background: 0;
  color: ${(props) => (props.fav ? "goldenrod" : "#68B684")};
  font-size: 36px;

  &:hover {
    color: goldenrod;
  }

  &:active {
    transform: scale(1.1);
  }
`;
const Star = styled(FiStar)`

  fill: ${(props) => (props.fav ? "goldenrod" : "0")};
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
  position: relative;
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
