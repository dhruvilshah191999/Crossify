import React, { useContext, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";

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
import ProfilePage from "views/explore/ProfilePage";

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

function LoginRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

const Routing = () => {
  var token = localStorage.getItem("jwt");
  return (
    <Switch>
      <Route path="/landing" exact component={Landing} />
      <Route path="/" exact component={Index} />
      <Route path="/search" exact component={SearchPage} />
      <Route path="/clubsearch" exact component={ClubSearchPage} />
      <Route path="/createclub" exact component={CreateClub} />
      <Route path="/profilepage" exact component={ProfilePage} />
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
          <PrivateRoute
            authed={false}
            path="/club/:id"
            exact
            component={ClubPage}
          />
          <PrivateRoute authed={false} path="/admin/:id" component={Admin} />
          <LoginRoute authed={true} path="/auth" component={Auth} />
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
          <PrivateRoute
            authed={true}
            path="/club/:id"
            exact
            component={ClubPage}
          />
          <PrivateRoute authed={true} path="/admin/:id" component={Admin} />
          <LoginRoute authed={false} path="/auth" component={Auth} />
        </>
      )}

      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default function App() {
  const { islogin_dispatch, dispatch } = useContext(UserContext);
  let history = useHistory();

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
          if (res.data.is_error) {
            window.localStorage.removeItem("jwt");
            history.push("/auth");
          } else {
            dispatch({ type: "ADD_USER", payload: res.data });
          }
        } catch (error) {
          window.localStorage.removeItem("jwt");
          history.push("/auth");
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
