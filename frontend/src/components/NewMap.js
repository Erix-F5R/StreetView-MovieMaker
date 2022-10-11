import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { MapFlowContext } from "../MapFlow/MapFlowContext";
import MapPrint from "../MapFlow/MapPrint";

//New Trip embedded map
//Updates after a user specifies the path
const NewMap = () => {
  const [box, setBox] = useState([
    [45.67223, -74.08959],
    [45.40723, -73.22442],
  ]);
  const [polyLine, setPolyLine] = useState();



  const {
    state: { status, bbox, pathBearing, imgName },
  } = useContext(MapFlowContext);

  useEffect(() => {
    if (status === "path-received") {
      setBox(bbox);
      setPolyLine(pathBearing.map((step) => [step.lat, step.lng]));
    }
  }, [status]);

  return (
    <StyledMap key={JSON.stringify(box)} bounds={box} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {polyLine && (
        <Polyline pathOptions={{ color: "red" }}   positions={polyLine} />
      )}
      <MapPrint status={status} imgName={imgName} exportOnly />
    </StyledMap>
  );
};

const StyledMap = styled(MapContainer)`
  height: 400px;
  width: 800px;
  position: relative;
  z-index: -1;
`;

export default NewMap;
