import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../components/CurrentUserContext";
import TripTile from "../components/TripTile"

const Profile = () => {
  const userPic = useAuth0().user.picture;
  //I'm not using a reducer because for the most part my states aren't dependant on one another
  const user = useContext(CurrentUserContext);
  const [myTrips, setMyTrips] = useState();
  const [favoriteTrips, setFavoriteTrips] = useState();

  useEffect(() => {


    if (user._id) {
      fetch(`/trips-by-author/${user._id}`)
        .then((res) => res.json())
        .then((data) => setMyTrips(data.data));
      fetch(`/favorite-trips/${user._id}`)
        .then((res) => res.json())
        .then((data) => setFavoriteTrips(data.data));
    }
  }, [user]);

  return (
    <div>
      {user && (
        <Container>
          <ProfileCard>
            <Picture src={userPic} alt="Profile Picture" />
            <UserName>{user.username}</UserName>
            <Email>{user.email}</Email>
            <Location>{user.location}</Location>
          </ProfileCard>
          <TripContainer>
          <MyTrips>MyTrips
          { myTrips ? myTrips.map( (trip) => <TripTile key={trip._id} trip={trip} myTrip={true}/>) : "loading..." }
          </MyTrips>
          <FavoriteTrips>Favorite Trips
          { favoriteTrips ? favoriteTrips.map( (trip) => <TripTile key={trip._id} trip={trip}/>) : "loading..." }
          </FavoriteTrips>
          </TripContainer>
        </Container>
      )}
    </div>
  );
};

//Log in Protection
export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <>Loading...</>,
});

const Container = styled.div`
  display: flex;
`;

const Picture = styled.img``;
const UserName = styled.div``;
const Email = styled.div``;
const Location = styled.div``;

const ProfileCard = styled.div``;

const TripContainer = styled.div``;
const MyTrips = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const FavoriteTrips = styled.div`
  display: flex;
  flex-wrap: wrap;
`;