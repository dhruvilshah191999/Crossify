import React from "react";

// components

//todo GOLU here just render eventPage instead of CardProfileSettings and make a upper notification type thing to say do you want to edit this and at last the button

import CardProfileSettings from "components/Cards/CardProfileSettings.js";
import CardProfileUser from "components/Cards/CardProfileUser.js";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <CardProfileSettings />
        </div>
      </div>
    </>
  );
}
