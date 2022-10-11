
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TripTile from "../components/TripTile";
import DefaultPic from "../assets/defaultPic.jpg"
import Loading from "../components/Loading";

//Generic non logged in user. Doesn't show their favorites
const User = () => {

  //I'm not using a reducer because for the most part my states aren't dependant on one another
  const [user, setUser] = useState();
  const [userTrips, setUserTrips] = useState();
  const { userId} = useParams();


  //Get user
  useEffect(() => {    
      fetch(`/user/${userId}`)
        .then((res) => res.json())
        .then((data) => setUser(data.data));

  }, []);

  //Get Trips
  useEffect(()=> {
    if(user){
        fetch(`/trips-by-author/${userId}`)
        .then((res) => res.json())
        .then((data) => setUserTrips(data.data));
    }
  }, [user])



  return (
    <div>
      {user ? (
        <Container>
          <TripContainer>
            <Tabs>
              <Tab>
                User Trips
              </Tab>
            
            </Tabs>
            <UserTrips >
              {userTrips
                ? userTrips.map((trip) => (
                    <TripTile key={trip._id} trip={trip}  />
                  ))
                : <Loading/>}
            </UserTrips>

          </TripContainer>

          <ProfileCard>
            <Picture src={DefaultPic} alt="Profile Picture" /> 
            <UserName>{user.username}</UserName>
            <Location>{user.location}</Location>
          </ProfileCard>
        </Container>
      ): <Loading/>}
    </div>
  );
};

//Log in Protection
export default User

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
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
  background: var(--color-main);
  color: white;
  border-radius: 3px;
  
  border-bottom: 3px solid var(--color-main);
  border-image: 0;
  transition: color 0.5s, background 0.5s;

`;

const ProfileCard = styled.div`
  border: 2px solid var(--color-main);
  border-radius: 3px;
  margin: 10px 40px 10px -40px;
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
    height:100%;
    width: 100%;
`;
const UserTrips = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
