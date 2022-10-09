import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../components/CurrentUserContext";


const Profile = () => {
  const userPic = useAuth0().user.picture;
  const user = useContext(CurrentUserContext);


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
          <TripContainer>Trips</TripContainer>
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
