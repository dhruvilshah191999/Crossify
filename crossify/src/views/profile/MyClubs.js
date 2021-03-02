import React from "react";

// components

import CardTable from "components/Cards/EventTable.js";
import Test from "components/masti";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4 z-2 relative">
        <nav class="bg-white px-8 pt-2 shadow-md">
          <div class="-mb-px flex justify-center">
            <a
              class="no-underline text-beta border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8"
              href="#"
            >
              Home
            </a>
            <a
              class="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8"
              href="#"
            >
              Products
            </a>
            <a
              class="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8"
              href="#"
            >
              Discounts
            </a>
            <a
              class="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3"
              href="#"
            >
              Customers
            </a>
          </div>
        </nav>
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
