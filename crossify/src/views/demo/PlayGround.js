// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "./Map.css";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

// const Map = () => {
//   const mapContainerRef = useRef(null);

//   const [lng, setLng] = useState(5);
//   const [lat, setLat] = useState(34);
//   const [zoom, setZoom] = useState(1.5);

//   var geojson = {
//     type: "FeatureCollection",
//     features: [
//       {
//         type: "Feature",
//         geometry: {
//           type: "Point",
//           coordinates: [-77.032, 38.913],
//         },
//         properties: {
//           title: "Mapbox",
//           description: "Washington, D.C.",
//         },
//       },
//       {
//         type: "Feature",
//         geometry: {
//           type: "Point",
//           coordinates: [-122.414, 37.776],
//         },
//         properties: {
//           title: "Mapbox",
//           description: "San Francisco, California",
//         },
//       },
//     ],
//   };

//   // Initialize map when component mounts
//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [lng, lat],
//       zoom: zoom,
//     });

//     // Add navigation control (the +/- zoom buttons)
//     map.addControl(new mapboxgl.NavigationControl(), "top-right");

//     map.on("move", () => {
//       setLng(map.getCenter().lng.toFixed(4));
//       setLat(map.getCenter().lat.toFixed(4));
//       setZoom(map.getZoom().toFixed(2));
//     });

//     // Clean up on unmount
//     return () => map.remove();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <div>
//       <div className="sidebarStyle">
//         <div>
//           Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//         </div>
//       </div>
//       <div className="map-container" ref={mapContainerRef} />
//     </div>
//   );
// };

// export default Map;
import React, { Component } from "react";
import MarkerMap from "components/Maps/ClickableMarkers";
class PlayGround extends Component {
  render() {
    return (
      <div>
        <MarkerMap></MarkerMap>
      </div>
    );
  }
}

export default PlayGround;
