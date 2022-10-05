import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const Profile = () => {
    const { user } = useAuth0();
    const { name, picture, email } = user;


    return <div>Profile</div>
}

export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <>Loading...</>,
  });