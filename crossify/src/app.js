import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
//import MapContainer from "./app";
// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import SearchPage from "views/SearchPage";

const Routing = () => {
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      history.push("/auth");
    }
  }, []);
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
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}
