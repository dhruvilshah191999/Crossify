import React from "react";

// components

import ManageEventsTable from "components/Cards/ManageEvents";
import Test from "components/masti";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          {/* <CardTable /> */}
          <ManageEventsTable />
        </div>
        <div className="w-full mb-12 px-4">
          {/* <CardTable color="dark" /> */}
        </div>
      </div>
    </>
  );
}
