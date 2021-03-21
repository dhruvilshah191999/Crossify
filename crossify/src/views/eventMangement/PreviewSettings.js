import React from "react";
import Sidebar from "components/Sidebar/ManageEventSidebar.js";
// components

//todo GOLU here just render eventPage instead of CardProfileSettings and make a upper notification type thing to say do you want to edit this and at last the button

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
