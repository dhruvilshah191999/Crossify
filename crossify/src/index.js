import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import UserContextProvider from "context/usercontext";
import ReactNotification from "react-notifications-component";
import axios from "axios";
<<<<<<< HEAD
// axios.defaults.baseURL = "https://crossifyback.herokuapp.com";
axios.defaults.baseURL = "http://localhost:5000";
=======
const object = require("./config/default.json");
const BackendURL = object.BackendURL;
axios.defaults.baseURL = BackendURL;
>>>>>>> 1216d1effee4dc4401b7731c974867ece9aba872

ReactDOM.render(
  <React.StrictMode>
    <ReactNotification />
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
