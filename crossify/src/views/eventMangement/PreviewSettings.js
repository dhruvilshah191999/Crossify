import React from "react";
import Sidebar from "components/Sidebar/ManageEventSidebar.js";
import EventPreview from "components/Cards/EventPreview.js";

export default function Settings() {
  return (
    <>
      <Sidebar />
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <EventPreview />
        </div>
      </div>
    </>
  );
}
