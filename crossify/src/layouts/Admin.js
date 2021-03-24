import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/ManageClubSidebar.js";
import HeaderStats from "components/Headers/StatsBox.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import EventsTable from "views/admin/EventsTable.js";
import MemberList from "views/admin/MemberList";
import ManageRooms from "views/admin/ManageRooms";
import ManageFiles from "views/admin/FilesManager";
import ManageMedia from "views/admin/MediaManager";
import RequestsList from "views/admin/RequestsForJoin";

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
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/events" exact component={EventsTable} />
            <Route path="/admin/memberlist" exact component={MemberList} />
            <Route path="/admin/rooms" exact component={ManageRooms} />
            <Route path="/admin/files" exact component={ManageFiles} />
            <Route path="/admin/media" exact component={ManageMedia} />
            <Route path="/admin/requests" exact component={RequestsList} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
