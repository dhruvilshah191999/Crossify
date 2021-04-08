import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import currentPosIcon from "assets/img/marker.png";
import hello from "config/default.json";
const GOOGLE_MAPS_API = hello.GOOGLE_MAPS_API;
console.log(GOOGLE_MAPS_API);
export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.lat);
    this.state = {
      name: "Current position",
      position: {
        lat: this.props.lat,
        lng: this.props.long,
      },
    };
    console.log(GOOGLE_MAPS_API);
  }

  // componentDidMount = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         let self = this;
  //         self.setState({
  //           position: {
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           },
  //         });
  //       },
  //       undefined,
  //       { enableHighAccuracy: true }
  //     );
  //   }
  // };
  onMarkerDragEnd = (coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    this.setState({ position: { lat, lng } });
    this.props.parentCallback(this.state.position);
  };

  render() {
    const { position, name, currentLocation } = this.state;
    return (
      <Map
        className="view-map w-full overflow-hidden rounded"
        google={this.props.google}
        style={{ height: "450px", position: "relative" }}
        zoom={14}
        disableDoubleClickZoom
        onDblclick={(t, map, coord) => this.onMarkerDragEnd(coord)}
        initialCenter={position}
      >
        <Marker
          position={position}
          draggable={true}
          onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
          name={name}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API,
  version: "3.38",
})(MapContainer);
