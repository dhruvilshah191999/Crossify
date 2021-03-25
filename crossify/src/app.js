import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import { store as notify } from "react-notifications-component";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import "assets/styles/customcss.css";
import "react-notifications-component/dist/theme.css";
import "assets/styles/mediaqueries.css";
import "../node_modules/animate.css/animate.min.css";
//import MapContainer from "./app";
// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Profile from "layouts/Profile.js";
import ManageEvent from "layouts/ManageEvent.js";
// views without layouts

import Landing from "views/trash/Landing.js";
// import Profile from "views/trash/Profile.js";
import EventPage from "views/explore/EventPage";
import Index from "views/Index.js";
import SearchPage from "views/searchPages/SearchPage";
import ClubSearchPage from "views/searchPages/ClubSearchPage";
import PlayGround from "views/demo/PlayGround";
import ClubPage from "views/explore/ClubPage";
import CreateClub from "views/create/CreateClub";
import { UserContext } from "context/usercontext";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/auth", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

const Routing = () => {
  var token = localStorage.getItem("jwt");
  return (
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/landing" exact component={Landing} />
      <Route path="/" exact component={Index} />
      <Route path="/search" exact component={SearchPage} />
      <Route path="/clubsearch" exact component={ClubSearchPage} />
      <Route path="/club/:id" exact component={ClubPage} />
      <Route path="/playground" exact component={PlayGround} />
      <Route path="/createclub" exact component={CreateClub} />
      <Route path="/auth" component={Auth} />
      {!token ? (
        <>
          <PrivateRoute authed={false} path="/profile" component={Profile} />
          <PrivateRoute
            authed={false}
            path="/manage/event/:id"
            component={ManageEvent}
          />
          <PrivateRoute
            authed={false}
            path="/events/event=:id"
            component={EventPage}
          />
        </>
      ) : (
        <>
          <PrivateRoute authed={true} path="/profile" component={Profile} />
          <PrivateRoute
            authed={true}
            path="/manage/event/:id"
            component={ManageEvent}
          />
          <PrivateRoute
            authed={true}
            path="/events/event=:id"
            component={EventPage}
          />
        </>
      )}

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
