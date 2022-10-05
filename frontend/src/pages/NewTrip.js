import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useContext, useReducer } from "react";
import { initialState, reducer, receivedOriginDestination, receivedGeocoding } from "../reducers-contexts/MapFlowReducer";
import OriginDestInput from "../components/OriginDestInput";
import { MapFlowContext } from "../reducers-contexts/MapFlowContext";

const NewTrip = () => {

    const {state} = useContext(MapFlowContext)
    console.log('a', state);


  return (
    <>
      <div>New Trip</div>
      <OriginDestInput />
    </>
  );
};

export default withAuthenticationRequired(NewTrip, {
  onRedirecting: () => <>Loading...</>,
});
