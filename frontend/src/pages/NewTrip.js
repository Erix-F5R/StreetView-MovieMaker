import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";

import OriginDestInput from "../components/OriginDestInput";
import GeoCode from "../MapFlow/GeoCode";
import { MapFlowContext } from "../MapFlow/MapFlowContext";

import NewMap from "../components/NewMap";

const NewTrip = () => {
  const {
    state: { origin, destination, status },
    actions: { receivedGeocoding },
  } = useContext(MapFlowContext);

  useEffect(() => {
    if (status === "origin-dest-received") {
      GeoCode(origin, destination).then((res) => receivedGeocoding(res));
    }
  }, [status]);

  return (
    <>
      <div>New Trip</div>
      <OriginDestInput />

      <NewMap/>


    </>
  );
};

export default withAuthenticationRequired(NewTrip, {
  onRedirecting: () => <>Loading...</>,
});
