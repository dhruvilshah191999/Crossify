import React, { Component } from "react";
import ManageMediaTable from "components/Tables/ManageMediaTable";

class MediaManager extends Component {
  render() {
    return (
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <ManageMediaTable></ManageMediaTable>
        </div>
      </div>
    );
  }
}

export default MediaManager;
