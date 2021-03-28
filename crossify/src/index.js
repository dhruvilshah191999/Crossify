import React from "react";
import ReactDOM from "react-dom";
import App from "App.js";
import UserContextProvider from "context/usercontext";
import ReactNotification from "react-notifications-component";

ReactDOM.render(
  <React.StrictMode>
    <ReactNotification />
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
