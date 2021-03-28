import React, { Component } from "react";
import ManageFilesTable from "components/Tables/ManageFilesTable";

class FilesManager extends Component {
  render() {
    return (
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <ManageFilesTable></ManageFilesTable>
        </div>
      </div>
    );
  }
}

export default FilesManager;
