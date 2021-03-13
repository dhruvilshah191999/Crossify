import React from "react";

// components
import Sidebar from "components/Sidebar/ManageEventSidebar.js";
import AttendeesTable from "components/Cards/AttendeesTable.js";

export default function Settings() {
  return (
    <>
      <Sidebar />
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <AttendeesTable />
        </div>
      </div>
    </>
  );
}
