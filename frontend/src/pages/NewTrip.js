import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";

import OriginDestInput from "../components/OriginDestInput";
import GeoCode from "../MapFlow/GeoCode";
import PathAndBearing from "../MapFlow/PathAndBearing";
import { MapFlowContext } from "../MapFlow/MapFlowContext";

import NewMap from "../components/NewMap";

const NewTrip = () => {
  const {
    state: { origin, destination, status, geocodedOrigin, geocodedDestination },
    actions: { receivedGeocoding, receivedPath },
  } = useContext(MapFlowContext);

  useEffect(() => {
    switch (status) {
      case "origin-dest-received": {
        GeoCode(origin, destination).then((res) => receivedGeocoding(res));
        return;
      }
      case "origin-dest-geocoded": {
        PathAndBearing(geocodedOrigin, geocodedDestination).then((res) =>
          receivedPath(res)
        );
        return;
      }
      case "path-received":{
        return;
      }
    }
  }, [status]);

  return (
    <>
      <div>New Trip</div>
      <OriginDestInput />
      <NewMap />
    </>
  );
};

export default withAuthenticationRequired(NewTrip, {
  onRedirecting: () => <>Loading...</>,
});
