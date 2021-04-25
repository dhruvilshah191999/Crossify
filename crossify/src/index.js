import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import UserContextProvider from "context/usercontext";
import ReactNotification from "react-notifications-component";
import axios from "axios";
const object = require("./config/default.json");
const BackendURL = object.BackendURL;
axios.defaults.baseURL = BackendURL;

ReactDOM.render(
  <React.StrictMode>
    <ReactNotification />
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
