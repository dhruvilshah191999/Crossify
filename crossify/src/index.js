import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import UserContextProvider from "context/usercontext";
import ReactNotification from "react-notifications-component";
import axios from "axios";
// axios.defaults.baseURL = "https://crossifyback.herokuapp.com";
axios.defaults.baseURL = "http://localhost:5000";

ReactDOM.render(
  <React.StrictMode>
    <ReactNotification />
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
