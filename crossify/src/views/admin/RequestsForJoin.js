import React, { Component } from "react";
import RequestsTable from "components/Cards/RequestsTable";
class MemberList extends Component {
  render() {
    return (
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <RequestsTable></RequestsTable>
        </div>
      </div>
    );
  }
}

export default MemberList;
