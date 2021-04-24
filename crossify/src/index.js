import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import UserContextProvider from "context/usercontext";
import ReactNotification from "react-notifications-component";
import axios from "axios";
axios.defaults.baseURL = "https://crossifyback.herokuapp.com";

ReactDOM.render(
  <React.StrictMode>
    <ReactNotification />
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
