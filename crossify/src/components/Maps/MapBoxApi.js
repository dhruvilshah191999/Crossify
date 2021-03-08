import React,{useState} from "react";
import ReactMapGL from "react-map-gl";
export default function ShowMap(){
    const {viewport,setViewport}=useState({
        latitude:22.732564,
        longitude:78.004253,
        zoom: 10,
        width:"100vw",
        height:"100vh"
    });
    return (
    <div >
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
    <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiYmhhcmdhdi0yNyIsImEiOiJja2xrcHEyZGEwazV6MndxZmF1MHEzb3BhIn0.Z4RIYOak6wvUhhBhos-Iew" 
        onViewportChange={ (viewport)=> {setViewport(viewport)}
        
        
    }>
        markers here
    </ReactMapGL>
    </div>
    );
}