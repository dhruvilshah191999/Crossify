import React from "react";
import demopf from "assets/img/marker.png";
import demopp from "assets/img/demopf.png";
import { Link } from "react-router-dom";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDTdEjltqANAZ2gIVPpu1_-KESWjPSxdrc");
Geocode.enableDebug();

function generateRandomNumber() {
  var min = 1000,
    max = 4499,
    highlightedNumber = Math.random() * (max - min) + min;

  return highlightedNumber;
}
const x0 = 23.106517;
const y0 = 72.59482;
const radius = 10;
const n = 6;
const getLocation = (x0, y0, radius) => {
  // Convert radius from meters to degrees
  const radiusInDegrees = radius / 111000;

  const u = generateRandomNumber();
  const v = generateRandomNumber();
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  // Adjust the x-coordinate for the shrinking of the east-west distances
  const new_x = x / Math.cos(y0 * (Math.PI / 180));

  const foundLongitude = new_x + x0;
  const foundLatitude = y + y0;
  return { lng: foundLatitude, lat: foundLongitude };
};

const getRandomPointNear = (x0, y0, radius, n) => {
  var ans = [];
  for (var i = 0; i < n; i++) {
    ans.push(getLocation(x0, y0, radius));
  }
  return ans;
};

var markers = getRandomPointNear(x0, y0, radius, n);
console.log(markers);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.long,
    };
  }

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
    this.setState({
      lat: newLat,
      lng: newLng,
    });
    // this.props.parentCallback(this.state);
  };

  render() {
    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
          defaultZoom={13}
          onDblClick={this.onMarkerDragEnd}
        >
          {
            /* {markers.map((el) => (
            <Marker position={el} />

          ))} */
            console.log(this)
          }
          <Marker
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{ lat: this.state.lat, lng: this.state.lng }}
            // onMouseOver={() => alert("working")}
            // animation={props.google.maps.Animation.DROP}
            onClick={this.onMarkerClick}
            name="current Location"
            // icon={demopf}
          >
            <InfoWindow onClick={this.onMarkerClick}>
              <a href="https://www.google.com" target="_blank">
                <div className="flex flex-col">
                  <div>
                    {" "}
                    <img
                      src={demopp}
                      className="rounded-lg"
                      style={{ width: 200, height: 100 }}
                    ></img>
                  </div>
                  <div className="font-semibold text-alpha my-2 text-base px-2">
                    Business Exhibition
                  </div>
                  <div className="flex ">
                    <div className="text-gray-700 text-xs px-2 ">
                      12 Feb 2021
                    </div>
                    <div className="text-beta ml-auto text-xs font-semibold">
                      {" "}
                      Slots : 12/50
                    </div>
                  </div>
                </div>
              </a>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      ))
    );
    return (
      <div className="rounded overflow-hidden">
        {/* <div className="text-gray-700 ml-1 mt-2">
          latitude &nbsp;&nbsp; : {this.state.lat}
        </div>
        <div className="text-gray-700 ml-1 mb-2 ">
          longitude : {this.state.lng}
        </div> */}

        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTdEjltqANAZ2gIVPpu1_-KESWjPSxdrc&libraries=places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `500px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
export default App;
App.defaultProps = {
  lat: 23.106517,
  long: 72.59482,
};
