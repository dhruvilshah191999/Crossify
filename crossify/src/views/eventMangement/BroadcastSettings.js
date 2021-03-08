import React from "react";

// components

import CardProfileSettings from "components/Cards/CardProfileSettings.js";

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