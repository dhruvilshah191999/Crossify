import React, { Component } from "react";
import MembersTable from "components/Tables/MembersTable";
class MemberList extends Component {
  render() {
    return (
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <MembersTable></MembersTable>
        </div>
      </div>
    );
  }
}

export default MemberList;
