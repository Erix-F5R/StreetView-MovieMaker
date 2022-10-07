const StreetViewBuilder = (pathArray) => {

    //Limit to protect api calls
    const LIMIT = pathArray.length > 25 ? 25 : pathArray.length ; 
    const KEY = process.env.REACT_APP_GOOGLE_KEY;

    const buildURL = (lat, lng, bearing) => {
        return `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${lat},${lng}&fov=80&heading=${bearing}&pitch=0&key=${KEY}`;
    }

    const imageArray = pathArray.map( step => buildURL(step.lat, step.lng,step.bearing));   
    const returnAr = imageArray.slice(0,LIMIT)

    console.log(returnAr)

    return returnAr
}

export default StreetViewBuilder;