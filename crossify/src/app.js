import React, { useContext, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import "assets/styles/customcss.css";
//import MapContainer from "./app";
// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import SearchPage from "views/SearchPage";
import ClubPage from "views/ClubPage";
import { UserContext } from "context/usercontext";

const Routing = () => {
  return (
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Index} />
      <Route path="/search" exact component={SearchPage} />
      <Route path="/club" exact component={ClubPage} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default function App() {
  const { islogin_dispatch, dispatch } = useContext(UserContext);

  useEffect(() => {
    async function checkLogin() {
      var token = localStorage.getItem("jwt");
      if (!token) {
        islogin_dispatch({ type: "Login-Status", status: false });
      } else {
        islogin_dispatch({ type: "Login-Status", status: true });
        try {
          const data = {
            token: token,
          };
          const config = {
            method: "POST",
            header: {
              "Content-Type": "application/json",
            },
          };
          const res = await axios.post("/api/auth", data, config);
          dispatch({ type: "ADD_USER", payload: res.data });
        } catch (error) {
          console.log(error);
        }
      }
    }
    checkLogin();
  }, []);
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}
