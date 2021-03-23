import React from "react";

// components

import CardTable from "components/Cards/EventTable.js";
import Test from "components/masti";

export default function Tables() {
  return (
    <div className="flex flex-wrap">
      <div className="w-full px-4">
        <CardTable />
      </div>
    </div>
  );
}
