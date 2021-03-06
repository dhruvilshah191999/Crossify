import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/ManageEventSidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import BroadcastSettings from "views/eventMangement/BroadcastSettings";
import Status from "views/eventMangement/StatusSettings";
import QnA from "views/eventMangement/QnASettings";
import General from "views/eventMangement/GeneralSettings";
import Details from "views/eventMangement/DetailsSettings";
import Attendees from "views/eventMangement/AttendeesSettings";

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
            <Route
              path="/manageevent/broadcast"
              exact
              component={BroadcastSettings}
            />
            <Route path="/manageevent/status" exact component={Status} />
            <Route path="/manageevent/general" exact component={General} />
            <Route path="/manageevent/details" exact component={Details} />
            <Route path="/manageevent/attendees" exact component={Attendees} />
            <Route path="/manageevent/qna" exact component={QnA} />

            {/* <Redirect from="/manage/event" to="/manage/event/general" /> */}
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
