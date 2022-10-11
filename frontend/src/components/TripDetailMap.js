import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import styled from "styled-components";
import {useEffect, useState } from "react";


//Embedded map/path for trip detail

const TripDetailMap = ({bbox, pathBearing}) => {
  const [box, setBox] = useState();
  const [polyLine, setPolyLine] = useState();


  useEffect(() => {
      setBox(bbox);
      setPolyLine(pathBearing.map((step) => [step.lat, step.lng]));    
  }, []);

  return (
    <StyledMap key={JSON.stringify(box)} bounds={box} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {polyLine && (
        <Polyline pathOptions={{ color: "red" }}   positions={polyLine} />
      )}

    </StyledMap>
  );
};

const StyledMap = styled(MapContainer)`
  height: 400px;
  width: 800px;
  margin-top: 30px;
  border: 3px solid var(--color-main);

`;

export default TripDetailMap;
