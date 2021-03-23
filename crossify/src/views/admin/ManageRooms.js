import React, { Component } from "react";
import RoomsTable from "components/Cards/RoomsTable";
class ManageRooms extends Component {
  render() {
    return (
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <RoomsTable></RoomsTable>
        </div>
      </div>
    );
  }
}

export default ManageRooms;
