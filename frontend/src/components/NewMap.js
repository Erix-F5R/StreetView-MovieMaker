import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { MapFlowContext } from "../MapFlow/MapFlowContext";

const NewMap = () => {
  const [box, setBox] = useState([
    [45.524049, -73.60648],
    [45.525551, -73.602441],
  ]);
  const [polyLine, setPolyLine] = useState();

  const {
    state: { status, bbox, pathBearing },
  } = useContext(MapFlowContext);

  useEffect(() => {
    if (status === "path-received") {
      setBox(bbox);
      setPolyLine(pathBearing.map((step) => [step.lat, step.lng]));
    }
  }, [status]);

  return (
    <MC key={JSON.stringify(box)} bounds={box} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {polyLine && (
        <Polyline pathOptions={{ color: "red" }} positions={polyLine} />
      )}
    </MC>
  );
};

const MC = styled(MapContainer)`
  height: 500px;
  width: 800px;
`;

export default NewMap;
