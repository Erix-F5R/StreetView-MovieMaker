import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";

import OriginDestInput from "../components/OriginDestInput";
import GeoCode from "../MapFlow/GeoCode";
import PathAndBearing from "../MapFlow/PathAndBearing";
import { MapFlowContext } from "../MapFlow/MapFlowContext";
import styled from "styled-components";

import NewMap from "../components/NewMap";
import ModalTrip from "../modal/ModalTrip";

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
      case "path-received": {
        return;
      }
    }
  }, [status]);

  return (
    <>
      <div>New Trip</div>
      <Container>
        <OriginDestInput />
        <NewMap />
        <ModalTrip />
      </Container>
    </>
  );
};

const Container = styled.div`
 position: absolute;
 top: 50%;
  left: 50%;
  padding: 10px;
  background: white;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  border: 2px solid var(--color-main);
  box-shadow: 24;
  color: var(--color-dark);
  font-size: 24px;
  `

export default withAuthenticationRequired(NewTrip, {
  onRedirecting: () => <>Loading...</>,
});
