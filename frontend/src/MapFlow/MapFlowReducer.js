
//This reducer manages the states involed in the data flow from user input to final map view

export const initialState = {
  status: "idle",
  error: null,
  origin: "",
  destination: "",
  geocodedOrigin: [],
  geocodedDestination: [],
  country: "",
  locality: "",
  lable: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "received-origin-destination": {
      return {
        ...state,
        status: "origin-dest-received",
        origin: action.origin,
        destination: action.destination,
      };
    }
    case "geocoded": {
      return {
        ...state,
        status: "origin-dest-geocoded",
        geocodedOrigin: action.geocodedOrigin,
        geocodedDestination: action.geocodedDestination,
        country: action.country,
        locality: action.locality,
        lable: action.label,
      };
    }
    default:
      throw new Error("Error in Map Flow.");
  }
};


  
  