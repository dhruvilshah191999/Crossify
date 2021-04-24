import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import BroadcastSettings from "views/eventMangement/BroadcastSettings";
import Preview from "views/eventMangement/PreviewSettings";
import QnASettings from "views/eventMangement/QnASettings";
import General from "views/eventMangement/GeneralSettings";
import Details from "views/eventMangement/DetailsSettings";
import Reports from "views/eventMangement/ReportSettings";
import Attendees from "views/eventMangement/AttendeesSettings";
export default function Admin() {
  return (
    <>
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route
              path="/manage/event/broadcast/:id"
              exact
              component={BroadcastSettings}
            />
            <Route path="/manage/event/preview/:id" exact component={Preview} />
            <Route path="/manage/event/general/:id" exact component={General} />
            <Route path="/manage/event/details/:id" exact component={Details} />
            <Route path="/manage/event/reports/:id" exact component={Reports} />
            <Route
              path="/manage/event/attendees/:id"
              exact
              component={Attendees}
            />
            <Route
              path="/manage/event/qanda/:id"
              exact
              component={QnASettings}
            />

            <Redirect from="/manage/event/:id" to="/manage/event/general/:id" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
