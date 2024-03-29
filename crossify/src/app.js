import React, { useState } from "react";
import ContextData from "./ContextData";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import "assets/styles/customcss.css";
import "react-notifications-component/dist/theme.css";
import "assets/styles/mediaqueries.css";
//import "../node_modules/animate.css/animate.min.css";
//import MapContainer from "./app";
// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Profile from "layouts/Profile.js";
import ManageEvent from "layouts/ManageEvent.js";
// views without layouts

// import Profile from "views/trash/Profile.js";
import EventPage from "views/explore/EventPage";
import Index from "views/Index.js";
import SearchPage from "views/searchPages/SearchPage";
import ClubSearchPage from "views/searchPages/ClubSearchPage";
import PlayGround from "views/demo/PlayGround";
import ClubPage from "views/explore/ClubPage";
import CreateClub from "views/create/CreateClub";
import ProfilePage from "views/explore/ProfilePage";
import PrivacyPolicy from "views/misc/PrivacyPolicy";
//import PageNotFound from "views/Error/404";

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
      <Route path="/" exact component={Index} />
      <Route path="/search" exact component={SearchPage} />
      <Route path="/clubsearch" exact component={ClubSearchPage} />
      <Route path="/createclub" exact component={CreateClub} />
      <Route path="/profilepage/:id" exact component={ProfilePage} />
      <Route path="/playground" exact component={PlayGround} />
      <Route path="/privacypolicy" exact component={PrivacyPolicy} />
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
      {/* <Route component={PageNotFound} /> */}

      {/* add redirect for first page */}
      {/* <Redirect from="*" to="/" /> */}
      {/* <Route path="*" component={PageNotFound} />
      <Redirect to="/404" /> */}
      {/* <NotFoundRoute handler={PageNotFound} /> */}
    </Switch>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const handleIsLoading = (childData) => {
    setIsLoading(true);
  };
  return (
    <BrowserRouter>
      <ContextData handleIsLoading={handleIsLoading} />
      {isLoading ? (
        <Routing />
      ) : (
        <>
          <div
            className="flex justify-center items-center"
            style={{ height: "100vh" }}
          >
            <GridLoader color="#36D7B7" size={15} />
          </div>
        </>
      )}
    </BrowserRouter>
  );
}
