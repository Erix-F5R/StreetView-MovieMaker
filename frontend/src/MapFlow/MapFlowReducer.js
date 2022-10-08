//This reducer manages the states involed in the data flow from user input to final map view
import { v4 as uuidv4 } from "uuid";

export const initialState = {
  status: "idle",
  error: null,
  origin: "",
  destination: "",
  geocodedOrigin: {},
  geocodedDestination: {},
  country: "",
  locality: "",
  label: "",

  //Return to Backend
  pathBearing: [],
  bbox: [],
  imgName: "",
  formData: {},
  distance: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    //Received user inputs
    case "received-origin-destination": {
      return {
        ...state,
        imgName: uuidv4(),
        status: "origin-dest-received",
        origin: action.origin,
        destination: action.destination,
      };
    }
    //Converted input to lat/lng
    case "geocoded": {
      return {
        ...state,
        status: "origin-dest-geocoded",
        geocodedOrigin: action.geocodedOrigin,
        geocodedDestination: action.geocodedDestination,
        country: action.country,
        locality: action.locality,
        label: action.label,
      };
    }

    //Route the path
    case "received-path": {
      return {
        ...state,
        status: "path-received",
        pathBearing: action.pathBearing,
        bbox: action.bbox,
        distance: action.distance,
      };
    }

    case "save": {
      // const data = {
      //   author: "633cd0988daa3300119248db",
      //   pathBearing: state.pathBearing,
      //   bbox: state.bbox,
      //   imgName: state.imgName,
      //   distance: state.distance,
      //   formData: action.formData,
      // };

      //useReducer appears to dispatch twice out of the box.
      //As a work around I'll check if the trip exists on the backend
      //  fetch("/add-trip", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ ...data }),
      //   })

      return {
        ...state,
        author: "633cd0988daa3300119248db",
        formData: action.formData,
        status: "save",
      };
    }

    default:
      throw new Error("Error in Map Flow.");
  }
};
