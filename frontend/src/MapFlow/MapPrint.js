//https://stackoverflow.com/questions/68116249/how-to-use-react-leaflet-easyprint-with-react-leaflet-3

import L from 'leaflet';
import 'leaflet-easyprint';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const MapPrint = (props) => {
    
    const map = useMap();
    useEffect(() => {
      const control = L.easyPrint({
        ...props
      });
      map.addControl(control)
      return () => {
        map.removeControl(control);
      }
    }, [map]);
  
  
    return null;

}

export default MapPrint;