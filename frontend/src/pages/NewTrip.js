import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useContext, useEffect, useReducer } from "react";
import OriginDestInput from "../components/OriginDestInput";
import GeoCode from "../MapFlow/GeoCode";
import PathAndBearing from "../MapFlow/PathAndBearing";
import { MapFlowContext } from "../MapFlow/MapFlowContext";
import styled from "styled-components";
import { initialState, reducer } from "../modal/ModalReducer";
import NewMap from "../components/NewMap";
import ModalTrip from "../modal/ModalTrip";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { useNavigate } from "react-router-dom";

//New trip page, loads the map and inputs, and connects the modal
const NewTrip = () => {

  //Wow 2 reducers... probably time to learn redux
  const {
    state: {
      origin,
      destination,
      status,
      geocodedOrigin,
      geocodedDestination,
      author,
      username,
      pathBearing,
      bbox,
      imgName,
      distance,
      formData,
    },
    actions: { receivedGeocoding, receivedPath },
  } = useContext(MapFlowContext);

  //This should maybe be in a context but I just needed one dispatch to open the modal in <OriginDestInput/>
  const [state, dispatch] = useReducer(reducer, initialState);

  const user = useContext(CurrentUserContext);
  const nav = useNavigate();

  //Handles the data as the user flows through the map creation process
  useEffect(() => {
    switch (status) {
      case "origin-dest-received": {
        GeoCode(origin, destination).then((res) =>
          receivedGeocoding({
            ...res,
            author: user._id,
            username: user.username,
          })
        );
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

      case "save": {
        fetch("/add-trip", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            author,
            username,
            pathBearing,
            bbox,
            imgName,
            distance,
            formData,
          }),
        })
          .then((res) => res.json())
          //upon completion send the user to the trip detail page
          .then((data) => nav(`/trips/${data.tripId}`));
      }
    }
  }, [status]);

  return (
    <>
      <Container>
        <OriginDestInput dispatch={dispatch} />
        <NewMap />
        <ModalTrip state={state} dispatch={dispatch} />
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
`;

export default withAuthenticationRequired(NewTrip, {
  onRedirecting: () => <>Loading...</>,
});
