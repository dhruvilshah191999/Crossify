import React from "react";

// components

import AttendeesTable from "components/Cards/AttendeesTable.js";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <AttendeesTable />
        </div>
      </div>
    </>
  );
}
