//https://stackoverflow.com/questions/68116249/how-to-use-react-leaflet-easyprint-with-react-leaflet-3
//Easy print uses the browser to save a png of the map to the users download folder
//I would need to rewrite this library to grab the img to post it to the BE
//I save them to my asset folder but it's not an ideal solution
//Would need to rework this if I ever wanted to deploy
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

  //when the user clicks save, print map
  useEffect(() => {
    if (props.status === "save") {
      printPlugin.printMap("CurrentSize", `${props.imgName}`);
    }
  }, [props.status]);

  return null;
};

export default MapPrint;
