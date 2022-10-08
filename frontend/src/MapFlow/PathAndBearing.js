//This function Takes a geocoded origin and destination
//And returns the Path along with the bearing (direction facing the next stop)

//Utility function to calculate the bearing
const getBearing = (lat1, lng1, lat2, lng2) => {
  const degToRad = (deg) => {
    return (deg * Math.PI) / 180;
  };

  const [LAT1, LNG1, LAT2, LNG2] = [
    degToRad(lat1),
    degToRad(lng1),
    degToRad(lat2),
    degToRad(lng2),
  ];

  // X = cos Latb * sin ∆Long
  const X = Math.cos(LAT2) * Math.sin(LNG2 - LNG1);

  // Y = cos Lata * sin Latb – sin Lata * cos Latb * cos ∆Lng
  const Y =
    Math.cos(LAT1) * Math.sin(LAT2) -
    Math.sin(LAT1) * Math.cos(LAT2) * Math.cos(LNG2 - LNG1);

  // β = atan2(X,Y)
  const bearing = Math.floor((Math.atan2(X, Y) * 180) / Math.PI);

  return bearing < 0 ? 360 + bearing : bearing;
};

//incoming arrays as [lng, lat]
const PathAndBearing = async (geoOrigin, geoDestination) => {
  //Utility function to build API call
  const buildCall = (origin, dest) => {
    const ORS_KEY = process.env.REACT_APP_ORS_KEY;
    const from = `${origin.lng},${origin.lat}`
    const to = `${dest.lng},${dest.lat}`

    return `https://api.openrouteservice.org/v2/directions/cycling-regular?api_key=${ORS_KEY}&start=${from}&end=${to}`;
  };

  const resp = await fetch(buildCall(geoOrigin, geoDestination));
  const geoResp = await resp.json();

  //in form [ [lng,lat] , [lng, lat] , [lng, lat] , [] ...]
  const directions = geoResp.features[0].geometry.coordinates;

  const returnArray = [];

  let finalAngle;
  directions.reduce((prev, curr) => {
    let B = getBearing(prev[1], prev[0], curr[1], curr[0]);
    finalAngle = B;
    returnArray.push({ lat: prev[1], lng: prev[0], bearing: B });
    return curr;
  });

  const lastElement = {
    lat: directions[directions.length - 1][1],
    lng: directions[directions.length - 1][0],
    bearing: finalAngle,
  };

  //unpack bbox 
  const bbox = geoResp.features[0].bbox;
  const returnBbox = [[bbox[1],bbox[0]],[bbox[3],bbox[2]]]

  //unpack distance in meters
  const distance = geoResp.features[0].properties.summary.distance;  

  return { pathBearing: returnArray, bbox: returnBbox, distance: distance};
};

export default PathAndBearing;
