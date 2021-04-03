import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Keys from "config/default.json";
const GOOGLE_MAPS_API = Keys.GOOGLE_MAPS_API;
export class MapContainer extends React.Component {
  state = {
    markers: [
      {
        name: "Current position",
        position: {
          lat: 37.77,
          lng: -122.42,
        },
      },
    ],
  };

  componentDidUpdate() {
    console.log(this.state.markers[0].position);
  }
  onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState((prevState) => {
      const markers = [...this.state.markers];
      markers[index] = { ...markers[index], position: { lat, lng } };
      return { markers };
    });
  };

  render() {
    return (
      <Map
        className="view-map w-full overflow-hidden rounded"
        google={this.props.google}
        style={{ height: "450px", position: "relative" }}
        zoom={14}
      >
        {this.state.markers.map((marker, index) => (
          <Marker
            position={marker.position}
            draggable={true}
            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
            name={marker.name}
          />
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API,
  version: "3.38",
})(MapContainer);
