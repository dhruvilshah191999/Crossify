import React, { Component } from "react";
import Sidebar from "components/Sidebar/ManageClubSidebar.js";
import RoomsTable from "components/Tables/RoomsTable";
class ManageRooms extends Component {
  render() {
    return (
      <>
        <Sidebar />
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <RoomsTable></RoomsTable>
          </div>
        </div>
      </>
    );
  }
}

export default ManageRooms;
