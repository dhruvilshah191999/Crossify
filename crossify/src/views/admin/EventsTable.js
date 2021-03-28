import React from "react";

// components

import CardTable from "components/Tables/EventTable.js";

export default function Tables() {
  return (
    <div className="flex flex-wrap">
      <div className="w-full px-4">
        <CardTable />
      </div>
    </div>
  );
}
