//This function received a plain text origin/destination and returns them as lat/lng
//Calls the OpenRoutingService Geocoding API
// Includes label info 
const GeoCode = async (origin, destination) => {

    const buildCall = (location) => {
        const ORS_KEY =  process.env.REACT_APP_ORS_KEY;
        const URI_Location = encodeURI(location)
        return `https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${URI_Location}`;        
    }


    //Call Origin
    const originRes = await fetch((buildCall(origin)))
    const originData = await originRes.json()

    //Call Dest
    const destinationRes = await fetch((buildCall(destination)))
    const destinationData = await destinationRes.json();

    const promises = await Promise.all([originData, destinationData]);

    return {
        geocodedOrigin: promises[0].features[0].geometry.coordinates,
        geocodedDestination: promises[1].features[0].geometry.coordinates,
        country: promises[0].features[0].properties.country,
        locality: promises[0].features[0].properties.locality,
        label: promises[0].features[0].properties.label,

    }

}

export default GeoCode