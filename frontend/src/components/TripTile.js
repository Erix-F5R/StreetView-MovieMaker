import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { FiStar, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const TripTile = ({ trip, myTrip }) => {

  //The Thumbnails saved have a transparent padding of variable size
  //This is an un resolved bug in leaflet-easyprint

  const nav = useNavigate();

  const user = useContext(CurrentUserContext);

  //User clicks the favorite & delete buttons
  const [isFav, setIsFav] = useState(false);
  const [isTrash, setIsTrash] = useState(false);


  //UseEffect loads if the post is favorited
  //On click changes the state & post to backend
  //This should comprimise between imediate feedback and storing state in db
  useEffect(() => {
    setIsFav(trip.favoritedBy.includes(user._id));
  }, []);

  //If you click on username in tile, nav to user profile
  const navToProfile = (ev) => {
    ev.preventDefault();
    nav(`/user/${trip.author}`);
  };

  //nav to AllTrips with filter, if you click difficulty, city, country
  const navToAllTrips = (ev, key, value) => {
    ev.preventDefault();
    nav(`/all-trips/${key}=${value}`);

  };

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

  const handleDelete = () => {
    setIsTrash(true);
    fetch(`/delete-trip/${trip._id}`, {
      method: "DELETE",
    });
  };

  return (
    <Container visible={isTrash}>
      {myTrip ? (
        <TrashButton onClick={() => handleDelete()}>
          <Trash />
        </TrashButton>
      ) : (
        Object.keys(user).length !== 0 && (
          <StarButton
            fav={isFav ? isFav.toString() : undefined}
            onClick={() => handleFavorite()}
          >
            <Star fav={isFav ? isFav.toString() : undefined} />
          </StarButton>
        )
      )}

      <Linky to={`/trips/${trip._id}`}>
        <Label>{trip.formData.label} </Label>
        <Author onClick={(ev) => navToProfile(ev)}>by {trip.username}</Author>

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
          {" "}
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
        <ImgWrapper>
          <Image
            src={require("../assets/thumbnails/" + `${trip.imgName}` + ".png")}
          />
        </ImgWrapper>
      </Linky>
    </Container>
  );
};

const Linky = styled(Link)`
  color: inherit;
`;

const StarButton = styled.button`
  position: absolute;
  margin: 5px;
  right: 0px;
  background: 0;
  color: ${(props) => (props.fav ? "goldenrod" : "#68B684")};

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

const TrashButton = styled(StarButton)`
  &:hover {
    color: var(--color-dark);
  }
`;
const Trash = styled(FiTrash2)``;

const Container = styled.div`
  display: ${(props) => (props.visible ? "none" : "")};

  position: relative;
  color: var(--color-dark);
  width: 25%;
  max-height: 270px;

  padding-left: 30px;
  margin: 30px;
  border: 3px solid var(--color-main);
  border-image: 0;
  transition: color 0.5s;

  &:hover {
    color: var(--color-main);
    border-bottom: 3px solid var(--color-main);
    border-image: linear-gradient(
        to right,

        var(--color-dark) 10%,
        var(--color-main) 50%
      )
      1;
  }
`;

const Label = styled.div`
  text-align: bottom;
  font-size: 20px;
  font-weight: bold;
  margin-top: 25px;
  padding-right: 20px;
`;
const Author = styled.div`
  color: var(--color-main);
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
    color: var(--color-dark);
  }
`;

const Location = styled.div``;

const ImgWrapper = styled.div`
  margin-top: 25px;
`;

const Image = styled.img`
  width: 100%;
`;

export default TripTile;
