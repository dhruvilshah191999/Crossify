import React from "react";
import mapboxgl from "mapbox-gl";
// components

import MapExample from "components/Maps/MapExample.js";
import MapBoxApi from "components/Maps/MapBoxApi.js";

import MapContainer from "MapCode";
export default function Maps() {
 
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
           <MapContainer />
           
          
          </div>
        </div>
      </div>
    </>
  );
}
