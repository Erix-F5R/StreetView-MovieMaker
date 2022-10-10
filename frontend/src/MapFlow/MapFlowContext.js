import { createContext, useReducer, useContext} from "react";
import { reducer, initialState } from "./MapFlowReducer";


export const MapFlowContext = createContext();

export const MapFlowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const receivedOriginDestination = (data) => {

    dispatch({
      type: "received-origin-destination",
      ...data,
    });
  };

  const receivedGeocoding = (data) => {

    dispatch({
      type: "geocoded",
      ...data,
    });
  };

  const receivedPath = (data) => {

    dispatch({
      type: "received-path",
      ...data
    })
  }

  const saveTrip = (data) => {

    dispatch({type: 'save', formData: data})
  }

  return (
    <MapFlowContext.Provider
      value={{
        state,
        actions: { receivedOriginDestination, receivedGeocoding, receivedPath, saveTrip },
      }}
    >
      {children}
    </MapFlowContext.Provider>
  );
};
