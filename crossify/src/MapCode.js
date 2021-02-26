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
  state = {
    lat: 23.066481,
    lng: 72.527077,
  };

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
    this.setState({
      lat: newLat,
      lng: newLng,
    });
  };

  render() {
    console.log(this.state);
    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
          defaultZoom={13}
          onDblClick={this.onMarkerDragEnd}
        >
          <Marker
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{ lat: this.state.lat, lng: this.state.lng }}
          />
        </GoogleMap>
      ))
    );
    return (
      <div>
        <p>
          {this.state.lat} == {this.state.lng}
        </p>

        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTdEjltqANAZ2gIVPpu1_-KESWjPSxdrc&libraries=places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default App;
