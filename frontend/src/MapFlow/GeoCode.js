import Geocode from "react-geocode";

//This function received a plain text origin/destination and returns them as lat/lng
//Calls the OpenRoutingService Geocoding API
// Includes label info
const GeoCode = async (origin, destination) => {

    //ORS PROVIDES Locality lable info, but unreliable for addresses
  const buildCall = (location) => {
    const ORS_KEY = process.env.REACT_APP_ORS_KEY;
    const URI_Location = encodeURI(location);
    return `https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${URI_Location}`;
  };

  //Google works much better sadly
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);

  //Get label info from ORS
  const labelCall = await fetch(buildCall(origin));
  const labelJson = await labelCall.json();

  //Call Origin
  const originCall = await Geocode.fromAddress(origin);
  
  //Call Dest
  const destinationCall = await Geocode.fromAddress(destination);

  const promises = await Promise.all([labelJson, originCall, destinationCall]);

  return {
    geocodedOrigin: promises[1].results[0].geometry.location,
    geocodedDestination: promises[2].results[0].geometry.location,
    country: promises[0].features[0].properties.country,
    locality: promises[0].features[0].properties.locality,
    label: promises[0].features[0].properties.label,
  };
};

export default GeoCode;
