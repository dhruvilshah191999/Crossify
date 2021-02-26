import React from "react";

// components

import CardTable from "components/Cards/EventTable.js";
import Test from "components/masti";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          {/* <CardTable /> */}
          <CardTable />
        </div>
        <div className="w-full mb-12 px-4">
          {/* <CardTable color="dark" /> */}
        </div>
      </div>
    </>
  );
}
