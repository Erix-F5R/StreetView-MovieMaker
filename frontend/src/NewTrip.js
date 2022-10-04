import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const NewTrip = () =>{
    return <div>New Trip</div>
}

export default withAuthenticationRequired(NewTrip, {
    onRedirecting: () => <>Loading...</>,
  });