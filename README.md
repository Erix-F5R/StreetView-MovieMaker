# CB-18-Final

This website creates a movie out of a route by stitching together Google Streetview images. After entering an origin and destination, users receive a bike route from OpenRoutingService. At steps along the path images are taken from Google Streetview Static Image API to simulate a dashcam movie. This tool helps cyclists plan journeys by allowing them to scan the route for safety hazards such as missing shoulders, or bridge crossings. Users can make notes, rate the trip and share it with others.

The project is built using React in the frontend and Node.js (express) in the backend. MongoDB handles the data and Auth0 provides the login/signup infrastructure. 

API's used include: Google Static StreetView, Google Places Autocomplete, Google Geocoding, and OpenRoutingService Directions.

---
## Map Flow

<img src='readme/Mapflow.gif' style='width:50%' />
