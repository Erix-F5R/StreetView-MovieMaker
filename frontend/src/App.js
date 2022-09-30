import { useAuth0 } from "@auth0/auth0-react";
import AuthNav from "./AuthNav";

const App = () => {

  const {isLoading} = useAuth0();



  if (isLoading){
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Hello World</h1>
      <div>
        <AuthNav />
      </div>
    </>
  );
};

export default App;
