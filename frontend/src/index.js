import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import { BrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "./components/CurrentUserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <CurrentUserProvider>
        <App />
        </CurrentUserProvider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>
);
