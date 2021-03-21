import React from "react";
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
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.long,
    };
  }

  render() {
    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
          defaultZoom={13}
        >
          <Marker
            draggable={false}
            position={{ lat: this.state.lat, lng: this.state.lng }}
          />
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
