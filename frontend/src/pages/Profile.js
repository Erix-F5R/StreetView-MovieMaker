import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../components/CurrentUserContext";
import TripTile from "../components/TripTile";
import Loading from "../components/Loading";

const Profile = () => {
  const userPic = useAuth0().user.picture;
  //I'm not using a reducer because for the most part my states aren't dependant on one another
  const user = useContext(CurrentUserContext);
  const [myTrips, setMyTrips] = useState();
  const [favoriteTrips, setFavoriteTrips] = useState();
  const [tabValue, setTabValue] = useState(0);

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

  const handleTab = (value) => {
    setTabValue(value);
  };

  return (
    <>
      {user ? (
        <Container>
          <TripContainer>
            <Tabs>
              <Tab onClick={() => handleTab(0)} selected={tabValue === 0}>
                My Trips
              </Tab>
              <Tab onClick={() => handleTab(1)} selected={tabValue === 1}>
                Favorites
              </Tab>
            </Tabs>
            <MyTrips selected={tabValue === 0}>
              {myTrips
                ? myTrips.map((trip) => (
                    <TripTile key={trip._id} trip={trip} myTrip={true} />
                  ))
                : <Loading />}
            </MyTrips>
            <FavoriteTrips selected={tabValue === 1}>
              {favoriteTrips
                ? favoriteTrips.map((trip) => (
                    <TripTile key={trip._id} trip={trip} />
                  ))
                : <Loading />}
            </FavoriteTrips>
          </TripContainer>

          <ProfileCard>
            <Picture src={userPic} alt="Profile Picture" />
            <UserName>{user.username}</UserName>
            <Email>{user.email}</Email>
            <Location>{user.location}</Location>
          </ProfileCard>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};

//Log in Protection
export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <>Loading...</>,
});

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Tabs = styled.div`
  border-bottom: 3px solid var(--color-main);
  border-image: linear-gradient(
      to right,
      var(--color-main),
      var(--color-main) 30%,
      white 40%
    )
    1;
`;
const Tab = styled.button`
  padding: 5px;
  margin: 0px 2px;
  margin-bottom: -2.25px;
  font-size: 20px;
  background: ${(props) => (props.selected ? "#68B684" : "white")};
  color: ${(props) => (props.selected ? "white" : "#68B684")};
  border-radius: 3px;
  cursor: pointer;

  border-bottom: 3px solid var(--color-main);
  border-image: 0;
  transition: color 0.5s, background 0.5s;

  &:hover {
    color: var(--color-dark);
    background: var(--color-main-faded);
    border-bottom: 3px solid var(--color-main);
    border-image: linear-gradient(
        to right,
        var(--color-main),
        var(--color-dark) 30%,
        var(--color-dark) 60%,
        var(--color-main)
      )
      1;
  }
  &:active {
    color: white;
  }
`;

const ProfileCard = styled.div`
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
const Picture = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;
const UserName = styled.div`
  font-size: 30px;
  margin: 15px 0px 10px;
  padding: 0px 10px;
  color: var(--color-main);
  border-bottom: 3px solid var(--color-main);
  border-image: linear-gradient(to right, white, var(--color-main) 50%, white) 1;
`;
const Email = styled.div`
  color: var(--color-dark);
`;
const Location = styled.div`
  color: var(--color-dark);
  margin-top: 8px;
`;

const TripContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const MyTrips = styled.div`
  display: ${(props) => (props.selected ? "flex" : "none")};
  flex-wrap: wrap;
`;
const FavoriteTrips = styled.div`
  display: ${(props) => (props.selected ? "flex" : "none")};
  flex-wrap: wrap;
`;
