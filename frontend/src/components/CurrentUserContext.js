import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [userContext, setUserContext] = useState();
  const { user } = useAuth0();

  useEffect(() => {
    //fetch user

    user &&
      fetch(`/profile/${user.sub.split("|")[1]}`)
        .then((res) => res.json())
        .then((data) => setUserContext(data.data));
  }, [user]);

  return (
    <CurrentUserContext.Provider value={{ ...userContext }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
