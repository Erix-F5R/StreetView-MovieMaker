//This function builds the Google streetview src's
//In deployment user's would need to provide their own API key
const StreetViewBuilder = (pathArray) => {

    //Limit to protect api calls
    //28 000 calls a month free but even a 5min ride can be 100s of frames
    const LIMIT = pathArray.length > 5 ? 5 : pathArray.length ; 
    const KEY = process.env.REACT_APP_GOOGLE_KEY;

    const buildURL = (lat, lng, bearing) => {
        return `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${lat},${lng}&fov=80&heading=${bearing}&pitch=0&key=${KEY}`;
    }

    const imageArray = pathArray.map( step => buildURL(step.lat, step.lng,step.bearing));   
    const returnAr = imageArray.slice(0,LIMIT)


    return returnAr
}

export default StreetViewBuilder;