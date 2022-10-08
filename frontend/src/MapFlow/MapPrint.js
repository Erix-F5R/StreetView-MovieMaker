//https://stackoverflow.com/questions/68116249/how-to-use-react-leaflet-easyprint-with-react-leaflet-3

import L from "leaflet";
import "leaflet-easyprint";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapPrint = (props) => {
  const map = useMap();
  const printPlugin = L.easyPrint({
    ...props,
    hidden: true,
    sizeModes: ["CurrentSize"],
  }).addTo(map);

  useEffect(() => {
    if (props.status === "save") {
      printPlugin.printMap("CurrentSize", `${props.imgName}`);
    }
  }, [props.status]);

  return null;
};

export default MapPrint;
