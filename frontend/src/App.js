import { useAuth0 } from "@auth0/auth0-react";
import AuthNav from "./auth/AuthNav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import Profile from "./Profile";
import User from "./User";
import Trip from "./Trip";
import NewTrip from "./NewTrip";
import AllTrips from "./AllTrips";

const App = () => {
  const { isLoading, user } = useAuth0();

  fetch("/test")
    .then((res) => {
    res.text()
    })
    .then((json) => console.log(json));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(user);

  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        {/*Protected*/}
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-trip" element={<NewTrip />} />

        {/*Open*/}
        <Route path="/" element={<Homepage />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/trip/:tripId" element={<Trip />} />
        <Route path="/all-trips" element={<AllTrips />} />
        <Route path="*" element={<h1>404: Oops!</h1>} />
      </Routes>
    </>
  );
};

export default App;
