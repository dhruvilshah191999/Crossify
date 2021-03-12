import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/ProfileSidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import MyClubs from "views/profile/MyClubs.js";
import MyEvents from "views/profile/MyEvents.js";
import MyProfile from "views/profile/MyProfile.js";
import ChangePassword from "views/auth/ChangePassword";

import ManageEvents from "views/profile/ManageEvents";
import EditPrivacy from "views/profile/EditPrivacy";
import EditProfile from "views/profile/EditProfile";
import EditSocialMedia from "views/profile/EditSocialMedia";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/profile/myclubs" exact component={MyClubs} />
            <Route path="/profile/myevents" exact component={MyEvents} />
            <Route path="/profile/myprofile" exact component={MyProfile} />

            <Route
              path="/profile/manage/events"
              exact
              component={ManageEvents}
            />
            <Route path="/profile/edit/myprofile" component={EditProfile} />
            <Route
              path="/profile/edit/password"
              exact
              component={ChangePassword}
            />
            <Route
              path="/profile/edit/socialmedia"
              exact
              component={EditSocialMedia}
            />
            <Route path="/profile/edit/privacy" exact component={EditPrivacy} />

            <Redirect from="/profile" to="/profile/edit/myprofile" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
